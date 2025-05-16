import type { Dispatch, SetStateAction } from "react"
import InputBar from "../../components/InputBar"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"

interface Props {
  setOptimisticMessages: Dispatch<SetStateAction<IChatMessageResponseBody[]>>
}

const InitialChatView: React.FC<Props> = ({ setOptimisticMessages }) => {
  return (
    <div className="flex-1 flex-col items-center justify-center bg-white text-center px-4">
      <div>
        <h2 className="text-4xl font-semibold text-gray-700">
          Welcome to EduChat!
        </h2>
        <p className="text-gray-500 text-lg mt-2">
          Please select a session from the sidebar to view or continue the
          conversation.
        </p>
      </div>
      <div>
        <InputBar setOptimisticMessages={setOptimisticMessages} />
      </div>
    </div>
  )
}

export default InitialChatView
