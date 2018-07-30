const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const passport = require('passport');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

//  @route   POST api/profile/
//  @desc    get current profile
//  @access  Public 
router.get('/new', (request, respond) => respond.json({msg: "profile work"}));

//  @route   POST api/profile/
//  @desc    get current users profile
//  @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (request, respond) => {
    const errors = {};
    Profile.findOne({ user: request.user.id })
        .then(profile => {
            if(!profile) {
                errors.noprofile = 'Profile not found';
                return respond.status(404).json(errors);
            }
            respond.json(profile);
        })
        .catch(error => respond.status(404).json(error));
});


module.exports = router;