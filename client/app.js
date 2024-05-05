const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' })

const app = express();

const publicDirectory = path.join(__dirname, './public');
const publicDirectoryIMG = path.join(__dirname, './img');

app.use(express.static(publicDirectory));
app.use(express.static(publicDirectoryIMG));
app.set('viwe engine', 'hbs');
app.use(cookieParser());

app.use(express.urlencoded({ extended: false })); // envia os dados para o seu server
app.use(express.json()); // transforma os dados enviados em Json;

app.use((request, response, next) => {
    // Gambiarra para não ter problemas com 'CORS policy'
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PATCH,DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
})

const rotaPages = require('./routes/pages');
const rotaAuth = require('./routes/auth');
const rotaProdutos = require('./routes/produtos');
const rotaFuncionarios = require('./routes/funcionarios');

app.use('/', rotaPages);
app.use('/auth', rotaAuth);
app.use('/produtos', rotaProdutos);
app.use('/funcionarios', rotaFuncionarios);

// Tratamento de erro: quando não encontrar a rota:
app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

db.connect( (err) => {
    if(err){
        console.log(err)
    } else {
        console.log("Mysql connected...")
    }
})

app.listen(5000, () => {
    console.log("Server startd on 5000");
});