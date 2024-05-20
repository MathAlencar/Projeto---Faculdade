// Realizando a seleção de elementos da página
const buttonLogout = document.getElementById('buttonLogout');
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

// <-- FIM



// <-- FIM

function obterListaProdutos() {
  let listaProdutos = [
    {
      id_produto: 1,
      id_venda: 1,
      nome_funcionario: "MATHEUS NASCIMENTO",
      nome_produto: "COCA COLA",
      data: new Date().toLocaleDateString(),
      quantidade: 5,
      valor: 50.0,
      forma_pagamento: "crédito"
    },
    {
      id_produto: 2,
      id_venda: 2,
      nome_funcionario: "MATHEUS NASCIMENTO",
      nome_produto: "BOLINHO",
      data: new Date().toLocaleDateString(),
      quantidade: 10,
      valor: 100.0,
      forma_pagamento: "crédito"
    },
    {
      id_produto: 3,
      id_venda: 3,
      nome_funcionario: "MATHEUS NASCIMENTO",
      nome_produto: "SALGADO",
      data: new Date().toLocaleDateString(),
      quantidade: 20,
      valor: 250.0,
      forma_pagamento: "crédito"
    },
  ];

  return listaProdutos;
}

let lista = obterListaProdutos();
construirTabela(lista);

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

    let td_id_produto = document.createElement('td');
    let td_id_venda = document.createElement('td');
    let td_nome_funcionario = document.createElement('td');
    let td_nome_produto = document.createElement('td');
    let td_data = document.createElement('td');
    let td_quantidade = document.createElement('td');
    let td_valor = document.createElement('td');
    let td_forma_pagamento = document.createElement('td');

    td_id_produto.innerText = listaProdutos[i].id_produto;
    td_id_venda.innerText = listaProdutos[i].id_venda;
    td_nome_funcionario.innerText = listaProdutos[i].nome_funcionario;
    td_nome_produto.innerText = listaProdutos[i].nome_produto;
    td_data.innerText = listaProdutos[i].data;
    td_quantidade.innerText = listaProdutos[i].quantidade;
    td_valor.innerText = listaProdutos[i].valor;
    td_forma_pagamento.innerText = listaProdutos[i].forma_pagamento;

    row.appendChild(td_data);
    row.appendChild(td_nome_funcionario);
    row.appendChild(td_nome_produto);
    row.appendChild(td_id_produto);
    row.appendChild(td_id_venda);
    row.appendChild(td_quantidade);
    row.appendChild(td_valor);
    row.appendChild(td_forma_pagamento);
  }
}

let input = document.getElementById('searchbar').value.toLowerCase();

function buscarProduto(input) {
  let lista = obterListaProdutos();
  let listaFiltrada = [];

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nome_funcionario.toLowerCase().includes(input)) {
      listaFiltrada.push(lista[i]);
    }
  }

  construirTabela(listaFiltrada);
}

buscarProduto(input);
