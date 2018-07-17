const express = require('express');
const router = express.Router();

router.get('/new', (request, respond) => respond.json({msg: "profile work"}));

module.exports = router;