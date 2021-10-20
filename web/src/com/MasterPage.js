import React, { Component } from 'react';
import { Route, Switch } from 'react-router';
import JoiningChatRoomContainer from '../containers/JoiningChatRoomContainer';
import MessageRoomContainer from '../containers/MessageRoomContainer';
import PrivateRoute from '../com/PrivateRoute';
import PageLoader from './PageLoader';
import Popup from 'react-popup';

class MasterPage extends Component {

  render() {
    return (
      <div className="container">
        <PageLoader />
        <Popup />
        <Switch>
          <Route path="/" exact component={JoiningChatRoomContainer} />
          <Route path="/room" component={MessageRoomContainer} />
        </Switch>
      </div>
    );
  }
}

export default MasterPage;