const express               = require('express');
const router                = express.Router();
const verify                = require('../middlewares/verifyToken');
const categoryController    = require('../controllers/categories/categories.controller');

router.get('/', verify, categoryController.getAll);
router.get('/:id', verify, categoryController.findById);
router.post('/', verify, categoryController.create);
router.put('/:id', verify, categoryController.update);

module.exports = router;