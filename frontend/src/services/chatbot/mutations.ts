import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type {
  IChatMessageResponse,
  IChatMessageResponseBody,
  IChatMessageUpdateBody,
} from "../../lib/types/chatbot/chatMessage"
import type {
  IChatSessionBody,
  IChatSessionUpdateBody,
} from "../../lib/types/chatbot/chatSession"
import {
  createChatSession,
  deleteChatSession,
  likeChatMessage,
  sendChatMessage,
  updateChatSession,
} from "./api"
import { ChatbotKey } from "./keys"

// Session
export const useCreateChatSession = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IChatSessionBody) =>
      createChatSession("/chatbot/session/", body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ChatbotKey.CHATSESSION] })
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}

export const useDeleteChatSession = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (sessionId: string) =>
      deleteChatSession(`/chatbot/session/${sessionId}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ChatbotKey.CHATSESSION] })
      toast.success("Session deleted successfully.")
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}

export const useUpdateSessionTitle = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IChatSessionUpdateBody) =>
      updateChatSession(`/chatbot/session/${body.sessionId}/`, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [ChatbotKey.CHATSESSION] })
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}

// Chat Message
export const useSendChatMessage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({
      sessionId,
      prompt,
      userId,
    }: {
      sessionId: string
      prompt: string
      userId: number
    }) => sendChatMessage(`/chatbot/${sessionId}/chat/`, { prompt, userId }),
    onSuccess: (data: IChatMessageResponse, variables) => {
      queryClient.invalidateQueries({
        queryKey: [ChatbotKey.CHATMESSAGE, data.session_id],
      })
      const timeout = setTimeout(() => {
        queryClient.invalidateQueries({
          queryKey: [ChatbotKey.CHATSESSION, variables.userId],
        })
      }, 20000)

      return () => clearTimeout(timeout)
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}

export const useLikeChatMessage = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: IChatMessageUpdateBody) =>
      likeChatMessage(`/chatbot/${body.id}/`, body),
    onSuccess: (data: IChatMessageResponseBody) => {
      queryClient.invalidateQueries({
        queryKey: [ChatbotKey.CHATMESSAGE, data.id],
      })
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong!")
    },
  })
}
