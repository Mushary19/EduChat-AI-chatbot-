import type { IChatMessageBody } from "../../lib/types/chatbot/chatMessage"
import type {
  IChatSession,
  IChatSessionBody,
} from "../../lib/types/chatbot/chatSession"
import { fetchGet, fetchPatch, fetchPost } from "../api/apiRequests"

// chat logs
export const loadChatMessages = (url: string, session_id: string) => {
  return fetchGet<any>(url, { session_id })
}

export const sendChatMessage = (url: string, body: IChatMessageBody) => {
  return fetchPost<string, IChatMessageBody>(url, body)
}

// session
export const loadChatSessions = (url: string) => {
  return fetchGet<IChatSession[]>(url)
}

export const loadChatSessionById = (url: string) => {
  return fetchGet<IChatSession>(url)
}

export const createChatSession = (url: string, body: IChatSessionBody) => {
  return fetchPost<string, IChatSessionBody>(url, body)
}

export const updateChatSession = (url: string, body: any) => {
  return fetchPatch<string, any>(url, body)
}
