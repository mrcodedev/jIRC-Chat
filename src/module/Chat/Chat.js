import { URL, PORT } from "../../config.json"
import React, { useEffect, useState, useRef } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  // props
  const selfNickName = props.dataConnection.data.nickName
  const channel = props.dataConnection.data.channelName

  //
  const scrollChatRef = useRef(null)
  const [inputValue, setInputValue] = useState("")
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
      text: inputValue,
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
      setInputValue("")
    }
  }, [disconnect, message, props])

  const handleSubmitMessage = (event) => {
    event.preventDefault()
    setMessage(inputValue)
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
    if (event.key === "Enter" && inputValue) {
      handleSubmitMessage(event)
    }
  }

  const handleChangeInput = (event) => {
    setInputValue(event.currentTarget.value)
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
            return ""
          })}
      </div>
      <div className="chat__send">
        <input
          type="text"
          id="message-box"
          placeholder="Type your message here..."
          value={inputValue}
          onKeyPress={(event) => handleEnterPress(event)}
          onChange={(event) => handleChangeInput(event)}
        />
        <button
          title="Send Message!"
          onClick={(event) => handleSubmitMessage(event)}
          disabled={!inputValue}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default Chat
