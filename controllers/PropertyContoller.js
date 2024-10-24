const asyncHandler = require("express-async-handler");
const Property = require('../model/PropertyModel');

//================================= PROPERTY CONTROLLER ======================================

//------------------------------- PROPERTY POST API -----------------------------------

// @desc    Create a new property
// @route   POST /api/property/register
// @access  Private (accessible only by Agents)

const createProperty = asyncHandler(async (req, res) => {
  const { title, description, price, location } = req.body;

  // Check if all fields are provided
  if (!title || !description || !price || !location) {
    res.status(400);
    throw new Error('Please provide all required fields');
  }

  // Create the property
  const property = await Property.create({
    title,
    description,
    price,
    location,
    user_id: req.user.id,
  });

  // Return the created property in response
  res.status(201).json({
    _id: property._id,
    title: property.title,
    description: property.description,
    price: property.price,
    location: property.location,
    user_id: property.user_id,
  });
});


//------------------------------- PROPERTY POST API -----------------------------------


// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const getAllProperties = asyncHandler(async (req, res) => {
    const properties = await Property.find();
    res.json(properties);
  });

//------------------------------- PROPERTY POST API -----------------------------------


// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
const userAllProperties = asyncHandler(async (req, res) => {
  console.log('sajdlfkds',req.user.id)
    const properties = await Property.find({user_id: req.user.id});
    res.json(properties);
  });

module.exports = {createProperty, getAllProperties, userAllProperties};
