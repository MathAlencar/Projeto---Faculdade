const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
const login = require('../middlware/login')

router.post('/menu', authController.register); // register
router.post('/login', authController.login); // login
router.post('/logout', authController.logout); // logout

module.exports = router;