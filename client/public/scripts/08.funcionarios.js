// Realizando a seleção de valores na página
const buttonLogout = document.getElementById('buttonLogout');
const nome = document.querySelector('#first');
const email = document.querySelector('#second');
const cookie = document.cookie;
const buttonCadastro = document.querySelector('#button-cadastrar');
const buttonPesquisar = document.querySelector('#buttonPesquisa');
const buttonEditar = document.querySelector('#buttonEditar');
const buttonApagar = document.querySelector('#apagarFuncionario');



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
  e.preventDefault();

  window.location.href = '/funcionarios/cadastro'
})

buttonEditar.addEventListener('click', (e) => {
  e.preventDefault();

  window.location.href = '/funcionarios/editar'
})






// realizando requisição --> 

fetch('/chamada/funcionarios')
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao buscar os dados');
    }
    return response.json();
  })
  .then(data => {

    let funcionarios = data.usuarios; // tratando os dados;

    let i = 0;
    const ul = document.querySelector('#tbody')

    funcionarios.forEach((item) => {

      let tr = document.createElement('tr');
      
      let  td_nome_fun = document.createElement('td');
      td_nome_fun.setAttribute('id', 'id_nome_fun');
      let  td_email = document.createElement('td');
      td_email.setAttribute('id', 'id_email');
      let  td_telefone = document.createElement('td');
      td_telefone.setAttribute('id', 'td_telefone');

      td_nome_fun.innerHTML = item.nome
      td_email.innerHTML = item.email
      td_telefone.innerHTML =  item.telefone

      tr.appendChild(td_nome_fun)
      tr.appendChild(td_email)
      tr.appendChild(td_telefone)

      if (i % 2 == 0) {
        tr.setAttribute('class', 'linha-par');
      } else {
        tr.setAttribute('class', 'linha-impar');
      }

      ul.appendChild(tr);
      i++

    })

  })
  .catch(error => {
    console.error('Erro:', error);
  });


function filtrar() {
  var input,
    ul,
    tr,
    td_nome_fun ,
    count = 0;

  input = document.querySelector('#searchbar');
  ul = document.querySelector('#tbody');

  filter = input.value.toUpperCase();

  tr = ul.getElementsByTagName("tr");

  // Esconde todas as linhas da tabela
  for (let i = 0; i < tr.length; i++) {
    tr[i].style.display = 'none'; 
  }

  // Mostra as linhas que correspondem à pesquisa
  for (let i = 0; i < tr.length; i++) {

    td_nome_fun = tr[i].querySelector('#id_nome_fun').innerHTML;

    if (td_nome_fun.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = 'table-row'; // Mostra a linha
    }
  }
}



