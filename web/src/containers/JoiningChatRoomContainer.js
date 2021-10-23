import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideLoading, showLoading } from "../actions/index";
import RoomService from "../services/roomService";
import { USER_IS_EXISTING_IN_ROOM } from "../constants/index";
import socket from '../WebSocket';

class JoiningChatRoomContainer extends Component {
  roomService = new RoomService();

  constructor(props) {
    super(props);

    this.state = {
      userName: '',
      roomId: ''
    };
  }

  componentDidMount() {
    socket.on('join_room_response', (result) => {
      this.props.dispatch(hideLoading());

      if(result.status) {
        localStorage.setItem("_info", JSON.stringify(result.data));
        this.props.history.push('/room');
        return;
      }
      
      if(!result.status && result.code === USER_IS_EXISTING_IN_ROOM) {
        alert(`userName ${this.state.userName} is exsting in another room`);
      } else {
        alert('Something went wrong')
      }
    })
  }

  onHandleControl = (event) => {
    const tg = event.target;
    const name = tg.name;

    this.setState({
      [name]: tg.value
    });
  }


  onJoinClick = async () => {
    if(!this.state.userName) {
      alert("Please input your userName");
      return;
    }

    if(!this.state.roomId) {
      alert("Please input your room ID");
      return;
    }

    const { userName, roomId } = this.state;

    this.props.dispatch(showLoading());

    socket.emit('join_room', { userName, roomId })
  }

  render() {
    return (
      <div className="form-container">
        <div className="row top-title">
          <h2 className="bold">Join Chatroom</h2>
        </div>
        <div className="form-gg">
          <div className="row">
            <input id="userName" name="userName" placeholder="Username" className="field usr-field" onChange={this.onHandleControl}/>
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

const mapStateToProps = state =>({})

export default connect(mapStateToProps)(JoiningChatRoomContainer);
