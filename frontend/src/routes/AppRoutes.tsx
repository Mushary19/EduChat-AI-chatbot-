import { Route, Routes } from "react-router-dom"
import AuthLayout from "../layouts/AuthLayout"
import MainLayout from "../layouts/MainLayout"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Chatbot from "../pages/chatbot/Chatbot"
import Demo from "../pages/chatbot/Demo"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="auth" element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route element={<MainLayout />}>
        <Route path="/" element={<Chatbot />} />
        <Route path="demo" element={<Demo />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
