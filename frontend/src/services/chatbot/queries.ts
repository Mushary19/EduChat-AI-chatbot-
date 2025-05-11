import { useQuery } from "@tanstack/react-query"
import { loadChatSessionById, loadChatSessions } from "./api"
import { ChatbotKey } from "./keys"

export const useLoadChatSessions = () => {
  return useQuery({
    queryKey: [ChatbotKey.CHATSESSION],
    queryFn: () => loadChatSessions("/chatbot/session/"),
  })
}

export const useLoadChatSessionById = (session_id: string) => {
  return useQuery({
    queryKey: [],
    queryFn: () => loadChatSessionById(`/chatbot/session/${session_id}/`),
  })
}
