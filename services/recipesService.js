//Con Mongo
const Recipe = require("../db/models/Recipe");

const getRecipes = async (filter = { isApproved: true }) => {
    return await Recipe.find(filter)
    .populate('ingredients')
    .populate('procedures')
    .populate('author');
  };

const getRecipeById = async (id) => {
    return await Recipe.findById(id)
    .populate('author')
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
    const recipeWithApproval = { ...recipeData, isApproved: false };
    const newRecipe = new Recipe(recipeData);
    return await newRecipe.save();
};

const updateRecipe = async (id, recipeData) => {
  const updatedData = { ...recipeData, isApproved: false };
  const updatedRecipe = await Recipe.findByIdAndUpdate(id, updatedData, {
    new: true,
  });
  return updatedRecipe;
};

const deleteRecipe = async (id) => {
    const deletedRecipe = await Recipe.findByIdAndDelete(id);
    return deletedRecipe;
};

const getRecipeByName = async (filter = { isApproved: true }) => {
  return await Recipe.findOne({ name: new RegExp(`^${name}$`, 'i') })
    .populate('author')
    .populate('ingredients')
    .populate('procedures');
};


const getRecipesByUserId = async (userId) => {
  const filter = { author: userId };
  if (!isAdmin) {
    filter.$or = [
      { isApproved: true },
      { author: userId, isApproved: false }
    ];
  }
  return await Recipe.find({ author: userId })
    .populate('author')
    .populate('ingredients')
    .populate('procedures');
};

const getPendingRecipes = async () => {
  return await Recipe.find({ isApproved: false })
    .populate('author')
    .populate('ingredients')
    .populate('procedures');
};

const aproveRecipe = async (id) => {
  const recipe = await Recipe.findById(id);
  if (!recipe) {
    throw new Error('Recipe not found');
  }
  recipe.isApproved = true;
  return await recipe.save();
};

const getApprovedRecipes = async () => {
  return await Recipe.find({ isApproved: true })
    .populate('author')
    .populate('ingredients')
    .populate('procedures');
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
  getRecipesByUserId,
  getPendingRecipes,
  getApprovedRecipes,
  aproveRecipe
};