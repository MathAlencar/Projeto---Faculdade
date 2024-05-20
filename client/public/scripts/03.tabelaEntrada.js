// Realizando a seleção de elementos da página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const buttonEntrada = document.querySelector('#entradaProduto');

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

fetch('/entradas/produtos')
.then(response => {
  if(!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
})
.then(data => {
  construirTabela(data.entradas);
})
.catch(error => {
  console.error("Erro:", error);
});

// <-- FIM

// <-- FIM 

let lista = obterListaProdutos();
construirTabela(lista);

function obterListaProdutos() {
  let listaProdutos = [
    {
      id: 1,
      nome: "Aaaa",
      data: new Date().toLocaleDateString(),
      quantidade: 5,
      preco: 50.0
    },
    {
      id: 2,
      nome: "Bbbb",
      data: new Date().toLocaleDateString(),
      quantidade: 10,
      preco: 100.0
    },
    {
      id: 3,
      nome: "Cccc",
      data: new Date().toLocaleDateString(),
      quantidade: 20,
      preco: 250.0
    },
  ];

  atribuirValorTotal(listaProdutos);

  return listaProdutos;
}

function atribuirValorTotal(listaProdutos) {
  for (let i = 0; i < listaProdutos.length; i++) {
    listaProdutos[i].valorTotal = (listaProdutos[i].quantidade * listaProdutos[i].preco);
  }
}

function construirTabela(listaProdutos) {
  const tbody = document.querySelector('#tbody');

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (listaProdutos.length == 0) {
    let paragraph = document.createElement('p');
    paragraph.innerText = "Nenhum pedido realizado!";
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
    let td_data = document.createElement('td');
    let td_quantidade = document.createElement('td');
    let td_preco = document.createElement('td');
    let td_valor_total = document.createElement('td');

    td_nome.innerText = listaProdutos[i].nome_produto;
    td_data.innerText = listaProdutos[i].data_entrada;
    td_id.innerText = listaProdutos[i].id;
    td_quantidade.innerText = listaProdutos[i].qtd_comprada;
    td_preco.innerText = listaProdutos[i].preco_unitario;
    td_valor_total.innerText = listaProdutos[i].preco_total;

    row.appendChild(td_id);
    row.appendChild(td_nome);
    row.appendChild(td_data);
    row.appendChild(td_quantidade);
    row.appendChild(td_preco);
    row.appendChild(td_valor_total);
  }
}

function buscarProduto() {
  let input = document.getElementById('searchbar').value.toLowerCase();
  let lista = obterListaProdutos();
  let listaFiltrada = [];

  for (let i = 0; i < lista.length; i++) {
    if (lista[i].nome.toLowerCase().includes(input)) {
      listaFiltrada.push(lista[i]);
    }
  }

  construirTabela(listaFiltrada);
}

