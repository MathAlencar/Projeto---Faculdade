// Busca dados dos produtos cadastrados no banco
fetch('/chamada/produto')
.then(response => {
    if (!response.ok) throw new Error('Erro ao buscar os dados');
    return response.json();
})
.then(data => construirTabela(data)) //Chama a função que constroi a tabela e exibe os produtos encontrados
.catch(error => console.error('Erro:', error));

function construirTabela(dados){
  let i = 0;
  const produtos = dados.produtos;

  const tabela = document.querySelector('#tabelaProdutos');
  const template = document.querySelector('#produto-template');

  produtos.forEach(item => {
    if(item.qtd_TotProduto <= 0){
      return;
    }
    const td = template.content.cloneNode(true);  // Clona o conteúdo do template

    // Popula o conteúdo do clone com os dados do produto
    td.querySelector('#prod').textContent = item.nome_Prd;
    td.querySelector('#vlrUnitario').textContent = `R$ ${item.vlr_Unit}`;
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
    const spanQtd = span.querySelector('.qtdAtual');

    if(tag.classList.contains('addProdutos')){
      atualizaValorTotal(spanQtd,tr,'add');
    }
    if(tag.classList.contains('removeProdutos')){
      atualizaValorTotal(spanQtd,tr,'remove');
    }
    if(tag.classList.contains('btnAdd')){
      e.preventDefault();
      const span = tr.querySelector('.qtdAtual');

      const tipoProduto_01 = tr.querySelector('#prod').textContent;

      const dados = {
        tipoProduto: tipoProduto_01
      }

      // Aqui estou realizando a chamada da API no banco de dados, onde a cada nova inserção de produto no carrinho ele irá validar se a quantidade está compatível ou não.

      fetch('/chamada/produto/especifico', {
        method: "PATCH",
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

        // Criando a variável que irá receber os produtos, pois com ela irei validar se não há produto repetido, assim resolvendo o primeiro Erro.
        let itens = JSON.parse(sessionStorage.getItem('compra'));

        let quantidade_produto = data.produto[0].qtd_Prd; // Recebe a quantidade armazenada no banco de dados.

        let qtd_prod = parseFloat(span.innerHTML) // Recebe a quantidade solicitada pelo usuário.

        let verificando_na_tabela_qtd = 0

        if(itens){

            for(let i=0; i<itens.length; i++){
              let nome_produto = itens[i].nome;
              let qtd_produto_procurado = parseFloat(itens[i].qtd);
            
              if(tipoProduto_01 == nome_produto){
                  verificando_na_tabela_qtd = verificando_na_tabela_qtd + qtd_produto_procurado
              }
          }
        }

        if(verificando_na_tabela_qtd > 0){
            if(verificando_na_tabela_qtd + qtd_prod > quantidade_produto){
              popup(`Não é possível adicionar o produto no carrinho, pois [quantidade solicitada] + [o que já está no carrinho] excede a disponível em Estoque`); // Exibe popup avisando o usario que o item foi adicionado
              return
            }
        }
        
        if(qtd_prod > quantidade_produto){
          popup(`Não é possível adicionar o produto no carrinho, escolha uma quantidade menor ou igual a: ${quantidade_produto} (Em Estoque)`); // Exibe popup avisando o usario que o item foi adicionado
        }
        else {
          if(!addCarinho(tr,span)) return; //Chama a função que adiciona os itens na aba "finalizar compra" 

          limpaItem(span,tr); //Chama a função que limpa os itens na tabela após add no carrinho
          popup('Produto adicionado no carrinho com sucesso!'); // Exibe popup avisando o usario que o item foi adicionado
        }

      })
      .catch(error => {
        console.error('Erro:', error);
      });
    }
  })
}

function addCarinho(tr,td){
  const nome = tr.querySelector('#prod').textContent; // Obtem o nome do produto
  const valor = tr.querySelector('#vlrTotal').textContent; // Obtem o valor
  const qtd = td.textContent// Obtem a quantidade

  if(parseInt(qtd) <= 0){
    popup('Não foi possivel adicionar ao carrinho, quantidade não pode ser zero');
    return false;
  }

  let compra = JSON.parse(sessionStorage.getItem('compra')) || [];
  compra.push({nome, qtd, valor});
  sessionStorage.setItem('compra', JSON.stringify(compra)); // Salva temporiamente essas informações

  return true;
}



function popup(mensagem){
    const popUp = document.querySelector('#popup');
    popUp.style.display = 'flex'; // Torna o popup visivel
  
    //Seleciona os itens do popup
    const btnClose = document.querySelector('.close-btn');
    const btnBack = document.querySelector('.back-btn');
    const icon = document.querySelector('.icon');
    const message = document.querySelector('.message');
    message.innerHTML = mensagem; // Exibe mensagem de retorno
  
    
    if(mensagem.includes('sucesso')){
      icon.innerHTML = 'task_alt';
      btnBack.style.display = '';
    }else{
      icon.innerHTML = 'cancel';
      btnBack.style.display = 'none';
    }
  
    btnClose.addEventListener('click', (e) =>{
      popUp.style.display = 'none';
    })
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/caixa/compra'
    })
  }

// Função que realiza conta do valor TOTAL (qtd * valor unitario) e adiciona no front
function atualizaValorTotal (spanQtd,tr,button){
    let valorUni = tr.querySelector('#vlrUnitario')
    let valorTotal = tr.querySelector('#vlrTotal');
    
    valorUni = valorUni.textContent;
    valorUni = parseFloat(valorUni.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));
    let qtdAtual = spanQtd.textContent;
    qtdAtual = parseFloat(qtdAtual);

    if(button == 'add') qtdAtual++;
    else if(button === 'remove' && qtdAtual > 0) qtdAtual--;

    spanQtd.innerHTML = qtdAtual;
    const resultado = (qtdAtual * valorUni).toFixed(2);
    valorTotal.innerHTML = `R$ ${resultado}`;
}

function limpaItem(spanQtd,tr){
    let valorTotal = tr.querySelector('#vlrTotal');
    spanQtd.innerHTML = '0';
    valorTotal.innerHTML = 'R$ 0';
}

// Função que realiza a filtragem de valores após uma pesquisa
function filtrar() {
  var input,tabela,tr,td_nome;
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
    td_nome = tr[i].querySelector('#prod').innerHTML;
    if (td_nome.toUpperCase().indexOf(filter) > -1) {
      tr[i].style.display = 'table-row'; // Mostra a linha
    }
  }
}


// let produtosNoCarrinho = JSON.parse(sessionStorage.getItem('listaDeCompras'));

// let produtosNaoComprados = JSON.parse(sessionStorage.getItem('listaNaoCompras')); 

// console.log('a', produtosNoCarrinho)
// console.log('b', produtosNaoComprados)

