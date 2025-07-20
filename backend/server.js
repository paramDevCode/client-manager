const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:4200"], // Allow both origins
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/projects', require('./routes/project'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
