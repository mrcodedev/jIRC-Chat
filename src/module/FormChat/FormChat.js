import React, { useState } from "react";

function FormChat(props) {
  const [nick, setNick] = useState("");
  const [channel, setChannel] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!nick) {
      // In future popup of error :D
      return console.log("Name can't be empty");
    }

    const timeElapsed = Date.now();
    const now = new Date(timeElapsed);

    props.setDataConnection({
      data: {
        nickName: nick,
        channelName: channel,
        dateConnection: now.toUTCString(),
      },
    });
  };

  return (
    <React.Fragment>
      <div id="chat"></div>
      <form onSubmit={(event) => handleSubmit(event)}>
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
        <button type="submit">Submit</button>
      </form>
    </React.Fragment>
  );
}

export default FormChat;
