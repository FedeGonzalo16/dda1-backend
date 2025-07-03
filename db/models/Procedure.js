const mongoose = require('mongoose');

const ProcedureSchema = new mongoose.Schema({
  content: { type: String, required: true },
  media: String, // URL
}, { timestamps: true });

module.exports = mongoose.model('Procedure', ProcedureSchema);