const {Router} = require('express');
const ingredientsController = require('../controllers/ingredientsController');

const router = Router();

router.get('/', ingredientsController.getIngredients);

module.exports = router;