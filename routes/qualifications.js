const {Router} = require('express');
const qualificationsController = require('../controllers/qualificationsController');

const router = Router();

router.get('/', qualificationsController.getQualifications);

module.exports = router;