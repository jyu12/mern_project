import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

class Landing extends Component {

  componentDidMount() {
    if (this.props.authentication.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    return (
      <div>
          <div className="landing">
            <div className="dark-overlay landing-inner text-light">
            <div className="container">
                <div className="row">
                  <div className="col-md-12 text-center">
                      <h1 className="display-3 mb-4">Social Network
                      </h1>
                      <p className="lead"> Social network web application built using a MERN Stack</p>
                      <hr />
                      <Link className="btn btn-lg btn-info mr-2" to="/register">Sign Up</Link>
                      <Link className="btn btn-lg btn-light" to="/login">Login</Link>
                  </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    )
  }
}

Landing.propTypes = {
  authentication: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authentication: state.authentication
});

// same thing as have it next to class.
export default connect(mapStateToProps)(Landing);