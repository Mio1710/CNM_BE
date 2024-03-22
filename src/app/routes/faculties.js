const express = require('express');
const router = express.Router();

const facultyController = require('../controllers/FacultyController');

router.get('/:id', facultyController.show);
router.put('/:id', facultyController.update);
router.delete('/:id', facultyController.delete);
router.get('/', facultyController.index);
router.post('/', facultyController.create);
router.delete('/', facultyController.deleteAll);

module.exports = router;