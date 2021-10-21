import _ from 'lodash';
import React, { Component } from 'react';
import socket from '../WebSocket';

class JoiningChatRoomContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  onHandleControl = (event) => {
    const tg = event.target;
    const name = tg.name;

    this.setState({
      [name]: tg.value
    });
  }


  onJoinClick = () => {
    if(!this.state.username) {
      alert("Please input your username");
      return;
    }

    if(!this.state.roomId) {
      alert("Please input your room ID");
      return;
    }

    const { username, roomId } = this.state;

    socket.emit('join', { username, roomId });

    this.props.history.push('/room');
  }

  render() {
    return (
      <div className="form-container">
        <div className="row top-title">
          <h2 className="bold">Join Chatroom</h2>
        </div>
        <div className="form-gg">
          <div className="row">
            <input id="username" name="username" placeholder="Username" className="field usr-field" onChange={this.onHandleControl}/>
          </div>
          <div className="row">
            <input id="roomId" name="roomId" placeholder="RoomID" className="field roomid-field" onChange={this.onHandleControl}/>
          </div>
        </div>
        <div className="message-form">
          <button className="join-btn" onClick={this.onJoinClick}>Join</button>
        </div>
      </div>
    );
  }
}

export default JoiningChatRoomContainer;
