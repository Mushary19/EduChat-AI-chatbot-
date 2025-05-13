import type {
  IChatMessageBody,
  IChatMessageResponse,
} from "../../lib/types/chatbot/chatMessage"
import type {
  IChatSession,
  IChatSessionBody,
  IChatSessionUpdateBody,
} from "../../lib/types/chatbot/chatSession"
import {
  fetchDelete,
  fetchGet,
  fetchPatch,
  fetchPost,
} from "../api/apiRequests"

// chat logs
export const loadChatMessages = (url: string, session_id: string) => {
  return fetchGet<any>(url, { session_id })
}

export const sendChatMessage = (url: string, body: IChatMessageBody) => {
  return fetchPost<IChatMessageResponse, IChatMessageBody>(url, body)
}

// session
export const loadChatSessions = (url: string) => {
  return fetchGet<IChatSession[]>(url)
}

export const loadChatSessionById = (url: string) => {
  return fetchGet<IChatSession>(url)
}

export const createChatSession = (url: string, body: IChatSessionBody) => {
  return fetchPost<IChatSession, IChatSessionBody>(url, body)
}

export const updateChatSession = (
  url: string,
  body: IChatSessionUpdateBody
) => {
  return fetchPatch<string, IChatSessionUpdateBody>(url, body)
}

export const deleteChatSession = (url: string) => {
  return fetchDelete<string>(url)
}
