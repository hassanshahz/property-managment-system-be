const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/ClientModel");
const NodeMailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
//================================= USER CONTROLLER ======================================

// Set up the transporter for sending emails
const transporter = NodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//------------------------------- USER POST API -----------------------------------

//@des Post all client
//@routes POST api/user/resgister
//@access private

const createUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already registered." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create a new user (not verified yet)
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      role,
      verificationToken,
      isVerified: false,
    });

    await newUser.save();

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/auth/verify-token?token=${verificationToken}&email=${email}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Email Verification",
      html: `<h4>Verify your email</h4><p>Click <a href="${verificationLink}">here</a> to verify your email.</p>`,
    });

    res.status(201).json({
      message: "User registered! Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error." });
  }
});




//=============================== USER REGISTERATION API EMAIL VERIFICATION ========================================

//@des verify email
//@routes GET api/user/verify-email
//@access public


const verifyEmail = asyncHandler(async (req, res) => {
  const { token, email } = req.query;

  const user = await User.findOne({ email, verificationToken: token });

  if (!user) {

    return res.status(400).json({message : 'invalid email or token'})
};

  user.isVerified = true;
  await user.save();

  res.status(200).json({ message: "Email verified successfully" });
});



  //=============================== USER LOGIN API ========================================


//@des login a user
//@routes POST api/client/login
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory");
    }
  
    const user = await User.findOne({ email });
  
    if (!user || !user.isVerified) {
      res.status(401);
      return res.json({ message: "Invalid email or account not verified" });
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if (!isMatch) {
      res.status(401);
      return res.json({ message: "Invalid password" });
    };
  
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
          role: user.role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
  
    res.status(200).json({ accessToken, user });
  });
  
  //=============================== USER CURRENT LOGIN API ========================================
  
  
  //@des current user information
  //@routes POST api/client/current
  //@access private
  
  const currentUser = asyncHandler(
    async (req, res) => {
      res.json(req.user);
    },
    {
      timestamp: true,
    },
  );


//------------------------------- USER PUT API -----------------------------------

//@des Put all client
//@routes PUT api/user/:id
//@access private

const editUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'update user'});
});


//------------------------------- USER DELETE API -----------------------------------

//@des Delete all agency
//@routes DELETE api/user/:id
//@access private

const deleteUser = asyncHandler(async(req,res)=>{
    res.status(200).json({message: 'delete user'});
});
module.exports = { createUser, verifyEmail, loginUser, currentUser, editUser, deleteUser};