const express = require('express'); // Chamando a biblioteca express
const router = express.Router(); // Exportando para fora;
const mysql = require('../aa.db').pool; // chamando as credenciais do banco de dados;
const data = new Date().toISOString().slice(0, 10); // PEgando a data no formatado desejado para o banco;
const path = require('path');


exports.entradaProduto = (req, res, next) => {

    const {codigo, quantidade, valorUnitario, valorTotal, tipoProduto} = req.body;

    valorTotal_tratado = parseFloat(valorTotal.replace(/R\$|\s/g, '').replace(',', '.'));

    mysql.getConnection((err, conn) => {
        if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

        const query = `SELECT * FROM tbl_produto WHERE cod_Prd = ?;`;

        conn.query(query, [codigo], (err, result) => {
            conn.release();
            if(err) return res.json({message: "Erro na requisição SQL!"});

            if(result.length == 0) return res.json({message: "Nenhum produto foi localizado, contante o suporte!"});

            mysql.getConnection((err, conn) => {
                const query2 = `INSERT INTO tbl_entrada2 (codigo_produto, nome_produto , preco_total, preco_unitario, qtd_comprada, data_entrada) VALUES (?,?,?,?,?,?);`
                conn.query(query2, [codigo, tipoProduto, valorTotal_tratado, valorUnitario, quantidade, data], (err, result) => {
                    conn.release();
                    if(err) return res.json({message: "Erro ao enviar a entrada de produto!"});

                    mysql.getConnection((err, conn) => {
                        const query3 = `UPDATE tbl_produto
                        SET qtd_TotProduto = qtd_TotProduto + ?, vlr_Unit = ?
                        WHERE cod_Prd = ?;`

                        conn.query(query3, [quantidade, valorUnitario, codigo], (err, result) => {
                            conn.release();
                            if(err) return res.json({message: "Erro ao atualizar a quantidade do produto!"});

                            return res.json({message: "Entrada realizada com sucesso!"});
                        })
                    })
                })
            })
        })
    })
}

exports.entradasProdutos = (req, res, next) => {
    
    mysql.getConnection((err, conn) => {
        if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'pages', '03.entrada.html'),  console.log("Erro ao conectar com o banco de dados"));

        const query = `SELECT * FROM tbl_entrada2;`;

        conn.query(query, (err, result) => {
            conn.release();
            if(err) return res.sendFile(path.join(__dirname, '..', 'public', 'admin', 'pages', '03.entrada.html'), console.log("Erro na requisição"));

            const response = {
                quantidade: result.length,
                entradas: result.map( entrada => {
                    return {
                        id: entrada.codigo_produto,
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

exports.catalogandoPedido = (req, res, next) => {

    const {nome, email, tipo_pagamento, valor_compra ,produtos_solicitados } = req.body.request

    mysql.getConnection((err, conn) => {
        
        if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});
        
        const query = `SELECT * FROM tbl_User WHERE email_Login = ?`;

        conn.query(query, [email], (err, result) => {
            conn.release();
            
            if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

            if(result.length == 0) return res.json({message: "Nenhum usuário foi encontrado!"});
            
            let contato = result[0].telefone;

            const query = `INSERT INTO pedidos_realizados (contato, status, forma_pagamento, funcionario, valor_compra) VALUES (?,?,?,?,?); `;

            conn.query(query, [contato, 0, tipo_pagamento, nome, valor_compra], (err, result) => {
                conn.release();

                if(err) return res.json({message: "Erro ao conectar com o banco de dados!!"});

                return res.json({message: "Pedido realizado com sucesso!"})

            })
        })
    })
    
}

exports.historicoPedidosRealizados = (req, res, next) => {
        
    mysql.getConnection((err, conn) => {
        if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

        const query = `SELECT * FROM pedidos_realizados`;

        conn.query(query, (err, result) => {
            conn.release();
            if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

            const response = {
                quantidade: result.length,
                pedidos: result.map( pedidos => {''
                    return {
                        numero_pedido: pedidos.id,
                        funcionario: pedidos.funcionario,
                        forma_pagamento: pedidos.forma_pagamento,
                        status: pedidos.status,
                        contato: pedidos.contato,
                        valor_compra: pedidos.valor_compra,
                    }
                })
            }

            return res.json(response);

        })
    })
}

exports.confirmandoCompra = (req, res, next) => {

    const {id} = res.body;
        
    mysql.getConnection((err, conn) => {
        if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

        const query = `UPDATE pedidos_realizados SET ativo = ? WHERE id = ?;`

        conn.query(query, [1, id], (err, result) => {
            conn.release();
            if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

            if(result.affectedRows == 0) return res.json({message: "Erro ao atualizar status do produto!"})

            return res.json({message: "Pedido atualizado com sucesso!"});

        })
    })
}

exports.chamandoSaida = (req, res, next) => {

    mysql.getConnection((err, conn) => {
        if (err) return res.json({message: "Erro ao conectar com o banco de dados"});

        const query = `SELECT * FROM tbl_saida;`;

        conn.query(query, (err, result) => {
            conn.release();
            if (err) return res.json({message: "Erro ao conectar com o banco de dados"});

            if (result.length == 0) return res.json({message: "Nenhuma saida foi encontrado"});

            const response = {
                quantidade: result.length,
                produtos: result.map(prod => {
                    return {
                        codidog_pedido: prod.codigo_pedido,
                        codigo_produto: prod.codigo_produto,
                        funcionario: prod.funcionario,
                        data_saida: prod.data_saida,
                        qtd_comprada: prod.qtd_comprada,
                        nome_produto: prod.nome_produto,
                        forma_pagamento: prod.forma_pagamento,
                        valor_compra: prod.valor_compra
                    }
                })
            }

            return res.json(response);
        })
    })
}

exports.negativandoCompra = (req, res, next) => {

    const {id} = req.body;
        
    mysql.getConnection((err, conn) => {
        if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

        const query = `UPDATE pedidos_realizados SET status = ? WHERE id = ?;`

        conn.query(query, [1, id], (err, result) => {
            conn.release();
            if(err) return res.json({message: "Erro ao conectar com o banco de dados!"});

            if(result.affectedRows == 0) return res.json({message: "Erro ao atualizar status do produto!"})

            return res.json({message: "Pedido atualizado com sucesso!"});

        })
    })
}