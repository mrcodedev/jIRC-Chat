import React, { useState } from "react"

import "./LoginChat.scss"

function LoginChat(props) {
  const [nick, setNick] = useState("")
  const [channel, setChannel] = useState("")
  const [timeConnection, setTimeConnection] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!nick) {
      // In future popup of error :D
      return console.log("Name can't be empty")
    }

    const timeElapsed = Date.now()
    const now = new Date(timeElapsed)
    setTimeConnection(now.toUTCString())

    props.setDataConnection({
      data: {
        nickName: nick,
        channelName: channel,
        dateConnection: timeConnection,
      },
    })
  }

  return (
    <div className="container__login-chat">
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
      <button onClick={(event) => handleSubmit(event)}>Submit</button>
    </div>
  )
}

export default LoginChat
