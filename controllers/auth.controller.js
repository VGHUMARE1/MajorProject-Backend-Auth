const User = require('../models/user.model');
const cloudinary = require('../config/cloudinary.config');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const register = async (req, res) => {
    
  try {
    const { name, email, phoneNumber, password ,photo} = req.body;
    
    // Check if user already exists
    // const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    console.log(result)
    // Create new user
    const user = new User({
      name,
      email,
      phoneNumber,
      password,
      photo: result.secure_url,
      userRes:true
    });
    console.log(user)
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    // Update userRes to true on successful login
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { userRes: true },
      { new: true }
    );

    res.json({ 
      message: 'Logged in successfully',
      user: updatedUser 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  try {
    const userId = req.user?._id;
    
    req.logout(async (err) => {
      if (err) {
        return res.status(500).json({ 
          message: 'Error during logout',
          error: err.message 
        });
      }

      // Update userRes to false if user ID exists
      if (userId) {
        await User.findByIdAndUpdate(
          userId,
          { userRes: false },
          { new: true }
        );
      }

      res.status(200).json({ 
        message: 'Logged out successfully',
        userRes: false 
      });
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Logout successful but status update failed',
      error: error.message 
    });
  }
};

const isUserInApp = async (req, res) => {
    console.log(req.body);
  try {
    const userId = req.body?._id;
    const latitude =req.body.latitude;
    const longitude =req.body.longitude;

    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Set userRes to false
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { userRes: false ,latitude :latitude, logitude : longitude},
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'User status updated to inactive',
      userRes: updatedUser.userRes 
    });
    
  } catch (error) {
    res.status(500).json({ 
      message: 'Error updating user status',
      error: error.message 
    });
  }
};
module.exports = {
  register: [upload.single('photo'), register],
  login,
  logout,
  isUserInApp
};
