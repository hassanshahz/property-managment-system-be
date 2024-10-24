const express = require('express');
const router = express.Router();
const { isAgency, isAdmin} = require('../middleware/AuthMiddleware');
const JWT= require('../middleware/JWT');
const {createAgency, editAgency, deleteAgency, loginAgency} = require('../controllers/AgencyController');
const {getAllAgency} = require('../controllers/AdminController');

router.route('/register').post(createAgency);
router.route('/login').post(loginAgency);
router.route('/').get( isAdmin, getAllAgency);

router.route('/:id').put( isAgency, editAgency).delete( isAgency, deleteAgency);

module.exports = router;