import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import Popover from "@mui/material/Popover"
import { MoreHorizontal } from "lucide-react"
import * as React from "react"

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "creative-popover" : undefined

  return (
    <section className="w-full h-full bg-gray-100 p-4">
      <div className="flex flex-col gap-1 text-gray-800">
        <div className="flex px-4 py-2 gap-3 rounded-2xl justify-between items-center group bg-gray-300 transition duration-200">
          <span>New chat</span>
          <button
            onClick={handleClick}
            className="opacity-0 group-hover:opacity-100 transition duration-200"
          >
            <MoreHorizontal />
          </button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            PaperProps={{
              sx: {
                borderRadius: 2,
                boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
                minWidth: 160,
              },
            }}
          >
            <div className="bg-white rounded-xl p-2">
              <ul className="text-sm text-gray-700">
                <li className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  Rename
                  <DriveFileRenameOutlineIcon fontSize="small" />
                </li>
                <li className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition">
                  Delete
                  <DeleteOutlineOutlinedIcon fontSize="small" />
                </li>
              </ul>
            </div>
          </Popover>
        </div>

        {/* Additional Chat Items */}
        <div className="flex px-4 py-2 gap-3 rounded-2xl hover:bg-gray-200 transition duration-200">
          <span>New chat</span>
        </div>
        <div className="flex px-4 py-2 gap-3 rounded-2xl hover:bg-gray-200 transition duration-200">
          <span>New chat</span>
        </div>
      </div>
    </section>
  )
}

export default Sidebar
