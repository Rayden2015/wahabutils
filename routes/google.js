const express = require('express');
const router = express.Router();


//Importing Google Controller
const { measureDistance } = require('../controllers/googleController');

//
router.route('/google/distance/:origin/:destination').get(measureDistance);


module.exports = router;