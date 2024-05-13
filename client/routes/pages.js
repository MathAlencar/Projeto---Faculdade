const express = require('express');
const router = express.Router();
const login = require('../middlware/login')

router.get('/login', (req, res) => {
    res.render('00.login.hbs')
})

router.get('/menu', login.login, (req, res) => {
    res.render('01.menu.hbs')
})

router.get('/tabela/produto', login.login, (req, res) => {
    res.render('02.tabelasProdutos.hbs')
})

router.get('/tabela/produto/cadastrar', login.login, (req, res) => {
    res.render('02.cadastrarProdutos.hbs')
})

router.get('/entrada', login.login,(req, res) => {
    res.render('03.entrada.hbs')
})

router.get('/entrada/pedido', login.login,(req, res) => {
    res.render('03.entradaPedido.hbs')
})

router.get('/saida', login.login, (req, res) => {
    res.render('04.saida.hbs')
})

router.get('/caixa', login.login, (req, res) => {
    res.render('05.caixa.hbs')
})

router.get('/pedidos', login.login, (req, res) => {
    res.render('06.pedidosRealizados.hbs')
})

router.get('/dashboard', login.login, (req, res) => {
    res.render('07.dashboard.hbs')
})

router.get('/funcionarios', login.login, (req, res) => {
    res.render('08.funcionarios.hbs')
})

router.get('/funcionarios/cadastro', login.login, (req, res) => {
    res.render('08.cadastrarFuncionarios.hbs')
})

router.get('/funcionarios/editar', login.login, (req, res) => {
    res.render('08.editFuncionarios.hbs')
})

router.get('/home', login.login, (req, res) => {
    res.render('100.mobile.menu.hbs')
})

router.get('/login/usuario', login.login, (req, res) => {
    res.render('101.mobile.login.hbs')
})



module.exports = router;