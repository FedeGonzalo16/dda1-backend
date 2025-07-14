const {Router} = require('express');
const recipesController = require('../controllers/recipesController');
const validateRequest = require('../middlewares/requestValidator');
const { check } = require('express-validator');
const multer = require('multer');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });


router.put('/:id/approve', recipesController.aproveRecipe);
router.get('/', recipesController.getRecipes);
router.get('/by-name', recipesController.getRecipeByName);

router.get('/pending', recipesController.getPendingRecipes);
router.get('/approved', recipesController.getApprovedRecipes);
router.get('/user/:userId', recipesController.getRecipesByUserId);
router.get('/:id/ingredients', recipesController.getRecipeIngredients);
router.get('/:id/procedures', recipesController.getRecipeProcediments);
router.get('/:id/qualifications', recipesController.getRecipeQualifications);
router.get('/:id', recipesController.getRecipeById);
router.post('/', [
    check('name').not().isEmpty(),
    check('procedures').not().isEmpty(),
    check('ingredients').not().isEmpty(),
    check('tags'),
],
upload.single('media'),
recipesController.createRecipe)

router.put('/:id',
  upload.single('media'), 
  [
    check('name').not().isEmpty().withMessage('El nombre es requerido'),
    check('description').optional(),
    check('type').optional(),
    check('ingredients').optional(),
    check('procedures').optional(),
    check('tags').optional(),
    validateRequest
  ],
  recipesController.updateRecipe
);

router.delete('/:id',
    recipesController.deleteRecipe);

module.exports = router;