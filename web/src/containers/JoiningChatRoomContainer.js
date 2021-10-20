import _ from 'lodash';
import React, { Component } from 'react';

class JoiningChatRoomContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className="form-container">
        <div className="row top-title">
          <h2 className="bold">Join Chatroom</h2>
        </div>
        <div className="form-gg">
          <div className="row">
            <input id="username" name="username" placeholder="Username" className="field usr-field"/>
          </div>
          <div className="row">
            <input id="roomId" name="roomId" placeholder="RoomID" className="field roomid-field"/>
          </div>
        </div>
        <div className="message-form">
          <button className="join-btn">Join</button>
        </div>
      </div>
    );
  }
}

export default JoiningChatRoomContainer;
