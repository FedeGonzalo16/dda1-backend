const mongoose = require('mongoose');

const QualificationSchema = new mongoose.Schema({
  score: { type: Number, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Recipe', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Qualification', QualificationSchema);