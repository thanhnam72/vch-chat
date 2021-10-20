import React from "react";
import { Redirect, Route } from "react-router-dom";
import UserService from "../services/userService";

function PrivateRoute({ component: Component, ...restOfProps }) {
  const userService = new UserService();
  const isAuthenticated = userService.hasAuthenticated();

  return (
    <Route
      {...restOfProps}
      render={(props) => isAuthenticated ? <Component {...props} /> : <Redirect to="/error" /> }
    />
  );
}

export default PrivateRoute;