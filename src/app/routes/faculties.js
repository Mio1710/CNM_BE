'use strict';
const express = require('express');
const router = express.Router();

const facultyController = require('../controllers/FacultyController');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/:id', facultyController.show);
router.put('/:id',authMiddleware.isAuth, facultyController.update);
router.delete('/:id', authMiddleware.isAuth, facultyController.delete);
router.get('/', facultyController.index);
router.post('/', authMiddleware.isAuth, facultyController.create);
router.delete('/', authMiddleware.isAuth, facultyController.deleteAll);

module.exports = router;