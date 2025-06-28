const {Router} = require('express');
const procedimentsController = require('../controllers/procedureController');
const multer = require('multer');

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.get('/', procedimentsController.getProcediments);
router.post('/', upload.single('media'), procedimentsController.createProcediment);

module.exports = router;