const express = require('express');
const router = express.Router();
const fileController = require('../controllers/FileController');
const authMiddleware = require('../middlewares/auth.middleware.js');

const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/:id/download', fileController.download);
router.get('/:id', fileController.show);
router.put('/:id', authMiddleware.isAuth ,fileController.update);
router.delete('/:id', authMiddleware.isAuth, fileController.delete);
router.get('/', fileController.index);
router.post('/', [authMiddleware.isAuth, upload.single('report_file')], fileController.create);
router.delete('/', authMiddleware.isAuth, fileController.deleteAll);

module.exports = router;