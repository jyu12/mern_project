const Validator = require('validator');
const isEmpty = require('./is-empty');

// just means that this file has it's own function name
module.exports = function validateExperienceInput(data) {
    let errors = {};
    data.title = !isEmpty(data.title) ? data.title : '';
    data.company = !isEmpty(data.company) ? data.company : '';
    data.from = !isEmpty(data.from) ? data.from : '';

    if(Validator.isEmpty(data.title)) {
        errors.title = 'title field is required';
    }

    if(Validator.isEmpty(data.company)) {
        errors.company = 'company field is required';
    }

    if(Validator.isEmpty(data.from)) {
        errors.from = 'from field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors),
    }
}