const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// Get all projects
router.get('/', async (req, res) => {
  const projects = await Project.find().populate('clientId', 'name');
const company = await Project.find() .populate('clientId', 'name company contact')

  res.json(company);
});

// Add new project
 router.post('/', async (req, res) => {
  try {
    const newProject = new Project(req.body);
    const saved = await newProject.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({
      message: "Failed to create project",
      details: err.errors?.name?.message || err.message
    });
  }
});

// Update project
router.put('/:id', async (req, res) => {
  const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(project);
});

// Delete project
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Project deleted' });
});

module.exports = router;
