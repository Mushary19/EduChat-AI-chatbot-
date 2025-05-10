import { fetchGet, fetchPatch, fetchPost } from "../api/apiRequests"

// chat logs
export const loadChatMessages = (url: string) => {
  return fetchGet<any>(url)
}

export const sendChatMessage = (url: string, body: string) => {
  return fetchPost<string, string>(url, body)
}

// session
export const createChatSession = (url: string, body: {}) => {
  return fetchPost<string, {}>(url, body)
}

export const updateChatSession = (url: string, body: any) => {
  return fetchPatch<string, any>(url, body)
}
