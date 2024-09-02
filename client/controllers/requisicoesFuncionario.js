const express = require('express'); // Chamando a biblioteca express
const router = express.Router(); // Exportando para fora;
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;
const path = require('path');

exports.chamandoFuncionarios = (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '08.funcionarios.html'));

        const query = `SELECT * FROM tbl_User;`;

        conn.query(query, (err, result) => {
            conn.release();
            if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '08.funcionarios.html'), console.log("deu erro menor"));

            if (result.length == 0) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '08.funcionarios.html'), console.log("não tem nada aqui"));

            const response = {
                quantidade: result.length,
                usuarios: result.map(user => {
                    return {
                        user: user.id_User,
                        nome: user.nome,
                        email: user.email_Login,
                        telefone: user.telefone,
                        status: user.ativo
                    }
                })
            }

            return res.json(response);
        })
    })
}

exports.chamadaFuncionarioEspec = (req, res, next) => {

    const email = req.query.buscaFuncionario; // Corrigindo para req.query.buscaFuncionario

    mysql.getConnection((err, conn) => {
        if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '08.funcionarios.html'));

        const query = `SELECT * FROM tbl_User WHERE email_Login = ?`

            conn.query(query, [email], (err, results) => {
                conn.release();
                if (err) return res.sendFile(path.join(__dirname, '..', 'public', 'pages', '08.funcionarios.html'), console.log("deu erro menor"));

                const response = {
                    quantidade: results.length,
                    usuarios: results.map(user => {
                        return {
                            user: user.id_User,
                            nome: user.nome,
                            email: user.email_Login,
                            telefone: user.telefone,
                        }
                    })
                }

                return res.json(response);
            })
    })
}

exports.deletandoUser = (req, res, next) => {

    const email = req.query.email_user;

    mysql.getConnection((err, conn) => {
        if (err) return res.json({message: "Erro ao conectar com o banco de dados!", status: "default"});

        const query = `DELETE from tbl_User WHERE email_Login = ?`

            conn.query(query, [email], (err, result) => {
                if (err) return res.json({message: "Erro na requisição MySQL!", status: "default"});

                if (result.affectedRows == 0) return res.json({message: "Funcionário excluido com sucesso!", status: "default"}); 

                return res.json({message: "Funcionário excluido com sucesso!", status: "sucesso!"}); 
            })        
    })
}

exports.atualizandoUser = (req, res, next) => {
    const { nome, sobrenome, email, telefone, status_ativo, status_desativo} = req.body;

    if(telefone.length != 11) return res.json({message: "Tamanho de número inválido!"});

    let retorno = "Dados do funcionário atualizado com sucesso!";
    let query;
    let body;

    if (nome, telefone) {
        query = `
            UPDATE tbl_User
            SET nome = ?, telefone = ?
            WHERE email_Login = ?;
        `
        body = [nome + ' ' + sobrenome, telefone, email];
    }

    if (nome, !telefone) {
        query = `
            UPDATE tbl_User
            SET nome = ?
            WHERE email_Login = ?;
        `
        body = [nome + ' ' + sobrenome, email];
    }

    if (telefone, !nome) {
        query = `
            UPDATE tbl_User
            SET telefone = ?
            WHERE email_Login = ?;
        `
        body = [telefone, email];
    }

    mysql.getConnection((err, conn) => {
        if (err) return res.json({message: "Erro ao conectar com o banco de dados!"});
        
        conn.query(query, body, (err, results) => {
            if (err) return res.json({message: "Erro na requisição"});

            if (results.affectedRows == 0) return res.json({message: "Funcionário não localizado"});

            if(status_ativo == 'on' || status_desativo == 'on'){

                const query = `UPDATE tbl_user SET ativo = ? WHERE email_Login = ?;`
                
                if(status_ativo == 'on'){
        
                    conn.query(query, [1, email], (err, result) => {
                        if(err) return res.json({message: "Erro ao ativar usuário!"});
            
                        if(result.affectedRows == 0) return res.json({message: "Funcionário não localizado!"})
                        
                    })
                }

                if(status_desativo == 'on'){

                    console.log(status_desativo, email);
        
                    conn.query(query, [0, email], (err, result) => {
                        if(err) return res.json({message: "Erro ao desativar usuário!"});
            
                        if(result.affectedRows == 0) return res.json({message: "Funcionário não localizado!"})
            
                    })
            
                }

            }

            if (status_ativo == 'on') retorno = "Funcionário ativado com sucesso! agora ele poderá realizar o acesso a plataforma de compras."
            if (status_desativo == 'on') retorno = "Funcionário desativado com sucesso! agora ele não poderá mais realizar o acesso a plataforma de compras."

            return res.json({message: retorno}); 
            
        })

    })

}

