const Ingredient = require("../db/models/Ingredient");

const getIngredients = async () => {
    return await Ingredient.find();
  };
const createIngredient = async (ingredientData) => {
    return await Ingredient.create(ingredientData);
  };


module.exports = {
  getIngredients,
  createIngredient
}