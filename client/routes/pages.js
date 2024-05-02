const express = require('express');
const router = express.Router();
const login = require('../middlware/login')

router.get('/login', (req, res) => {
    res.render('00.login.hbs')
})

router.get('/menu',login.login, (req, res) => {
    res.render('01.menu.hbs')
})

router.get('/tabela/produto', login.login, (req, res) => {
    res.render('02.tabelasProdutos.hbs')
})

router.get('/entrada', (req, res) => {
    res.render('03.entrada.hbs')
})

module.exports = router;