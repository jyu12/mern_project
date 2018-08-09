import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class Header extends Component {
  render() {
    const { profile } = this.props;

    return (
        <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img className="rounded-circle" src={profile.user.avatar} alt="" />
              </div>
            </div>
            <div className="text-center">
              <h1 className="display-4 text-center">{profile.user.name}</h1>
              <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null :
               (<span>at {profile.company}</span>)}
               </p>
              {isEmpty(profile.location) ? null : <p>{profile.location}</p>}
              <p>
                {/* Need to update how the links are handled. http:// is added here because user did not enter http:// when adding links  */}
                {isEmpty(profile.website) ? null : (
                  <a className="text-white p-2" href={`http://`+profile.website} target="_blank">
                  <i className="fab fa-globe fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a className="text-white p-2" href={`http://`+profile.social.twitter} target="_blank">
                  <i className="fab fa-twitter fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a className="text-white p-2" href={`http://`+profile.social.youtube} target="_blank">
                  <i className="fab fa-youtube fa-2x"></i>
                  </a>
                )} 
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a className="text-white p-2" href={`http://`+profile.social.facebook} target="_blank">
                  <i className="fab fa-facebook fa-2x"></i>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a className="text-white p-2" href={`http://`+profile.social.linkedin} target="_blank">
                  <i className="fab fa-linkedin fa-2x"></i>
                  </a>
                )}                                 
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;