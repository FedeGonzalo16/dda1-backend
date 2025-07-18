const { Router } = require('express');
const authController = require('../controllers/authController');
const { check } = require('express-validator');
const validateRequest = require('../middlewares/requestValidator');

const router = Router();

router.post('/', [
  check('email').isEmail(),
  check('password').not().isEmpty(),
  validateRequest,  
], authController.login);
router.post('/send-recovery-code',authController.sendRecoveryCode);

router.post('/verify-code', [
  check('email').isEmail(),
  check('code').isLength({ min: 6, max: 6 })
], authController.verifyCode);

router.post('/reset-password', [
  check('email').isEmail(),
  check('newPassword').not().isEmpty()
], authController.resetPassword);

module.exports = router;