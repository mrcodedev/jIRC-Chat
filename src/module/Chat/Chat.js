import React from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  const inputMessage = React.createRef()

  const { socket } = UseWebSocket({
    url: "localhost",
    port: 8081,
    onConnect: (socketConnect) => {
      console.log("socket ready state", socketConnect.currentTarget.readyState)
      socketConnect.currentTarget.send(
        JSON.stringify({
          type: "connect",
          user: props.dataConnection.data.nickName,
          channel: props.dataConnection.data.channelName,
        })
      )
    },
  })

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    showMessage(inputMessage.current.value)
  }

  const handleSubmitClose = () => {
    socket.close()
    props.statusConnection({ connection: false })
  }

  const messages = document.querySelector("#messages")
  const messageBox = document.querySelector("#message-box")

  const showMessage = (message) => {
    messages.textContent += `${props.dataConnection.data.nickName}: ${message}\n`
    messages.scrollTop = messages.scrollHeight
    messageBox.value = ""
    socket.send(message)
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
          ref={inputMessage}
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
