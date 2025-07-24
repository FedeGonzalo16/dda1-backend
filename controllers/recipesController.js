const RecipesService = require('../services/recipesService');
const CloudinaryService = require('../services/cloudinary');
const IngredientsService = require('../services/ingredientsService');
const ProcedimentsService = require('../services/proceduresService');
const mongoose = require('mongoose');

const getRecipes = async (req, res) => {
  try {
    const recipes = await RecipesService.getRecipes();
    const filter = req.user?.role === 'admin' ? {} : { isApproved: true };
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
    const { name, tags, author, procedures, ingredients, description, type, isApproved } = req.body;

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
      description: description || '',
      type: type || 'Plato principal',
      isApproved: isApproved || false,
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
  console.log(req.body);
  console.log(req.file);
  try {
    const {
        name,
        tags,
        author,
        procedures,
        ingredients,
        description,
        type,
        isApproved,
    } = req.body;
    const parsedTags = tags ? JSON.parse(tags) : [];
    const parsedProcedures = procedures ? JSON.parse(procedures) : [];
    const parsedIngredients = ingredients ? JSON.parse(ingredients) : [];
    let imageUrl = req.body.media || '';
    if (req.file) {
      const fileBuffer = req.file.buffer;
      imageUrl = await CloudinaryService.uploadImage(fileBuffer);
    };
    const recipeData = {
      name,
      tags: parsedTags,
      author,
      procedures: parsedProcedures,
      ingredients: parsedIngredients,
      description: description || '',
      type: type || 'Plato principal',
      isApproved: false,
    };
    if (imageUrl && imageUrl !== '') {
      recipeData.image = imageUrl;
    }

    await RecipesService.updateRecipe(req.params.id, recipeData);
    const recipe = await RecipesService.getRecipeById(id);
    if (!recipe) {
      return res.status(404).json({ method: "updateRecipe", message: "Receta no encontrada" });
    }

    const updatedRecipe = await RecipesService.getRecipeById(id);
    return res.status(200).json({
      method: "updateRecipe",
      message: "Receta actualizada correctamente",
      recipe: updatedRecipe,
    });

  } catch (err) {
    console.error('ERROR AL ACTUALIZAR:', err);
    return res.status(500).json({ method: "updateRecipe", message: err.message });
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
    await RecipesService.deleteRecipe(req.params.id);
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

const getRecipesByUserId = async (req, res) => {
  const { userId } = req.params;
  try{
    const recipes = await RecipesService.getRecipesByUserId(userId);
    if (!recipes || recipes.length === 0) {
      return res.status(404).json({
        method: "getRecipesByUserId",
        message: "No recipes found for this user",
      });
    }else{
      return res.status(200).json({
        method: "getRecipesByUserId",
        message: "Recipes retrieved successfully",
        recipes: recipes,
      });
    }
  }catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipesByUserId",
      message: "Internal Server Error",
    });
  }
};

const getPendingRecipes = async (req, res) => {
  try {
    const pendingRecipes = await RecipesService.getPendingRecipes();
    return res.status(200).json({
      method: "getPendingRecipes",
      message: "Pending recipes retrieved successfully",
      recipes: pendingRecipes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getPendingRecipes",
      message: "Internal Server Error",
    });
  }
};

const aproveRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const recipe = await RecipesService.aproveRecipe(id);

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        method: "approveRecipe",
        message: "No autorizado"
      });
    }

    if (!recipe) {
      return res.status(404).json({
        method: "aproveRecipe",
        message: "Recipe not found",
      });
    }
    return res.status(200).json({
      method: "aproveRecipe",
      message: "Recipe approved successfully",
      recipe: recipe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "aproveRecipe",
      message: "Internal Server Error",
    });
  }
};

const getApprovedRecipes = async (req, res) => {
  try {
    const approvedRecipes = await RecipesService.getApprovedRecipes();
    return res.status(200).json({
      method: "getApprovedRecipes",
      message: "Approved recipes retrieved successfully",
      recipes: approvedRecipes,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getApprovedRecipes",
      message: "Internal Server Error",
    });
  }
};


const getRecipeByName = async (req, res) => {
  try {
    const name = req.query.name?.toString().trim();

    if (!name) {
      return res.status(400).json({
        method: "getRecipeByName",
        message: "Falta el parámetro 'name'",
      });
    }

    const recipe = await RecipesService.getRecipeByName(name);

    if (!recipe) {
      return res.status(404).json({
        method: "getRecipeByName",
        message: "Receta no encontrada",
      });
    }

    return res.status(200).json({
      method: "getRecipeByName",
      message: "Receta obtenida correctamente",
      recipe: recipe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "getRecipeByName",
      message: "Error interno del servidor",
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
  getRecipesByUserId,
  getPendingRecipes,
  getApprovedRecipes,
  aproveRecipe,
  getRecipeByName
};