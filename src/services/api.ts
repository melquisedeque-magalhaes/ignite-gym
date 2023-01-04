import { AppError } from '@errors/AppError'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://192.168.100.84:3333'
})

api.interceptors.response.use(response => response, error => {
  if(error.response && error.response.data){
    return Promise.reject(new AppError(error.response.data.message))
  }

  return Promise.reject(error)
})

export { api }