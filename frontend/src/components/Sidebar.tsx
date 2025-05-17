import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import Popover from "@mui/material/Popover"
import { MoreHorizontal } from "lucide-react"
import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../lib/hooks/useAuth"
import type { IChatSession } from "../lib/types/chatbot/chatSession"
import {
  useCreateChatSession,
  useDeleteChatSession,
} from "../services/chatbot/mutations"
import { useLoadChatSessions } from "../services/chatbot/queries"
import ConfirmDelete from "./ConfirmDelete"

const ChatSessionItem = ({
  session,
  isSelected,
  onSelect,
  onDelete,
}: {
  session: IChatSession
  isSelected: boolean
  onSelect: (id: string) => void
  onDelete: (id: string) => void
}) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openDelete, setOpenDelete] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [updatedTitle, setUpdatedTitle] = React.useState(session.title)

  const titleRef = React.useRef<HTMLInputElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? `popover-${session.session_id}` : undefined

  const toggleDelete = () => setOpenDelete((prev) => !prev)

  return (
    <div
      key={session.id}
      onClick={() => onSelect(session.session_id)}
      className={`flex px-4 py-2 gap-3 rounded-2xl justify-between items-center group cursor-pointer transition duration-200 ${
        isSelected ? "bg-gray-300" : "hover:bg-gray-200"
      }`}
    >
      <input
        value={!isEditing ? `${updatedTitle.substring(0, 20)}` : updatedTitle}
        ref={titleRef}
        readOnly={!isEditing}
        onClick={(e) => {
          if (!isEditing) return
          e.stopPropagation()
        }}
        className={`bg-transparent outline-none border-none w-full cursor-pointer ${
          isEditing ? "bg-white px-1 py-0.5 rounded" : ""
        }`}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        onBlur={() => {
          setIsEditing(false)
        }}
        // onKeyDown={() => {
        // }}
      />
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleClick(e)
        }}
        className="opacity-0 group-hover:opacity-100 transition duration-200"
      >
        <MoreHorizontal className="cursor-pointer" />
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
              onClick={() => {
                // Handle rename
                handleClose()
                setIsEditing(true)
                setTimeout(() => {
                  titleRef?.current?.focus()
                }, 100)
              }}
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

      {openDelete && (
        <ConfirmDelete
          open={openDelete}
          onClose={toggleDelete}
          onConfirm={() => {
            onDelete(session.session_id)
            toggleDelete()
          }}
        />
      )}
    </div>
  )
}

const Sidebar = () => {
  const [selectedSessionId, setSelectedSessionId] = React.useState<
    string | null
  >(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { user } = useAuth()

  const { data: chatSessions, isPending } = useLoadChatSessions(user?.id ?? 0)
  const { mutateAsync: createSession, isPending: isCreatePending } =
    useCreateChatSession()
  const { mutate: deleteSession, isSuccess: isDeleted } = useDeleteChatSession()

  React.useEffect(() => {
    const urlSessionId = searchParams.get("session_id")
    setSelectedSessionId(urlSessionId)
  }, [searchParams])

  const handleSessionClick = (sessionId: string) => {
    setSelectedSessionId(sessionId)
    navigate(`/?session_id=${sessionId}`)
  }

  const handleCreateChatSession = async () => {
    const response = await createSession({ user: user?.id ?? 0 })
    if (response.session_id) {
      navigate(`/?session_id=${response.session_id}`)
    }
  }

  React.useEffect(() => {
    if (isDeleted) {
      navigate("/")
    }
  }, [isDeleted])

  return (
    <>
      <section className="w-full h-full bg-gray-100 p-4">
        <div className="flex flex-col gap-1 text-gray-800">
          <div className="relative group mb-2">
            <button
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 ease-in-out"
              onClick={() => {
                handleCreateChatSession()
              }}
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

          {chatSessions?.map((session) => (
            <ChatSessionItem
              key={session.session_id}
              session={session}
              isSelected={selectedSessionId === session.session_id}
              onSelect={handleSessionClick}
              onDelete={deleteSession}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Sidebar
