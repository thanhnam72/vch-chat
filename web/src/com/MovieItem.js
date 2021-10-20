import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieItem extends Component {

  render() {
    var { movie } = this.props;

    return (
      <div className="row movie-item">
        <div className="col-md-6 mv-viewing">
          <iframe className="mv-if" src={movie.url} frameborder="0" allowfullscreen ></iframe>
        </div>
        <div className="col-md-6">
          <div className="mv-title">{movie.title}</div>
          <div className="mv-shared">Share by: {movie.sharedBy}</div>
        </div>
      </div>
    );
  }
}

MovieItem.propTypes = {
  movies: PropTypes.shape({
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    sharedBy: PropTypes.string.isRequired
  }).isRequired
}

export default MovieItem;
