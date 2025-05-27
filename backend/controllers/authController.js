const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    user = new User({ name, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
    res.cookie('token', jwtToken, {
  httpOnly: true,     // client JS cannot access cookie
  secure: process.env.NODE_ENV === 'production', // cookie only sent over HTTPS in prod
  sameSite: 'strict', // helps prevent CSRF
  maxAge: 24 * 60 * 60 * 1000 // 1 day expiry
});
res.json({ message: 'User logged in' });

  } catch (err) {
  console.error("Register Error:", err); // Add this
  res.status(500).json({ message: "Server error", error: err.message }); // Optionally expose error for debugging
}

};
