import React, { useState } from "react"

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
    <React.Fragment>
      <input
        id="nick"
        onChange={(e) => setNick(e.target.value.replace(/ /g, ""))}
        type="text"
        placeholder="What is your nickname..."
        required
      />
      <input
        id="channel"
        onChange={(e) => setChannel(e.target.value.replace(/ /g, ""))}
        type="text"
        placeholder="Name of channel..."
        required
      />
      <button onClick={(event) => handleSubmit(event)}>Submit</button>
    </React.Fragment>
  )
}

export default LoginChat
