import { URL, PORT } from "../../config.json"
import React, { useEffect, useState, useRef } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  // props
  const selfNickName = props.loginUserSettingsData.userSettings.nickName
  const channel = props.loginUserSettingsData.userSettings.channelName

  const scrollChatRef = useRef(null)
  const [messageValue, setMessageValue] = useState("")
  const [message, setMessage] = useState([])

  const time = Date.now()
  const now = new Date(time)
  const timeNow = now.toUTCString()

  const onConnect = (socket) => {
    console.log("Connected :D")
    socket.currentTarget.send(
      JSON.stringify({
        type: "connect",
        sender: selfNickName,
        channel,
        time: timeNow,
      })
    )
  }

  const sendMessage = () => {
    const sendMessage = JSON.stringify({
      type: "say",
      sender: selfNickName,
      channel,
      message: messageValue,
      time: timeNow,
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
    return () => {
      setMessageValue("")
    }
  }, [disconnect, message, props])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    setMessage(messageValue)
    sendMessage()
  }

  const handleSubmitClose = () => {
    socket.send(
      JSON.stringify({
        type: "disconnect",
        sender: selfNickName,
        time: timeNow,
      })
    )
    socket.close()
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter" && messageValue) {
      handleSubmitMessage(event)
    }
  }

  const handleChangeInput = (event) => {
    setMessageValue(event.currentTarget.value)
  }

  return (
    <div className="container__chat">
      <div className="chat__header">
        <h1>#{channel}</h1>
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
                  {`${message.sender}: ${message.message}`}
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
            return ""
          })}
      </div>
      <div className="chat__send">
        <input
          type="text"
          id="message-box"
          value={messageValue}
          placeholder="Type your message here..."
          onKeyPress={(event) => handleEnterPress(event)}
          onChange={(event) => handleChangeInput(event)}
        />
        <button
          title="Send Message!"
          onClick={(event) => handleSubmitMessage(event)}
          disabled={!messageValue}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default Chat
