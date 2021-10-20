import React, { Component, Fragment } from 'react';
import UserService from '../services/userService';
import { useHistory } from "react-router-dom";
import Popup from 'react-popup';
import { hideLoading, showLoading } from "../actions/index";
import { connect } from 'react-redux';

class TopNavigation extends Component {
  userService = new UserService();

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isAuthenticated: false
    }
  }

  async componentDidMount() {
    var isAuth = this.userService.hasAuthenticated();
    
    if (isAuth) {
      var userInfo = await this.userService.getUserInfo();

      localStorage.setItem('user_email', userInfo.data.email);

      this.setState({
        userEmail: userInfo.data.email,
        isAuthenticated: this.userService.hasAuthenticated()
      })
    }
  }

  onHandleControl = (event) => {
    const tg = event.target;
    const name = tg.name;
    const value = tg.type === 'checkbox' ? tg.checked : tg.value;

    this.setState({
      [name]: value
    });
  }

  onLoginOrRegisClicked = async () => {
    const payload = {
      username: this.state.email,
      password: this.state.password,
      grant_type: "password"
    }

    this.props.dispatch(showLoading());

    const result = await this.userService.login(payload);

    if (result && !!result.data && !!result.data.Token) {
      localStorage.setItem('access_token', result.data.Token);
      this.setState({
        userEmail: result.data.Username,
        isAuthenticated: true
      })
    } else {
      Popup.alert(result.messageError, 'Error');
    }

    this.props.dispatch(hideLoading());
  }

  onShareMovieClicked = () => {
    this.props.history.push('/share');
  }

  onLogoutClicked = () => {
    localStorage.removeItem("access_token");
    window.location.reload();
  }

  render() {
    return (
      <div className="row top-nav">
        <div className="col-md-4 left-top-navigation">
          <span><i className="fa fa-home"></i></span>
          <span>Funny Movies</span>
        </div>
        <div className="col-md-8 right-top-navigation text-right">
          <form className="form-inline">
            {!this.state.isAuthenticated && (
              <Fragment>
                <div className="form-group mb-2 mgr-10">
                  <label htmlFor="staticEmail2" className="sr-only">Email</label>
                  <input type="email" className="text" className="form-control" id="staticEmail2" name="email" placeholder="Email" onChange={this.onHandleControl} />
                </div>
                <div className="form-group mx-sm-3 mb-2 mgr-10">
                  <label htmlFor="inputPassword2" className="sr-only">Password</label>
                  <input type="password" className="form-control" id="inputPassword2" name="password" placeholder="Password" onChange={this.onHandleControl} />
                </div>
                <button type="button" className="btn btn-primary mb-2" onClick={this.onLoginOrRegisClicked}>Login/Register</button>
              </Fragment>
            )}

            {this.state.isAuthenticated && (
              <Fragment>
                <label className="mgr-10">{this.state.userEmail}</label>
                <button type="button" className="btn btn-primary mgr-10" onClick={this.onShareMovieClicked}>Share a movie</button>
                <button type="button" className="btn btn-primary mgr-10" onClick={this.onLogoutClicked}>Logout</button>
              </Fragment>
            )}
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state =>({})

export default connect(mapStateToProps)((props) => {
  const history = useHistory();

  return <TopNavigation {...props} history={history} />;
});