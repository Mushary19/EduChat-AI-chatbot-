import { Tooltip } from "@mui/material"
import { Copy, ThumbsDown, ThumbsUp } from "lucide-react"
import { useEffect, type Dispatch, type SetStateAction } from "react"
import ChatLoader from "../../components/ChatLoader"
import MessageLoader from "../../components/MessageLoader"
import { useAuth } from "../../lib/hooks/useAuth"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import { useLikeChatMessage } from "../../services/chatbot/mutations"
import { useLoadChatMessagesBySessionId } from "../../services/chatbot/queries"
import InitialChatView from "./InitialChatView"

interface Props {
  optimisticMessages: IChatMessageResponseBody[]
  sessionId: string
  setOptimisticMessages: Dispatch<SetStateAction<IChatMessageResponseBody[]>>
  isSendingMessage: boolean
  setIsSendingMessage: Dispatch<SetStateAction<boolean>>
}

const ChatView: React.FC<Props> = (props) => {
  const {
    optimisticMessages,
    sessionId,
    setOptimisticMessages,
    setIsSendingMessage,
    isSendingMessage,
  } = props
  console.log(sessionId)

  const { user } = useAuth()

  const initialChatBanner = `Hii, ${user?.first_name} ${user?.last_name}!, How can i help you today?.`

  const { data: chatMessages, isPending } = useLoadChatMessagesBySessionId(
    sessionId ?? ""
  )
  const allMessages = [...(chatMessages ?? []), ...optimisticMessages]

  console.log(optimisticMessages)

  console.log(isSendingMessage, "sending message")

  const { mutate: likeMessage } = useLikeChatMessage()

  useEffect(() => {
    const el = document.querySelector("#chat-scroll-anchor")
    el?.scrollIntoView({ behavior: "smooth" })
  }, [allMessages])

  return (
    <>
      {sessionId && allMessages.length === 0 ? (
        <div className="flex flex-col h-full">
          <div className="my-auto">
            <InitialChatView
              setOptimisticMessages={setOptimisticMessages}
              setIsSendingMessage={setIsSendingMessage}
              isSendingMessage={isSendingMessage}
            />
          </div>
        </div>
      ) : isPending ? (
        <ChatLoader />
      ) : (
        <>
          <div className="h-full overflow-y-auto px-4 py-6 bg-white">
            {isSendingMessage && (
              <div className="flex justify-start">
                <div className="max-w-3xl mx-auto space-y-4">
                  <MessageLoader />
                </div>
              </div>
            )}

            <div className="max-w-3xl mx-auto space-y-4">
              {(allMessages ?? []).map((msg: IChatMessageResponseBody) => {
                const isUser = msg.sender === "USER"

                return (
                  <div
                    key={msg.id}
                    className={`w-full  flex ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`flex group flex-col max-w-[75%] ${
                        isUser ? "items-end" : "items-start"
                      }`}
                    >
                      {/* Message Bubble */}

                      <div
                        className={`px-4 py-2 rounded-xl text-sm shadow ${
                          isUser
                            ? "bg-blue-500 text-white rounded-br-none"
                            : "bg-gray-100 text-gray-900 rounded-bl-none"
                        }`}
                      >
                        {msg.message}
                      </div>

                      {/* Icon Row */}
                      <div
                        className={`flex gap-3 mt-2 pl-4 opacity-0 group-hover:opacity-100 transition duration-300 ${
                          isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        {!isUser && (
                          <>
                            <Tooltip
                              title="like"
                              onClick={() =>
                                likeMessage({ id: msg.id, is_liked: true })
                              }
                            >
                              <ThumbsUp className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
                            </Tooltip>
                            <Tooltip title="dislike">
                              <ThumbsDown className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
                            </Tooltip>

                            <Tooltip
                              title="Copy"
                              onClick={() => {
                                navigator.clipboard.writeText(msg.message || "")
                              }}
                            >
                              <Copy className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
                            </Tooltip>
                          </>
                        )}
                        {/* {isUser && (
                          <Tooltip title="Regenerate">
                            <Recycle className="w-4 h-4 cursor-pointer text-gray-400 hover:text-gray-600" />
                          </Tooltip>
                        )} */}
                      </div>
                    </div>
                  </div>
                )
              })}

              <span id="chat-scroll-anchor" />
            </div>
          </div>
        </>
      )}
    </>
  )
}

export default ChatView
