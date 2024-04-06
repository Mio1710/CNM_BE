const express = require('express');
const router = express.Router();

const authController = require('../controllers/AuthController');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.post('/login', authController.login);
router.get('/user',  authMiddleware.isAuth, authController.getUser);
// router.post('/refresh', authController.refreshToken);

module.exports = router;