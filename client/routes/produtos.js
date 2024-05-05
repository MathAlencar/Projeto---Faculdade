const express = require('express');
const router = express.Router();
const productController = require('../controllers/produtos');

// Retorna todos os produtos
router.get('/', productController.listarProdutos);

// Retorna lista de entrada dos produtos
router.get('/entrada', productController.listarEntradaProdutos);

// Retorna lista de saída dos produtos
router.get('/saida', productController.listarSaidaProdutos);

module.exports = router;