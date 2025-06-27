const {Router} = require('express');
const tagsController = require('../controllers/tagsController');
const {check} = require('express-validator');

const router = Router();

router.get('/', tagsController.getTags);
router.post('/', [
    check('name').not().isEmpty().withMessage('Tag name is required'),
], tagsController.createTag);

module.exports = router;