import { useState, useRef, useEffect } from "react"

const useWebSocket = ({ url, port, onConnect }) => {
  const [disconnect, setDisconnect] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const socket = useRef(null)

  useEffect(() => {
    if (!socket.current) {
      connectServer()
    }

    return () => {
      setDisconnect(false)
    }
  }, [url, port])

  const connectServer = () => {
    console.log("Creating connection to Server...")
    socket.current = new WebSocket(`ws://${url}:${port}`)
    socket.current.onopen = onConnect
    socket.current.onclose = onClose
    socket.current.onmessage = onMessage
    socket.current.onerror = onError
  }

  const onClose = () => {
    console.log("WebSocket is close now ¡O_O!")
    socket.current.close()
    setDisconnect(true)
  }

  const onMessage = (event) => {
    console.log(`Message Received: ${event}`)
    setMessages((prev) => [...prev, event])
  }

  const onError = (event) => {
    console.log(`Websocket error :(, reason: ${event})`)
    setDisconnect(true)
  }

  const readyState = () => {
    return socket.current.readyState
  }

  return {
    socket: socket.current,
    messages,
    setMessages,
    readyState: readyState,
    disconnect,
  }
}

export default useWebSocket
