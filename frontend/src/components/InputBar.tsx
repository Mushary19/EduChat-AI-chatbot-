import { Mic, Send } from "lucide-react"
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import { useSpeechRecognition } from "react-speech-recognition"
import type { IChatMessageResponseBody } from "../lib/types/chatbot/chatMessage"
import { useSendChatMessage } from "../services/chatbot/mutations"
import MicrophoneModal from "./MicrophoneModal"

interface Props {
  sessionId: string
  setOptimisticMessages: Dispatch<SetStateAction<IChatMessageResponseBody[]>>
}

const InputBar: React.FC<Props> = (props) => {
  const { sessionId, setOptimisticMessages } = props

  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [openMicroPhone, setOpenMicroPhone] = useState(false)

  const toggleOpenMicroPhone = () => setOpenMicroPhone((prev) => !prev)

  const trimmedMessage = message.trim()

  const { mutate: sendChatMessage, isPending: isSendingMessage } =
    useSendChatMessage(sessionId ?? "")

  const handleSendChatMessage = (message: string) => {
    const newMsg = {
      id: Date.now(),
      message: message,
      sender: "USER" as "USER",
      created_at: new Date().toISOString(),
    }

    setOptimisticMessages((prev) => [...prev, newMsg])

    sendChatMessage(
      { prompt: message },
      {
        onSettled: () => {
          setOptimisticMessages([])
          setMessage("")
        },
      }
    )
  }

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  if (!isMicrophoneAvailable) {
    return <span>Please enable your microphone to use speech service.</span>
  }

  if (!browserSupportsSpeechRecognition) {
    return <span>Your browser does not support speech recognition.</span>
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [message])

  return (
    <>
      <div className="w-full px-4 pb-6 pt-4 bg-white z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-center border border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-200"
            onClick={() => textareaRef.current?.focus()}
          >
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
              placeholder="Type your message..."
              className="flex-1 max-h-[200px] overflow-y-auto resize-none border-none outline-none text-sm text-gray-800"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const message = e.currentTarget.value.trim()

                  if (message) {
                    handleSendChatMessage(message)
                    setMessage("")
                    e.currentTarget.value = ""
                  }
                  return
                }
              }}
            />
            {/* {listening ? (
            <button
              className="text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-all duration-100 border border-gray-300 rounded-full p-2"
              aria-label="Mic"
              onClick={SpeechRecognition.startListening}
            >
              <Mic size={20} />
            </button>
          ) : (
            <button
              className="text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-all duration-100 border border-gray-300 rounded-full p-2"
              aria-label="Mic"
              onClick={SpeechRecognition.stopListening}
            >
              <Pause size={20} />
            </button>
          )} */}
            <button
              className="text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-all duration-100 border border-gray-300 rounded-full p-2"
              aria-label="Mic"
              onClick={() => {
                setOpenMicroPhone(true)
                // SpeechRecognition.startListening({
                //   continuous: true,
                //   lang: "en-US",
                // })
              }}
            >
              <Mic size={20} />
            </button>
            <button
              disabled={trimmedMessage === "" || isSendingMessage}
              className={`ml-2 text-blue-500 hover:text-blue-600 transition-all duration-100 border border-gray-300 rounded-full p-2 ${
                trimmedMessage === ""
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-200"
              }`}
              aria-label="Send"
              onClick={() => {
                handleSendChatMessage(message)
                setMessage("")
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {openMicroPhone && (
        <MicrophoneModal open={openMicroPhone} onClose={toggleOpenMicroPhone} />
      )}
    </>
  )
}

export default InputBar
