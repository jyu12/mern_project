/* Example of a model, standard convention is SingluarThing.js*/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Creating schema in using 
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        // required: true, not getting in as input, it's from gavatar email input
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// exports Model as 'users', so client will need to import as 'users'
module.exports = User = mongoose.model('users', UserSchema);