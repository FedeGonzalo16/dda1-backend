const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  stars: { type: Number, default: 0 },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Qualification', QualificationSchema);