const express = require('express');
const router = express.Router();

const userController = require('../controllers/UserController');

router.get('/:id', userController.show);
router.put('/:id', userController.update);
router.delete('/:id', userController.delete);
router.get('/', userController.index);
router.post('/', userController.create);
router.delete('/', userController.deleteAll);

module.exports = router;