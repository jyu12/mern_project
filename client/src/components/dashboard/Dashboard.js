import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';

class Dashboard extends Component {

  // makes an ajax call even redux is not used. This is called immediately when component is called
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.authentication;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
        dashboardContent = <Spinner />;
    } else {
        dashboardContent = <h1>Hello</h1>;
        if (Object.keys(profile).length > 0) {
            dashboardContent = ( 
                <div>
                    <p className="lead text-muted">Welcome <Link to={`/profile/${profile.handle}`}>{ user.name }</Link></p>
                    <ProfileActions />
                    {/* Profile Information */}
                    <div style={{ marginBottom: '60px' }} />
                    <button onClick={ this.onDeleteClick.bind() } className="btn btn-danger">Delete Account</button>
                </div> );
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
    deleteAccount: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    authentication: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    authentication: state.authentication
})

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);