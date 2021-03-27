import React from 'react';

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
      //In future popup of error :D
      return alert("Name can't be empty");
    }

    const timeElapsed = Date.now()
    const now = new Date(timeElapsed)

    //See how pass child to parent info, to do the connection 
    this.props.onDataConnect = { 
      nickName: this.state.nick, 
      channelName: this.state.channel,
      date: now.toUTCString()
    }
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

export default FormChat;