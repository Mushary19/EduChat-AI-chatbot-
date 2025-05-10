import type { AxiosResponse } from "axios"
import axiosInstance from "../../lib/axios"

export const fetchGet = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url, { params })
  return response.data
}

export const fetchPost = async <T, B>(url: string, body: B): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.post(url, body)
  return response.data
}

export const fetchPatch = async <T, B>(url: string, body: B): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.patch(url, body)
  return response.data
}

export const fetchDelete = async <T>(url: string) => {
  const response: AxiosResponse<T> = await axiosInstance.delete(url)
  return response.data
}
