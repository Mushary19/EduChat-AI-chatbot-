import { useSearchParams } from "react-router-dom"
import ChatLoader from "../../components/ChatLoader"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import { useLoadChatMessagesBySessionId } from "../../services/chatbot/queries"

interface Props {
  optimisticMessages: IChatMessageResponseBody[]
}

const ChatView: React.FC<Props> = (props) => {
  const { optimisticMessages } = props
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const { data: chatMessages, isPending } = useLoadChatMessagesBySessionId(
    sessionId ?? ""
  )

  const allMessages = [...(chatMessages ?? []), ...optimisticMessages]

  return (
    <>
      {isPending && <ChatLoader />}
      <div className="h-full overflow-y-auto px-4 py-6 bg-white">
        <div className="max-w-3xl mx-auto space-y-4">
          {(allMessages ?? []).map((msg: IChatMessageResponseBody) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "USER" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow ${
                  msg.sender === "USER"
                    ? "bg-blue-500 text-white rounded-br-none"
                    : "bg-gray-100 text-gray-900 rounded-bl-none"
                }`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ChatView
