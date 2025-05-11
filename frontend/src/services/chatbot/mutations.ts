import { QueryClient, useMutation } from "@tanstack/react-query"
import type { IChatSessionBody } from "../../lib/types/chatbot/chatSession"
import { createChatSession } from "./api"

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
