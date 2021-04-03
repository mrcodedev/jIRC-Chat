import React, { useState } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"
import Spinner from "../../components/Spinner/Spinner"

import "./App.scss"

const App = () => {
  const [status, setStatus] = useState(false)
  const [spinner, setSpinner] = useState(false)
  const [statusError, setStatusError] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [dataConnection, setDataConnection] = useState({})

  const userInfoConnect = (data) => {
    if (statusError) {
      setStatusError(false)
      setMessageError("")
    }
    setDataConnection(data)
    setSpinner(true)

    // Simulating loading
    setTimeout(() => {
      setStatus(true)
      setSpinner(false)
    }, 1000)
  }

  const checkDisconnected = ({ connection }) => {
    setStatus(connection)
  }

  const getErrorMessage = (data) => {
    if (data.length > 0) {
      setMessageError(data)
      setStatusError(true)
    } else {
      setStatusError(false)
    }
  }

  return (
    <div className="container__app">
      <div className="app__login-chat">
        {statusError && !status && (
          <div className="app__error-message">{messageError}</div>
        )}
        {!status && (
          <LoginChat
            setDataConnection={(event) => userInfoConnect(event)}
            errorMessage={(event) => getErrorMessage(event)}
          />
        )}
      </div>
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
