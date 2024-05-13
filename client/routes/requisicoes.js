const e = require('express');
const express = require('express'); // Chamando a biblioteca express
const router = express.Router(); // Exportando para fora;
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;

router.get('/chamada', (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if(err) return res.render('08.funcionarios.hbs');

        const query = `SELECT * FROM tbl_User;`;

        conn.query(query, (err, result) => {
            conn.release();
            if(err) return res.render('08.funcionarios.hbs', console.log("deu erro menor"));

            if(result.length == 0) res.render('08.funcionarios.hbs', console.log("não tem nada aqui"));

            const response = {
                quantidade: result.length,
                usuarios: result.map( user => {
                    return {
                        user: user.id_User,
                        nome: user.nome,
                        email: user.email_Login,
                        telefone: user.telefone
                    }
                })
            }

            return res.json(response);
        })
    })
})

router.get('/chamada/especifica', (req, res, next) => {

    const email = req.query.buscaFuncionario; // Corrigindo para req.query.buscaFuncionario
    console.log(email);
    
    mysql.getConnection((err, conn) => {
        if(err) return res.render('08.funcionarios.hbs');

        const query = `SELECT * FROM tbl_User WHERE email_Login = ?`

        conn.query(query, [email], (err, results) => {
            conn.release();
            if(err) return res.render('08.funcionarios.hbs', console.log("deu erro menor"));
            
            const response = {
                quantidade: results.length,
                usuarios: results.map( user => {
                    return {
                        user: user.id_User,
                        nome: user.nome,
                        email: user.email_Login,
                        telefone: user.telefone
                    }
                })
            }

            return res.json(response);
        })
    })
})


router.delete('/delete', (req, res, next) => {

    const email = req.query.email_user; 

    mysql.getConnection((err, conn) => {
        if(err) return res.render('08.editFuncionarios.hbs');

        const query = `DELETE from tbl_User WHERE email_Login = ?`

        conn.query(query, [email], (err, result) => {
            if(err) return res.render('8.editFuncionarios.hbs');

            if(result.affectedRows == 0){
                return res.render('8.editFuncionarios.hbs', console.log('usuário não encontrado'));
            }

            res.render('08.editFuncionarios.hbs', console.log('Usuário excluido'));
        })
        
    })

})



module.exports = router

