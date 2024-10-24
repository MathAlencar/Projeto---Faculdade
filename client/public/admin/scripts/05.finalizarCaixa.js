// Carrega os itens que foram adicionados no carrinho
const produtos = JSON.parse(sessionStorage.getItem('compra'));

// Pegando o tipo de pagamento escolhido pelo usuário.

const opc_pagamento = document.querySelector('#metodo')
const total_compra = document.querySelector('#total')

let compras = []
let compras_nao = [] 
let promises = []

// Buscando o nome e email do usuário.
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

// --> Definindo variáveis a serem usadas no front-end - Nome e E-mail que serão enviadas ao banco de dados;
const nameUSer_real_prod = getCookie('name');
const emailUSer_real_prod = getCookie('email');

function criaTabela(produtos){
  //Se nenhum item foi adicionado ao carrinho
  if(!carrinhoVazio(produtos)) return;
  let soma = 0;
  const tabela = document.querySelector('#tabelaProdutos');
  const template = document.querySelector('#produto-template');
  const valorTotal = document.querySelector('#total');

  for(let produto of produtos){
    const tr = template.content.cloneNode(true); // Clona o conteúdo do template no HTML

    tr.querySelector('.nome').textContent = produto.nome;
    tr.querySelector('.tdQtd').textContent = produto.qtd; 
    tr.querySelector('.tdValor').textContent = `${produto.valor}`;
    tabela.appendChild(tr); // Adiciona a linha à tabela

    soma += parseFloat(produto.valor.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));
  }
  valorTotal.value =`R$ ${soma.toFixed(2)}`;
}
window.onload = criaTabela(produtos);

function carrinhoVazio(produtos){
  if(produtos == null) return false; // Verifica se foi adicionado itens no carrinho

  return true;

}

// Criando pedido.
let pedido = Obj_compra_usuario(nameUSer_real_prod, emailUSer_real_prod);

// Envio do formulario
const buttonComprar = document.querySelector('#compra-btn');

buttonComprar.addEventListener('click', (e) =>{

    e.preventDefault();
    if(!carrinhoVazio(produtos)) {
      popup('Carrinho está vazio');
      return;
    }

    lista_produtos_ja_contabilizados = [] // Esse array garante que cada produto seja somado, pois após rodar o loop ele irá armazenar neste array o nome do produto.

    // Validando a compra, verificando a quantidade solicitada pelo usuário de cada produto.
    for(let i=0; i<produtos.length; i++){

      let somando_qtd_produto_carrinho = 0; // Irá receber a quantidade solicitada.
      let prod_nome = produtos[i].nome; // Nome do produto que será verificado.
      let produto_ja_contabilizado = false; // Flag que irá auxiliar se o produto foi ou não já contabilizado.

      // Laço que procura o valor atribuido a variável prod_nome no array de produtos já contabilizados.

      for(let i=0; i<lista_produtos_ja_contabilizados.length; i++){

        if(lista_produtos_ja_contabilizados[i] == prod_nome){
          produto_ja_contabilizado = true // Se sim, ele irá receber True.
        }

      }

      // Caso for True, ele apenas irá ignorar a soma de quantidades, caso contrário ele irá rodar o laço.
      if(produto_ja_contabilizado == false){

          for(let i=0; i<produtos.length; i++){
            let qtd_produto = parseFloat(produtos[i].qtd)
            if(prod_nome == produtos[i].nome){
              somando_qtd_produto_carrinho = somando_qtd_produto_carrinho + qtd_produto;
            }
            
            lista_produtos_ja_contabilizados.push(prod_nome) // Adicionando o produto contabilizado no array de validação.
          
          }
          
          // Objeto que será enviado ao banco de dados para validar a quantidade.
          const dados = {
            tipoProduto: prod_nome,
            qtd_Prd: somando_qtd_produto_carrinho
          }

          promises.push(


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
            let quantidade_produto = data.produto[0].qtd_Prd; // Recebe a quantidade armazenada no banco de dados.
            
            // Certo, aqui após fazer a validação de cada produto e verificar se a quantidade solicitada está disponível no estoque, eu realizo então a chamada da API que decrementa a quantidade solicitada no banco de dados.
            if(somando_qtd_produto_carrinho <= quantidade_produto){
              
              let verificando = false;

              for(let i=0; i<compras.length; i++){
                  if(compras[i] == prod_nome){
                      verificando = true
                  }
              }


              if(verificando == false){
                compras.push(obj_comprado(prod_nome, somando_qtd_produto_carrinho))
              }

              fetch('/realizando/compra', {
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

              })
              .catch(error => {
                console.error('Erro:', error);
              });
            }
            
            if(somando_qtd_produto_carrinho > quantidade_produto){

                compras_nao.push(prod_nome)

            }

          })
          .catch(error => {
            console.error('Erro:', error);
          })


        )
      }else{
        continue
      }
    
    } 

    Promise.all(promises).then(() => {

    pedido.tipo_pagamento = opc_pagamento.value
    pedido.valor_compra = parseFloat(total_compra.value.replace('R$', ''))

    for(let i=0; i<compras.length; i++){
      pedido.produtos_solicitados[i] = compras[i]
    }

    let dados = {
      request: pedido
    }

    // Aqui estou realizando a decrementação no banco de dados.
    let promises_arm_pedido = []

    promises_arm_pedido.push(
      fetch('/realizandoCompra', {
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

        console.log(pedido)
      })
      .catch(error => {
        console.error('Erro:', error);
      })
    )

    // Aqui estou enviando o pedido para ser tratado e armazenado no banco de dados.
    // Promise.all(promises).then(() => {
      
      Promise.all(promises_arm_pedido).then(() => {

        fetch('/cadastrando/pedido', {
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
        })
        .catch(error => {
          console.error('Erro:', error);
        });
  
  
  
        if(compras_nao.length > 0){
          popup(`Não foi possível realizar a compra deste produtos: ${produtosNaoComprados}, pois já não estão mais disponiveis, os demais foram realizados com sucesso!`)
          
          sessionStorage.clear()
  
        }else {
          popup("Pedido realizado com sucesso!")
          
          sessionStorage.clear()
        }


      })
      

      });    
    
})


function clearCart() {
    sessionStorage.removeItem('compra');
}

function popup(mensagem){
    const popUp = document.querySelector('#popup');
    popUp.style.display = 'flex'; // Torna o popup visivel
  
    //Seleciona os itens do popup
    const btnClose = document.querySelector('.close-btn');
    const btnBack = document.querySelector('.back-btn');
    const iconPopup = document.querySelector('.icon');
    const message = document.querySelector('.message');
    message.innerHTML = mensagem; // Exibe mensagem de retorno
    
    if(mensagem.includes('sucesso')){
      iconPopup.innerHTML = 'task_alt';
      btnBack.style.display = '';
      btnClose.style.color = '';
    }else{
      iconPopup.innerHTML = 'cancel';
      btnBack.style.display = 'none';
    }
  
    btnClose.addEventListener('click', (e) =>{
      popUp.style.display = 'none';
      window.location.href = '/caixa/compra'
    })
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/caixa'
    })
}

// Função que cria o usuário para mandar as informações ao banco de dados.
function Obj_compra_usuario(name, e_mail, opc_pag, total_compra_feita){
  return {
    nome: name,
    email: e_mail,
    tipo_pagamento: opc_pag,
    valor_compra: total_compra_feita,
    produtos_solicitados: []
  }
}

function obj_comprado(nome_prod, qtd){
  return {
    nome_produto: nome_prod,
    qtd_comprada: qtd
  }
}

