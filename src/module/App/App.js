import React, { useState } from "react"
import LoginChat from "../LoginChat/LoginChat"
import Chat from "../Chat/Chat"
import Spinner from "../../components/Spinner/Spinner"

import "./App.scss"

const App = () => {
  const [isLogged, setIsLogged] = useState(false)
  const [spinner, setSpinner] = useState(false)
  // TODO: JOIN IN A OBJECT statusError, messageError
  const [statusError, setStatusError] = useState(false)
  const [messageError, setMessageError] = useState("")
  const [loginUserSettingsData, setLoginUserSettingsData] = useState({})

  const handlerUserSettingsLogin = (data) => {
    checkErrors()

    setLoginUserSettingsData(data)
    setSpinner(true)

    setTimeout(() => {
      setIsLogged(true)
      setSpinner(false)
    }, 1000)
  }

  const checkErrors = () => {
    if (statusError) {
      setStatusError(false)
      setMessageError("")
    }
  }

  const checkDisconnected = ({ connection }) => {
    setIsLogged(connection)
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
        {statusError && !isLogged && (
          <div className="app__error-message">{messageError}</div>
        )}
        {!isLogged && (
          <LoginChat
            userSettingsData={(event) => handlerUserSettingsLogin(event)}
            errorMessage={(event) => getErrorMessage(event)}
          />
        )}
      </div>
      {isLogged && (
        <Chat
          statusDisconnected={(event) => checkDisconnected(event)}
          loginUserSettingsData={loginUserSettingsData}
        ></Chat>
      )}
      {spinner && <Spinner />}
    </div>
  )
}

export default App
