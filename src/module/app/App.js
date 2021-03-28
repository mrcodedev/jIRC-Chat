import "./App.scss"
import React, { useState } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"

const App = () => {
  const [status, setStatus] = useState(false)

  const userInfoConnect = (event) => {
    setStatus(true)
  }

  return (
    <React.Fragment>
      {!status && (
        <LoginChat setDataConnection={(event) => userInfoConnect(event)} />
      )}
      {status && <Chat statusConnection={(event) => setStatus(event)}></Chat>}{" "}
    </React.Fragment>
  )
}

export default App
