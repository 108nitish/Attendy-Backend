import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator"; 


const createToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
}

const registerUser = async (req, res) => { 
  try {
    const { name, email, password } = req.body;
    // return res.json({success: false, message: req.body});
    if(!validator.isEmail(email)) {
      return res.json({success: false, message: "Invalid Email"});
    }
    if(password.length < 6) {
      return res.json({success: false, message: "Password must be atleast 6 characters"});
    }
    const checkUser = await User.findOne({email});
    if(checkUser) {
      return res.json({success: false, message: "Email already exists"});
    }
    const  hashedPassword = await bcrypt.hash(password, 10);
     
    try {
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword
      });
      // const user = await newUser.save();
      const token = createToken(newUser._id);
      res.json({ success: true, message: "User Registered", token });
    } catch (err) {
      console.error("MongoDB Save Error:", err);
      return res.json({ success: false, message: "Database Save Error", error: err.message });
    }

  } catch (error) {
    console.log(error);
    return res.json({sucess: false, message: "Registration failed"});
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    if(!validator.isEmail(email) || !password) {
      return res.json({success: false, message: "Invalid Email or Password"});
    }
    const user = await User.findOne({ email });
    if(!user) {
      return res.json({success: false, message: "User not Exists"});
    }   
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) {
      return res.json({success: false, message: "Invalid Password"});
    }
    const token = createToken(user._id);
    res.json({ success: true, message: "User Logged In", token });
  }
  catch (error) {
    console.log(error);
    return res.json({sucess: false, message: "Login failed"});
  }   
}

export { registerUser, loginUser };