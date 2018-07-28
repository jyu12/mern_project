const Validator = require('validator'); // validator will only take strings
const isEmpty = require('./is-empty');

// just means that this file has it's own function name
module.exports = function validateLoginInput(data) {
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}