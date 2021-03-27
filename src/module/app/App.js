import "./App.scss"
import React from "react"
import FormChat from "../FormChat/FormChat"

function App(props) {
  const a = "hola"
  const connectServer = (dataConnection) => {
    const connection = new WebSocket("ws://localhost:8080")

    connection.onopen = (event) => {
      console.log("WebSocket is open now!")
    }

    connection.onclose = (event) => {
      console.log("WebSocket is close now ¡O_O!")
    }

    connection.onerror = (event) => {
      console.log(`Websocket error :(, reason: ${event})`)
    }
  }

  return (
    <React.Fragment>
      <FormChat setDataConnection={connectServer}></FormChat>
    </React.Fragment>
  )
}

export default App
