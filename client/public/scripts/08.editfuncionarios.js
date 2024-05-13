const buttonApagar = document.querySelector('#apagarFuncionario');
const button_atualizar = document.querySelector('#button_atualizar');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;

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

// --> Definindo variáveis a serem usadas no front-end;
const nameUSer = getCookie('name'); 
const emailUSer = getCookie('email');

nome.innerHTML = nameUSer;
email.innerHTML = emailUSer;

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


  button_atualizar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email_edit').value;

    alert('teste')
  
    fetch(`/atualizando?email_user=${encodeURIComponent(email)}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email_user: email})
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('DEU CERTO');
    })
    .catch(error => {
        console.error('Erro ao excluir o usuário:', error);
    });


  })

