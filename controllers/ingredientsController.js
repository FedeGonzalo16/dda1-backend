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

const createIngredient = async (req, res) => {
  try{
    const newIngredient = await IngredientsService.createIngredient(req.body);
    return res.status(201).json({
      method: "createIngredient",
      message: "Ingredient created successfully",
      ingredient: newIngredient,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "createIngredient",
      message: "Server Error",
    });
  }
}

module.exports = {
  getIngredients,
  createIngredient
};
