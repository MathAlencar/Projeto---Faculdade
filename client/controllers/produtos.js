const bcrypt = require('bcrypt'); // Chamando a biblioteca que irá fazer a criptografia da senha;
const jwt = require('jsonwebtoken'); // Com ela irei criar o token do usuário que relizar o login
const mysql = require('../aa.db').pool; // Aqui eu criei um documento com as credenciais do meu banco de dados, eu uso o metodo (pool), para exportar essas credenciais;

// o "Exports" significa que este caminho está disponível para ser exportado para ou doc de javaScript, onde ele será usado;
exports.listarProdutos = (req, res) => {
  res.status(200).send({
    produtos: [
      {
        id: 1,
        id_prdt: 1818,
        nome_prdt: "Chocolate",
        qtd_totalprdt: 15,
        vlr_vendaUnit: 20
      },
      {
        id: 2,
        id_prdt: 1819,
        nome_prdt: "Baunilha",
        qtd_totalprdt: 25,
        vlr_vendaUnit: 35
      },
    ]
  });
}

exports.listarEntradaProdutos = (req, res) => {
  res.status(200).send({
    produtos: [
      {
        id: 1,
        id_entrada: 1818,
        nome_prdt: "Chocolate",
        qtd_item: 15,
        vlr_unit: 20,
        data: "2024-05-20"
      },
      {
        id: 2,
        id_entrada: 1819,
        nome_prdt: "Baunilha",
        qtd_item: 25,
        vlr_unit: 35,
        data: "2024-05-21"
      },
    ]
  });
}

exports.listarSaidaProdutos = (req, res) => {
  res.status(200).send({
    produtos: [
      {
        id: 1,
        id_produto: 1818,
        id_saida: 2500,
        nome_user: "Amanda",
        nome_prdt: "Chocolate",
        data: "2024-05-20",
        qtd_item: 15,
        vlr_unitSaida: 20,
        vlr_totalSaida: 300,
        forma_pagamento: "crédito"
      },
      {
        id: 2,
        id_produto: 1819,
        id_saida: 2501,
        nome_user: "Bruno",
        nome_prdt: "Baunilha",
        data: "2024-05-21",
        qtd_item: 25,
        vlr_unitSaida: 30,
        vlr_totalSaida: 750,
        forma_pagamento: "débito"
      },
    ]
  });
}