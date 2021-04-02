import React, { useState } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"
import Spinner from "../../components/Spinner/Spinner"

import "./App.scss"

const App = () => {
  const [status, setStatus] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [dataConnection, setDataConnection] = useState({})

  const userInfoConnect = (data) => {
    setSpinner(true)
    setDataConnection(data)
    // TODO: Leave when end all
    setTimeout(() => {
      setStatus(true)
      setSpinner(false)
    }, 1000)
  }

  const checkDisconnected = ({ connection }) => {
    setStatus(connection)
  }

  return (
    <div className="container__app">
      {!status && (
        <div className="app__login-chat">
          <LoginChat setDataConnection={(event) => userInfoConnect(event)} />
        </div>
      )}
      {status && (
        <Chat
          statusDisconnected={(event) => checkDisconnected(event)}
          dataConnection={dataConnection}
        ></Chat>
      )}{" "}
      {spinner && <Spinner />}
    </div>
  )
}

export default App
