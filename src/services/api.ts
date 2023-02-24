import axios, { AxiosInstance } from 'axios'

import { AppError } from '@errors/AppError'
import { getAuthTokenStorage, authTokenStorageSave } from '@storage/authTokenStorage'

interface PromiseType {
  resolve: (value?: unknown) => void
  reject: (resow?: unknown) => void
}

interface ProcessQueueProps {
  error: Error | null
  token: string | null
}

interface RegisterInterceptTokenManagerProps {
  signOut: () => void
  updateToken: (token: string) => void 
}

interface ApiInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: ({ signOut, updateToken }: RegisterInterceptTokenManagerProps) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.100.84:3333'
}) as ApiInstanceProps

let isRefreshing = false

let failedQueue: Array<PromiseType> = []

function processQueue({ error, token = null }: ProcessQueueProps){
  failedQueue.forEach(request => {
    if(error){
      request.reject(error)
    }

    request.resolve(token)
  })

  failedQueue = []
}

api.registerInterceptTokenManager = ({ signOut, updateToken }) => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {
    if(requestError?.response.status === 401){
      if(requestError.response.data?.message === 'token.expired' || requestError.response.data?.message === 'token.invalid'){
        const oldToken = await getAuthTokenStorage()

        if(!oldToken){
          signOut()

          return Promise.reject(requestError)
        }

        const originalRequest = requestError.config

        if(isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve,reject })
          }).then(token => {
            originalRequest.headers['Authorization'] = `Bearer ${token}`
            return axios(originalRequest)
          }).catch(error => {
            throw error
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { token: oldToken })

            await authTokenStorageSave(data.token)

            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            originalRequest.headers['Authorization'] = `Bearer ${data.token}`

            updateToken(data.token)

            processQueue({ error: null, token: data.token })
            resolve(originalRequest)
          }catch(error: any) {
            processQueue({ error, token: null })
            reject(error)
            signOut()
          }finally{
            isRefreshing = false
          }
        })
      }

      signOut()
    }
    
    
    if(requestError.response && requestError.response.data){
      return Promise.reject(new AppError(requestError.response.data.message))
    }
  
    return Promise.reject(requestError)
  })

  return () => {
    api.interceptors.response.eject(interceptTokenManager)
  }
}



export { api }