const messages = [
  { id: 1, role: "user", content: "Hello!" },
  { id: 2, role: "bot", content: "Hi there! How can I help you today?" },
  { id: 3, role: "user", content: "Tell me a joke." },
  {
    id: 4,
    role: "bot",
    content:
      "Why don’t skeletons fight each other? They don’t have the guts. Why don’t skeletons fight each other? They don’t have the guts.",
  },
]

const ChatView = () => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 bg-white">
      <div className="max-w-3xl mx-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-xl text-sm shadow ${
                msg.role === "user"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : "bg-gray-100 text-gray-900 rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatView
