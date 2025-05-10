import { useState } from "react"

const Demo = () => {
  const [text, setText] = useState("")

  const handleChangeText = () => {
    const randomTxt = ["HI", "Hello", "How are you", "I'm doing great"]
    const randomIndex = Math.floor(Math.random() * randomTxt.length)
    setText(randomTxt[randomIndex])
  }

  return (
    <div className="flex flex-col gap-4">
      <h3 id="demo">{text}</h3>

      <button
        className="p-4 bg-amber-200 cursor-pointer"
        onClick={handleChangeText}
      >
        change text
      </button>
    </div>
  )
}

export default Demo
