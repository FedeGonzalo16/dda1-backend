const {Router} = require('express');
const notificationsController = require('../controllers/notificationsController');

const router = Router();

router.get('/', notificationsController.getNotifications);

module.exports = router;

