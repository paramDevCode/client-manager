const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Client = require('../models/Client');
const Log = require('../models/Log');
 
router.get('/stats', async (req, res) => {
  try {
    const totalProjects = await Project.countDocuments();
    const activeClients = await Client.countDocuments({ isActive: true });
    const pendingTasks = await Project.countDocuments({ status: 'Pending' });

    const recentUpdates = await Log.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalProjects,
      activeClients,
      pendingTasks,
      recentUpdates
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch dashboard stats' });
  }
});

module.exports = router;
