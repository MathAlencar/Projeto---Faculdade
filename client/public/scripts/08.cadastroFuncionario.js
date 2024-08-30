
const buttonCadastro = document.querySelector('#cadastroFuncionario');


buttonCadastro.addEventListener('click', (e) => {
    e.preventDefault();

    const form = document.querySelector('#formularioFuncionario');
    const formatandoDados = new FormData(form);

    const dados = {
        nome: formatandoDados.get('nome'),
        sobreNome: formatandoDados.get('sobrenome'),
        email: formatandoDados.get('email'),
        number: formatandoDados.get('number'),
        senha: formatandoDados.get('senha'),
        confirmarSenha: formatandoDados.get('confirmarSenha')
    }

    fetch('/funcionarios/cadastro', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then ( response => {
        if(!response.ok) {
            throw new Error('Erro ao enviar dados')
        }

        return response.json();
    })
    .then(data => {
        alert(data.message)
        if(data.status == 'sucesso!') window.location.href = '/funcionarios';
        else {
            window.location.href = '/funcionarios/cadastro';
        }
    })
    .catch(error => {
        console.log(error);
    })
} )




