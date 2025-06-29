const {Router} = require('express');
const qualificationsController = require('../controllers/qualificationsController');

const router = Router();

router.get('/', qualificationsController.getQualifications);
router.get('/recipe/:recipeId', qualificationsController.getQualificationsByRecipeId);
router.post('/', qualificationsController.createQualification);

module.exports = router;