const Ingredient = require("../db/models/Ingredient");

const getIngredients = async () => {
    return await Ingredient.find();
  };
const createIngredient = async (ingredientData) => {
    return await Ingredient.create(ingredientData);
  };
const getIngredientById = async (id) => {
    return await Ingredient.findById(id);
  };

const updateIngredient = async (id, ingredientData) => {
    const ingredient = await Ingredient.findByIdAndUpdate(id, ingredientData, { new: true });
    if (!ingredient) {
      throw new Error("Ingredient not found");
    }
    return ingredient;
};

module.exports = {
  getIngredients,
  createIngredient,
  getIngredientById,
  updateIngredient
}