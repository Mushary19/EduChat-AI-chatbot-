export interface IChatMessageResponseBody {
  id: number
  created_at: string
  updated_at?: string
  sender: "SYSTEM" | "USER"
  message: string
  timestamp?: string
  session?: number
}

export interface IChatMessageBody {
  prompt: string
  userId: number
}

export interface IChatMessageResponse {
  response?: string
  session_id: string
  title: string
  prompt: string
}

export interface IChatMessageUpdateBody {
  id: number
  is_liked: boolean
}

export interface IGenerateTitleBody {
  session_id: string
  prompt: string
}
