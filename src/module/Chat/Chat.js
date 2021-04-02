/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  const [isConnected, setIsConnected] = useState(false)
  const { socket, disconnect } = UseWebSocket({
    url: "localhost",
    port: 8081,
    onConnect: (socketConnect) => {
      setIsConnected(true)
      socketConnect.currentTarget.send(
        JSON.stringify({
          type: "connect",
          user: props.dataConnection.data.nickName,
          channel: props.dataConnection.data.channelName,
        })
      )
    },
  })

  const inputMessage = React.createRef()

  useEffect(() => {
    if (disconnect) {
      props.statusDisconnected(true)
    }
  }, [disconnect])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    showMessage(inputMessage.current.value)
  }

  const handleSubmitClose = () => {
    socket.close()
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
