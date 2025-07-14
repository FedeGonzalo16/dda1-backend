const {Router} = require('express');
const usersController = require('../controllers/usersController');
const validateRequest = require('../middlewares/requestValidator');
const { check } = require('express-validator');

const upload = require('../middlewares/uploadImage');

const router = Router();

router.put('/:id', 
  upload.single('image'), 
  [
    check('email').not().isEmpty(),
    validateRequest
  ],
  usersController.updateUser
);

router.put('/:id',
  upload.single('image'), // 👈 Middleware de imagen
  usersController.updateUser
);

router.get('/', usersController.getUsers);

router.get('/:id', usersController.getUserById);

router.get('/:id/notifications', usersController.getUsersNotifications);

router.post('/', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password'),
    validateRequest
],
usersController.createUser);

router.put('/:id', [
    check('email').not().isEmpty(),
    validateRequest
],
usersController.updateUser);

router.post('/fav',usersController.addFavorite);
router.delete('/fav',usersController.removeFavorite);
router.get('/fav/:id', usersController.getFavorites);

module.exports = router;