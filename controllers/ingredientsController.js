const IngredientsService = require('../services/ingredientsService');

const getIngredients = async (req, res) => {
  try {
    const ingredients = await IngredientsService.getIngredients();
    return res.status(200).json({
      method: "getIngredients",
      message: "Ingredients retrieved successfully",
      ingredients: ingredients,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getIngredients",
      message: "Server Error",
    });
  }
};

module.exports = {
  getIngredients,
};
