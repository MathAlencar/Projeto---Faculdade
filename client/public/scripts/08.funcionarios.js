// Realizando a seleção de valores na página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const buttonCadastro = document.querySelector('#button-cadastrar');
const buttonPesquisar = document.querySelector('#buttonPesquisa');
const buttonEditar = document.querySelector('#buttonEditar');
const buttonApagar = document.querySelector('#apagarFuncionario');

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

// <-- FIM 

// Botões de eventos -->

buttonCadastro.addEventListener('click', () => {
  window.location.href = '/funcionarios/cadastro'
})

// realizando requisição --> 

fetch('/chamada')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }
    return response.json();
  })
  .then(data => {

    construirTabela(data.usuarios);

  })
  .catch(error => {
    console.error('Erro:', error);
  });
  
// REALIZANDO CHAMADA DE BUSCA BANCO DE DADOS;

buttonPesquisar.addEventListener('click', (e) => {
  e.preventDefault();

  const email = document.getElementById('searchbar').value;

  if(!document.getElementById('searchbar').value){
      fetch('/chamada')
    .then(response => {
      if (!response.ok) {
        throw new Error('Erro ao buscar os dados');
      }
      return response.json();
    })
    .then(data => {

      construirTabela(data.usuarios);

    })
    .catch(error => {
      console.error('Erro:', error);
    });
  }

  fetch(`/chamada/especifica?buscaFuncionario=${encodeURIComponent(email)}`)
  .then(response => {
      if (!response.ok) {
          throw new Error('Erro ao buscar os dados');
      }
      return response.json();
  })
  .then(data => {

      construirTabela(data.usuarios);

  })
  .catch(error => {
      console.error('Erro:', error);
  });
});

buttonEditar.addEventListener('click', (e) => {
  e.preventDefault();

  window.location.href = '/funcionarios/editar'

})


// BANCO


document.addEventListener('keydown', function(event) {
    if (event.key === "F11") {
        event.preventDefault();
    }
  });


function construirTabela(bancoDeDados) {
  const tbody = document.querySelector('#tbody');

  while (tbody.firstChild) {
    tbody.removeChild(tbody.firstChild);
  }

  if (bancoDeDados.length == 0) {
    let paragraph = document.createElement('p');
    paragraph.innerText = "Nenhum(a) funcionário(a) encontrado(a)!";
    tbody.appendChild(paragraph);
    return;
  }

  for (let i = 0; i < bancoDeDados.length; i++) {
    let tr = document.createElement('tr');
    tr.setAttribute('id', `tr${i}`);
    tbody.appendChild(tr);

    let row = document.querySelector(`#tr${i}`);

    if (i % 2 == 0) {
      row.setAttribute('class', 'linha-par');
    } else {
      row.setAttribute('class', 'linha-impar');
    }

    let td_nome = document.createElement('td');
    let td_email = document.createElement('td');
    let td_contato = document.createElement('td');
    let td_status = document.createElement('td');
    let span = document.createElement('span');
    let textoStatus = document.createElement('div');
    let td_edicao = document.createElement('td');
    let botao_edicao = document.createElement('button');
    let funcionarioAtual = bancoDeDados[i];

    td_status.setAttribute('class', 'status');

    if (bancoDeDados[i].status == "ativo") {
      span.setAttribute('class', 'material-icons ativo');
    } else {
      span.setAttribute('class', 'material-icons desativado');
    }

    span.innerText = "circle";
    td_status.appendChild(span);
    // textoStatus.innerText = bancoDeDados[i].status.toUpperCase();
    td_status.appendChild(textoStatus);

    td_nome.innerText = bancoDeDados[i].nome;
    td_email.innerText = bancoDeDados[i].email;
    td_contato.innerText = bancoDeDados[i].telefone;

    
    botao_edicao.innerText = "Editar";
    botao_edicao.setAttribute('class', 'botao-editar');
    botao_edicao.addEventListener('click', () => {
      console.log(bancoDeDados[i].nome);
      window.location.href = '/funcionarios/editar'
    })

    td_edicao.appendChild(botao_edicao);
    row.appendChild(td_nome);
    row.appendChild(td_email);
    row.appendChild(td_contato);
    row.appendChild(td_status);
    row.appendChild(td_edicao);
  }
}
