import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInputForm from '../common/TextInputForm';
import TextAreaInputForm from '../common/TextAreaInputForm';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from "../../actions/profile";

class CreateProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubusername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            errors: { }
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
        this.setState({errors: nextProps.errors});
    }
}    
onSubmit(event) {
    event.preventDefault();

    const profileData = {
        handle: this.state.handle,
        company: this.state.company,
        website: this.state.website,
        location: this.state.location,
        status: this.state.status,
        skills: this.state.skills,
        githubusername: this.state.githubusername,
        twitter: this.state.twitter,
        bio: this.state.bio,
        linkedin: this.state.linkedin,
        facebook: this.state.facebook,
        youtube: this.state.youtube
    }

    this.props.createProfile(profileData, this.props.history);
}

onChange(event) {
    this.setState({[event.target.name]: event.target.value});
}

render() {
    const { errors, displaySocialInputs } = this.state;

    let socialInputs;
    if (displaySocialInputs) {
        socialInputs = (
            <div>
                <InputGroup
                    placeholder="Twitter Profile URL"
                    name="twitter"
                    icon="fab fa-twitter"
                    value={this.state.twitter}
                    onChange={this.onChange}
                    error={errors.twitter}
                />
                <InputGroup
                    placeholder="Facebook Profile URL"
                    name="facebook"
                    icon="fab fa-facebook"
                    value={this.state.facebook}
                    onChange={this.onChange}
                    error={errors.facebook}
                />
                <InputGroup
                    placeholder="YouTube Profile URL"
                    name="youtube"
                    icon="fab fa-youtube"
                    value={this.state.youtube}
                    onChange={this.onChange}
                    error={errors.youtube}
                />
                <InputGroup
                    placeholder="Linkedin Profile URL"
                    name="linkedin"
                    icon="fab fa-linkedin"
                    value={this.state.linkedin}
                    onChange={this.onChange}
                    error={errors.linkedin}
                />
            </div>
        )
    }

    // Static list of options.. 
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Student', value: 'Student' },
        { label: 'Baker', value: 'Baker' },
        { label: 'Developer', value: 'Developer' },
        { label: 'Lottery Winner', value: 'Lottery Winner' },
        { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
        <div className="col-md-8 m-auto">
            <h1 className="display-4 text-center">Create Profile</h1>
            <p className="lead text-center">
                Begin with basic information.
            </p>
            <small className="d-block pb-3">* = required fields</small>
            <form onSubmit={this.onSubmit}>
                <TextInputForm 
                    placeholder="* Profile Handle"
                    name="handle"
                    value={ this.state.handle }
                    onChange={ this.onChange }
                    error={ errors.handle }
                    info="Unique handle for the profile"    
                />
                <SelectListGroup 
                    placeholder="Status"
                    name="status"
                    value={ this.state.status }
                    onChange={ this.onChange }
                    options={ options }
                    error={ errors.status }
                    info="Where you are at professionally?"    
                />
                <TextInputForm 
                placeholder="Company"
                name="company"
                value={ this.state.company }
                onChange={ this.onChange }
                error={ errors.company }
                info="Or your own company"    
                />
                <TextInputForm 
                placeholder="Website"
                name="website"
                value={ this.state.website }
                onChange={ this.onChange }
                error={ errors.website }
                />
                <TextInputForm 
                placeholder="Location"
                name="location"
                value={ this.state.location }
                onChange={ this.onChange }
                error={ errors.location }
                />
                <TextInputForm 
                placeholder="* Skills"
                name="skills"
                value={ this.state.skills }
                onChange={ this.onChange }
                error={ errors.skills }
                info="Seperate each skill by comma ex. HTML, CSS, JS"
                />
                <TextInputForm 
                placeholder="Github"
                name="githubusername"
                value={ this.state.githubusername }
                onChange={ this.onChange }
                error={ errors.githubusername }
                info="Latest Repos will be linked"
                />
                <TextAreaInputForm 
                placeholder="Bio"
                name="bio"
                value={ this.state.bio }
                onChange={ this.onChange }
                error={ errors.bio }
                info="A short bio about you"
                />
                <div className="md-3">
                    <button 
                        type="button" 
                        // display the social inputs contents when the button is clicked
                        onClick={() => {
                        this.setState(prevState => ({
                            displaySocialInputs: !prevState.displaySocialInputs
                        }))
                    }} className="btn btn-light">Add Social Network Link</button>
                    <span className="text-muted"> Optional</span>
                </div>
                {socialInputs}
                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
            </form>
            </div>
        </div>
      </div>
    )
  }
}

CreateProfile.PropTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(withRouter(CreateProfile)); 