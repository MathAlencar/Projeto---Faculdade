// Relatorios dos pedidos   
fetch('/chamada/pedidosRealizados')
.then(response => {
  if (!response.ok) throw new Error('Erro ao buscar os dados');
  return response.json();
})
.then(data => {
  console.log(data)
  construirTabela(data)
})
.catch(error => console.error('Erro:', error));


function construirTabela(dados){
  let i = 0;
  const pedidos = dados.pedidos;
  const tabela = document.querySelector('#tabelaProdutos');
  const template = document.querySelector('#produto-template');

  pedidos.forEach(item => {
    if(item.qtd_TotProduto <= 0) return;
    const td = template.content.cloneNode(true);  // Clona o conteúdo do template

    // Popula o conteúdo do clone com os dados do produto
    td.querySelector('#codigo').textContent = item.numero_pedido;
    td.querySelector('#funcionario').textContent = item.funcionario;
    td.querySelector('#contato').textContent = item.contato;
    td.querySelector('#formaPagamento').textContent = item.forma_pagamento;
    td.querySelector('#valorCompra').textContent = item.valor_compra;
    const checkbox = td.querySelector('#status_pgto');

    if(item.status == 1) checkbox.checked = true; 

    let tr = td.querySelector('tr');
    tabela.appendChild(td); // Adiciona a linha à tabela

    if (i % 2 == 0) tr.setAttribute('class', 'linha-par');
    else tr.setAttribute('class', 'linha-impar');
    i++
  })
  verificaClick(tabela); // Chama a função que verifica os clicks na tabela
}

function verificaClick(tabela){
  tabela.addEventListener('click', (e) => {
    const tag = e.target;
    let span = tag.parentElement;
    const tr = span.parentElement;
    console.log(tr)

    if(tag.id === 'status_pgto'){
      console.log('estou aquiiii')
    }
    
  })
}

function filtrar() {
  let input,tabela,tr,td_nome;
  input = document.querySelector('#searchbar');
  tabela = document.querySelector('#tabelaProdutos');
  filter = input.value.toUpperCase();
  tr = tabela.getElementsByTagName("tr");

  // Esconde todas as linhas da tabela
  for (let i = 1; i < tr.length; i++) {
    tr[i].style.display = 'none'; 
  }

  // Mostra as linhas que correspondem à pesquisa
  for (let i = 1; i < tr.length; i++) {
    td_funcionario = tr[i].querySelector('#funcionario').innerHTML;
    if (td_funcionario.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = 'table-row'; // Mostra a linha
    }
  }
}


