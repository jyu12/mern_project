import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextInputForm from '../common/TextInputForm';
import TextAreaInputForm from '../common/TextAreaInputForm';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from "../../actions/profile";
import isEmpty from '../../validation/is-empty';

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

    componentDidMount() {
        // when component is loaded, data is mapped to props
        // then componentWillReceiveProps will run and the sets of the forms then gets set
        this.props.getCurrentProfile();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
        // .profile is the state .profile is the data itself
        if (nextProps.profile.profile) {
            const profile = nextProps.profile.profile

            const skills = profile.skills.join(',');

            profile.company = !isEmpty(profile.company) ? profile.company : '';
            profile.website = !isEmpty(profile.website) ? profile.website : '';
            profile.location = !isEmpty(profile.location) ? profile.location : '';
            profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
            profile.githubusername = !isEmpty(profile.githubusername) ? profile.githubusername : '';
            profile.social = !isEmpty(profile.social) ? profile.social : {};
            profile.social.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook : {};
            profile.social.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter : {};
            profile.social.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube : {};
            profile.social.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin : {};

            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.twitter,
                facebook: profile.facebook,
                linkedin: profile.linkedin,
                youtube: profile.youtube
            });
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
                        <h1 className="display-4 text-center">Edit Profile</h1>
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
        createProfile: PropTypes.func.isRequired,
        getCurrentProfile: PropTypes.func.isRequired,
        profile: PropTypes.object.isRequired,
        errors: PropTypes.object.isRequired
    };

    const mapStateToProps = state => ({
        profile: state.profile,
        errors: state.errors
    });

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(withRouter(CreateProfile)); 