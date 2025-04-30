const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login',(req,res,next)=>{console.log("login");console.log(req.body); next()}, passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);

module.exports = router;
