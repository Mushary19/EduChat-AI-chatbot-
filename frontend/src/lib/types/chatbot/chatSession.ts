import type { IUser } from "../user"

export interface IChatSession {
  id: number
  created_at: string
  updated_at: string
  session_id: string
  title: string
  user: IUser
}

export interface IChatSessionBody {
  user: number
}

export interface IChatSessionUpdateBody {
  title: string
}
