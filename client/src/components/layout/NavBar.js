import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authenticationAction';
import { clearCurrentProfile } from '../../actions/profile';

class NavBar extends Component {
    onLogoutClick(event) {
        event.preventDefault();

        this.props.clearCurrentProfile();
        this.props.logoutUser();
    }

    render() {  // life cyle method - renders whatever its returning..
        const { isAuthenticated, user } = this.props.authentication;

        const authenticationLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register"> Dashboard </Link>
                </li>
                <li className="nav-item">
                    <a 
                        href="" 
                        onClick={this.onLogoutClick.bind(this)} 
                        className="nav-link" 
                    > 
                    <img 
                        className = "rounded-circle"
                        src={user.avatar} 
                        alt={user.name} 
                        style={{ width: '25px', marginRight: '5px' }} 
                        title="No gravatar found" 
                    /> 
                    Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );


        return (
            // Other logics can be done here
            // however, because React uses JSX (JavaScript syntax extension - lets you do javascripts in html), it must return this
            // Its got its own synax - ex. className is required instead of class     
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <Link className="navbar-brand" to="/">Mern Project</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">People</Link>
                        </li>
                    </ul>
                    { isAuthenticated ? authenticationLinks : guestLinks }
                </div>
                </div>
            </nav>
        )
    }
} 

NavBar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    authentication: state.authentication
});

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(NavBar);