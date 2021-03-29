import { useState, useRef, useEffect } from "react"

const useWebSocket = ({ url, port, onConnect }) => {
  const [connection, setConnection] = useState(false)
  const [messages, setMessages] = useState("")
  const socket = useRef(null)

  useEffect(() => {
    if (!socket.current && !connection) {
      connectServer()
    }

    if (socket.current && connection) {
      socket.current.onopen = onOpen
      socket.current.onclose = onClose
      socket.current.onmessage = onMessage
      socket.current.onerror = onError
    }
  }, [url, port, onConnect])

  const connectServer = () => {
    if (!socket.current && !connection) {
      socket.current = new WebSocket(`ws://${url}:${port}`)
      console.log("Running Server...")
      socket.current.readyState !== 1
        ? setConnection(false)
        : setConnection(true)
      console.log(socket.current)
    } else {
      console.log("Ya hay una conexión")
    }
  }

  function onOpen(event) {
    onConnect(socket.current)
  }
  const onClose = (event) => {
    console.log("WebSocket is close now ¡O_O!")
    setConnection(false)
    socket.current = undefined
  }
  const onMessage = (event) => {
    console.log(`Message Received: ${event}`)
    setMessages((prev) => [...prev, event])
  }
  const onError = (event) => {
    console.log(`Websocket error :(, reason: ${event})`)
  }

  return {
    socket: socket.current,
    messages,
    setMessages,
    connection,
  }
}

export default useWebSocket
