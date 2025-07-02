import axios, { AxiosError, type AxiosResponse } from "axios"

const BASE_API_URL = import.meta.env.VITE_API_URL
// http://192.168.8.150:8000/api/

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
})

axiosInstance.interceptors.request.use((config) => {
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    throw error.response
  }
)

export default axiosInstance
