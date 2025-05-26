const RecipesService = require('../services/recipesService');

class RecipesController {

  async getRecipes(req, res) {
    try {
      const recipes = await RecipesService.getRecipes();
      return res.status(200).json(recipes);
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
      let recipe = await RecipesService.getRecipeById(id);
      return res.status(200).json({
        method: "getRecipeById",
        message: "Recipe details retrieved succesfully",
        recipe: recipe
      })}catch(err){
         return res.status(404).json({
          method: "getRecipeById",
          message: "Recipe not found",
        });
  }
}

   async getRecipeIngredients(req, res) {
    try {
      const ingredients = await RecipesService.getRecipeIngredients;
      return res.status(200).json(ingredients);
    } catch (err) {
        return res.status(404).json({
        method: "",
        message: "",
      });
        return res.status(500).json({
        method: "s",
        message: "",
      });
    }
  }

    async getRecipeComments(req, res) {
    try {
      const comments= await RecipesService.getRecipeComments;
      return res.status(200).json(comments);
    } catch (err) {
        return res.status(404).json({
        method: "",
        message: "",
      });
        return res.status(500).json({
        method: "",
        message: "",
      });
    }
  }

    async getRecipeProcediments(req, res) {
    try {
      const procediments = await RecipesService.getRecipeProcediments();
      return res.status(200).json(procediments);
    } catch (err) {
        return res.status(404).json({
        method: "",
        message: "",
      });
        return res.status(500).json({
        method: "",
        message: "",
      });
    }
  }

    async getRecipeQualifications(req, res) {
    try {
      const qualifications = await RecipesService.getRecipeQualifications;
      return res.status(200).json(qualifications);
    } catch (err) {
        return res.status(404).json({
        method: "",
        message: "",
      });
        return res.status(500).json({
        method: "",
        message: "",
      });
    }
  }

  async createRecipe(req, res) {
    try {
      const newRecipe = await RecipesService.createRecipe(req.body);
      return res.status(200).json({
        message: "Recipe created succesfully",
        user: newRecipe,
      });
    } catch (err) {
        res.status(400).json({
        method: "createRecipe",
        message: "Bad Request",
      });
        res.status(500).json({
        method: "createRecipe",
        message: "Server Error",
      });
    }
  }

async updateRecipe(req,res) {
    const{
        id
    } = req.params;
    try{
      await RecipesService.updateRecipe(req.body,Number(id));
      const recipe = await RecipesService.getRecipeById(Number(id));
      res.status(200).json({
        method: "updateRecipe",
        message: "Recipe updated Succesfully",
        recipe: recipe
      });
    }
    catch(err){
        res.status(400).json({
            message: "Bad Request"
        });
        res.status(404).json({
            message: "Recipe not Found"
        });
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

 async deleteRecipe(req, res) {
    try {
      let isRecipe = await RecipesService.getRecipeById(req.params.id);
      if (isRecipe) {
        await RecipesService.deleteUserById(req.params.id);
        return res.status(200).json({
          message: "Recipe deleted succesfully"
        });
      }
      return res.status(404).json({
        message: "Recipe not found"
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        method: "deleteRecipe",
        message: "Internal Server Error"
      });
    }
  }
}

module.exports = new RecipesController();