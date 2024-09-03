// Carrega os itens que foram adicionados no carrinho
const produtos = JSON.parse(sessionStorage.getItem('compra'));
console.log('Itens no sessionStorage:', JSON.parse(sessionStorage.getItem('compra')));

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

// Envio do formulario
const buttonComprar = document.querySelector('#compra-btn');
buttonComprar.addEventListener('click', (e) =>{
    e.preventDefault();
    if(!carrinhoVazio(produtos)) {
      popup('Carrinho está vazio');
      return;
    }
    clearCart();
    popup('Enviado com sucesso');
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
    })
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/caixa'
    })
  }
