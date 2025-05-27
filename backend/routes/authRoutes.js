const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
// similarly add login and forgot password later

module.exports = router;
