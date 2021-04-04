/* eslint-disable no-unused-vars */
import { useState, useRef, useEffect, useCallback } from "react"

const useWebSocket = ({ url, port, onConnect }) => {
  const socket = useRef(null)
  const [disconnect, setDisconnect] = useState(false)
  const [messages, setMessages] = useState([])
  const [connectedUsers, setConnectedUsers] = useState([])

  const onMessage = useCallback(
    (event) => {
      // console.info("Message Received:" + event.data)
      const data = JSON.parse(event.data)
      setMessages((prev) => [...prev, data])
      switch (data.type) {
        case "say":
          break
        case "connect":
          setConnectedUsers((prev) => [...prev, data.user])
          break
        case "disconnect":
          setConnectedUsers(
            connectedUsers.filter((removeUser) => removeUser !== data.user)
          )
          break
        default:
          break
      }
    },
    [connectedUsers]
  )

  useEffect(() => {
    if (!socket.current) {
      console.info("Creating connection to Server...")
      socket.current = new WebSocket(`ws://${url}:${port}`)
      socket.current.onopen = onConnect
      socket.current.onmessage = onMessage
      socket.current.onclose = onClose
      socket.current.onerror = onError
    }

    return () => {
      setDisconnect(false)
    }
  }, [url, port, onConnect, onMessage])

  const onClose = () => {
    console.info("WebSocket is close now ¡O_O!")
    socket.current.close()
    setDisconnect(true)
  }

  const onError = (event) => {
    console.info(`Websocket error :(, reason: ${event})`)
    setDisconnect(true)
  }

  return {
    socket: socket.current,
    messages,
    disconnect,
    connectedUsers,
  }
}

export default useWebSocket
