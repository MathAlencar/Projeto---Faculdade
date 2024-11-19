const express = require('express');
const path = require('path');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config({ path: './.env' })

const app = express();

const publicDirectory =  path.join(__dirname, './public');
const publicDirectoryIMG =  path.join(__dirname, './img');

app.use(express.static(publicDirectory));
app.use(express.static(publicDirectoryIMG));
app.use(cookieParser());

app.use(express.urlencoded({extended: false})); // envia os dados para o seu server
app.use(express.json()); // transforma os dados enviados em Json;

// Definição das rotas
const rotaAuth= require('./routes/auth');
const rotaReqGeral = require('./routes/requisicoes');
const rotasPaginas = require('./routes/paginas');

app.use('/', rotaAuth);
app.use('/', rotaReqGeral);
app.use('/', rotasPaginas);

// Conexão com o banco
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

app.listen(5000, () => {
    console.log("Server startd on 5000");
});

