import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logoutSuccess } from "../features/user/userSlice"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutSuccess())
    navigate("/auth/login/")
  }

  return (
    <div className="flex w-full justify-between items-center px-6 py-4 bg-gray-300 shadow-md">
      {/* Logo and Title */}
      <div
        className="flex gap-1 items-center cursor-pointer"
        onClick={() => navigate("/", { replace: true })}
      >
        <img src="/assets/educhat-logo.svg" alt="Logo" className="h-10 w-10" />
        <p className="text-lg font-semibold">EduChat</p>
      </div>

      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={toggleMenu}
          onBlur={() => {
            setMenuOpen(false)
          }}
          className="px-4 py-2 rounded-md transition-all duration-300 cursor-pointer"
        >
          <img src="assets/menu.svg" alt="menu" className="w-6 h-6" />
        </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-10 p-2">
            <ul className="text-sm">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Profile
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                Settings
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleLogout()}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
