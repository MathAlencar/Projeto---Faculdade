const express = require('express');
const router = express.Router();
const login = require('./../middlware/login')
const path = require('path');

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './../', 'public', 'admin', 'pages/00.login.html'));
})

router.get('/menu', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, './..', 'public', 'admin', 'pages/01.menu.html'));
})

router.get('/tabela/produto', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, './../', 'public', 'admin', 'pages/02.tabelasProdutos.html'));
})

router.get('/tabela/produto/editar', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/02.editProdutos.html'));
})

router.get('/tabela/produto/cadastrar', login.login,  (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/02.cadastrarProdutos.html'));
});

router.get('/entrada', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, './../','public', 'admin', 'pages/03.tbEntrada.html'));
})

router.get('/entrada/pedido', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/03.entradaProduto.html'));
})

router.get('/saida', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/04.saida.html'));
})

router.get('/caixa', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/05.caixa.html'));
})
router.get('/caixa/compra', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/05.finalizarCaixa.html'));
})

router.get('/pedidos', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/06.pedidosRealizados.html'));
})

router.get('/dashboard', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/07.dashboard.html'));
})

router.get('/funcionarios', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/08.funcionarios.html'));
})

router.get('/funcionarios/cadastro', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/08.cadastrarFuncionarios.html'));
})

router.get('/funcionarios/editar', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/08.editFuncionarios.html'));
})

router.get('/login/usuario', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../','public', 'admin', 'pages/1000.loginUser.html'));
})

router.get('/home', login.login, (req, res) => {
    res.sendFile(path.join(__dirname,'./../', 'public', 'admin', 'pages/1001.mobile.menu.html'));
})

module.exports = router;