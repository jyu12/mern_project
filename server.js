// import {express} from './node_modules/'; Not supported yet
// Remember.. requires needs dir path if not root
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const app = express();
const db = require('./config/keys').mongoURI;

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// passport middleware
app.use(passport.initialize());
// Passport Config - Strategies??
require('./config/passport')(passport); // (passport) is passed into the passport file in config

// using a promise - if success 'then'... 'catch' any error
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// creating a route using express
app.get('/', (request, respond) => {
    respond.send('Hello');
});

// Using the routes *May see a Route.use() requires middleware function but got obj* It just means that there were no usable functions in file
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Serve static resources if in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    // if any of the routes are requested, the client index file is used.
    app.get('*', (request, response) => {
        response.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// process.env.PORT for when deploying to a server, locally it will use 5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`server running on port ${port}`));