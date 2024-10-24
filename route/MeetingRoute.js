const express = require('express');
const { createMeeting } = require('../controllers/MeetingController');
const { isAdmin, isAgency, isAgent } = require('../middleware/AuthMiddleware.js');
const JWT= require('../middleware/JWT');

const router = express.Router();

router.route('/meetings').post(JWT, isAdmin,createMeeting);

module.exports = router;
