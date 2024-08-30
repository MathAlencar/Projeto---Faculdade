const express = require('express');
const produtosAPI = require('../controllers/requisicoesProduto');
const funcionariosAPI = require('../controllers/requisicoesFuncionario');
const entradasAPI = require('../controllers/requisicoesEntrada')
const router = express.Router();

// Chamando API referente aos produtos / cadastro / chamada.

router.post('/cadastrando/produto', produtosAPI.cadastrandoProduto);
router.delete('/deletando/produto', produtosAPI.deletandoProduto);
router.get('/chamada/produto', produtosAPI.chamandoProduto);
router.get('/chamada/produto/especifico', produtosAPI.chamandoProdutoEspec);

// Chamando API referente a funcionarios

router.get('/chamada/funcionarios', funcionariosAPI.chamandoFuncionarios);
router.get('/chamada/especifica', funcionariosAPI.chamadaFuncionarioEspec);
router.delete('/delete', funcionariosAPI.deletandoUser);
router.post('/atualizando', funcionariosAPI.atualizandoUser);

// Chamada API referente as entradas.

router.post('/entrada/produto', entradasAPI.entradaProduto);
router.get('/entradas/produtos', entradasAPI.entradasProdutos);

module.exports = router;