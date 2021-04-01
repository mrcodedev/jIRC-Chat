import { useState, useRef, useEffect } from "react"

const useWebSocket = ({ url, port, onConnect }) => {
  const [connection, setConnection] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const socket = useRef(null)

  useEffect(async () => {
    if (!socket.current && !connection) {
      socket.current = await connectServer()
    }
  }, [url, port, onConnect])

  const connectServer = async () => {
    if (!socket.current && !connection) {
      console.log("Running Server...")
      socket.current = await connect()

      socket.current.onmessage = () => {
        console.log("me he metido")
      }

      socket.current.readyState !== 1
        ? setConnection(false)
        : setConnection(true)

      return socket.current
    }
  }

  const connect = async () => {
    return new Promise((resolve, reject) => {
      socket.current = new WebSocket(`ws://${url}:${port}`)

      socket.current.onopen = onConnect
      socket.current.onclose = onClose
      socket.current.onmessage = onMessage
      socket.current.onerror = onError
    })
  }

  // function onOpen() {
  //   console.log("socket ready state", socket.current.readyState)
  //   socket.current.send(
  //     JSON.stringify({
  //       type: "connect",
  //     })
  //   )
  // }

  const onClose = (event) => {
    console.log("WebSocket is close now ¡O_O!")
    setConnection(false)
    socket.current.close()
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
