const bcrypt = require('bcrypt'); // Chamando a biblioteca que irá fazer a criptografia da senha;
const jwt = require('jsonwebtoken'); // Com ela irei criar o token do usuário que relizar o login
const mysql = require('../aa.db').pool; // Aqui eu criei um documento com as credenciais do meu banco de dados, eu uso o metodo (pool), para exportar essas credenciais;


// o "Exports" significa que este caminho está disponível para ser exportado para ou doc de javaScript, onde ele será usado;
exports.register = (req, res) => {

        const { name, email, senha, confirmSenha} = req.body; // Aqui estou pegando os dados que o usuário envia no front-end;

        // Aqui faço a conexão padrão com o banco de dados
        mysql.query(`SELECT email FROM users WHERE email = ?`, [email], async (err, result) => {
            if(err) {
                console.log(err);
            }
            
            // Aqui ele me retorna um "result" com os dados do usuário, e com eles eu verifico se já tem um e-mail cadastrado idêntico ao que o usuário informou;
            if(result.length > 0) return res.render('01.menu.hbs', {
                message: "Este e-mail já está cadastrado"

                // res.render() --> Significa que eu estou recarregando a página html/hbs
            })
    
            // Verificando se ambas as senhas são iguais;
            else if( senha !== confirmSenha ) return res.render('01.menu.hbs', {
                message: "As senhas não coincidem"
                // res.render() --> Significa que eu estou recarregando a página html/hbs
            })
    
            let hashPassword = await bcrypt.hash(senha, 8); // Aqui uso a biblioteca bcrypt, para criptografar a senha informada;
            

            // Caso tudo estiver okey, o usuário é cadastrado normalmente
            mysql.query('INSERT INTO users SET ?', { name: name, email: email, senha: hashPassword}, (err, results) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log(results)
                        return res.render('01.menu.hbs', {
                            message: 'Usuario registrado!'
                            // res.render() --> Significa que eu estou recarregando a página html/hbs
                    })
                }
            });      
        });
}

// o "Exports" significa que este caminho está disponível para ser exportado para ou doc de javaScript, onde ele será usado;
exports.login = (req, res) => {

    const { email, senha} = req.body; // Aqui estou pegando os dados que o usuário envia no front-end;
    const query = `SELECT * FROM users WHERE email = ?` // Eu separei a query do mysql nesta variável, porém opera da mesma forma.

    // Criando a conexão padrão com o banco de dados
    mysql.query(query, [email], (err, results) => {

        // Verificando se houve algum erro ao conectar com o bando de dados
        if(err) return res.render('00.login.hbs', {
            message: "Erro ao conectar com o servidor"
            // res.render() --> Significa que eu estou recarregando a página html/hbs
        })

        if(results.length < 1) return res.render('00.login.hbs', {
            message: "Usuário incorreto email"
            // res.render() --> Significa que eu estou recarregando a página html/hbs
        })
        
        bcrypt.compare(senha, results[0].senha, (err, result) => {
            if(err) return res.render('00.login.hbs', {
                message: "Usuario incorreto senha"
            })

            if(result){
                // res.clearCookie('jwt'); // Aqui a cada nova sessão de login criada, você está limpando a sua variável de token, assim ela irá receber uma nova!

                // Aqui você está declarando a sua variável de token de acordo com os dados fornecidos pelo usuário.
                const token = jwt.sign({
                    id_usuario: results[0].id, // informações do usuário;
                    email: results[0].email // informações do usuário;
                }, process.env.JWT_KEY,{
                    expiresIn: process.env.JWT_EXPIRE_IN // Aqui você defini em quanto tempo a sessão irá durar, podendo ser um 1h ou dias, eu defini como padrão de 1 hora;
                });

                // Aqui é complicado explicar, pessoalmente eu te falo melhor que esse trecho de código faz, porém basicamente ele gera informações de token
                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES  * 60 * 60 * 1000 // Aqui você defini o quanto tempo o cookie será armazenado no navegador do usuário
                    ),
                    httpOnly: true,
                }

                res.cookie('jwt', token, cookieOptions); // Definindo a sua variável de cookie, a qual eu irei usar sempre;
                res.cookie('name', results[0].name)
                res.cookie('email', results[0].email)

                console.log(`cookie novo: ${token}`)
                return res.render('01.menu.hbs');
            }

            return res.render('00.login.hbs', {
                message: "falha na autenticação"
            })
        })
    } )  
}

exports.logout = (req, res) => {
    res.clearCookie('jwt');
    res.clearCookie('name');
    res.clearCookie('email');
    return res.render('00.login.hbs')
}


