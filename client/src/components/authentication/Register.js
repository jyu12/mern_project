import React, { Component } from 'react';
// import classnames from 'classnames';
// import axios from 'axios';
import PropTypes from 'prop-types';
// withRoute allows the routing from within an action
import { withRouter } from 'react-router-dom';

// Connecting redux to this component
// this will also need to export connect()
// Container in this case is just a component that works with redux
import { connect } from 'react-redux';
import { registerUser } from '../../actions/authenticationAction';

import TextInputForm from '../common/TextInputForm';

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

  // Life cycle method - this runs when new props are received
  // Since props are being passed in by redux. The props can be then set as a component state
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({errors: nextProps.errors});
    }
  }
  
  componentDidMount() {
    if (this.props.authentication.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
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
    // axios.post('/api/users/register', newUser)
    //      .then(result => console.log(result.data))
    //      .catch(error => this.setState({errors: error.response.data}));
    
    // call the actions using 'prop', this.props.history is for withRoute and redirection
    this.props.registerUser(newUser, this.props.history);
  }
  // 'required' HTML5 validation is not needed, since we already have validation 
  render() {
    // component level error states
    const { errors } = this.state; // same as const errors = this.state.errors;

    return (
        <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">Create an account</p>
              <form noValidate onSubmit={ this.onSubmit.bind(this) }>
                <TextInputForm
                placeholder="Name"
                name="name"
                value={ this.state.name }
                onChange= { this.onChange }
                error= { errors.name }
                />
                <TextInputForm
                placeholder="Email"
                name="email"
                type="email"
                value={ this.state.email }
                onChange= { this.onChange }
                error= { errors.email }
                info="Email will be used for linking with Gravatar"
                />
                <TextInputForm
                placeholder="Password"
                name="password"
                type="password"
                value={ this.state.password }
                onChange= { this.onChange }
                error= { errors.password }
                />
                <TextInputForm
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={ this.state.confirmPassword }
                onChange= { this.onChange }
                error= { errors.confirmPassword }
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

// React best practices: Props in component should be mapped to propTypes
// Then set wheather its required or not, the types of values
Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  authentication: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

// To get the authenticate states into components
// 'authenication' is just a props to hold the state data so that
// The state can be then accessed by using this.prop.mappedObjs
const mapStateToProps = (state) => ({
  authentication: state.authentication,  // authenication is from the root reducer
  errors: state.errors
});

// second args is a map for actions,
export default connect(mapStateToProps, { registerUser })(withRouter(Register));