import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// BroswerRouter mimics the back and forward button broswers

import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';

import Login from './components/authentication/Login';
import Register from './components/authentication/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/" component={ Landing } />
          <Route exact path="/register" component={ Register } />
          <Route exact path="/login" component={ Login } />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
