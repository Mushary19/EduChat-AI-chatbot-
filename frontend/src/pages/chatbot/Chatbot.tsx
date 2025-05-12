import { useSearchParams } from "react-router-dom"
import InputBar from "../../components/InputBar"
import ChatView from "./ChatView"

const Chatbot = () => {
  const [searchParams] = useSearchParams()
  const sessionId = searchParams.get("session_id")

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-hidden">
        <ChatView />
      </div>
      <InputBar sessionId={sessionId ?? ""} />
    </div>
  )
}

export default Chatbot
