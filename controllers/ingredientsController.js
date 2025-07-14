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
};

const getIngredientById = async (req, res) => {
  const { id } = req.params;
  try {
    const ingredient = await IngredientsService.getIngredientById(id);
    if (!ingredient) {
      return res.status(404).json({
        method: "getIngredientById",
        message: "Ingredient not found",
      });
    }
    return res.status(200).json({
      method: "getIngredientById",
      message: "Ingredient retrieved successfully",
      ingredient: ingredient,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getIngredientById",
      message: "Server Error",
    });
  }
};

const updateIngredient = async (req, res) => {
  const { id } = req.params;
  try {
    const updatedIngredient = await IngredientsService.updateIngredient(id, req.body);
    if (!updatedIngredient) {
      return res.status(404).json({
        method: "updateIngredient",
        message: "Ingredient not found",
      });
    }
    return res.status(200).json({
      method: "updateIngredient",
      message: "Ingredient updated successfully",
      ingredient: updatedIngredient,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "updateIngredient",
      message: "Server Error",
    });
  }
};

module.exports = {
  getIngredients,
  createIngredient,
  getIngredientById,
  updateIngredient
};
