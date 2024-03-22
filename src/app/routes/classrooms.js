const express = require('express');
const router = express.Router();

const classroomController = require('../controllers/ClassRoomController');

router.get('/:id', classroomController.show);
router.put('/:id', classroomController.update);
router.delete('/:id', classroomController.delete);
router.get('/', classroomController.index);
router.post('/', classroomController.create);
router.delete('/', classroomController.deleteAll);

module.exports = router;