import { Info, Mic, Send } from "lucide-react"
import {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition"
import { useAuth } from "../lib/hooks/useAuth"
import type { IChatMessageResponseBody } from "../lib/types/chatbot/chatMessage"
import {
  useCreateChatSession,
  useSendChatMessage,
} from "../services/chatbot/mutations"
import MicrophoneModal from "./MicrophoneModal"

interface Props {
  sessionId?: string
  setOptimisticMessages: Dispatch<SetStateAction<IChatMessageResponseBody[]>>
  setIsSendingMessage: Dispatch<SetStateAction<boolean>>
  isSendingMessage: boolean
}

const InputBar: React.FC<Props> = (props) => {
  const {
    sessionId,
    setOptimisticMessages,
    setIsSendingMessage,
    isSendingMessage,
  } = props
  const navigate = useNavigate()

  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const [openMicroPhone, setOpenMicroPhone] = useState(false)
  const [isClosedMicroPhone, setIsClosedMicroPhone] = useState(false)

  const toggleOpenMicroPhone = () => setOpenMicroPhone((prev) => !prev)

  const trimmedMessage = message.trim()

  const { user } = useAuth()

  const handleSessionClick = (sessionId: string) => {
    navigate(`/?session_id=${sessionId}`)
  }

  console.log(isClosedMicroPhone)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition()

  console.log(transcript)
  console.log(listening)

  const { mutate: sendChatMessage } = useSendChatMessage()

  const { mutateAsync: createSession } = useCreateChatSession()

  const handleSendChatMessage = async (message: string) => {
    setIsSendingMessage(true)
    const send = (sessionId: string) => {
      const newMsg = {
        id: Date.now(),
        message: message,
        sender: "USER" as "USER",
        created_at: new Date().toISOString(),
      }

      setOptimisticMessages((prev) => [...prev, newMsg])

      sendChatMessage(
        { sessionId, prompt: message, userId: user?.id ?? 0 },
        {
          onSettled: () => {
            setOptimisticMessages([])
            setMessage("")
            setIsSendingMessage(false)
          },
        }
      )
    }

    if (!sessionId) {
      try {
        const response = await createSession({ user: user?.id ?? 0 })
        const newSessionId = response.session_id
        // setSessionId(newSessionId)
        handleSessionClick(newSessionId)
        send(newSessionId)
      } catch (error: any) {
        console.log(error)
      }
    } else {
      send(sessionId)
    }
  }

  const handleKeyEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()

      const message = e.currentTarget.value.trim()
      if (message) {
        handleSendChatMessage(message)
        setMessage("")
        e.currentTarget.value = ""
      }
    }
  }

  const handleCheckMicroPhoneEligibility = () => {
    if (!isMicrophoneAvailable) {
      toast.custom(
        <div className="flex gap-2 items-center p-4 bg-white rounded shadow">
          <Info color="gray" size={35} />
          <span className="text-gray-800">
            It seems your microphone is disabled. Please turn it on to use voice
            recognition.
          </span>
        </div>
      )
      return false
    }

    if (!browserSupportsSpeechRecognition) {
      toast.custom(
        <div className="flex gap-2 items-center p-4 bg-white rounded shadow">
          <Info color="gray" size={23} />
          <span className="text-gray-800">
            Your browser doesn't support voice recognition. Please switch to a
            modern browser.
          </span>
        </div>
      )
      return false
    }

    return true
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = textareaRef.current.scrollHeight + "px"
    }
  }, [message])

  useEffect(() => {
    if (!listening && transcript) {
      setMessage(transcript)
      resetTranscript()
    }
  }, [listening])

  return (
    <>
      <div className="w-full px-4 pb-2 lg:pb-6 pt-0bg-white bg-white z-10">
        <div className="max-w-3xl mx-auto">
          <div
            className="flex items-center border border-gray-300 rounded-lg px-3 py-4 md:py-3 focus-within:ring-2 focus-within:ring-blue-200"
            onClick={() => textareaRef.current?.focus()}
          >
            <textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={1}
              placeholder="Type your message..."
              className="flex-1 max-h-[200px] overflow-y-auto resize-none border-none outline-none text-sm text-gray-600"
              onKeyDown={(e) => {
                handleKeyEnter(e)
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
              className="text-blue-500 hover:text-blue-600 hover:bg-gray-200 transition-all duration-100 border border-gray-300 rounded-full p-1 md:p-2"
              aria-label="Mic"
              disabled={isSendingMessage}
              onClick={() => {
                const eligible = handleCheckMicroPhoneEligibility()
                if (!eligible) return

                setOpenMicroPhone(true)
                SpeechRecognition.startListening({
                  continuous: true,
                  language: "en-US",
                })
                console.log("started")
              }}
            >
              <Mic size={20} />
            </button>
            <button
              disabled={trimmedMessage === "" || isSendingMessage}
              className={`ml-2 text-blue-500 hover:text-blue-600 transition-all duration-100 border border-gray-300 rounded-full p-1 md:p-2 ${
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
        <MicrophoneModal
          open={openMicroPhone}
          onClose={toggleOpenMicroPhone}
          setIsClosedMicroPhone={setIsClosedMicroPhone}
        />
      )}
    </>
  )
}

export default InputBar
