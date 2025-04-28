const express = require('express');
const router = express.Router();
const passport = require('passport');
const authController = require('../controllers/auth.controller');

router.post('/register', authController.register);
router.post('/login', passport.authenticate('local'), authController.login);
router.post('/logout', authController.logout);

module.exports = router;