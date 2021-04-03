import React, { useState } from "react"

import "./LoginChat.scss"

function LoginChat(props) {
  const [nick, setNick] = useState("")
  const [channel, setChannel] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!nick || !channel) {
      return props.errorMessage("¡Channel or Nickname cant't be empty!")
    }

    props.setDataConnection({
      data: {
        nickName: nick,
        channelName: channel,
      },
    })
  }

  return (
    <div className="container__login-chat">
      <div className="login-chat__input-field">
        <label>Channel</label>
        <input
          id="channel"
          onChange={(e) => setChannel(e.target.value.replace(/ /g, ""))}
          type="text"
          placeholder="Name of channel..."
          required
        />
      </div>
      <div className="login-chat__input-field">
        <label>Nickname</label>
        <input
          id="nick"
          onChange={(e) => setNick(e.target.value.replace(/ /g, ""))}
          type="text"
          placeholder="What is your nickname..."
          required
        />
      </div>
      <button onClick={(event) => handleSubmit(event)}>Submit</button>
    </div>
  )
}

export default LoginChat
