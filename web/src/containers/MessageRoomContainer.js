import React, { Component } from 'react';
import { hideLoading, showLoading } from '../actions';
import { connect } from 'react-redux';
import socket from '../WebSocket';
import RoomService from "../services/roomService";
import _ from 'lodash';

class MessageRoomContainer extends Component {
  roomService = new RoomService();

  constructor(props) {
    super(props);

    this.state = {
      roomId: '',
      userName: '',
      roomMessages: [],
      message: '',
    }

    socket.on("onMessage", (resp) => {
      console.log("onMessage", resp);
      this.setState({
        roomMessages: [
          ...this.state.roomMessages,
          resp
        ]
      })
    })

    socket.on('message_response', (resp) => {
      if(resp) {
        const { userName, message } = this.state;

        this.setState({
          roomMessages: [
            ...this.state.roomMessages,
            { userName, message }
          ],
          message: ""
        })
      } else {
        alert("Something went wrong! Please try it again");
      }
    });

    socket.on('exit_room_response', (resp) => {
      if(resp) {
        localStorage.removeItem("_info");
        this.props.history.push("/");
      } else {
        alert("Something went wrong! Please try it again");
      }
    });
  }

  onHandleControl = (event) => {
    const tg = event.target;
    const name = tg.name;

    this.setState({
      [name]: tg.value
    });
  }

  async componentDidMount() {
    const userInfo = JSON.parse(localStorage.getItem('_info'));

    if(!userInfo || !userInfo.userName || !userInfo.roomId) {
      this.props.history.push('/');
      return;
    }

    this.props.dispatch(showLoading());

    const response = await this.roomService.getMessagesInRoom(userInfo.roomId);

    this.props.dispatch(hideLoading());

    if(response) {
      socket.emit('rejoin_room', { roomId: userInfo.roomId, userName: userInfo.userName });

      const messages = _.map(response.messages, msg => ({ userName: msg.userName, message: msg.content }));

      this.setState({
        userName: userInfo.userName,
        roomId: userInfo.roomId,
        roomMessages: messages
      })
    }
    
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  // componentWillUnmount() {
  //   localStorage.removeItem("_info");
  //   this.onExit();
  // }

  sendClick = () => {
    const { userName, message, roomId } = this.state;

    if(!message) {
      alert("Please input your message");
      return;
    }

    socket.emit('message', { userName, message, roomId });
  }

  onExit = () => {
    socket.emit('exit_room', { 
      userName: this.state.userName,
      roomId: this.state.roomId
    })
  }

  onMessageKeyDown = (event) => {
    if(event.keyCode === 13) {
      this.sendClick();
    }
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "smooth" });
  }

  render() {
    return (
      <div className="msg-wrapper">
        <div className="row top-title">
          <a href="#" className="btn-exit" onClick={this.onExit}>Exit</a>
          <h2>{this.state.roomId}</h2>
        </div>
        <div className="msg-content">
          {
            _.map(this.state.roomMessages, (msg, idx) => {
              return msg.userName !== this.state.userName ? (
                <div className="row msg-line" key={`msg_${idx}`}>
                  <p className="sender-name">{msg.userName}</p>
                  <p className="message-left">{msg.message}</p>
                </div>
              ) : (
                <div className="row msg-line" key={`msg_${idx}`}>
                  <p className="message-right">{msg.message}</p>
                </div>
              )
            })
          }
          <div style={{ float:"left", clear: "both" }}
              ref={(el) => { this.messagesEnd = el; }}>
          </div>
        </div>
        <div className="message-form">
          <input type="text" 
            className="msg-field" 
            id="message" 
            name="message" 
            placeholder="Message here..." 
            onChange={this.onHandleControl} 
            value={this.state.message} 
            onKeyDown={this.onMessageKeyDown}/>
          <a className="send-btn" href="#" onClick={this.sendClick}><i className="fa fa-arrow-up"></i></a>
        </div>
      </div>
    );
  }
}

export default connect(null)(MessageRoomContainer);