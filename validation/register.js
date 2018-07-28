const Validator = require('validator'); // validator will only take strings
const isEmpty = require('./is-empty');

// just means that this file has it's own function name
module.exports = function validateRegisterInput(data) {
    let errors = {};
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.confirmPassword = !isEmpty(data.confirmPassword) ? data.confirmPassword : '';

    if(!Validator.isLength(data.name, { min: 2, max: 30 })) {
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if(Validator.isEmpty(data.name)) {
        errors.name = 'Name field is required';
    }

    if(!Validator.isEmail(data.email)) {
        errors.email = 'Email field is required';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if(Validator.isLength(data.password, { min: 6, max: 30 })) {
        errors.password = 'Password field is required to be at least 6 to 30 characters';
    }

    if(!Validator.isEqual(data.password, data.confirmPassword)) {
        errors.password = 'Password not the same';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}