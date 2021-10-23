const libs = process.cwd() + '/libs/';
require(libs + 'db/mongoose');
const Room = require(libs + 'model/room');
const RoomMessage = require(libs + 'model/roommessage');

const joinRoom = async function(username, roomId, sessionId) {
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
      sessionId: sessionId
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
    return false;
  }
}

const updateUserSessionInRoom = async function(username, roomId, sessionId) {
  try{
    let room = await Room.findOne({ userName: username });

    if(room && room.sessionId !== sessionId) {
      room.sessionId = sessionId;

      await room.save();
    } 

    if(!room) {
      room = new Room({
        userName: username,
        roomId: roomId,
        sessionId: sessionId
      });
    
      await room.save();
    }
  } catch (err) {
    console.log(err);
  }
}

const getMessagesByRoomId = async function(roomId) {
  try{
    const messages = await RoomMessage.findOne({
      roomId: roomId
    })
    
    return messages ? messages : [];
  } catch (err) {
    console.log(err);
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
    console.log(err);
    return null;
  }
}

const removeUserFromRoomAfterDisconnected = async function(sessionId) {
  try{
    const resp = await Room.deleteOne({
      sessionId: sessionId
    })
    
    return resp;
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  joinRoom,
  getMessagesByRoomId,
  addMessage,
  removeUserFromRoom,
  updateUserSessionInRoom,
  removeUserFromRoomAfterDisconnected
}