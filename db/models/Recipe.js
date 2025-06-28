const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tags: [String],
  description: { type: String, required: true },
  image: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  procedures: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Procedure' }],
  ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
}, { timestamps: true });

module.exports = mongoose.model('Recipe', RecipeSchema);