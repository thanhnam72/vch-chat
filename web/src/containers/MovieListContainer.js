import _ from 'lodash';
import React, { Component } from 'react';
import MovieItem from '../com/MovieItem';
import MovieService from '../services/movieService';

class MovieListContainer extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      movies: []
    };
  }

  async componentDidMount() {
    var result = await this.movieService.getMovies();

    if(result && result.data) {
      this.setState({
        movies: _.map(result.data.data, (item) => ({
          id: item.id,
          title: item.title,
          sharedBy: item.user.email,
          url: item.url
        }))
      })
    }
  }

  render() {
    return (
      <div className="movie-container">
        {_.map(this.state.movies, mv => <MovieItem movie={mv} />)}
      </div>
    );
  }
}

export default MovieListContainer;
