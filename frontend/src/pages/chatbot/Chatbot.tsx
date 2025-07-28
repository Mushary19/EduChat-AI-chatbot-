import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import InputBar from "../../components/InputBar"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import { useLoadChatMessagesBySessionId } from "../../services/chatbot/queries"
import ChatView from "./ChatView"
import InitialChatView from "./InitialChatView"

const Chatbot = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")
  const { data: chatMessages } = useLoadChatMessagesBySessionId(sessionId ?? "")
  const [optimisticMessages, setOptimisticMessages] = useState<
    IChatMessageResponseBody[]
  >([])
  const [isSendingMessage, setIsSendingMessage] = useState(false)

  useEffect(() => {
    if (sessionId && chatMessages && chatMessages.length > 0) {
      setOptimisticMessages([])
    }
  }, [sessionId, chatMessages])

  const hasMessages =
    (chatMessages && chatMessages.length > 0) || optimisticMessages.length > 0

  return (
    <div className="flex flex-col h-full">
      {!sessionId ? (
        <div className="my-auto">
          <InitialChatView
            setOptimisticMessages={setOptimisticMessages}
            setIsSendingMessage={setIsSendingMessage}
            isSendingMessage={isSendingMessage}
          />
        </div>
      ) : sessionId && !hasMessages ? (
        <>
          <ChatView
            optimisticMessages={optimisticMessages}
            sessionId={sessionId}
            setOptimisticMessages={setOptimisticMessages}
            isSendingMessage={isSendingMessage}
            setIsSendingMessage={setIsSendingMessage}
          />
        </>
      ) : (
        <>
          <div className="flex-1 overflow-hidden">
            <ChatView
              optimisticMessages={optimisticMessages}
              sessionId={sessionId}
              setOptimisticMessages={setOptimisticMessages}
              isSendingMessage={isSendingMessage}
              setIsSendingMessage={setIsSendingMessage}
            />
          </div>
          <InputBar
            sessionId={sessionId}
            setOptimisticMessages={setOptimisticMessages}
            setIsSendingMessage={setIsSendingMessage}
            isSendingMessage={isSendingMessage}
          />
        </>
      )}
    </div>
  )
}

export default Chatbot
