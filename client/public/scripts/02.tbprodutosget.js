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
    
    let produtos = data.produtos;

    let i = 0;
    const ul = document.querySelector('#tabelaProdutos');

    produtos.forEach((item) => {
        let tr = document.createElement('tr');

        let td_id = document.createElement('td');
        td_id.setAttribute('id', 'id_prod');
        let td_nome = document.createElement('td');
        td_nome.setAttribute('id', 'id_nome');
        let td_quantidade = document.createElement('td');
        td_quantidade.setAttribute('id', 'id_qtd');
        let td_preco = document.createElement('td');
        td_preco.setAttribute('id', 'id_preco');

        td_id.innerText = item.cod_Prd;
        td_nome.innerText = item.nome_Prd;
        td_quantidade.innerText = item.qtd_TotProduto;
        td_preco.innerText = `R$ ${item.vlr_Unit}`;

        tr.appendChild(td_id);
        tr.appendChild(td_nome);
        tr.appendChild(td_quantidade);
        tr.appendChild(td_preco);

        if (i % 2 == 0) {
          tr.setAttribute('class', 'linha-par');
        } else {
          tr.setAttribute('class', 'linha-impar');
        }

        ul.appendChild(tr);
        i++;
    })

  })
  .catch(error => {
    console.error('Erro:', error);  
  });

  function filtrar() {
    var input,
      ul,
      tr,
      td_id,
      td_nome,
      td_quantidade,
      td_preco,
      count = 0;
  
    input = document.querySelector('#searchbar');
    ul = document.querySelector('#tabelaProdutos');
  
    filter = input.value.toUpperCase();
  
    tr = ul.getElementsByTagName("tr");
  
    // Esconde todas as linhas da tabela
    for (let i = 1; i < tr.length; i++) {
      tr[i].style.display = 'none'; 
    }
  
    // Mostra as linhas que correspondem à pesquisa
    for (let i = 1; i < tr.length; i++) {
      td_id = tr[i].querySelector('#id_prod').innerHTML;
      td_nome = tr[i].querySelector('#id_nome').innerHTML;
      td_quantidade = tr[i].querySelector('#id_qtd').innerHTML;
      td_preco = tr[i].querySelector('#id_preco').innerHTML;
  
      if (td_nome.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = 'table-row'; // Mostra a linha
      }
    }
  }