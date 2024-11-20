// Realizando a seleção de elementos da página
const buttonLogout = document.querySelector('.logo-exit');
const nome = document.querySelector('#nameUser');

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

// --> Definindo variáveis a serem usadas no front-end - Nome;
let nameUSer = getCookie('name');
nameUSer = nameUSer.split(' ');
nome.textContent = `Olá, ${nameUSer[0]}!`;

// Realiza o logout do sistema

buttonLogout.addEventListener('click', () => {
    sessionStorage.removeItem('store');
    fetch('/logout', {
        method: 'POST',
    })
    .then(response => {
        window.location.href = '/login';
    })
    .catch(error => {
        console.error('Erro ao fazer logout:', error);
    });
});

// <-- FIM

