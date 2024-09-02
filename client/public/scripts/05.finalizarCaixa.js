// Carrega os itens que foram adicionados no carrinho
function criaTabela(){
    const produtos = JSON.parse(sessionStorage.getItem('compra'));
    console.log('Itens no sessionStorage:', JSON.parse(sessionStorage.getItem('compra')));
    const valorTotal = document.querySelector('#total');
    let soma = 0;
    for(let i of produtos){
        const body = document.querySelector('.produtos');
        const tr = document.createElement('tr');
        
        tr.setAttribute('class','item-produto');
        const tdNome = document.createElement('td');
        tdNome.setAttribute('class', 'nome');
        tdNome.innerText = i.produto;
        tr.appendChild(tdNome);
    
        const tdQtd = document.createElement('td');
        tdQtd.setAttribute('class', 'tdQtd');
        tdQtd.innerText = i.qtd;
        tr.appendChild(tdQtd);
    
        const tdValor = document.createElement('td');
        tdValor.setAttribute('class', 'tdValor');
        tdValor.innerText = i.valor;
        tr.appendChild(tdValor);
        body.appendChild(tr);
        
        
        soma += parseFloat(i.valor.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));
    }
    valorTotal.value = soma.toFixed(2);
}


// Envio do formulario
const buttonComprar = document.querySelector('#compra-btn');
console.log(buttonComprar)
buttonComprar.addEventListener('click', (e) =>{
    e.preventDefault();
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
    const icon = document.querySelector('.icon');
    const message = document.querySelector('.message');
    message.innerHTML = mensagem; // Exibe mensagem de retorno
  
    
    if(mensagem.includes('sucesso')){
      icon.innerHTML = 'task_alt';
      btnBack.style.display = '';
    }else{
      icon.innerHTML = 'cancel';
      btnBack.style.display = 'none';
      inputCod.value = '';
      qtd.value = '';
      input_valor_uni.value = '';
      input_valor_total.value = '';
    }
  
    btnClose.addEventListener('click', (e) =>{
      popUp.style.display = 'none';
    })
    btnBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = '/caixa'
    })
  }
window.onload = criaTabela;