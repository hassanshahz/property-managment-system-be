const asyncHandler = require("express-async-handler");
const User = require("../model/ClientModel");


//================================= AGENCY CONTROLLER ======================================

//------------------------------- ADMIN GET API AGENCIES -----------------------------------

//@des Get all agency
//@routes GET api/client/agency
//@access private

const getAllAgency = asyncHandler(async (req, res) => {
    const users = await User.find({role : 'agency'});
    res.json(users);
  });


  //------------------------------- ADMIN GET API AGENT -----------------------------------

//@des Get all agent
//@routes GET api/client/agent
//@access private

const getAllAgent = asyncHandler(async (req, res) => {
  const users = await User.find({role : 'agent'});
    res.json(users);
  });


//------------------------------- ADMIN GET API USERS -----------------------------------

//@des Get all client
//@routes GET api/client
//@access private

const getAllUser = asyncHandler(async (req, res) => {
    const users = await User.find({role : 'user'});
    res.json(users);
  });

module.exports = {getAllAgency, getAllAgent, getAllUser};