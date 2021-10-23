import axios from 'axios';

class RoomService {
  async joinRoom(payload) {
    return axios.post(`${process.env.REACT_APP_API_URI}/room/join`, payload)
    .then(resp => resp.data);
  }

  async getMessagesInRoom(roomId) {
    return axios.get(`${process.env.REACT_APP_API_URI}/room/${roomId}/messages`)
    .then(resp => resp.data);
  }
}

export default RoomService;