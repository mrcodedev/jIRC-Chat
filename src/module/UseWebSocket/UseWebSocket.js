import { useState, useRef, useEffect } from "react"

const useWebSocket = ({ url, port, onConnect }) => {
  const socket = useRef(null)
  const [disconnect, setDisconnect] = useState(false)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    if (!socket.current) {
      console.log("Creating connection to Server...")
      socket.current = new WebSocket(`ws://${url}:${port}`)
      socket.current.onopen = onConnect
      socket.current.onclose = onClose
      socket.current.onmessage = onMessage
      socket.current.onerror = onError
    }

    return () => {
      setDisconnect(false)
    }
  }, [url, port, disconnect, onConnect])

  const onMessage = (event) => {
    // console.log("Message Received:" + event.data)
    const data = JSON.parse(event.data)
    switch (data.type) {
      case "say":
      case "connect":
      case "disconnect":
        setMessages((prev) => [...prev, data])
        break
      default:
        break
    }
  }

  const onClose = () => {
    console.log("WebSocket is close now ¡O_O!")
    socket.current.close()
    setDisconnect(true)
  }

  const onError = (event) => {
    console.log(`Websocket error :(, reason: ${event})`)
    setDisconnect(true)
  }

  return {
    socket: socket.current,
    messages,
    disconnect,
  }
}

export default useWebSocket
