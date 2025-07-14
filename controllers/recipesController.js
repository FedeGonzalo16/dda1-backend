const RecipesService = require('../services/recipesService');
const CloudinaryService = require('../services/cloudinary');
const IngredientsService = require('../services/ingredientsService');
const ProcedimentsService = require('../services/proceduresService');
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
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ method: "updateRecipe", message: "ID inválido" });
    }

    let updatedData = {};

    if (req.body.data) {
      try {
        updatedData = JSON.parse(req.body.data);
      } catch (err) {
        return res.status(400).json({ method: "updateRecipe", message: "Formato de datos inválido" });
      }
    } else {
      updatedData = req.body;
    }

    if (!updatedData.name) {
      return res.status(400).json({ method: "updateRecipe", message: "El nombre de la receta es requerido" });
    }

    // Subida de imagen
    if (req.file) {
      try {
        const fileBuffer = req.file.buffer;
        const imageUrl = await CloudinaryService.uploadImage(fileBuffer);
        updatedData.image = imageUrl;
      } catch (err) {
        return res.status(500).json({ method: "updateRecipe", message: "Error al procesar imagen" });
      }
    }

    // Crear nuevos ingredientes si vienen como objetos
    if (Array.isArray(updatedData.ingredients)) {
      const newIngredients = [];
      for (const item of updatedData.ingredients) {
        if (typeof item === 'object' && !mongoose.Types.ObjectId.isValid(item)) {
          const created = await IngredientsService.createIngredient(item);
          newIngredients.push(created._id);
        } else {
          newIngredients.push(item);
        }
      }
      updatedData.ingredients = newIngredients;
    }

    // Crear nuevos procedimientos si vienen como objetos
    if (Array.isArray(updatedData.procedures)) {
      const newProcedures = [];
      for (const item of updatedData.procedures) {
        if (typeof item === 'object' && !mongoose.Types.ObjectId.isValid(item)) {
          const created = await ProcedimentsService.createProcedure(item);
          newProcedures.push(created._id);
        } else {
          newProcedures.push(item);
        }
      }
      updatedData.procedures = newProcedures;
    }

    // Actualizar receta
    const recipe = await RecipesService.updateRecipe(id, updatedData);

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
}

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
  getRecipeByName
};