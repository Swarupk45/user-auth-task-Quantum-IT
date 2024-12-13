const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const router = express.Router();

const JWT_SECRET = "your_jwt_secret";

// Register
router.post("/register", async (req, res) => {
  const { name, dob, email, password } = req.body;
  console.log("in register backend")

  try {
    
    const user = new User({ name, dob, email, password });
    console.log("user",user)
    const user1=await user.save();
    console.log("user",user1)
    res.status(201).json({message:"User Successfully",user1});
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Login
router.post("/login", async (req, res) => {
 
  const { email, password } = req.body;
  console.log("in login backend",email)
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      console.log("User not found")
      return
    } 

    
    console.log("user found login backend hey",user);
    if (user.password !== password) {
      console.log("User credentials do not match in login backend");
      return res.status(400).send("Invalid credentials");
    }
   

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const users = await User.find(); 
    res.json({ users, token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
