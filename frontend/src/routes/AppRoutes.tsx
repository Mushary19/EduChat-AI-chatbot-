import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Chatbot from "../pages/chatbot/Chatbot"
import Demo from "../pages/chatbot/Demo"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Chatbot />} />
        <Route path="demo" element={<Demo />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
