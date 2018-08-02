import React, { Component } from 'react';
// BroswerRouter mimics the back and forward button broswers

import jwt_decode from 'jwt-decode';
import setAuthenticationToken from './util/setAuthenticationToken';
import { setCurrentUser } from './actions/authenticationAction';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

import './App.css';

// React lib that provides the Store that will hold the states
// It will need to be initialized by createStore(reducer, preloadState)
// where reducer should be the rooter reducer
// preloadState will be the initial state that you want to add
// enchancer where you apply the middlerware
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import store from './store';

// Checks to make sure a user is logged in
// then update redux state
if (localStorage.jwtToken) {
  setAuthenticationToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
}


class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={ Landing } />
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ Login } />
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
