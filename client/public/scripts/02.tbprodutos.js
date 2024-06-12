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

// Tratamento de erro formulário vazio

//

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


buttonExcluir.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#formularioProduto');
  const formatandoDados = new FormData(form);

  const dados = {
    codigo: formatandoDados.get('codigo'),
  }

  fetch('/deletando/produto', {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(dados)
  })
  .then (response => {
    if(!response.ok) {
      throw new Error('Erro ao deletar dados')
    }

    return response.json();
  })
  .then(data => {

    prod_nome.value = '';
    prod_codigo.value = '';
    prod_valor.value = '';

    alert(data.message);
  })
  .catch(error => {
    console.log(error);
  })

})

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
    td_preco.innerText = listaProdutos[i].vlr_Unit;

    row.appendChild(td_id);
    row.appendChild(td_nome);
    row.appendChild(td_quantidade);
    row.appendChild(td_preco);
  }
}
