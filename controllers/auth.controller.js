const User = require('../models/user.model');
const cloudinary = require('../config/cloudinary.config');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const register = async (req, res) => {
    console.log(req.file)
  try {
    const { name, email, phoneNumber, password ,photo} = req.body;
    
    // Check if user already exists
    // const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const result = await cloudinary.uploader.upload(req.file.path);
    
    // Create new user
    const user = new User({
      name,
      email,
      phoneNumber,
      password,
      photo: result.secure_url
    });
console.log(user)
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = (req, res) => {
  res.json({ message: 'Logged in successfully', user: req.user });
};

const logout = (req, res) => {
  req.logout(() => {
    res.json({ message: 'Logged out successfully' });
  });
};

module.exports = {
  register: [upload.single('photo'), register],
  login,
  logout
};