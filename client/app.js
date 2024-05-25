const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const login = require('../client/middlware/login')


dotenv.config({ path: './.env' })

const app = express();

const publicDirectory =  path.join(__dirname, './public');
const publicDirectoryIMG =  path.join(__dirname, './img');

app.use(express.static(publicDirectory));
app.use(express.static(publicDirectoryIMG));
app.use(cookieParser());

app.use(express.urlencoded({extended: false})); // envia os dados para o seu server
app.use(express.json()); // transforma os dados enviados em Json;

const rotaPages = require('./routes/pages');
const rotaAuth= require('./routes/auth');
const rotasReq = require('./routes/requisicoes');
const rotasReqProd = require('./routes/requesicoesProdutos');
const rotasEntrada = require('./routes/requisicoesEntradas');

app.use('/', rotaAuth);
app.use('/', rotasReq);
app.use('/', rotasReqProd);
app.use('/', rotasEntrada);

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASEYES
    
})

db.connect( (err) => {
    if(err){
        console.log(err)
    } else {
        console.log("Mysql connected...")
    }
})

/* Páginas */


app.get('/tabela/produto/cadastrar', login.login,  (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/02.cadastrarProdutos.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/00.login.html'));
})

app.get('/menu', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/01.menu.html'));
})

app.get('/tabela/produto', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/02.tabelasProdutos.html'));
})

app.get('/entrada', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/03.entrada.html'));
})

app.get('/entrada/pedido', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/03.entradaPedido.html'));
})

app.get('/saida', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/04.saida.html'));
})

app.get('/caixa', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/05.caixa.html'));
})

app.get('/pedidos', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/06.pedidosRealizados.html'));
})

app.get('/dashboard', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/07.dashboard.html'));
})

app.get('/funcionarios', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/08.funcionarios.html'));
})

app.get('/funcionarios/cadastro', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/08.cadastrarFuncionarios.html'));
})

app.get('/funcionarios/editar', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/08.editFuncionarios.html'));
})

app.get('/login/usuario', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/1000.loginUser.html'));
})

app.get('/home', login.login, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'pages/1001.mobile.menu.html'));
})


/* FIM */


app.listen(5000, () => {
    console.log("Server startd on 5000");
});

