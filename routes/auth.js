const { Router } = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/requestValidator');

const router = Router();

router.post('/signin', [
  check('email').isEmail(),
  check('password').not().isEmpty(),
  validateRequest,  
], authController.login);

module.exports = router;