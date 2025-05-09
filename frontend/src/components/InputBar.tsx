import { Mic, Send } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const InputBar = () => {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const trimmedMessage = message.trim()

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [message])

  return (
    <div className="w-full px-4 py-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-200">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={1}
            placeholder="Type your message..."
            className="flex-1 max-h-[200px] overflow-y-auto resize-none border-none outline-none text-sm"
          />
          <button
            className="text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-all duration-100 border border-gray-300 rounded-full p-2"
            aria-label="Mic"
          >
            <Mic size={20} />
          </button>
          <button
            disabled={trimmedMessage === ""}
            className={`ml-2 text-blue-500 hover:text-blue-600 transition-all duration-100 border border-gray-300 rounded-full p-2 ${
              trimmedMessage === ""
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-gray-200"
            }`}
            aria-label="Send"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputBar
