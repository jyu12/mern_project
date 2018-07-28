/*  
    Example configuration that reads JWT from Authorization header with the scheme 'bearer'
*/

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const User = mongoose.model('users');

const keys = require('../config/keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.jwtSKey;

// strategy for passport
// client passes in (passport); ex. require('./config/passport')(passport);
module.exports = (passport) => {
    // jwtPayload will contain the user data as part of the token
    passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
        User.findById(jwtPayload.id).then(user => {
            if(user) {
                return done(null, user) // returns the user 
            }
            return done(null, false);
        }).catch(error => console.log(error))
    }));
}