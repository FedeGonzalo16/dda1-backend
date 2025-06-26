//Con Mongo
const Recipe = require("../db/models/Recipe");

const getRecipes = async () => {
    return await Recipe.find();
  };

const getRecipeById = async (id) => {
    return await Recipe.findById(id);
};

const getIngredients = async (id) => {
    const recipe = await Recipe.findById(id);
    return recipe.ingredients || [];
};

const getProcedures = async (id) => {
    const recipe = await Recipe.findById(id);
    return recipe.procedures || [];
};

const getQualifications = async (id) => {
    const recipe = await Recipe.findById(id);
    return recipe.qualifications || [];
};

const createRecipe = async (recipeData) => {
    const newRecipe = new Recipe(recipeData);
    return await newRecipe.save();
};

const updateRecipe = async (id, recipeData) => {
    const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipeData, {
      new: true, // Retorna el documento actualizado
    });
    return updatedRecipe;
};

const deleteRecipe = async (id) => {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    return deletedRecipe;
};

module.exports = {
  getRecipes,
  getRecipeById,
  getIngredients,
  getProcedures,
  getQualifications,
  createRecipe,
  updateRecipe,
  deleteRecipe
};