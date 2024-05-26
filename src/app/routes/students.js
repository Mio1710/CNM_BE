const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/my-company', studentController.getMyCompany);
router.get('/student-company', studentController.getStudentCompany);
router.put('/:id/report', studentController.updateReport);
router.get('/:id', studentController.show);
router.put('/:id', authMiddleware.isAuth, studentController.update);
router.delete('/:id', authMiddleware.isAuth, studentController.delete);
router.get('/', authMiddleware.isAdmin, studentController.index);
router.post('/',  authMiddleware.isAdmin, studentController.create);
router.delete('/', authMiddleware.isAuth, studentController.deleteAll);

module.exports = router;