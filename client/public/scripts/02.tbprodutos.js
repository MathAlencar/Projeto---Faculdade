// Realizando a seleção de elementos da página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const buttonCadastro = document.querySelector('#cadastrar-produto');
const buttonExcluir = document.querySelector('#excluir-produto');

const prod_nome = document.querySelector('#name');
const prod_codigo = document.querySelector('#codigo');
const prod_valor = document.querySelector('#valor');

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


// Envia o formulário de histórico de pedidos para o banco de dados, o qual será exibido no front-end.

buttonCadastro.addEventListener('click', (e) => {
      e.preventDefault();
      const form = document.querySelector('#formularioProduto');
      const formatandoDados = new FormData(form);

      const dados = {
        nome: formatandoDados.get('nome'),
        codigo: formatandoDados.get('codigo'),
        valor: formatandoDados.get('valor')
      }

      fetch('/cadastrando/produto', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
      })
      .then ( response => {
        if(!response.ok) {
          throw new Error('Erro no envio de dados')
        }

        return response.json();
      })
      .then(data => {
          prod_nome.value = '';
          prod_codigo.value = '';
          prod_valor.value = '';
          
          alert(data.message) 
      })
      .catch(error => {
        console.log(error);
      });
})

// <-- FIM




// Código para excluir produto, foi criado para fins de teste, porém precisa ser validado.

// buttonExcluir.addEventListener('click', (e) => {
//   e.preventDefault();
//   const form = document.querySelector('#formularioProduto');
//   const formatandoDados = new FormData(form);

//   const dados = {
//     codigo: formatandoDados.get('codigo'),
//   }

//   fetch('/deletando/produto', {
//     method: "DELETE",
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(dados)
//   })
//   .then (response => {
//     if(!response.ok) {
//       throw new Error('Erro ao deletar dados')
//     }

//     return response.json();
//   })
//   .then(data => {

//     prod_nome.value = '';
//     prod_codigo.value = '';
//     prod_valor.value = '';

//     alert(data.message);
//   })
//   .catch(error => {
//     console.log(error);
//   })

// })






















