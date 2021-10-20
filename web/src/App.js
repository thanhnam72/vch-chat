import React, { Component } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import MasterPage from './com/MasterPage';
import { Provider } from 'react-redux'
import configureStore from "./store";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={configureStore()}>
        <BrowserRouter>
          <MasterPage />
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
