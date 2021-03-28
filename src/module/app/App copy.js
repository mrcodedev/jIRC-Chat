import "./App.scss"
import React, { useEffect, useRef, useState } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"

const App = () => {
  const [connection, setConnection] = useState(false)
  const [message, setMessage] = useState("")
  const socket = useRef(null)

  useEffect(() => {
    if (socket.current && connection) {
      socket.current.onopen = onOpen
      socket.current.onclose = onClose
      socket.current.onmessage = onMessage
      socket.current.onerror = onError
    }
  }, [connection, message])

  const connectServer = () => {
    if (!socket.current && !connection) {
      socket.current = new WebSocket("ws://localhost:8081")
      setConnection(true)
    } else {
      console.log("Ya hay una conexión")
    }
  }

  function onOpen(event) {
    console.log("Connection :D")
  }
  const onClose = (event) => {
    console.log("WebSocket is close now ¡O_O!")
    setConnection(false)
  }
  const onMessage = (event) => {
    console.log("holi")
  }
  const onError = (event) => {
    console.log(`Websocket error :(, reason: ${event})`)
  }

  const messageToChat = (event) => {
    socket.current.send(event)
    setMessage(event)
  }

  return (
    <React.Fragment>
      {!connection && <LoginChat setDataConnection={() => connectServer()} />}
      {connection && (
        <Chat messageToChat={(event) => messageToChat(event)}></Chat>
      )}
    </React.Fragment>
  )
}

export default App
