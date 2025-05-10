import { useMutation } from "@tanstack/react-query"
import { toast } from "react-toastify"
import type { ILoginBody } from "../../lib/types/auth/login"
import type { IRegisterBody } from "../../lib/types/auth/register"
import { login, register } from "./api"

export const useLogin = () => {
  return useMutation({
    mutationFn: (body: ILoginBody) => login("/auth/login/", body),
    onSuccess: () => {
      toast.success("Login successful.")
    },
    onError: (error: any) => {
      console.log(error)
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
