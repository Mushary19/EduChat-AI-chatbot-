import ChatLoader from "../../components/ChatLoader"
import { useAuth } from "../../lib/hooks/useAuth"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import { useLoadChatMessagesBySessionId } from "../../services/chatbot/queries"

interface Props {
  optimisticMessages: IChatMessageResponseBody[]
  sessionId: string
}

const ChatView: React.FC<Props> = (props) => {
  const { optimisticMessages, sessionId } = props
  console.log(sessionId)

  const { user } = useAuth()

  const initialChatBanner = `Hii, ${user?.first_name} ${user?.last_name}!, How can i help you today?.`

  const { data: chatMessages, isPending } = useLoadChatMessagesBySessionId(
    sessionId ?? ""
  )

  const allMessages = [...(chatMessages ?? []), ...optimisticMessages]

  console.log(optimisticMessages)

  return (
    <>
      {sessionId && allMessages.length === 0 ? (
        <div className="flex flex-col justify-center">{initialChatBanner}</div>
      ) : isPending ? (
        <ChatLoader />
      ) : (
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
      )}
    </>
  )
}

export default ChatView
