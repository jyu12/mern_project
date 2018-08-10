const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const keys = require('../../config/keys');
const config = require('../../config/config');

const User = require('../../models/User');

const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');

// the function caller, this case 'server.js', is calling this file with app.use('/api/users', user)
// So when accessing this endpoint with the URL prefix of localhost../api/users/
// this will still need to be accessed using /api/users/new
/*  Good practice to document the endpoint with that it does.
    @route   GET api/posts/test
    @desc    Tests users route
    @access  Public 
*/
// router.get('/test', (request, response) => response.json({msg: "user work"}));  // automatically return status 200 and as a .json

//  @route   POST api/users/register
//  @desc    register the user
//  @access  Public 
router.post('/register', (request, response) => {
    // de-structuring in JS?
    const { errors, isValid } = validateRegisterInput(request.body);
    if(!isValid) {
        return response.status(400).json(errors);
    }

    User.findOne({ email: request.body.email }) // using body-parser to get e-mail from request
        .then(user => { // mongoose can take in call-backs or promises
            if(user) {
                return response  // http response as status
                    .status(400)  // 400 for validation error
                    .json({ email: 'E-mail already exist' }); // replaces email field with this message
            } else {
                const avatar = gravatar.url(request.body.email, { // Gravatar will be used in this app
                    size: '200',
                    rating: 'pg',
                    default: 'mm'
                });

                const newUser = new User({  // creating resource in mongoose, just pass in the obj
                    name: request.body.name,    // which will come from React
                    email: request.body.email,
                    avatar, 
                    password: request.body.password
                }); 
                // example Bcrypt to encrypt passwords
                bcrypt.genSalt(10, (error, salt) => { // return error or the salt 
                    bcrypt.hash(newUser.password, salt, (error, hash) => { 
                        if(error) throw error;
                        newUser.password = hash;
                        newUser.save()  // saving the new user along with the hashed password to mongoose
                               .then(user => response.json(user))    // then return the user
                               .catch(error => console.log(error));
                    })
                })
            }
        });
});

//  @route   GET api/users/login
//  @desc    login use, return the jwt login token
//  @access  Public 
/*
    JWT Token is validated by passport & passportJWT and extract information from it
*/
router.post('/login', (request, response) => {
    const { errors, isValid } = validateLoginInput(request.body);

    if (!isValid) {
        return response.status(400).json(errors);
    }

    const email = request.body.email;
    const password = request.body.password;

    User.findOne({ email }).then(user => {
        if(!user) {
            errors.email = 'User does not exist';
             return response.status(404).json(errors);
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch) {
                // response.json({ msg: 'Success'});
                // JWT to generate a token

                // Sign the token payload with user info
                const payload = { id: user.id, name: user.name, avatar: user.avatar };
                // token is then put into the head of response and passport will validate it
                // then server validate user
                jwt.sign(payload, keys.jwtSKey, { expiresIn: config.jwtLifetime }, (error, token) => {
                    response.json({
                        success: true,
                        token: 'Bearer ' + token, // by doing 'Bear ' + token, it is saying that this is type of 'Bearer'
                    });
                });
            } else {
                errors.password = 'Password incorrect'
                return response.status(400).json({ password });
            }
            // return isMatch === true ? response.json({ msg: 'Success'}) 
            //     : response.status(400).json({ password: 'Password incorrect'})
        });
    });
});

//  @route   GET api/users/current
//  @desc    Return the user that is associated with the token
//  @access  Private
/*
    private - meaning that it is using JWT and Passport to authenticate first
*/
router.get('/current', passport.authenticate('jwt', { session: false }), (request, response) => {
    // since strategy for passport was configured to return the 'user'
    response.json({name: request.user.name, email: request.user.email});
});

module.exports = router; // exports it