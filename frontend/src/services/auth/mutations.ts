import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-hot-toast"
import { useDispatch } from "react-redux"
import { loginSuccess } from "../../features/user/userSlice"
import type {
  IAuthResponse,
  IJwtDecode,
  ILoginBody,
} from "../../lib/types/auth/login"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { login, register } from "./api"

export const useLogin = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (body: ILoginBody) => login("/token/", body),
    onSuccess: (data: IAuthResponse) => {
      const decoded = jwtDecode<IJwtDecode>(data.access)
      dispatch(loginSuccess(decoded.user))
      Cookies.set("eduChatAccess", data.access)
      toast.success(
        `Welcome ${decoded.user.first_name} ${decoded.user.last_name}!`
      )
    },
    onError: (error: any) => {
      toast.error(error?.data.error || "Something went wrong.")
    },
  })
}

export const useRegister = () => {
  return useMutation({
    mutationFn: (body: IRegisterBody) => register("/auth/register/", body),
    onSuccess: () => {
      toast.success("User registered successfully.")
    },
    onError: (error: any) => {
      toast.error(error.data.error || "Something went wrong.")
    },
  })
}
