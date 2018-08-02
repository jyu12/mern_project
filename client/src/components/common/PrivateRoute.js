import React from 'react'
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// No default private routes like in Angular(RouteGuard)
// Need to authenticate the user then redirect
const PrivateRoute = ({component: Component, authentication, ...rest}) => (
    <Route 
        // Pass in any props
        {...rest} 
        render = { prop =>
            authentication.isAuthenticated === true ? (
                <Component {...prop} />
            ) : (
                <Redirect to="/login" />       
            )}
    />
);

PrivateRoute.PropTypes = {
    authentication: PropTypes.object.isRequired
}

const mapStateToProp = state => ({
    authentication: state.authentication
});

export default connect(mapStateToProp)(PrivateRoute);