const router = require('express').Router();
const verify = require('../middlewares/verifyToken');
const categoryController = require('../controllers/categories/categories.controller');
const { route } = require('./posts');

router.get('/', verify, categoryController.getAll);
router.post('/', verify, categoryController.create);

module.exports = router;