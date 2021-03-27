import './App.scss';
import React, { useState } from 'react';

// function connectChat() {
//   const connection = new WebSocket("ws://localhost:6666");
//   const button = 
// }

class FormChat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nick: "",
      channel: ""
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    if(!this.state.nick) {
      return alert("Name can't be empty");
    }
    console.log(this.state.nick)
    console.log(this.state.channel)
  }

  render() {
    return(
      <React.Fragment>
        <div id="chat"></div>
          <form onSubmit={event => this.handleSubmit(event)}>
            <input 
              id="nick"
              onChange={e => this.setState({nick: e.target.value.replace(/ /g, "")})}
              type="text"
              placeholder="What is your nickname..."
              required
            />
                        <input 
              id="channel"
              onChange={e => this.setState({channel: e.target.value.replace(/ /g, "")})}
              type="text"
              placeholder="Name of channel..."
              required
            />
            <button type="submit">Submit</button>
          </form>
      </React.Fragment>
    )
  }
}

function App() {
  return (
    <FormChat></FormChat>
  );
}

export default App;
