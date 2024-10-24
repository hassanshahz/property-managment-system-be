const asyncHandler = require("express-async-handler");
const Agency = require('../model/AgencyModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require("dotenv").config();

const JWT_SECRET = process.env.ACCESS_TOKEN_SECRET;

//================================= AGENCY CONTROLLER ======================================

//------------------------------- AGENCY POST API -----------------------------------

//@des Post all agency
//@routes POST api/agency/resgisterAgency
//@access private

const createAgency = asyncHandler(async (req, res) => {
    const { name, email, phone, address, password } = req.body;
  
    try {
      const newAgency = new Agency({ name, email, phone, address, password });
      await newAgency.save();
      res.status(201).json({ message: 'Agency created successfully!' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });


  const loginAgency = asyncHandler(async(req, res) => {
    const { email, password } = req.body;
  console.log("check",req.body)
    try {
      const agency = await Agency.findOne({ email });
      console.log('agency',agency)
      if (!agency) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const isMatch = await agency.comparePassword(password);
      if (!isMatch) {
        console.log('password not matched')
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ id: agency._id }, JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });


//------------------------------- AGENCY PUT API -----------------------------------

//@des Put all agency
//@routes PUT api/agency/:id
//@access private

const editAgency = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'update agency'});
});


//------------------------------- AGENCY DELETE API AGENCIES -----------------------------------

//@des Delete all agency
//@routes DELETE api/agency/:id
//@access private

const deleteAgency = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'delete agency'});
});
module.exports = {createAgency, loginAgency, editAgency, deleteAgency};