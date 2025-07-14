const {Router} = require('express');
const ingredientsController = require('../controllers/ingredientsController');

const router = Router();

router.get('/:id', ingredientsController.getIngredientById);
router.get('/', ingredientsController.getIngredients);
router.post('/', ingredientsController.createIngredient);

router.put('/:id', ingredientsController.updateIngredient);

module.exports = router;