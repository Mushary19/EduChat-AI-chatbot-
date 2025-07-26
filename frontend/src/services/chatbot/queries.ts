import { useQuery } from "@tanstack/react-query"
import { loadChatMessages, loadChatSessionById, loadChatSessions } from "./api"
import { ChatbotKey } from "./keys"

export const useLoadChatSessions = (userId: number) => {
  return useQuery({
    queryKey: [ChatbotKey.CHATSESSION, userId],
    queryFn: () => loadChatSessions(`/chatbot/session/`, userId),
  })
}

export const useLoadChatSessionById = (session_id: string) => {
  return useQuery({
    queryKey: [ChatbotKey.CHATSESSION, session_id],
    queryFn: () => loadChatSessionById(`/chatbot/session/${session_id}/`),
  })
}

export const useLoadChatMessagesBySessionId = (session_id: string) => {
  return useQuery({
    queryKey: [ChatbotKey.CHATMESSAGE, session_id],
    queryFn: () => loadChatMessages(`/chatbot/`, session_id),
    enabled: !!session_id,
  })
}
