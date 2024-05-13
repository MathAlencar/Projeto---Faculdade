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
app.set('viwe engine', 'hbs');
app.use(cookieParser());

app.use(express.urlencoded({extended: false})); // envia os dados para o seu server
app.use(express.json()); // transforma os dados enviados em Json;

const rotaPages = require('./routes/pages');
const rotaAuth= require('./routes/auth');
const rotasReq = require('./routes/requisicoes');

app.use('/', rotaPages);
app.use('/', rotaAuth);
app.use('/', rotasReq);

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