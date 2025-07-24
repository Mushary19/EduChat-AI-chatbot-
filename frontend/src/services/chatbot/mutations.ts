import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import type {
  IChatMessageResponse,
  IChatMessageResponseBody,
  IChatMessageUpdateBody,
  IGenerateTitleBody,
} from "../../lib/types/chatbot/chatMessage"
import type {
  IChatSessionBody,
  IChatSessionUpdateBody,
} from "../../lib/types/chatbot/chatSession"
import {
  createChatSession,
  deleteChatSession,
  generateSessionTitle,
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

const generatingMap = new Map<string, boolean>()

export const useGenerateSessionTitle = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (body: IGenerateTitleBody) =>
      generateSessionTitle(`/chatbot/${body.session_id}/generate-title/`, body),
    onMutate: (body) => {
      generatingMap.set(body.session_id, true)

      setTimeout(() => {
        generatingMap.delete(body.session_id)
      }, 60000)
    },
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({
        queryKey: [ChatbotKey.CHATSESSION],
      })
    },
    onError: () => {
      return
    },
    onSettled: (_data, _error, variables) => {
      generatingMap.delete(variables.session_id)
    },
  })
}

// Chat Message
export const useSendChatMessage = () => {
  const { mutate: generateTitle, isPending: isGeneratingTitle } =
    useGenerateSessionTitle()

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

      if (data.title === "New Chat" && !isGeneratingTitle) {
        generateTitle({ session_id: data.session_id, prompt: variables.prompt })
      }
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
