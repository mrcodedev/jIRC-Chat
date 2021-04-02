/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  const nickName = props.dataConnection.data.nickName
  const channel = props.dataConnection.data.channelName

  const inputMessage = React.createRef()
  const [isConnected, setIsConnected] = useState(false)
  const [message, setMessage] = useState([])

  const onConnect = (socket) => {
    console.log("Connected :D")
    setIsConnected(true)
    socket.currentTarget.send(
      JSON.stringify({
        type: "connect",
        user: nickName,
        channel,
      })
    )
  }

  const sendMessage = () => {
    const sendMessage = JSON.stringify({
      type: "say",
      sender: nickName,
      text: inputMessage.current.value,
    })
    socket.send(sendMessage)
    setMessage((prev) => [...prev, sendMessage])
  }

  const { socket, disconnect, messages } = UseWebSocket({
    url: "localhost",
    port: 8081,
    onConnect,
  })

  useEffect(() => {
    if (disconnect) {
      props.statusDisconnected(true)
    }
  }, [disconnect, message, props])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    setMessage(inputMessage.current.value)
    sendMessage()
  }

  const handleSubmitClose = () => {
    socket.close()
  }

  return (
    <div className="container__chat">
      <div className="chat__header">
        <h1>#{props.dataConnection.data.channelName}</h1>
        <button onClick={() => handleSubmitClose()}>Server logout</button>
      </div>
      <div className="chat__messages">
        {messages
          .filter((message) => message.type === "say")
          .map((message, index) => (
            <div key={index} className="message">
              {`${message.sender}: ${message.text}`}
            </div>
          ))}
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
