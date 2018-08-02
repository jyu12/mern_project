import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import authenticationReducer from '../../reducers/authenticationReducer';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

  // makes an ajax call even redux is not used. This is called immediately when component is called
  componentDidMount() {
      this.props.getCurrentProfile();
  };

  render() {
    const { user } = this.props.authentication;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
        dashboardContent = <Spinner />;
    } else {
        dashboardContent = <h1>Hello</h1>;
        if (Object.keys(profile).length > 0) {
            dashboardContent = <h4>Displays Profile</h4>
        } else {
            dashboardContent = (
                <div>
                    <p className="lead text-muted">Welcome { user.name }</p>
                    <p>Profile not set up.</p>
                    <Link to="/create-profile" className="btn- btn-lg btn-info">Create Profile</Link>
                </div>
            );
        }
    }
      
    return (
      <div className="dashboard">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4">Dashboard</h1>
                    { dashboardContent }
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);