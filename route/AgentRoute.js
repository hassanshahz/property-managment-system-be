const express = require('express');
const router = express.Router();
const {isAgent, isAdmin, isAgency} = require('../middleware/AuthMiddleware');
const jwt= require('../middleware/JWT');
const {creatAgent, editAgent, deleteAgent} = require("../controllers/AgentController");
const {getAllAgent} = require('../controllers/AdminController');


router.route('/').get( isAdmin, getAllAgent);
router.route('/registerAgent').post( isAgent, creatAgent);
router.route('/createAgent').post( jwt, isAgency, creatAgent);
router.route('/:id').put( isAgent, editAgent).delete( isAgent, deleteAgent);


module.exports = router;