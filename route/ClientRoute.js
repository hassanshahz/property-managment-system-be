const express = require('express');
const router = express.Router();
const JWT= require('../middleware/JWT');
const rbac = require('../middleware/RBAC');
const { isAdmin, isAgency, isAgent } = require('../middleware/AuthMiddleware.js');
const {createUser, verifyEmail, editUser, deleteUser, loginUser, currentUser} = require('../controllers/ClientController');
const {getAllUser, getAllAgency, getAllAgent} = require('../controllers/AdminController');
const { forgotPassword, resetPassword} = require("../controllers/resetPassword");


router.post('/register', createUser);
router.get('/verify-token', verifyEmail);
router.post('/login', loginUser);
router.get('/current', JWT, currentUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);
router.route('/').get(JWT, isAdmin ,getAllUser);
router.route('/agent').get( JWT, isAdmin, getAllAgent);
router.route('/agency').get(JWT, isAdmin, getAllAgency);
router.route('/agencyAgent').get(JWT, isAgency, getAllAgent);
router.route('/:id').put(JWT, editUser).delete(JWT, deleteUser);


module.exports = router;