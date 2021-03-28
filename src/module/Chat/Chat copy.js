import React, { useState } from "react"

function Chat(props) {
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    props.messageToChat(message)
    showMessage(message)
  }

  const messages = document.querySelector("#messages")
  const messageBox = document.querySelector("#messageBox")

  const showMessage = (message) => {
    messages.textContent += `\n\n${message}`
    messages.scrollTop = messages.scrollHeight
    messageBox.value = ""
  }

  return (
    <React.Fragment>
      <h1>Real Time Messaging</h1>
      <pre id="messages" style={{ height: "400px", overflow: "scroll" }}></pre>
      <input
        type="text"
        id="messageBox"
        placeholder="Type your message here"
        onChange={(e) => setMessage(e.target.value)}
        style={{
          display: "block",
          width: "100%",
          marginBottom: "10px",
          padding: "10px",
        }}
      />
      <button
        title="Send Message!"
        style={{ width: "100%", height: "30px" }}
        onClick={(event) => handleSubmit(event)}
      >
        Send Message
      </button>
    </React.Fragment>
  )
}

export default Chat
