const express = require('express');
const router = express.Router();
const {isAgent, isAdmin} = require('../middleware/AuthMiddleware');
const JWT= require('../middleware/JWT');
const {creatAgent, editAgent, deleteAgent} = require("../controllers/AgentController");
const {getAllAgent} = require('../controllers/AdminController');


router.route('/').get( isAdmin, getAllAgent);
router.route('/registerAgent').post( isAgent, creatAgent);
router.route('/:id').put( isAgent, editAgent).delete( isAgent, deleteAgent);


module.exports = router;