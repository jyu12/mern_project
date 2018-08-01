import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';

class Register extends Component {
  // Components state for each of the fields - not related to Redux
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {}
    };
    // binding the field states to this object
    this.onChange = this.onChange.bind(this);
  }
  // After assigning values to the fields, a change event( OnChange ) will needed for each field
  // Detect changes and run this
  onChange(event) {
    // if it's name field then set the user input
     // 'this' is not set to anything. The event needs to be bound first.
    // one way is to: onChange={this.onChange.bind(this)}
    // or set it in the constructor
    this.setState({[event.target.name]: event.target.value})
  }

  onSubmit(event) {
    // event is a form, so default behavior should be prevented
    event.preventDefault();

    // Redux should be used here to create & login
    // All requests should pass thought an action in Redux
    // the Response will go thought a Redux reducer
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    }
    // user is returned after registering a user
    // the full http:// link is not needed because of the proxy value set in package.json
    axios.post('/api/users/register', newUser)
         .then(result => console.log(result.data))
         .catch(error => this.setState({errors: error.response.data}));
  }

  // 'required' HTML5 validation is not needed, since we already have validation 
  render() {
    // errors here?
    const { errors } = this.state; // same as const errors = this.state.errors;

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create an account</p>
              <form noValidate onSubmit={ this.onSubmit.bind(this) }>
                <div className="form-group">
                  <input type="text" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.name
                  })} 
                  placeholder="Name" 
                  name="name" 
                  value={ this.state.name }
                  onChange={ this.onChange }
                  />
                  <div className="invalid-feedback">{ errors.name }</div>
                </div>
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
                  <small className="form-text text-muted">Use Gravatar email</small>
                </div>
                <div className="form-group">
                  <input type="password" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.password
                  })} 
                  placeholder="Password" 
                  name="password"
                  value={ this.state.password }
                  onChange={ this.onChange }
                   />
                   <div className="invalid-feedback">{ errors.password }</div>
                </div>
                <div className="form-group">
                  <input type="password" 
                  className={classnames("form-control form-control-lg", {
                    'is-invalid': errors.confirmPassword
                  })} 
                  placeholder="Confirm Password" 
                  name="confirmPassword"
                  value={ this.state.confirmPassword }
                  onChange={ this.onChange }
                  />
                  <div className="invalid-feedback">{ errors.confirmPassword }</div>
                </div>
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;