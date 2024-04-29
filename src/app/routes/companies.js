const express = require('express');
const router = express.Router();

const companyController = require('../controllers/CompanyController.js');
const authMiddleware = require('../middlewares/auth.middleware.js');

router.get('/:id', companyController.show);
router.put('/:id', authMiddleware.isAuth, companyController.update);
router.delete('/:id', authMiddleware.isAuth, companyController.delete);
router.get('/', companyController.index);
router.post('/', authMiddleware.isAuth, companyController.create);
router.delete('/', authMiddleware.isAuth, companyController.deleteAll);

module.exports = router;