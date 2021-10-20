import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import MovieListContainer from '../containers/MovieListContainer';
import MovieSharedContainer from '../containers/MovieSharedContainer';
import ForbiddenPageContainer from '../containers/ForbiddenPageContainer';
import TopNavigation from './TopNavigation';
import PrivateRoute from './PrivateRoute';
import PageLoader from './PageLoader';
import Popup from 'react-popup';

class MasterPage extends Component {

  render() {
    return (
      <div className="container">
        <PageLoader />
        <Popup />
        <TopNavigation />
        <Switch>
          <Route path="/error" exact component={ForbiddenPageContainer} />
          <Route path="/" exact component={MovieListContainer} />
          <PrivateRoute path="/share" component={MovieSharedContainer} />
        </Switch>
      </div>
    );
  }
}

export default MasterPage;