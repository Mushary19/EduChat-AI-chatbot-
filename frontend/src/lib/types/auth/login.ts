import type { IUser } from "../user"

export interface ILoginBody {
  email: string
  password: string
}

export interface ILoginResponse {
  user: IUser
}
