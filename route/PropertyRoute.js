const express = require('express');
const {createProperty, getAllProperties, userAllProperties} = require('../controllers/PropertyContoller');
const jwt = require('../middleware/JWT');
const { isAdmin, isAgency, isAgent } = require('../middleware/AuthMiddleware.js');
const router = express.Router();

router.route('/register').post(jwt,createProperty);
router.route('/').get(jwt, isAdmin, getAllProperties);
router.route('/user').get(jwt, userAllProperties);

module.exports = router;