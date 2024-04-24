const express = require('express');
const router = express.Router();

const classroomController = require('../controllers/ClassroomController');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/:id', classroomController.show);
router.put('/:id', authMiddleware.isAuth, classroomController.update);
router.delete('/:id', authMiddleware.isAuth, classroomController.delete);
router.get('/', classroomController.index);
router.post('/', authMiddleware.isAuth, classroomController.create);
router.delete('/', authMiddleware.isAuth, classroomController.deleteAll);

module.exports = router;