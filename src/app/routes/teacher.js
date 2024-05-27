const express = require('express');
const router = express.Router();

const teacherController = require('../controllers/TeacherController');

router.get('/students', teacherController.getCurrentStudents);
router.put('/accept-company/:id', teacherController.acceptCompany);

module.exports = router;