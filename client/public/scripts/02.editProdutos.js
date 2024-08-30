// Selecionando os elementos para puxar as info do funcionario que será editado
const editData = JSON.parse(sessionStorage.getItem('editData'));
const nomeInput = document.querySelector('#name');
const codigoInput = document.querySelector('#codigo');
const valorInput = document.querySelector('#valor');

nomeInput.value = editData.produto;
codigoInput.value = editData.codigo;
valorInput.value = editData.valor;
// FIM


//Quando realizar a API de atualizar cadastro de produtos, chamar a função popup
function popup(mensagem){
  const popUp = document.querySelector('#popup');
  popUp.style.display = 'flex'; // Torna o popup visivel

  //Seleciona os itens do popup
  const btnClose = document.querySelector('.close-btn');
  const btnBack = document.querySelector('.back-btn');
  const icon = document.querySelector('.icon');
  const message = document.querySelector('.message');
  message.innerHTML = mensagem; // Exibe mensagem de retorno

  
  if(mensagem == 'Produto cadastrado com sucesso'){
    icon.innerHTML = 'task_alt';
    btnBack.style.display = '';
  }else{
    icon.innerHTML = 'cancel';
    btnBack.style.display = 'none';
    prod_nome.value = '';
    prod_codigo.value = '';
    prod_valor.value = '';
  }

  btnClose.addEventListener('click', (e) =>{
    popUp.style.display = 'none';
  })
  btnBack.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/tabela/produto'
  })
}


