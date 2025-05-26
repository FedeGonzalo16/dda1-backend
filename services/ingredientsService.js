const { Ingredients } = require("../db/database");

const getIngredients = async () => {
    return await Ingredients.find();
  };

module.exports = {
  getIngredients
}