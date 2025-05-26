const {Router} = require('express');
const procedimentsController = require('../controllers/procedimentsController');

const router = Router();

router.get('/', procedimentsController.getProcediments);

module.exports = router;