import React, { Component } from 'react';
// BroswerRouter mimics the back and forward button broswers
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import jwt_decode from 'jwt-decode';
import setAuthenticationToken from './util/setAuthenticationToken';
import { setCurrentUser, logoutUser } from './actions/authenticationAction';

import PrivateRoute from './components/common/PrivateRoute';

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';

import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';

import './App.css';

// React lib that provides the Store that will hold the states
// It will need to be initialized by createStore(reducer, preloadState)
// where reducer should be the rooter reducer
// preloadState will be the initial state that you want to add
// enchancer where you apply the middlerware
import { Provider } from 'react-redux';
import store from './store';
import { clearCurrentProfile } from './actions/profile';

// Checks to make sure a user is logged in
// then update redux state (dispatch)
if (localStorage.jwtToken) {
  setAuthenticationToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <NavBar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/profiles" component={ Profiles } />
              <Route exact path="/profile/:handle" component={ Profile } />
              <Switch>  {/* Prevent redirection issues when using the custom private routing */}
                <PrivateRoute exact path="/dashboard" component={ Dashboard } />
              </Switch>
              <Switch> 
                <PrivateRoute exact path="/create-profile" component={ CreateProfile } />
              </Switch>
              <Switch> 
                <PrivateRoute exact path="/edit-profile" component={ EditProfile } />
              </Switch>
              <Switch> 
                <PrivateRoute exact path="/add-experience" component={ AddExperience } />
              </Switch>
              <Switch> 
                <PrivateRoute exact path="/add-education" component={ AddEducation } />
              </Switch>
              
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
