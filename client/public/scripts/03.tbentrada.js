// Realizando a seleção de elementos da página
const buttonEntrada = document.querySelector('#entradaProduto');
const select = document.querySelector('#produto');
const input_valor_uni = document.querySelector('#valor-uni')
const input_valor_total = document.querySelector('#valor-total')
const inputCod = document.querySelector('#codigo')
const qtd = document.querySelector('#qtd')

//Trata os campo input que recebem numeros(preço unitario)
// input_valor_uni.addEventListener('input', (e) => {
//   let value = input_valor_uni.value.replace(/\D/g, ''); // Remove qualquer caractere não numérico
//   value = value.replace(/(\d{2})$/, '.$1'); // Adiciona a virgula como separador de decimal
//   value = value.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1.'); //Adiciona ponto de separador de milhar
//   input_valor_uni .value = 'R$ ' + value;
// });


// Realizando o cadastro de entrada de produtos ;
buttonEntrada.addEventListener('click', (e) => {
  e.preventDefault();
  const form = document.querySelector('#formularioEntrada');
  const formatandoDados = new FormData(form);

  const dados = {
    codigo: formatandoDados.get('codigo'),
    quantidade: formatandoDados.get('quantidade'),
    valorUnitario: formatandoDados.get('valorUnitario'),
    valorTotal: formatandoDados.get('valorTotal'),
    tipoProduto: formatandoDados.get('tipoProduto')
  }

  fetch('/entrada/produto', {
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
    console.log("Sucesso:", data);
  })
  .catch(error => {
    console.error('Erro:', error);
  });

})

function buscandoProduto(){

  const form = document.querySelector('#formularioEntrada');
  const formatandoDados = new FormData(form);

  const dados = {
    tipoProduto: formatandoDados.get('tipoProduto')
  }

  console.log(dados)

  // fetch('/chamada/produto/especifico', {
  //   method: "POST",
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(dados)
  // })
  // .then (response => {
  //   if(!response.ok) {
  //     throw new Error('Erro ao enviar dados')
  //   }

  //   return response.json();
  // })
  // .then(data => {
  //   console.log("Sucesso:", data);
  // })
  // .catch(error => {
  //   console.error('Erro:', error);
  // });

}



 // Responsável por enviar os dados ao front-end, para assim realizar a construção dos itens selecionáveis na lista suspensa.

fetch('/chamada/produto')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
})
.then(data => {
  
  construindoSelect(data.produtos);

})
.catch(error => {
  console.error('Erro:', error);  
});

// <-- FIM

// Construindo select

function construindoSelect(data){
  const select = document.querySelector('#produto');

  for(let i=0; i<data.length; i++){
    let option = document.createElement('option');
    option.setAttribute("value", data[i].nome_Prd);
    option.innerHTML = data[i].nome_Prd;

    select.appendChild(option);
  }

}
