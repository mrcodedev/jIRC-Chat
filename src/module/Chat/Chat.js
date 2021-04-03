import { URL, PORT } from "../../config.json"
import React, { useEffect, useState, useRef } from "react"
import UseWebSocket from "../UseWebSocket/UseWebSocket"

import "./Chat.scss"

function Chat(props) {
  // props
  const selfNickName = props.loginUserSettingsData.userSettings.nickName
  const channel = props.loginUserSettingsData.userSettings.channelName

  const scrollChatRef = useRef(null)
  const inputMessageRef = useRef("")
  const buttonSendRef = useRef(null)
  const [message, setMessage] = useState([])

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
    console.log("SEND MESSAGE")
    const sendMessage = JSON.stringify({
      type: "say",
      sender: selfNickName,
      channel,
      message: inputMessageRef.current.value,
      time: timeNow,
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

    console.log("RENDER :D")

    inputMessageRef.current.value = ""
    buttonSendRef.current.disabled = true
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disconnect, message])

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

  const checkMessageAutoScroll = () => {
    console.log("holiiii")
    // const chatElement = scrollChatRef.current
    // const scrollToMessage =
    //   chatElement?.scrollHeight - chatElement?.scrollTop ===
    //   chatElement?.clientHeight

    // console.log(scrollToMessage ? "Estoy arriba" : "Estoy abajo")

    // if (scrollToMessage) {
    //   console.log("NOOOOOO")
    //   return false
    // }

    // if (!scrollToMessage) {
    //   console.log("HASTA ABAJO")
    //   scrollChatRef.current?.lastElementChild?.scrollIntoView()
    //   return true
    // }
    // !scrollToMessage ? console.log("hazlo") : console.log("no hagas nada")
    // const xH = chatElement?.scrollHeight
    // console.log(window)
    // chatElement?.scrollTo(0, xH)
    // scrollChatRef.current?.lastElementChild?.scrollIntoView({
    //   behavior: "smooth",
    // })
  }

  return (
    <div className="container__chat">
      {checkMessageAutoScroll()}

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
