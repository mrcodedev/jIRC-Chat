import "./App.scss"
import React, { useEffect } from "react"
import FormChat from "../FormChat/FormChat"

function App(props) {
  let connection

  useEffect(() => {})

  const initConnection = async () => {
    if (!connection) {
      return await doConnection()
    }
  }

  const doConnection = () => {
    return new Promise((resolve, reject) => {
      connection = new WebSocket("ws://localhost:8081")

      connection.onopen = () => {
        console.log("WebSocket is open now!")
        console.log("Connected into Chat Server")
        resolve()
      }

      connection.onclose = () => {
        console.log("WebSocket is close now ¡O_O!")
        resolve()
      }

      connection.onerror = (event) => {
        console.log(`Websocket error :(, reason: ${event})`)
        reject(event)
      }

      connection.onmessage = ({ data }) => {
        console.log(data)
      }
    })
  }
  const sendMessage = () => {
    if (!connection) {
      return
    }
    connection.send("Testing send text...")
  }

  return (
    <React.Fragment>
      <FormChat setDataConnection={initConnection}></FormChat>
      <button onClick={() => sendMessage()}>Testing button</button>
    </React.Fragment>
  )
}

export default App
