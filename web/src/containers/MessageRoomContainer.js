import React, { Component } from 'react';

class MessageRoomContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      url: ''
    }
  }

  render() {
    return (
      <div className="msg-wrapper">
        <div className="row top-title">
          <a href="#" className="btn-exit">Exit</a>
          <h2>ROOM ID</h2>
        </div>
        <div className="row">
          <p className="sender-name">Ly Thanh Nam</p>
          <p className="message-left">Hello, My name is Nam!</p>
        </div>
        <div className="row">
          <p className="message-right">Hello, My name is Nam!</p>
        </div>
        <div className="message-form">
          <input type="text" className="msg-field" id="exampleInputAmount" placeholder="Message here..." />
          <a className="send-btn" href="#"><i className="fa fa-arrow-up"></i></a>
        </div>
      </div>
    );
  }
}

export default MessageRoomContainer;