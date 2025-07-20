const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  status: {
    type: String,
    enum: ['Planning', 'In Progress', 'Completed', 'On Hold'],
    default: 'Planning'
  },
  typeOfWork: {
    type: String,
    enum: [
      'PEB Structure',
      'Tensile Structure',
      'Polycarbonate Roofing',
      'PUF Panel Roofing',
      'Tile Roofing',
      'Shingles Roofing',
      'Turnkey Project',
      'Other'
    ],
    required: true
  },
  startDate: { type: Date, default: Date.now },
  deadline: { type: Date },
  location: { type: String },
  notes: { type: String },
  budget: { type: Number },
  materialsNeeded: [{ type: String }],
  assignedTeam: { type: String },
  isArchived: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', projectSchema);
