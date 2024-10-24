const asyncHandler = require("express-async-handler");

//================================= AGENT CONTROLLER ======================================

//------------------------------- AGENT POST API -----------------------------------

//@des Post all agent
//@routes POST api/agent/resgisterAgent
//@access private

const creatAgent = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'post new agent'});
});


//------------------------------- AGENT PUT API -----------------------------------

//@des Put all agent
//@routes PUT api/agent/:id
//@access private

const editAgent = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'update agent'});
});


//------------------------------- AGENT DELETE API AGENCIES -----------------------------------

//@des Delete all agent
//@routes DELETE api/agent/:id
//@access private

const deleteAgent = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'delete agent'});
});
module.exports = { creatAgent, editAgent, deleteAgent};