import React, { useState, useEffect } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"
import Spinner from "../../components/Spinner/Spinner"

import "./App.scss"

const App = () => {
  const [status, setStatus] = useState(false)
  const [spinner, setSpinner] = useState(false)

  const userInfoConnect = (event) => {
    setSpinner(true)
    // TODO: Leave when end all
    setTimeout(() => {
      setStatus(true)
    }, 1000)
  }

  useEffect(() => {
    if (status) {
      setSpinner(false)
    }
  }, [status])

  return (
    <div className="container__app">
      {!status && (
        <div className="app__login-chat">
          <LoginChat setDataConnection={(event) => userInfoConnect(event)} />
        </div>
      )}
      {status && <Chat statusConnection={(event) => setStatus(event)}></Chat>}{" "}
      {spinner && <Spinner />}
    </div>
  )
}

export default App
