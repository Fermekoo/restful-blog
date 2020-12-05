const express = require('express');
const router  = express.Router();
const verify  = require('../middlewares/verifyToken');
const postController = require('../controllers/posts/post.controller');

const upload = require('../middlewares/uploadFile');

router.get('/', verify, postController.getAll);
router.get('/:id', postController.findOne);
router.post('/', upload.single('image'), postController.create);
router.delete('/:id', postController.delete);
router.patch('/:id', postController.update);

module.exports = router; 