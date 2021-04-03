import React, { useRef } from "react"

import "./LoginChat.scss"

function LoginChat(props) {
  const inputNickRef = useRef("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!inputNickRef.current?.value) {
      return props.errorMessage("¡Nickname cant't be empty!")
    }

    props.userSettingsData({
      userSettings: {
        nickName: inputNickRef.current?.value,
        channelName: "channel",
      },
    })
  }

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event)
    }
  }

  return (
    <div className="container__login-chat">
      {/* <div className="login-chat__input-field">
        <label>Channel</label>
        <input
            id="channel"
            onChange={(e) => setChannel(e.target.value.replace(/ /g, ""))}
            type="text"
            placeholder="Name of channel..."
            required
          />
      </div> */}
      <div className="login-chat__input-field">
        <label>Nickname</label>
        <input
          type="text"
          id="nick"
          ref={inputNickRef}
          onKeyPress={handleEnterPress}
          placeholder="What is your nickname..."
          required
        />
      </div>
      <button onClick={(event) => handleSubmit(event)}>Login</button>
    </div>
  )
}

export default LoginChat
