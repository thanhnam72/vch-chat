import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoaderGif from '../assets/images/loader.gif';

class PageLoader extends Component {
  render() {
    const { loading } = this.props;

    return loading ? (
      <div class="loader-container">
        <div className="loader">
          <img src={LoaderGif} />
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => ({ loading: state.application.isLoading })

export default connect(mapStateToProps)(PageLoader);