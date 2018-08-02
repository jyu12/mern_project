import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import classnames from 'classnames';

import { connect } from 'react-redux';
import { loginUser } from '../../actions/authenticationAction';

import TextInputForm from '../common/TextInputForm';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(event) {
    this.setState({[event.target.name]: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(user);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authentication.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }

  componentDidMount() {
    if (this.props.authentication.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="login">
      <div className="container">
        <div className="row">
          <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Log In</h1>
            <p className="lead text-center">Sign in to your account</p>
            <form onSubmit={ this.onSubmit }>
            {/* using TextInputForm component for any inputs */}
            <TextInputForm
              placeholder="Email Address"
              name="email"
              type="email"
              value={ this.state.email }
              onChange= { this.onChange }
              error= {errors.email}
            />
              {/* Otherwise this will need to be done for every input
                <div className="form-group">
                <input type="email" 
                 className={classnames("form-control form-control-lg", {
                   'is-invalid': errors.email
                 })} 
                 placeholder="Email Address" 
                 name="email" 
                 value={ this.state.email } 
                 onChange={ this.onChange } 
                />
                <div className="invalid-feedback">{ errors.email }</div>
              </div> */}
              <TextInputForm
              placeholder="Password"
              name="password"
              type="password"
              value={ this.state.password }
              onChange= { this.onChange }
              error= { errors.password }
              />
              <input type="submit" 
                className="btn btn-info btn-block mt-4"
               />
            </form>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

Login.protoType = {
  loginUser: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  authentication: state.authentication,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);