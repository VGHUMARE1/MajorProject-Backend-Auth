const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');
const bcrypt=require("bcryptjs")

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const user = await User.findOne({ email });
    console.log(user)
    if (!user) return done(null, false, { message: 'Incorrect email' });
    
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) return done(null, false, { message: 'Incorrect password' });

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});