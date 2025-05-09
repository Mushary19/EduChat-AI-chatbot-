import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/Sidebar"

const MainLayout = () => {
  return (
    <main className="flex flex-col h-screen overflow-hidden">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-84">
          <Sidebar />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </main>
  )
}

export default MainLayout
