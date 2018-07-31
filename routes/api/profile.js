const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

const validateProfileInput = require('../../validation/profile');
const validateExperienceInput = require('../../validation/Experience');
const validateEducationInput = require('../../validation/Education');

//  @route   GET api/profile/
//  @desc    get current profile
//  @access  Public 
router.get('/new', (request, response) => response.json({msg: "profile work"}));

//  @route   GET api/profile/
//  @desc    get current users profile
//  @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (request, response) => {
    const errors = {};
    Profile.findOne({ user: request.user.id })
        .populate('user', ['name', 'avatar'])   // populates from the 'user' collection, it just eagerload by default?
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'Profile not found';
                return response.status(404).json(errors);
            }
            response.json(profile);
        })
        .catch(error => response.status(404).json(error));
});


//  example of a backend api that will be used during frontend development
//  @route   GET api/profile/handle/ :handle
//  @desc    get profile by handle
//  @access  public 
router.get('/handle/:handle', (request, response) => {
    const errors = {};
    // placeholder and params
    Profile.findOne({ handle: request.params.handle})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'Profile not found';
            response.status(404).json(errors);
        }
        response.json(profile);
    })
    .catch(error => response.status(404).json(errro));
});

//  @route   GET api/profile/user/ :userId
//  @desc    get profile by userID
//  @access  public 
router.get('/user/:userId', (request, response) => {
    const errors = {};
    // placeholder and params
    Profile.findOne({ user: request.params.userId})
    .populate('user', ['name', 'avatar'])
    .then(profile => {
        if(!profile) {
            errors.noprofile = 'User not found';
            response.status(404).json(errors);
        }
        response.json(profile);
    })
    .catch(error => response.status(404).json({ profile: 'Profile not found for this user' }));
});

//  @route   GET api/profile/user/ :userId
//  @desc    get profile by userID
//  @access  public 
router.get('/all', (request, response) => {
    const errors = {};

    Profile.find()
    .populate('user', ['name', 'avatar'])
    .then(profiles => {
        if (!profiles) {
            return request.status(404).json('No profiles exist');
        }
        response.json(profiles);
    })
});

//  @route   POST api/profile/
//  @desc    creates/update a user profile
//  @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (request, response) => {
    // Get fields from request payload and create profile from it
    // Experience and Skill are on their own page.
    const { errors, isValid } = validateProfileInput(request.body);
    const profileFields = {};
    
    if (!isValid) {
        return response.status(400).json(errors);
    }

    profileFields.user = request.user.id;
    // checks to see if the profile was from handle?
    if (request.body.handle) profileFields.handle = request.body.handle;
    if (request.body.company) profileFields.company = request.body.company;
    if (request.body.website) profileFields.website = request.body.website;
    if (request.body.location) profileFields.location = request.body.location;
    if (request.body.status) profileFields.status = request.body.status;
    if (request.body.bio) profileFields.bio = request.body.bio;
    if (request.body.githubusername) profileFields.githubusername = request.body.githubusername;
    
    if (typeof request.body.skills !== 'undefined') {
        profileFields.skills = request.body.skills.split(',');
    }
    // Social is an object of fields, it needs to be initialized here first?
    profileFields.social = {};
    if (request.body.youtube) profileFields.social.youtube = request.body.youtube;
    if (request.body.facebook) profileFields.social.facebook = request.body.facebook;
    if (request.body.linkedin) profileFields.social.linkedin = request.body.linkedin;
    if (request.body.twitter) profileFields.social.twitter = request.body.twitter;

    Profile.findOne({ user: request.user.id })
        .then(profile => {
            // update
            if (profile) {
                Profile.findOneAndUpdate({ user: request.user.id }, { $set: profileFields }, { new: true })
                .then(profile => response.json(profile));
            } else  { 
                Profile.findOne({ handle: profileFields.handle }).then(profile => {
                    if (profile) {
                        errors.handle = 'Handle already exist';
                        response.status(400).json(errors); 
                    }
                    // save
                    new Profile(profileFields).save().then(profile => response.json(profile));
                });
            }
        });
});

//  @route   POST api/profile/experience
//  @desc    Add experience to profile
//  @access  private
router.post('/experience', passport.authenticate('jwt', { session: false }), (request, response) => {
    const { errors, isValid } = validateExperienceInput(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    Profile.findOne({ user: request.user.id })
    .then(profile => {
        const newExperience = {
            title: request.body.title,
            company: request.body.company,
            location: request.body.location,
            from: request.body.from,
            to: request.body.to,
            current: request.body.current,
            description: request.body.description
        }
        profile.experience.unshift(newExperience);
        profile.save().then(profile => response.json(profile));
    })
});

//  @route   POST api/profile/education
//  @desc    Add educationto profile
//  @access  private
router.post('/education', passport.authenticate('jwt', { session: false }), (request, response) => {
    const { errors, isValid } = validateEducationInput(request.body);
    
    if (!isValid) {
        return response.status(400).json(errors);
    }

    Profile.findOne({ user: request.user.id })
    .then(profile => {
        const newEducation = {
            school: request.body.school,
            degree: request.body.degree,
            fieldofstudy: request.body.fieldofstudy,
            from: request.body.from,
            to: request.body.to,
            current: request.body.current,
            description: request.body.description
        }
        profile.education.unshift(newEducation);
        profile.save().then(profile => response.json(profile));
    })
});


//  @route   DELETE api/profile/experience/exp_id
//  @desc    delete experience in profile
//  @access  private
router.delete('/experience/:expId', passport.authenticate('jwt', { session: false }), (request, response) => {

    Profile.findOne({ user: request.user.id }).then(profile => {
        // get idx
        const removeIdx = profile.experience
            .map(item => item.id)
            .indexOf(request.params.expId);
        // remove
        profile.experience.splice(removeIdx, 1);
        profile.save().then(profile => response.json(profile))
        .catch(error => response.status(404).json(error));
    });
});

//  @route   delete api/profile/education
//  @desc    remove education in profile
//  @access  private
router.delete('/education/:eduId', passport.authenticate('jwt', { session: false }), (request, response) => {

    Profile.findOne({ user: request.user.id }).then(profile => {
        // get idx
        const removeIdx = profile.education
            .map(item => item.id)
            .indexOf(request.params.eduId);
        // remove
        profile.education.splice(removeIdx, 1);
        profile.save().then(profile => response.json(profile))
        .catch(error => response.status(404).json(error));
    });
});

//  @route   delete api/profile/
//  @desc    remove user and profile
//  @access  private
router.delete('/', passport.authenticate('jwt', { session: false }), (request, response) => {
    Profile.findOneAndRemove({ user: request.user.id })
    .then(() => {
        User.findOneAndRemove({ _id: request.user.id })
            .then(() => response.json({ success: true }))
    })
});

module.exports = router;