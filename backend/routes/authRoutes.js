const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
console.log(authController); // <-- this should show { register: [Function], login: [Function] }

// Register route
router.post('/register', authController.register);

// Login route
router.post('/login', authController.login);

// // Forgot password route (placeholder)
router.post('/forgot-password', authController.forgotPassword);

router.post('/reset-password/:token', authController.resetPassword);

// // Optional: Logout
// router.post('/logout', authController.logout);

module.exports = router;
