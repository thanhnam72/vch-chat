import React, { Component } from 'react';
import MovieService from '../services/movieService';
import { useHistory } from "react-router-dom";
import { hideLoading, showLoading } from "../actions/index";
import { connect } from 'react-redux';

class MovieShared extends Component {
  movieService = new MovieService();

  constructor(props) {
    super(props);

    this.state = {
      url: ''
    }
  }

  onHandleControl = (event) => {
    const tg = event.target;
    const name = tg.name;

    this.setState({
      [name]: tg.value
    });
  }

  onShareClicked = async () => {
    this.props.dispatch(showLoading());

    await this.movieService.shareMovie(this.state.url);

    this.props.dispatch(hideLoading());

    this.props.history.push('/');
  }

  render() {
    return (
      <fieldset>
        <legend className="shared-label">Share a Youtube movie</legend>
        <form>
          <div className="form-group row">
            <label for="staticEmail" className="col-sm-3 col-form-label">Youtube URL:</label>
            <div class="col-sm-7">
              <div>
                <input type="text" className="form-control" id="staticEmail" name="url" onChange={this.onHandleControl}/>
              </div>
              <div>
                <button type="button" class="btn btn-primary share-btn" onClick={this.onShareClicked}>Share</button>
              </div>
            </div>
          </div>
        </form>
      </fieldset>
    );
  }
}

const mapStateToProps = state =>({})

export default connect(mapStateToProps)((props) => {
  const history = useHistory();

  return <MovieShared {...props} history={history} />;
});