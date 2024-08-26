// Realizando a seleção de elementos da página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const buttonEntrada = document.querySelector('#entradaProduto');
const select = document.querySelector('#produto');



const input_valor_uni = document.querySelector('#valor-uni')
const input_valor_total = document.querySelector('#valor-total')

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

// Realizando o cadastro de produtos;

buttonEntrada.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#formularioEntrada');
  const formatandoDados = new FormData(form);

  const dados = {
    codigo: formatandoDados.get('codigo'),
    quantidade: formatandoDados.get('quantidade'),
    valorUnitario: formatandoDados.get('valorUnitario'),
    valorTotal: formatandoDados.get('valorTotal'),
    tipoProduto: formatandoDados.get('tipoProduto')
  }

  fetch('/entrada/produto', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then (response => {
    if(!response.ok) {
      throw new Error('Erro ao enviar dados')
    }

    return response.json();
  })
  .then(data => {
    console.log("Sucesso:", data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

})

function buscandoProduto(){

  const form = document.querySelector('#formularioEntrada');
  const formatandoDados = new FormData(form);

  const dados = {
    tipoProduto: formatandoDados.get('tipoProduto')
  }

  console.log(dados)

  // fetch('/chamada/produto/especifico', {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(dados)
  // })
  // .then (response => {
  //   if(!response.ok) {
  //     throw new Error('Erro ao enviar dados')
  //   }

  //   return response.json();
  // })
  // .then(data => {
  //   console.log("Sucesso:", data);
  // })
  // .catch(error => {
  //   console.error('Erro:', error);
  // });

}



 // Responsável por enviar os dados ao front-end, para assim realizar a construção dos itens selecionáveis na lista suspensa.

fetch('/chamada/produto')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
})
.then(data => {
  
  construindoSelect(data.produtos);

})
.catch(error => {
  console.error('Erro:', error);  
});

// <-- FIM

// Construindo select

function construindoSelect(data){
  const select = document.querySelector('#produto');

  for(let i=0; i<data.length; i++){
    let option = document.createElement('option');
    option.setAttribute("value", data[i].nome_Prd);
    option.innerHTML = data[i].nome_Prd;

    select.appendChild(option);
  }

}
