import React, { useState } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  console.log(props)
  const [message, setMessage] = useState("")

  const { socket } = UseWebSocket({
    url: "localhost",
    port: 8081,
    onConnect: () => {
      console.log("socket ready state", socket.readyState)
      socket.send("test message")
    },
  })

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    showMessage(message)
  }

  const handleSubmitClose = () => {
    props.statusConnection({ connection: false })
  }

  const messages = document.querySelector("#messages")
  const messageBox = document.querySelector("#message-box")

  const showMessage = (message) => {
    messages.textContent += `${props.dataConnection.data.nickName}: ${message}\n`
    messages.scrollTop = messages.scrollHeight
    messageBox.value = ""
  }

  return (
    <div className="container__chat">
      <div className="chat__header">
        <h1>#{props.dataConnection.data.channelName}</h1>
        <button onClick={() => handleSubmitClose()}>Server logout</button>
      </div>
      <div className="chat__messages">
        <pre id="messages"></pre>
      </div>
      <div className="chat__send">
        <input
          type="text"
          id="message-box"
          placeholder="Type your message here..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          title="Send Message!"
          onClick={(event) => handleSubmitMessage(event)}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default Chat
