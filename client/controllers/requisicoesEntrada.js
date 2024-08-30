const express = require('express'); // Chamando a biblioteca express
const { get } = require('http');
const router = express.Router(); // Exportando para fora;
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;
const data = new Date().toISOString().slice(0, 10); // PEgando a data no formatado desejado para o banco;
const path = require('path');


exports.entradaProduto = (req, res, next) => {
    const {codigo, quantidade, valorUnitario, valorTotal, tipoProduto} = req.body;

    mysql.getConnection((err, conn) => {
        if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'),  {menssage: "Erro ao conectar com o banco de dados"});

        const query = `SELECT * FROM tbl_produto WHERE cod_Prd = ?;`;

        conn.query(query, [codigo], (err, result) => {
            conn.release();
            if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'),  {menssage: "Erro na requisição SQL"});

            if(result.length == 0) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'),  {menssage: "Produto não localizado"});

            mysql.getConnection((err, conn) => {
                const query2 = `INSERT INTO tbl_entrada2 (codigo_produto, nome_produto , preco_total, preco_unitario, qtd_comprada, data_entrada) VALUES (?,?,?,?,?,?);`
                let somando = valorUnitario * quantidade;
                conn.query(query2, [codigo, tipoProduto, somando, valorUnitario, quantidade, data], (err, result) => {
                    conn.release();
                    if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'), console.log("Erro ao enviar dados do produto"));

                    mysql.getConnection((err, conn) => {
                        const query3 = `UPDATE tbl_produto
                        SET qtd_TotProduto = qtd_TotProduto + ?, vlr_Unit = ?
                        WHERE cod_Prd = ?;`

                        conn.query(query3, [quantidade, valorUnitario, codigo], (err, result) => {
                            conn.release();
                            if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'), console.log("erro ao atualizar quantidade"));

                            return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entradaPedido.html'), console.log('tudo certo papai'));
                        })
                    })
                })
            })
        })
    })
}


exports.entradasProdutos = (req, res, next) => {
    
    mysql.getConnection((err, conn) => {
        if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entrada.html'),  console.log("Erro ao conectar com o banco de dados"));

        const query = `SELECT * FROM tbl_entrada2;`;

        conn.query(query, (err, result) => {
            conn.release();
            if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '03.entrada.html'), console.log("Erro na requisição"));

            const response = {
                quantidade: result.length,
                entradas: result.map( entrada => {
                    return {
                        id: entrada.id,
                        nome_produto: entrada.nome_produto,
                        data_entrada: entrada.data_entrada,
                        qtd_comprada: entrada.qtd_comprada,
                        preco_unitario: entrada.preco_unitario,
                        preco_total: entrada.preco_total,
                    }
                })
            }

            return res.json(response);

        })
    })
}
