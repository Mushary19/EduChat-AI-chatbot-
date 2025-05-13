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
}
