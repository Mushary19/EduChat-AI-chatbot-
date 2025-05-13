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
        <div className="w-84">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </main>
  ) : (
    <Login />
  )
}

export default MainLayout
