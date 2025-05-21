import type { Dispatch, SetStateAction } from "react"
import InputBar from "../../components/InputBar"
import type { IChatMessageResponseBody } from "../../lib/types/chatbot/chatMessage"

interface Props {
  setOptimisticMessages: Dispatch<SetStateAction<IChatMessageResponseBody[]>>
  setIsSendingMessage: Dispatch<SetStateAction<boolean>>
  isSendingMessage: boolean
}

const InitialChatView: React.FC<Props> = ({
  setOptimisticMessages,
  setIsSendingMessage,
  isSendingMessage,
}) => {
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
      <div className="mt-3">
        <InputBar
          setOptimisticMessages={setOptimisticMessages}
          setIsSendingMessage={setIsSendingMessage}
          isSendingMessage={isSendingMessage}
        />
      </div>
    </div>
  )
}

export default InitialChatView
