import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import type { RootState } from "../app/store"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"
import Login from "../pages/auth/Login"

const MainLayout = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.user)

  return isAuthenticated ? (
    <main className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <div className="auto-scrollbar w-84 overflow-y-auto bg-gray-100 ">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden normal-scrollbar">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Login />
  )
}

export default MainLayout
