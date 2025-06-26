const Ingredient = require("../db/models/Ingredient");

const getIngredients = async () => {
    return await Ingredient.find();
  };

module.exports = {
  getIngredients
}