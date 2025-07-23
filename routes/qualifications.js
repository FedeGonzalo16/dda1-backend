const {Router} = require('express');
const qualificationsController = require('../controllers/qualificationsController');

const router = Router();

router.get('/', qualificationsController.getQualifications);
router.get('/recipe/:recipeId', qualificationsController.getQualificationsByRecipeId);
router.post('/', qualificationsController.createQualification);
router.put('/:id/approve', qualificationsController.approveQualification); /* nueva ruta */
router.get('/approved', qualificationsController.getApprovedQualifications);
router.get('/pending', qualificationsController.getPendingQualifications);

module.exports = router;