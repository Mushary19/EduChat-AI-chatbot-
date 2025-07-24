import { motion } from "framer-motion"

const MessageLoader = () => {
  return (
    <div className="flex justify-start px-4 py-2">
      <div className="bg-gray-50 px-4 py-2 rounded-xl rounded-bl-none shadow max-w-[75%]">
        <div className="flex items-center space-x-1">
          <motion.span
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0.2,
              duration: 0.6,
              ease: "easeInOut",
              delay: 0,
            }}
          />
          <motion.span
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0.2,
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.15,
            }}
          />
          <motion.span
            className="w-2 h-2 bg-gray-500 rounded-full"
            animate={{
              y: [0, -4, 0],
            }}
            transition={{
              repeat: Infinity,
              repeatDelay: 0.2,
              duration: 0.6,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default MessageLoader
