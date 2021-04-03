import { URL, PORT } from "../../config.json"
import React, { useEffect, useState, useRef } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  const inputMessageRef = React.createRef()
  const scrollChatRef = useRef(null)
  const [, setIsConnected] = useState(false)
  const [countInputMessage, setCountInputMessage] = useState("")
  const [message, setMessage] = useState([])

  const selfNickName = props.dataConnection.data.nickName
  const channel = props.dataConnection.data.channelName
  const timeElapsed = Date.now()
  const now = new Date(timeElapsed)

  const onConnect = (socket) => {
    console.log("Connected :D")
    setIsConnected(true)
    socket.currentTarget.send(
      JSON.stringify({
        type: "connect",
        sender: selfNickName,
        channel,
        time: now.toUTCString(),
      })
    )
  }

  const sendMessage = () => {
    const sendMessage = JSON.stringify({
      type: "say",
      sender: selfNickName,
      channel,
      text: inputMessageRef.current.value,
      time: now.toUTCString(),
    })
    socket.send(sendMessage)
    setMessage((prev) => [...prev, sendMessage])
    inputMessageRef.current.value = ""
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
    setMessage(inputMessageRef.current.value)
    setCountInputMessage("")
    sendMessage()
  }

  const handleSubmitClose = () => {
    socket.send(
      JSON.stringify({
        type: "disconnect",
        sender: selfNickName,
        time: now.toUTCString(),
      })
    )
    socket.close()
  }

  const handleChangeInput = (event) => {
    event.preventDefault()
    setCountInputMessage(event.target.value)
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && countInputMessage) {
      handleSubmitMessage(event)
    }
  }

  const handlePruebas = () => {
    scrollChatRef.current.scrollIntoView({
      block: "nearest",
      inline: "center",
      behavior: "smooth",
      alignToTop: false,
    })
  }

  return (
    <div className="container__chat">
      <div className="chat__header">
        <h1>#{props.dataConnection.data.channelName}</h1>
        <button onClick={() => handleSubmitClose()}>Server logout</button>
      </div>
      <div className="chat__messages" ref={scrollChatRef}>
        {messages
          .filter(
            (message) =>
              message.type === "say" ||
              message.type === "connect" ||
              message.type === "disconnect"
          )
          .map((message, index) => {
            if (message.type === "connect") {
              return (
                <div key={index} className="message">
                  {`${message.sender} has connected...`}
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
                  {`${message.sender} it has disconnected...`}
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
          onChange={handleChangeInput}
          onKeyPress={(event) => handleEnterPress(event)}
          ref={inputMessageRef}
        />
        <button
          title="Send Message!"
          onClick={(event) => handleSubmitMessage(event)}
          disabled={!countInputMessage}
        >
          Send Message
        </button>
        <button onClick={() => handlePruebas()}></button>
      </div>
    </div>
  )
}

export default Chat
