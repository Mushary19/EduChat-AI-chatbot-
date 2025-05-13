import type { ILoginBody, ILoginResponse } from "../../lib/types/auth/login"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { fetchPost } from "../api/apiRequests"

export const login = (url: string, body: ILoginBody) => {
  return fetchPost<ILoginResponse, ILoginBody>(url, body)
}

export const register = (url: string, body: IRegisterBody) => {
  return fetchPost<string, IRegisterBody>(url, body)
}
