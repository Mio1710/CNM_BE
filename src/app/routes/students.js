const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');

router.get('/:id', studentController.show);
router.put('/:id', studentController.update);
router.delete('/:id', studentController.delete);
router.get('/', studentController.index);
router.post('/', studentController.create);
router.delete('/', studentController.deleteAll);

module.exports = router;