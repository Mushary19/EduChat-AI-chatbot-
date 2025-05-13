import { useMutation } from "@tanstack/react-query"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { loginSuccess } from "../../features/user/userSlice"
import type { ILoginBody, ILoginResponse } from "../../lib/types/auth/login"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { login, register } from "./api"

export const useLogin = () => {
  const dispatch = useDispatch()

  return useMutation({
    mutationFn: (body: ILoginBody) => login("/auth/login/", body),
    onSuccess: (data: ILoginResponse) => {
      toast.success(`Welcome ${data.user.first_name} ${data.user.last_name}!`)

      dispatch(loginSuccess(data.user))
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
