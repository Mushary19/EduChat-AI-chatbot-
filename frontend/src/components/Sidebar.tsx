import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import Popover from "@mui/material/Popover"
import { MoreHorizontal } from "lucide-react"
import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  useCreateChatSession,
  useDeleteChatSession,
} from "../services/chatbot/mutations"
import { useLoadChatSessions } from "../services/chatbot/queries"
import ConfirmDelete from "./ConfirmDelete"

const Sidebar = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [selectedSessionId, setSelectedSessionId] = React.useState<
    string | null
  >(null)
  const [openDelete, setOpenDelete] = React.useState<boolean>(false)
  const [isClickedRename, setIsClickedRename] = React.useState(false)
  const navigate = useNavigate()

  const toggleDelete = () => setOpenDelete((prev) => !prev)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "creative-popover" : undefined

  const handleSessionClick = (sessionId: string) => {
    navigate(`/?session_id=${sessionId}`)
  }

  const { data: chatSessions, isPending } = useLoadChatSessions()
  const { mutate: createSession, isPending: isCreatePending } =
    useCreateChatSession()
  const { mutate: deleteSession } = useDeleteChatSession()

  return (
    <>
      <section className="w-full h-full bg-gray-100 p-4">
        <div className="flex flex-col gap-1 text-gray-800">
          <div className="relative group mb-2">
            <button
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 ease-in-out"
              // onClick={() => createSession()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Chat
            </button>
          </div>

          {chatSessions?.map((session) => {
            const isSelected = selectedSessionId === session?.session_id

            return (
              <div
                key={session.id}
                onClick={() => {
                  setSelectedSessionId(session.session_id)
                  handleSessionClick(session.session_id)
                }}
                className={`flex px-4 py-2 gap-3 rounded-2xl justify-between items-center group cursor-pointer transition duration-200 ${
                  isSelected ? "bg-gray-300" : "hover:bg-gray-200"
                }`}
              >
                <span>{session.title}</span>
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
                      <li
                        className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => setIsClickedRename(true)}
                      >
                        Rename
                        <DriveFileRenameOutlineIcon fontSize="small" />
                      </li>
                      <li
                        className="flex justify-between items-center px-4 py-2 rounded-lg hover:bg-gray-100 cursor-pointer transition"
                        onClick={() => {
                          setOpenDelete(true)
                          handleClose()
                        }}
                      >
                        Delete
                        <DeleteOutlineOutlinedIcon fontSize="small" />
                      </li>
                    </ul>
                  </div>
                </Popover>
              </div>
            )
          })}
        </div>
      </section>

      {openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleDelete}
          onConfirm={() => deleteSession(selectedSessionId ?? "")}
        />
      )}
    </>
  )
}

export default Sidebar
