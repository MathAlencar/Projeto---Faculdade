const express = require('express');
const router = express.Router();
const funcionariosController = require('../controllers/funcionarios');

// Retorna todos os funcionarios
router.get('/', funcionariosController.listarFuncionarios);

module.exports = router;