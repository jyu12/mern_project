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
  componentDidMount() {
    if(this.props.match.params.handle) {
        this.props.getProfileByHandle(this.props.match.params.handle)
    }
  }

  render() {
    return (
      <div>
        <Header />
        <About />
        <Credentials />
        <Github />
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
