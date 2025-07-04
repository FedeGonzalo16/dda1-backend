const {Router} = require('express');
const ingredientsController = require('../controllers/ingredientsController');

const router = Router();

router.get('/', ingredientsController.getIngredients);
router.post('/', ingredientsController.createIngredient);

module.exports = router;