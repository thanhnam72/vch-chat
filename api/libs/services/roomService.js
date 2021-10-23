const libs = process.cwd() + '/libs/';
require(libs + 'db/mongoose');
const log = require(libs + 'log')(module);
const Room = require(libs + 'model/room');
const RoomMessage = require(libs + 'model/roommessage');

const joinRoom = async function(username, roomId) {
  try{
    let room = await Room.findOne({ userName: username});

    if(room) {
      return {
        status: false,
        code: 'user-is-existing-in-room'
      };
    }

    room = await Room.findOne({ roomId: roomId});

    if(room) {
      return {
        status: true,
        code: 'success',
        data: {
          roomId: roomId,
          userName: username
        }
      };
    }

    room = new Room({
      userName: username,
      roomId: roomId,
    });
  
    await room.save();
    return {
      status: true,
      code: 'sucess',
      data: room
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      code: 'error'
    };
  }
}

const addMessage = async function(username, roomId, message) {
  try{
    let roomMessage = await RoomMessage.findOne({ roomId: roomId });

    if(roomMessage) {
      roomMessage.messages.push({
        userName: username,
        content: message
      })
    } else {
      roomMessage = new RoomMessage({
        roomId: roomId,
        messages: [{
          userName: username,
          content: message
        }]
      });
    }

    await roomMessage.save();
    return true;
  } catch (err) {
    console.log(err);
    log.error(err);
    return false;
  }
}

const getMessagesByRoomId = async function(roomId) {
  try{
    const messages = await RoomMessage.findOne({
      roomId: roomId
    })
    
    return messages ? messages : [];
  } catch (err) {
    log.error(err);
    return null;
  }
}

const removeUserFromRoom = async function(userName, roomId) {
  try{
    const resp = await Room.remove({
      roomId: roomId,
      userName: userName
    })
    
    return resp;
  } catch (err) {
    log.error(err);
    return null;
  }
}


module.exports = {
  joinRoom,
  getMessagesByRoomId,
  addMessage,
  removeUserFromRoom
}