import React, { useState } from "react"

import "./LoginChat.scss"

function LoginChat(props) {
  const [nick, setNick] = useState("")
  const [channel] = useState("jIRC")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!nick || !channel) {
      return props.errorMessage("¡Nickname cant't be empty!")
    }

    props.userSettingsData({
      userSettings: {
        nickName: nick,
        channelName: channel,
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
          id="nick"
          onChange={(e) => setNick(e.target.value.replace(/ /g, ""))}
          onKeyPress={(event) => handleEnterPress(event)}
          type="text"
          placeholder="What is your nickname..."
          required
        />
      </div>
      <button onClick={(event) => handleSubmit(event)}>Login</button>
    </div>
  )
}

export default LoginChat
