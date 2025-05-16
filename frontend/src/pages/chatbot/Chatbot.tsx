import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import InputBar from "../../components/InputBar"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import ChatView from "./ChatView"
import InitialChatView from "./InitialChatView"

const Chatbot = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [optimisticMessages, setOptimisticMessages] = useState<
    IChatMessageResponseBody[]
  >([])

  useEffect(() => {
    setOptimisticMessages([])
  }, [sessionId])

  return (
    <div className="flex flex-col h-full">
      {!sessionId ? (
        <div className="my-auto">
          <InitialChatView setOptimisticMessages={setOptimisticMessages} />
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-hidden">
            <ChatView
              optimisticMessages={optimisticMessages}
              sessionId={sessionId ?? ""}
              setOptimisticMessages={setOptimisticMessages}
            />
          </div>
          <InputBar
            sessionId={sessionId ?? ""}
            setOptimisticMessages={setOptimisticMessages}
          />
        </>
      )}
    </div>
  )
}

export default Chatbot
