import React, { Component } from 'react'
import { connect } from 'react-redux';
import{ Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './Header';
import About from './About';
import Credentials from './Credentials';
import Github from './Github';
import Spinner from '../common/Spinner';

import { getProfileByHandle } from '../../actions/profile';


class Profile extends Component {
  
  componentWillReceiveProps(nextProps) {
      if (nextProps.profile.profile === null && this.props.profile.loading) {
          this.props.history.push('/not-found')
      }
  }

  componentDidMount() {
    if(this.props.match.params.handle) {
        this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    const { profile, loading } = this.props.profile;
    let profileContent;

    if (profile === null || loading) {
        profileContent = <Spinner />
    } else {
        profileContent = (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <Link to="/profiles" className="bt btn-light mb-3 float-left">Back to Profiles</Link>
                        </div>
                        <div className="col-md-6" />
                    </div>
                    <div>
                    {/* Redux not used here, profile data will be from parent object */}
                    <Header profile={profile} />    
                    <About profile={profile}/>
                    <Credentials education={profile.education} experience={profile.experience} />
                    {profile.githubusername ? (<Github username={profile.githubusername}/>) : null}
                    <Github />
                </div>
            </div>
        );
    }
    return (
        <div className="profile">
            <div className="container">
                <div className="row">
                    <div className="col-md-6">
                    {profileContent}
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, { getProfileByHandle })(Profile);
