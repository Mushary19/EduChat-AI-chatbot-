import { Route, Routes } from "react-router-dom"
import MainLayout from "../layouts/MainLayout"
import Chatbot from "../pages/chatbot/Chatbot"

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Chatbot />} />
      </Route>
    </Routes>
  )
}

export default AppRoutes
