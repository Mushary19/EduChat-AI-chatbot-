import { useState } from "react"

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <div className="flex w-full justify-between items-center px-6 py-4 bg-gray-300 shadow-md">
      {/* Logo and Title */}
      <div
        className="flex gap-3 items-center cursor-pointer"
        onClick={() => (window.location.href = "/")}
      >
        <img src="/assets/robot.svg" alt="Logo" className="h-10 w-10" />
        <p className="text-lg font-semibold">Chat Bot</p>
      </div>

      {/* Menu Button */}
      <div className="relative">
        <button
          onClick={toggleMenu}
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
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
