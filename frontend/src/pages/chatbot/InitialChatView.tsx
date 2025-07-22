import { motion } from "framer-motion"
import { Sparkles } from "lucide-react" // optional icon
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
    <div className="flex flex-col items-center justify-center h-full text-center lg:px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-4"
      >
        <div className="flex items-center justify-center gap-3">
          <Sparkles className="w-8 h-8 text-indigo-500 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 tracking-tight">
            Welcome to <span className="text-indigo-600">EduChat</span>!
          </h2>
        </div>

        <p className="text-gray-600  md:text-lg max-w-xl mx-auto leading-relaxed px-3 md:p-0">
          Start a new session or pick one from the sidebar. I can help you with
          science questions, homework, and study guidance.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 w-full max-w-2xl"
      >
        <InputBar
          setOptimisticMessages={setOptimisticMessages}
          setIsSendingMessage={setIsSendingMessage}
          isSendingMessage={isSendingMessage}
        />
      </motion.div>
    </div>
  )
}

export default InitialChatView
