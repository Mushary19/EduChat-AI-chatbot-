import axios, { AxiosError, type AxiosResponse } from "axios"

const BASE_API_URL = import.meta.env.VITE_API_URL

const axiosInstance = axios.create({
  baseURL: BASE_API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    throw error
  }
)

export default axiosInstance
