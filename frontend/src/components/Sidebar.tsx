import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined"
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline"
import { CircularProgress } from "@mui/material"
import Popover from "@mui/material/Popover"
import { LogOut, MoreHorizontal } from "lucide-react"
import * as React from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useAuth } from "../lib/hooks/useAuth"
import type { IChatSession } from "../lib/types/chatbot/chatSession"
import {
  useCreateChatSession,
  useDeleteChatSession,
  useUpdateSessionTitle,
} from "../services/chatbot/mutations"
import { useLoadChatSessions } from "../services/chatbot/queries"
import ConfirmDelete from "./ConfirmDelete"
import LogoutDialog from "./LogoutDialog"

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
  // const theme = useTheme()
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const [openDelete, setOpenDelete] = React.useState<boolean>(false)
  const [isEditing, setIsEditing] = React.useState(false)
  const [updatedTitle, setUpdatedTitle] = React.useState(session.title)
  // const isXsOrSm = useMediaQuery(theme.breakpoints.down("md"))

  const titleRef = React.useRef<HTMLInputElement>(null)
  // const touchTimeout = React.useRef<number | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  // const handleTouchStart = (event: any) => {
  //   if (!isXsOrSm) return // Only handle long press on xs/sm devices

  //   touchTimeout.current = setTimeout(() => {
  //     handleClick(event) // Open Popover on long press
  //   }, 500) // 500ms for long press
  // }

  // const handleTouchEnd = () => {
  //   if (touchTimeout.current) {
  //     clearTimeout(touchTimeout.current) // Clear timeout if touch ends early
  //   }
  //   console.log("holded")
  // }

  const open = Boolean(anchorEl)
  const id = open ? `popover-${session.session_id}` : undefined

  const toggleDelete = () => setOpenDelete((prev) => !prev)

  const { mutate: updateSessionTitle } = useUpdateSessionTitle()

  return (
    <>
      <div
        key={session.id}
        onClick={() => onSelect(session.session_id)}
        // onTouchStart={handleTouchStart}
        // onTouchEnd={() => {
        //   handleTouchEnd
        // }}
        className={`flex px-4 py-2 gap-3 rounded-2xl justify-between items-center group cursor-pointer transition duration-200 ${
          isSelected
            ? "bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200"
            : "hover:bg-indigo-200"
        }`}
      >
        <input
          value={!isEditing ? `${updatedTitle.substring(0, 25)}` : updatedTitle}
          ref={titleRef}
          readOnly={!isEditing}
          onClick={(e) => {
            if (!isEditing) return
            e.stopPropagation()
          }}
          className={`bg-transparent outline-none border-none w-full cursor-pointer text-gray-700 ${
            isEditing ? "bg-white px-1 py-0.5 rounded" : ""
          }`}
          onChange={(e) => setUpdatedTitle(e.target.value)}
          onBlur={() => {
            setIsEditing(false)
          }}
          onKeyDown={(e) => {
            // e.preventDefault()
            if (e.key === "Enter") {
              updateSessionTitle(
                {
                  sessionId: session.session_id,
                  title: updatedTitle,
                },
                {
                  onSettled: () => {
                    setIsEditing(false)
                  },
                }
              )
            }
          }}
        />
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClick(e)
          }}
          className="opacity-50 md:opacity-0 md:group-hover:opacity-100 transition duration-200"
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
          <div className="rounded-xl p-2" onBlur={handleClose}>
            <ul className="text-sm text-black">
              <li
                className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer transition hover:bg-gradient-to-r hover:bg-gray-100"
                onClick={(e) => {
                  e.stopPropagation()
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
                className="flex justify-between items-center px-4 py-2 rounded-lg cursor-pointer transition hover:bg-red-400 hover:text-white"
                onClick={(e) => {
                  e.stopPropagation()
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

      {/* <div className="md:hidden flex justify-between fixed bottom-0 bg-gray-400 w-[320px] p-3">
        <div>Profile</div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            handleClick(e)
          }}
          className="opacity-50 transition duration-200"
        >
          <MoreHorizontal className="cursor-pointer" />
        </button>
      </div> */}
    </>
  )
}

const Sidebar = () => {
  const [selectedSessionId, setSelectedSessionId] = React.useState<
    string | null
  >(null)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const [openLogout, setOpenLogout] = React.useState(false)
  const toggleLogout = () => setOpenLogout((prev) => !prev)

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
    // if (!sessionId) return
    const response = await createSession({ user: user?.id ?? 0 })
    if (response.session_id) {
      navigate(`/?session_id=${response.session_id}`)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("chatbot_user")
    navigate("/auth/login")
  }

  React.useEffect(() => {
    if (isDeleted) {
      navigate("/")
    }
  }, [isDeleted])

  return (
    <>
      <section className="w-full h-full overflow-y-auto pt-20 pb-20 md:pt-0 bg-white relative">
        {/* Fixed top section on small devices */}
        <div className="fixed top-0 left-0 right-0 p-4 bg-white z-10 md:hidden w-[300px]">
          {/* Profile row */}
          {/* <div className="flex justify-between items-center px-4 py-1.5 bg-gray-200 rounded-2xl mb-2">
            <Avatar />
            <MoreHorizontal />
          </div> */}

          {/* New Chat Button */}
          <button
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 ease-in-out"
            onClick={handleCreateChatSession}
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
            {isCreatePending ? <CircularProgress size={20} /> : "New Chat"}
          </button>
        </div>

        {/* Sticky on large screens */}
        <div className="hidden md:block sticky top-0 z-10 bg-white p-4">
          <button
            className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-md hover:scale-[1.02] hover:shadow-lg transition-transform duration-200 ease-in-out"
            onClick={handleCreateChatSession}
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
            {isCreatePending ? <CircularProgress size={20} /> : "New Chat"}
          </button>
        </div>

        {/* Chat session list */}
        <div className="flex flex-col gap-1 text-gray-800 px-4">
          {chatSessions?.map((session) => (
            <ChatSessionItem
              key={session.session_id}
              session={session}
              isSelected={selectedSessionId === session.session_id}
              onSelect={handleSessionClick}
              onDelete={deleteSession}
            />
          ))}
          <div className="p-1" />
        </div>

        {/* Logout button - only for small devices */}
        <div
          className="fixed bottom-0 left-0 right-0 py-3 px-4 bg-white z-10 md:hidden w-[300px]"
          onClick={(e) => {
            e.stopPropagation()
            setOpenLogout(true)
          }}
        >
          <button className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 transition py-3 px-5 rounded-2xl w-full">
            <LogOut className="text-gray-700" />
            <span className="text-gray-800 font-medium">Logout</span>
          </button>
        </div>
      </section>

      {openLogout && (
        <LogoutDialog
          open={openLogout}
          onClose={toggleLogout}
          onConfirm={handleLogout}
        />
      )}
    </>
  )
}

export default Sidebar
