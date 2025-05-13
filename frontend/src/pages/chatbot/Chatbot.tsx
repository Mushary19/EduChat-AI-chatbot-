import { useState } from "react"
import { useSearchParams } from "react-router-dom"
import InputBar from "../../components/InputBar"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"
import ChatView from "./ChatView"

const Chatbot = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  const [optimisticMessages, setOptimisticMessages] = useState<
    IChatMessageResponseBody[]
  >([])

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ChatView optimisticMessages={optimisticMessages} />
      </div>
      <InputBar
        sessionId={sessionId ?? ""}
        setOptimisticMessages={setOptimisticMessages}
      />
    </div>
  )
}

export default Chatbot
