import { QueryClient, useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { IChatMessageBody } from "../../lib/types/chatbot/chatMessage"
import type { IChatSessionBody } from "../../lib/types/chatbot/chatSession"
import { createChatSession, sendChatMessage } from "./api"
import { ChatbotKey } from "./keys"

export const useCreateChatSession = () => {
  const queryClient = new QueryClient()
  return useMutation({
    mutationFn: (body: IChatSessionBody) =>
      createChatSession("/chatbot/session/", body),
    onSuccess: () => {
      //   queryClient.invalidateQueries({ queryKey: [ChatbotKey.CHATSESSION] })
    },
  })
}

export const useSendChatMessage = (sessionId: string) => {
  const queryClient = new QueryClient()
  return useMutation({
    mutationFn: (body: IChatMessageBody) =>
      sendChatMessage(`/chatbot/${sessionId}/chat/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ChatbotKey.CHATMESSAGE, sessionId],
      })
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}
