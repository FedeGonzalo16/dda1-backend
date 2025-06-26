const {Router} = require('express');
const recipesController = require('../controllers/recipesController');
const validateRequest = require('../middlewares/requestValidator');
const { check } = require('express-validator');

const router = Router();

router.get('/', recipesController.getRecipes);

router.get('/:id', recipesController.getRecipeById);

router.get('/:id/ingredients', recipesController.getRecipeIngredients);
router.get('/:id/procedures', recipesController.getRecipeProcediments);
router.get('/:id/qualifications', recipesController.getRecipeQualifications);

router.post('/', [
    check('name').not().isEmpty(),
    check('procedures').not().isEmpty(),
    check('ingredients').not().isEmpty(),
    check('tags').not().isEmpty(),
    validateRequest
],
recipesController.createRecipe)

router.put('/:id', [
    check('name').not().isEmpty(),
    validateRequest
],
recipesController.updateRecipe)

router.delete('/:id',
    recipesController.deleteRecipe);

module.exports = router;