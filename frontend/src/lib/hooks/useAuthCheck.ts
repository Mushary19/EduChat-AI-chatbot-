import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router-dom"
import { loginSuccess, logoutSuccess } from "../../features/user/userSlice"
import type { IJwtDecode } from "../../lib/types/auth/login"

export const useAuthCheck = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const publicRoutes = ["/auth/login", "/auth/register"]
    const accessToken = Cookies.get("eduChatAccess")
    const hasVisitedBefore = localStorage.getItem("hasVisited")

    if (publicRoutes.includes(location.pathname)) return

    if (accessToken) {
      try {
        const decoded = jwtDecode<IJwtDecode>(accessToken)
        dispatch(loginSuccess(decoded.user))
        localStorage.setItem("hasVisited", "true")
      } catch (err) {
        dispatch(logoutSuccess())
        if (hasVisitedBefore) toast.error("Invalid token. Please log in again")
        navigate("/auth/login")
      }
    } else {
      dispatch(logoutSuccess())
      if (hasVisitedBefore) toast.error("Session expired. Please log in again")
      navigate("/auth/login")
    }
  }, [dispatch, location.pathname])
}
