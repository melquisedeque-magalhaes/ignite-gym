import axios, { AxiosError, AxiosInstance } from 'axios'

import { AppError } from '@errors/AppError'
import { getAuthTokenStorage, authTokenStorageSave } from '@storage/authTokenStorage'

interface PromiseType {
  onSucess: (token: string) => void
  onError: (error: AxiosError) => void
}

interface RegisterInterceptTokenManagerProps {
  signOut: () => void
}

interface ApiInstanceProps extends AxiosInstance {
  registerInterceptTokenManager: ({ signOut }: RegisterInterceptTokenManagerProps) => () => void
}

const api = axios.create({
  baseURL: 'http://192.168.100.50:3333'
}) as ApiInstanceProps

let isRefreshing = false

let failedQueue: Array<PromiseType> = []

api.registerInterceptTokenManager = ({ signOut }) => {
  const interceptTokenManager = api.interceptors.response.use(response => response, async requestError => {
    if(requestError?.response?.status === 401){
      if(requestError?.response.data?.message === 'token.expired' || requestError?.response?.data?.message === 'token.invalid'){
        const { refreshToken } = await getAuthTokenStorage()

        if(!refreshToken){
          signOut()

          return Promise.reject(requestError)
        }

        const originalRequest = requestError.config

        if(isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({ 
                onSucess: (token: string) => {
                  originalRequest.headers = { 'Authorization': `Bearer ${token}` };
                  resolve(api(originalRequest))
                },
                onError: (error: AxiosError) => reject(error)
              })
          })
        }

        isRefreshing = true

        return new Promise(async (resolve, reject) => {
          try {
            const { data } = await api.post('/sessions/refresh-token', { refresh_token: refreshToken })

            await authTokenStorageSave({ token: data.token, refreshToken: data.refresh_token })

            if(originalRequest.data)
              originalRequest.data = JSON.parse(originalRequest.data)

            originalRequest.headers = { 'Authorization': `Bearer ${data.token}` };
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;

            failedQueue.forEach(request => {
              request.onSucess(data.token)
            })

            console.log("TOKEN ATUALIZADO");

            resolve(api(originalRequest))

          }catch(error: any) {
            failedQueue.forEach(request => {
              request.onError(error)
            })

            signOut()
            reject(error)
          }finally{
            isRefreshing = false
            failedQueue = []
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