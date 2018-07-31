import React, { Component } from 'react'

class NavBar extends Component {
    render() {  // life cyle method - renders whatever its returning..
        return (
            // Other logics can be done here
            // however, because React uses JSX (JavaScript syntax extension - lets you do javascripts in html), it must return this
            // Its got its own synax - ex. className is required instead of class     
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                <a className="navbar-brand" href="landing.html">Mern Project</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="profiles.html"> People
                        </a>
                    </li>
                    </ul>

                    <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <a className="nav-link" href="register.html">Sign Up</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="login.html">Login</a>
                    </li>
                    </ul>
                </div>
                </div>
            </nav>
        )
    }
} 

export default NavBar;