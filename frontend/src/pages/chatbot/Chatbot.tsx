import InputBar from "../../components/InputBar"
import ChatView from "./ChatView"

const Chatbot = () => {
  return (
    <div className="flex flex-col h-full">
      <ChatView />
      <InputBar />
    </div>
  )
}

export default Chatbot
