const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  name: String,
  company: String,
  contact: String,
  isActive: Boolean
});

module.exports = mongoose.model('Client', clientSchema);
