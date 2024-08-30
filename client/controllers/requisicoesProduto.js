const express = require('express'); // Chamando a biblioteca express
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;
const path = require('path');

const publicDirectory = path.join(__dirname, './public');

exports.cadastrandoProduto = (req, res, next) => {

    const { nome, codigo, valor } = req.body;

    mysql.getConnection((err, conn) => {
        if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

        if(!nome || !codigo || !valor){
            return res.json({message: "Por favor preencha todos os campos!"});  
        }

        const query = `SELECT * FROM tbl_Produto WHERE nome_Prd = ?;`

        conn.query(query, [nome], (err, result) => {
            conn.release();
            if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

            if (result.length > 0) return res.json({ message: "Produto com este nome já está cadastrado no sistema" });

            const query = `SELECT * FROM tbl_Produto WHERE cod_Prd = ?;`

            conn.query(query, [codigo], (err, result) => {
                if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

                if(result.length > 0) return res.json( {message: "Produto com este código já está cadastrado em nosso sistema" })

                mysql.getConnection((err, conn) => {
                    conn.release();
                    if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

                    const query = `INSERT INTO tbl_Produto (cod_Prd, nome_Prd, vlr_Unit, qtd_TotProduto) VALUES(?,?,?,?);`
                    conn.query(query, [codigo, nome, valor, 0], (err, results) => {

                        if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

                        return res.json({ message: "Produto cadastrado com sucesso" });
                    })
                })

            })

        })
    })
}

exports.deletandoProduto = (req, res, next) => {

    const { nome, codigo, valor } = req.body;
    console.log(nome, codigo, valor);
    
    mysql.getConnection((err, conn) => {
        conn.release();
        if(err) return res.json({message: "Erro ao conectar no banco de dados!"})

        if(!codigo){
            return res.json({message: `Por favor preencha o campo de "Código" para realizar a exclusão `});  
        }

        const query = `SELECT * FROM tbl_Produto WHERE cod_Prd = ?;`

        conn.query(query, [codigo], (err, result) => {
            if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

            if(result.length == 0) return res.json({ message: "Nenhum produto encontrado com este código"});

            mysql.getConnection((err, conn) => {
                conn.release();

                if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

                const query = `DELETE FROM tbl_Produto WHERE cod_Prd = ?;`

                conn.query(query, [codigo], (err, result) => {
                    if (err) return res.json({ message: "Erro ao conectar ao banco de dados" });

                    return res.json({message: "Produto excluido com sucesso"})
                    
                })

            })

        })
        
    })

}

exports.chamandoProduto = (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '02.cadastrarProdutos.html'), { message: "Erro ao conectar com o banco de dados" });

        const query = `SELECT * FROM tbl_Produto;`;

        conn.query(query, (err, result) => {
            conn.release();
            if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '02.cadastrarProdutos.html'), { message: "Erro ao conectar com o banco de dados" });

            if (result.length == 0) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '02.cadastrarProdutos.html'), { message: "Ainda nenhum produto foi cadastrado" });

            const response = {
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        cod_Prd: prod.cod_Prd,
                        nome_Prd: prod.nome_Prd,
                        qtd_TotProduto: prod.qtd_TotProduto,
                        vlr_Unit: prod.vlr_Unit,
                    }
                })
            }

            return res.json(response);
        })
    })
}

exports.chamandoProdutoEspec = (req, res, next) => {

    const tipoProduto = req.body

    console.log(tipoProduto)

    return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '02.cadastrarProdutos.html'), { message: "Erro ao conectar com o banco de dados" });
   
}
