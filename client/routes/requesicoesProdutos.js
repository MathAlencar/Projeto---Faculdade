const e = require('express');
const express = require('express'); // Chamando a biblioteca express
const router = express.Router(); // Exportando para fora;
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;

router.post('/cadastrando/produto', (req, res, next) => {

    const { nome, codigo, valor} = req.body;
    
    mysql.getConnection((err, conn) => {
        if(err) return res.render('02.cadastrarProdutos.hbs', console.log('erro 1'));

        const query = `SELECT * FROM tbl_Produto WHERE nome_Prd = ?;`;

        conn.query(query, [nome], (err, result) => {
            conn.release();
            if(err) return res.render('02.cadastrarProdutos.hbs', {
                message: "Erro ao conectar com o banco de dados"
            });

            if(result.length > 0) return res.render('02.cadastrarProdutos.hbs', {message: "Produto já cadastrado"});

            mysql.getConnection( (err, conn) => {
                conn.release();
                if(err) return res.render('02.cadastrarProdutos.hbs', {message: "Erro ao conectar com o banco de dados"});

                const query2 = `INSERT INTO tbl_Produto (cod_Prd, nome_Prd, vlr_Unit, qtd_TotProduto) VALUES (?,?,?,?);`
                conn.query(query2, [codigo, nome, valor, 1], (err, results) => {
                    if(err) return res.render('02.cadastrarProdutos.hbs', {message: "Erro ao cadastrar produto"});
                    
                    return res.render('02.cadastrarProdutos.hbs', {message: "produto cadastrado com sucesso"})
                })
            })
        })
    })

})

router.get('/chamada/produto', (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if(err) return res.render('02.cadastrarProdutos.hbs', {message: "Erro ao conectar com o banco de dados"});
        
        const query = `SELECT * FROM tbl_Produto;`;

        conn.query(query, (err, result) => {
            conn.release();
            if(err) return res.render('02.cadastrarProdutos.hbs', {message: "Erro ao conectar com o banco de dados"});

            if(result.length == 0) res.render('02.cadastrarProdutos.hbs', {message: "Ainda nenhum produto foi cadastrado"});

            const response = {
                quantidade: result.length,
                produtos: result.map( prod => {
                    return {
                        cod_Prd: prod.cod_Prd,
                        nome_Prd: prod.nome_Prd,
                        qtd_TotProduto: prod.qtd_TotProduto,
                        vlr_Unit: prod.vlr_Unit 
                    }
                })
            }

            return res.json(response);
        })
    })
})



module.exports = router

