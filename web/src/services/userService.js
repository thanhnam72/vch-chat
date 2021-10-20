import axios from 'axios';

class UserService {
  async login(payload) {
    return axios.post(`${process.env.REACT_APP_API_BASE_URI}/oauth/token`, payload)
      .then(resp => resp.data)
      .catch(err => err.response.data);
  }

  getUserInfo() {
    return axios.post(`${process.env.REACT_APP_API_BASE_URI}/api/user`, { }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("access_token")
      }
    }).then(resp => resp.data);
  }

  hasAuthenticated() {
    const accessToken = localStorage.getItem("access_token");
    return !!accessToken;
  }
}

export default UserService;