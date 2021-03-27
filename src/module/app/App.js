import './App.scss';
import React from 'react';
import FormChat from '../FormChat/FormChat'

class App extends React.Component {
  connectServer() {
    const connection = new WebSocket("ws://localhost:8080");
    
    connection.onopen = (event) => {
      console.log("WebSocket is open now!")
    }

    connection.onclose = (event) => {
      console.log("WebSocket is close now ¡O_O!")
    }

    connection.onerror = (event) => {
      console.log(`Websocket error :(, reason: ${event})`)
    }
  }


  render() {
    return (
      <React.Fragment>
        <FormChat setDataConnection={this.connectServer}></FormChat>
      </React.Fragment>
    );
  }
}

export default App;
