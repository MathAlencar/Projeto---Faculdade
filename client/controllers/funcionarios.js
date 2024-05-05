const bcrypt = require('bcrypt'); // Chamando a biblioteca que irá fazer a criptografia da senha;
const jwt = require('jsonwebtoken'); // Com ela irei criar o token do usuário que relizar o login
const mysql = require('../aa.db').pool; // Aqui eu criei um documento com as credenciais do meu banco de dados, eu uso o metodo (pool), para exportar essas credenciais;

// o "Exports" significa que este caminho está disponível para ser exportado para ou doc de javaScript, onde ele será usado;
exports.listarFuncionarios = (req, res) => {
  res.status(200).send({
    funcionarios: [
      {
        id: 1,
        nome: "Amanda",
        email_login: "amanda@email.com",
        telefone: "1111111-1111",
        ativo: 0
      },
      {
        id: 2,
        nome: "Bruno",
        email_login: "bruno@email.com",
        telefone: "1111111-1111",
        ativo: 1
      },
    ]
  });
}