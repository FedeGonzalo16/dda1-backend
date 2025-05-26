const RecipesService = require('../services/recipesService');

class RecipesController {

  async getRecipes(req, res) {
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
  }

  async getRecipeById(req, res) {
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
  } catch (err) { //ver si sacar
    console.error(err);
    return res.status(500).json({
      method: "getRecipeById",
      message: "Internal Server Error",
    });
  }
}

  async getRecipeIngredients(req, res) {
    try {
      const ingredients = await RecipesService.getRecipeIngredients;
      return res.status(200).json({
        method: "getRecipeIngredients",
        message: "Ingredients retrieved successfully",
        ingredients: ingredients,
      });
    } catch (err) {
        return res.status(500).json({
          method: "getRecipeIngredients",
          message: "Internal Server Error",
      });
    }
  }

  async getRecipeComments(req, res) {
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
}

  async getRecipeProcediments(req, res) {
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
}

  async getRecipeQualifications(req, res) {
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
}

  async createRecipe(req, res) {
  try {
    const newRecipe = await RecipesService.createRecipe(req.body);
    return res.status(201).json({
      method: "createRecipe",
      message: "Recipe created successfully",
      recipe: newRecipe,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      method: "createRecipe",
      message: "Internal Server Error",
    });
  }
}

async updateRecipe(req, res) {
  const { id } = req.params;
  try {
    await RecipesService.updateRecipe(req.body, Number(id));
    const recipe = await RecipesService.getRecipeById(Number(id));
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
}

async deleteRecipe(req, res) {
  try {
    const recipe = await RecipesService.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({
        method: "deleteRecipe",
        message: "Recipe not found",
      });
    }
    await RecipesService.deleteUserById(req.params.id);
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
}
}

module.exports = new RecipesController();