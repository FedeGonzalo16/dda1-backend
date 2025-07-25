const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  unit: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Ingredient', IngredientSchema);