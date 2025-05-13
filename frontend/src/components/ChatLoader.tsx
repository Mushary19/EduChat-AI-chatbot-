import { motion } from "framer-motion"
import { BotIcon } from "lucide-react"

const ChatLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-white">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-blue-100 p-4 rounded-full shadow-lg"
      >
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <BotIcon className="w-10 h-10 text-blue-600" />
        </motion.div>
      </motion.div>

      <div className="mt-6 text-gray-600 text-sm">Waking up your chat...</div>

      <div className="flex space-x-1 mt-2">
        <motion.span
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0,
          }}
        />
        <motion.span
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
        />
        <motion.span
          className="w-2 h-2 bg-gray-400 rounded-full"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.4,
          }}
        />
      </div>
    </div>
  )
}

export default ChatLoader
