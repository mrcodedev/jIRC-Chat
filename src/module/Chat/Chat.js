import { URL, PORT } from "../../config.json"
import React, { useEffect, useState } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  const nickName = props.dataConnection.data.nickName
  const channel = props.dataConnection.data.channelName
  const timeElapsed = Date.now()
  const now = new Date(timeElapsed)

  const inputMessage = React.createRef()
  const [, setIsConnected] = useState(false)
  const [message, setMessage] = useState([])

  const onConnect = (socket) => {
    console.log("Connected :D")
    setIsConnected(true)
    socket.currentTarget.send(
      JSON.stringify({
        type: "connect",
        sender: nickName,
        channel,
        time: now.toUTCString(),
      })
    )
  }

  const sendMessage = () => {
    const sendMessage = JSON.stringify({
      type: "say",
      sender: nickName,
      channel,
      text: inputMessage.current.value,
      time: now.toUTCString(),
    })
    socket.send(sendMessage)
    setMessage((prev) => [...prev, sendMessage])
  }

  const { socket, disconnect, messages } = UseWebSocket({
    url: URL,
    port: PORT,
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
    socket.send(
      JSON.stringify({
        type: "disconnect",
        user: nickName,
      })
    )
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
          .filter(
            (message) =>
              message.type === "say" ||
              message.type === "connect" ||
              message.type === "disconnect"
          )
          .map((message, index) => {
            console.log(message.type)
            if (message.type === "connect") {
              return (
                <div key={index} className="message">
                  {`${message.user} has connected...`}
                </div>
              )
            }

            if (message.type === "say") {
              return (
                <div key={index} className="message">
                  {`${message.sender}: ${message.text}`}
                </div>
              )
            }

            if (message.type === "disconnect") {
              return (
                <div key={index} className="message">
                  {`${message.user} it has disconnected...`}
                </div>
              )
            }

            return false
          })}
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
