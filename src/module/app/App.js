import React, { useState, useEffect } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"
import Spinner from "../../components/Spinner/Spinner"

import "./App.scss"

const App = () => {
  const [status, setStatus] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [dataConnection, setDataConnection] = useState({})

  useEffect(() => {
    if (status) {
      setSpinner(false)
    }
  }, [status])

  const userInfoConnect = (event) => {
    setSpinner(true)
    setDataConnection(event)
    // TODO: Leave when end all
    setTimeout(() => {
      setStatus(true)
    }, 1000)
    console.log(event)
  }

  const doCheckStatus = ({ connection }) => {
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
          statusConnection={(event) => doCheckStatus(event)}
          dataConnection={dataConnection}
        ></Chat>
      )}{" "}
      {spinner && <Spinner />}
    </div>
  )
}

export default App
