const express = require('express');
const router = express.Router();

// the function caller, this case 'server.js', is calling this file with app.use('/api/users', user)
// So when accessing this endpoint with the URL prefix of localhost../api/users/
// this will still need to be accessed using /api/users/new
/*  Good practice to document the endpoint with that it does.
    @route   GET api/posts/test
    @desc    Tests users route
    @access  Public 
*/
router.get('/test', (request, respond) => respond.json({msg: "user work"}));  // automatically return status 200 and as a .json

module.exports = router; // exports it