// Relatorios dos pedidos   


fetch('/saida/produto')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
})
.then(data => {
  
  console.log(data)

})
.catch(error => {
  console.error('Erro:', error);  
});


