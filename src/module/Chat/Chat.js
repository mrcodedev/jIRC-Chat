/* eslint-disable no-unused-vars */
import { URL, PORT } from "../../config.json"
import React, { useEffect, useRef, useState } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  // props
  const selfNickName = props.loginUserSettingsData.userSettings.nickName
  const channel = props.loginUserSettingsData.userSettings.channelName

  const buttonSendRef = useRef(null)
  const inputMessageRef = useRef("")
  const scrollChatRef = useRef(null)
  const [doChatScroll, setDoChatScroll] = useState(true)

  const time = Date.now()
  const now = new Date(time)
  const timeNow = now.toUTCString()

  const onConnect = (socket) => {
    console.info("Connected :D")
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
      message: inputMessageRef.current.value,
      time: timeNow,
    })
    socket.send(sendMessage)
    inputMessageRef.current.value = ""
  }

  const { socket, messages, disconnect } = UseWebSocket({
    url: URL,
    port: PORT,
    onConnect,
  })

  useEffect(() => {
    if (disconnect) {
      props.statusDisconnected(true)
    }

    inputMessageRef.current.value = ""
    buttonSendRef.current.disabled = true
  }, [disconnect, props, scrollChatRef])

  const handleSubmitMessage = () => {
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
    if (event.key === "Enter" && inputMessageRef.current.value.length > 0) {
      handleSubmitMessage(event)
    }
  }

  const handleChangeInput = () => {
    if (inputMessageRef.current.value.length === 0) {
      buttonSendRef.current.disabled = true
      return true
    }
    if (
      inputMessageRef.current.value.length > 0 &&
      buttonSendRef.current.disabled
    ) {
      buttonSendRef.current.disabled = false
      return false
    }
  }

  const doScrollMessages = () => {
    if (doChatScroll) {
      scrollChatRef.current?.lastElementChild?.scrollIntoView()
    }
  }

  const handleCheckScrollBottom = (event) => {
    event.preventDefault()
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight
    if (bottom && !doChatScroll) {
      setDoChatScroll(true)
    }

    if (!bottom && doChatScroll) {
      setDoChatScroll(false)
    }
  }

  return (
    <div className="container__chat">
      {console.log("RENDER")}
      <div className="chat__header">
        <h1>#{channel}</h1>
        <button onClick={() => handleSubmitClose()}>Server logout</button>
      </div>
      <div
        className="chat__messages"
        ref={scrollChatRef}
        onScroll={handleCheckScrollBottom}
      >
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
                  {`${index}:${message.sender} has connected...`}
                </div>
              )
            }

            if (message.type === "say") {
              return (
                <div key={index} className="message">
                  {`${index}:${message.sender}: ${message.message}`}
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
        {doScrollMessages()}
      </div>
      <div className="chat__send">
        <input
          type="text"
          id="message-box"
          ref={inputMessageRef}
          placeholder="Type your message here..."
          onKeyPress={(event) => handleEnterPress(event)}
          onChange={handleChangeInput}
        />
        <button
          ref={buttonSendRef}
          title="Send Message!"
          onClick={handleSubmitMessage}
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default Chat
