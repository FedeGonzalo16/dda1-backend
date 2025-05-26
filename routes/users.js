const {Router} = require('express');
const usersController = require('../controllers/usersController');
const validateRequest = require('../middlewares/requestValidator');
const { check } = require('express-validator');

const router = Router();

router.get('/', usersController.getUsers);

router.get('/:id', usersController.getUserById);

router.get('/:id/notifications', usersController.getUsersNotifications);

router.post('/', [
    check('name').not().isEmpty(),
    check('email').isEmail(),
    check('password').isLength({min: 6}),
    validateRequest
],
usersController.createUser)

router.put('/:id', [
    check('email').not().isEmpty(),
    validateRequest
],
usersController.updateUser)

module.exports = router;