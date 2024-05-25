fetch('/chamada/produto')
.then(response => {
  if (!response.ok) {
    throw new Error('Erro ao buscar os dados');
  }
  return response.json();
})
.then(data => {
  
  console.log(data.produtos);
  construirTabelaGeral(data.produtos);

})
.catch(error => {
  console.error('Erro:', error);  
});


function construirTabelaGeral(data){

    for(let i=0; i<data.length; i++){
        const teste = document.querySelector('#Doces');

        const div = document.createElement('div');
        const p1 = document.createElement('p');
        const p2 = document.createElement('p');
        const a1 = document.createElement('a');
        const a2 = document.createElement('a');
        const span1 = document.createElement('span');
        const span2 = document.createElement('span');
        const span3 = document.createElement('span');
    
        div.setAttribute('class', 'item-produto');
        a1.setAttribute('class', 'add');
        a2.setAttribute('class', 'remove');
        span1.setAttribute('class', 'material-icons');
        span2.setAttribute('class', 'material-icons');
        span3.setAttribute('class', 'material-icons');
    
        span1.innerHTML = 'add_circle_outline';
        span2.innerHTML = 'remove_circle_outline';
        p1.innerHTML = `nome do produto: <b>${data[i].nome_Prd}</b>`;
        p2.innerHTML = `preço do produto: <b>${data[i].vlr_Unit}</b>`;
        span3.innerHTML = 'insert_photo';
    
        a1.appendChild(span1);
        a2.appendChild(span2);
        div.appendChild(p1);
        div.appendChild(p2);
        div.appendChild(a1);
        div.appendChild(a2);
        div.appendChild(span3);
    
        teste.appendChild(div); 
    }

}

{/* <div class="item-produto">
    <p>nome do produto</p>
    <p>preço do produto</p>
    <a href="#" class="add"><span class="material-icons">add_circle_outline</span></a>
    <a href="#" class="remove"><span class="material-icons">remove_circle_outline</span></a>
    <span class="material-icons">insert_photo</span>
</div> */}