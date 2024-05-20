const buttonApagar = document.querySelector('#apagarFuncionario');
const button_atualizar = document.querySelector('#button_atualizar');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const buttonLogout = document.getElementById('buttonLogout');




// Funções da página -->

function getCookie(name) {
    const cookie = document.cookie;
    const separandoCookie = cookie.split('; ');
    for( let buscando of separandoCookie) {
        const [cookieNome, cookieValor] = buscando.split('=');
        if(cookieNome === name) {
            return decodeURIComponent(cookieValor);
        }
    }

    return null
}

// <-- FIM

// --> Definindo variáveis a serem usadas no front-end - Nome e E-mail;

const nameUSer = getCookie('name'); 
const emailUSer = getCookie('email');

nome.innerHTML = nameUSer;
email.innerHTML = emailUSer;

// <-- FIM 

// eventos da página -->

 // Deleta usuário com base no e-mail;
buttonApagar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email_edit').value;

    alert('usuário excluido!')
  
    fetch(`/delete?email_user=${encodeURIComponent(email)}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário excluído com sucesso:', data.message);
    })
    .catch(error => {
        console.error('Erro ao excluir o usuário:', error);
    });


  })

// validando ainda
  button_atualizar.addEventListener('click', (e) => {
    e.preventDefault();
    
    const form = document.querySelector('#formulario');
    const formatandoDados = new FormData(form);

    const dados = {
        nome: formatandoDados.get('nome_user'),
        sobrenome: formatandoDados.get('sobrenome_user'),
        email: formatandoDados.get('email_user'),
        telefone: formatandoDados.get('tel_user')

    }

    fetch('/atualizando', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }
        return response.json();
    })
    .then(data => {
    })
    .catch(error => {
        console.error('Erro:', error);
    });

})


  // Realiza o logout do sistema
  
  buttonLogout.addEventListener('click', () => {
    fetch('/auth/logout', {
        method: 'POST',
    })
    .then(response => {
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});

