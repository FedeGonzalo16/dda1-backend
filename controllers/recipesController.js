const RecipesService = require('../services/recipesService');
const CloudinaryService = require('../services/cloudinary');
const mongoose = require('mongoose');

const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipesService.getRecipes();
    return res.status(200).json({
      method: "getRecipes",
      message: "Recipes retrieved successfully",
      recipes: recipes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipes",
      message: "Server Error",
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await RecipesService.getRecipeById(id);

    if (!recipe) {
      return res.status(404).json({
        method: "getRecipeById",
        message: "Recipe not found",
      });
    }

    return res.status(200).json({
      method: "getRecipeById",
      message: "Recipe details retrieved successfully",
      recipe: recipe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeById",
      message: "Internal Server Error",
    });
  }
};

const getRecipeIngredients = async (req, res) => {
  try {
    const ingredients = await RecipesService.getRecipeIngredients();
    return res.status(200).json({
      method: "getRecipeIngredients",
      message: "Ingredients retrieved successfully",
      ingredients: ingredients,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeIngredients",
      message: "Internal Server Error",
    });
  }
};

const getRecipeComments = async (req, res) => {
  try {
    const comments = await RecipesService.getRecipeComments();
    return res.status(200).json({
      method: "getRecipeComments",
      message: "Comments retrieved successfully",
      comments: comments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeComments",
      message: "Internal Server Error",
    });
  }
};

const getRecipeProcediments = async (req, res) => {
  try {
    const procediments = await RecipesService.getRecipeProcediments();
    return res.status(200).json({
      method: "getRecipeProcediments",
      message: "Procediments retrieved successfully",
      procediments: procediments,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeProcediments",
      message: "Internal Server Error",
    });
  }
};

const getRecipeQualifications = async (req, res) => {
  try {
    const qualifications = await RecipesService.getRecipeQualifications();
    return res.status(200).json({
      method: "getRecipeQualifications",
      message: "Qualifications retrieved successfully",
      qualifications: qualifications,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeQualifications",
      message: "Internal Server Error",
    });
  }
};

const createRecipe = async (req, res) => {
  try {
    const { name, tags, author, procedures, ingredients, description, type } = req.body;

    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedProcedures = procedures ? JSON.parse(procedures) : [];
    const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];



    let imageUrl = '';
    if (req.file) {
      const fileBuffer = req.file.buffer;
      imageUrl = await CloudinaryService.uploadImage(fileBuffer);
    }

    const recipeData = {
      name,
      tags: parsedTags,
      author,
      procedures: parsedProcedures,
      ingredients: parsedIngredients,
      image: imageUrl,
      description: description || '', // Ensure description is included
      type: type || 'Plato principal', // Default to 'Plato principal' if not provided
    };

    const recipe = await RecipesService.createRecipe(recipeData);
    const newRecipe = await RecipesService.getRecipeById(recipe._id);
    return res.status(201).json({
      method: "createRecipe",
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating recipe' });
  }
};

const updateRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    await RecipesService.updateRecipe(req.body, id);
    const recipe = await RecipesService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({
        method: "updateRecipe",
        message: "Recipe not found",
      });
    }
    return res.status(200).json({
      method: "updateRecipe",
      message: "Recipe updated successfully",
      recipe: recipe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "updateRecipe",
      message: "Internal Server Error",
    });
  }
};

const deleteRecipe = async (req, res) => {
  try {
    const recipe = await RecipesService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        method: "deleteRecipe",
        message: "Recipe not found",
      });
    }
    await RecipesService.deleteRecipeById(req.params.id);
    return res.status(200).json({
      method: "deleteRecipe",
      message: "Recipe deleted successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "deleteRecipe",
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getRecipes,
  getRecipeById,
  getRecipeIngredients,
  getRecipeComments,
  getRecipeProcediments,
  getRecipeQualifications,
  createRecipe,
  updateRecipe,
  deleteRecipe,
};