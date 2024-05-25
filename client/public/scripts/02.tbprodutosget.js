// Realizando a seleção de elementos da página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const teste = document.querySelector('#teste');

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



  fetch('/chamada/produto')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }
    return response.json();
  })
  .then(data => {
    
    construirTabela(data.produtos);

  })
  .catch(error => {
    console.error('Erro:', error);  
  });




// <-- FIM

function construirTabela(listaProdutos) {
  const tbody = document.querySelector('#tbody');

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (listaProdutos.length == 0) {
    let paragraph = document.createElement('p');
    paragraph.innerText = "Nenhum produto encontrado!";
    tbody.appendChild(paragraph);
    return;
  }

  for (let i = 0; i < listaProdutos.length; i++) {
    let tr = document.createElement('tr');
    tr.setAttribute('id', `tr${i}`);
    tbody.appendChild(tr);

    let row = document.querySelector(`#tr${i}`);

    if (i % 2 == 0) {
      row.setAttribute('class', 'linha-par');
    } else {
      row.setAttribute('class', 'linha-impar');
    }

    let td_id = document.createElement('td');
    let td_nome = document.createElement('td');
    let td_quantidade = document.createElement('td');
    let td_preco = document.createElement('td');

    td_id.innerText = listaProdutos[i].cod_Prd;
    td_nome.innerText = listaProdutos[i].nome_Prd;
    td_quantidade.innerText = listaProdutos[i].qtd_TotProduto;
    td_preco.innerText = `R$ ${listaProdutos[i].vlr_Unit}`;

    row.appendChild(td_id);
    row.appendChild(td_nome);
    row.appendChild(td_quantidade);
    row.appendChild(td_preco);
  }
}

// function buscarProduto() {
//   let input = document.getElementById('searchbar').value.toLowerCase();
//   let lista = obterListaProdutos();
//   let listaFiltrada = [];

//   for (let i = 0; i < lista.length; i++) {
//     if (lista[i].nome.toLowerCase().includes(input)) {
//       listaFiltrada.push(lista[i]);
//     }
//   }

//   construirTabela(listaFiltrada);
// }
