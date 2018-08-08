import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './ProfileItem';

class Profiles extends Component {
  componentDidMount() {
    this.props.getProfiles();
  }

  render() {
    const { profiles, loading } = this.props.profile;  // comes from the redux(reducers/profile.js) states.
    let profileItems;

    if (profiles === null || loading) {
        profileItems = <Spinner />;
    } else {
        if (profiles.length > 0) {
            profileItems = profiles.map(profile => (
                <ProfileItem key={profile._id} profile={profile} /> // Props can be passed into components like this..
            ))
        } else {
            profileItems = <h4>Profile not found</h4>
        }
    }

    return (
      <div className="profiles">
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="display-4 text-center">Profiles</h1>
                    <p className="lead text-center">Browse and connect</p>
                    {profileItems}
                </div>
            </div>
        </div>
      </div>
    )
  }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfiles })(Profiles);