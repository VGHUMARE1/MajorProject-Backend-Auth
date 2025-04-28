require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const connectDB = require('./config/database.config');
const authRoutes = require('./routes/auth.routes');
const path = require("path");

const app = express();

// Database connection
connectDB();

// Add this after session middleware in app.js
app.use(express.static('public'));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI })
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport.config');

// Routes
app.use('/auth', authRoutes);


// Add profile route (example protected route)
app.get('/profile', (req, res) => {
    if(!req.isAuthenticated()) return res.redirect('/login.html');
    res.sendFile(path.join(__dirname, 'public/profile.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});