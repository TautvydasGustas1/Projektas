import { Link } from 'react-router-dom'
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom'
import axios from 'axios'




const PrivateRoute = ({ component: Component, ...rest }) => {


  const isLoggedIn = false;

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute


