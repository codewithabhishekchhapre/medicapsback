const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST /api/signup
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/users', authController.getAllUsers);
router.post("/sendotp",authController.sendOtp)


module.exports = router;