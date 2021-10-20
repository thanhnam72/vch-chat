import axios from 'axios';

class MovieService {
  getMovies() {
    return axios.get(`${process.env.REACT_APP_API_URI}/movie/all`);
  }

  async shareMovie(url) {
    return axios.post(`${process.env.REACT_APP_API_URI}/movie/share`, { url: url }, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem("access_token")
      }
    })
    .then(resp => resp.data);
  }
}

export default MovieService;