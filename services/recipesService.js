//Con Mongo
const Recipe = require("../db/models/Recipe");

const getRecipes = async () => {
    return await Recipe.find()
    .populate('ingredients')
    .populate('procedures')
    .populate('author')
  };

const getRecipeById = async (id) => {
    return await Recipe.findById(id)
    .populate('ingredients')
    .populate('procedures');
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

const getRecipeByName = async (name) => {
  return await Recipe.findOne({ name: new RegExp(`^${name}$`, 'i') });
};

module.exports = {
  getRecipes,
  getRecipeById,
  getIngredients,
  getProcedures,
  getQualifications,
  createRecipe,
  updateRecipe,
  deleteRecipe,
  getRecipeByName,
};