let compras = JSON.parse(sessionStorage.getItem('store')) || [];

exibirProdutos(compras);
function exibirProdutos(compras){
    const tbody = document.querySelector('#bodyTable')
    const template = document.querySelector('#produto-template');

    for(let produto of compras){
        const td = template.content.cloneNode(true);
    
        td.querySelector('.nome').textContent = produto.nome;
        td.querySelector('.qtd').textContent = `${produto.quantidade}x`;
        td.querySelector('.valor-uni').textContent = `${produto.valor}`;

        tbody.appendChild(td);
    }

    document.querySelector('.total-compra').textContent = `R$ ${(sessionStorage.getItem('total')).replaceAll('"', ' ')}`;
    verificarClick(tbody);
}

function verificarClick(tbody){
    tbody.addEventListener('click', (e) => {
        const tag = e.target;
        let span = tag.parentElement;
        const itemProduto = span.parentElement;
        if(tag.classList.contains('addProdutos')){
            atualizaValorTotal(itemProduto,'add');
        }
        if(tag.classList.contains('removeProdutos')){
            atualizaValorTotal(itemProduto,'remove');
        }
    })
}

function atualizaValorTotal (span,click){
    const itemProduto = span.parentElement;
    console.log(itemProduto)

    // Variaveis da qtd 
    const tagQuantidade =  itemProduto.querySelector('.qtd');
    let quantidade = Number(tagQuantidade.textContent.slice(-2,1));

    // Variaveis do valor total
    let totalNumber = document.querySelector('.total-compra').textContent;
    totalNumber = parseFloat(totalNumber.replace('R$', ''));

    // // Variabel do valor unitario do produto
    let valorUni = itemProduto.querySelector('.valor-uni').textContent;
    valorUni = parseFloat(valorUni.replace('R$', ''));

    let resultado;
    // Verica se o click foi para adicionar produto ou retirar e atualiza a qtd total
    if(click == 'add') {
        quantidade++;
        resultado = (totalNumber + valorUni).toFixed(2);
    }
    else if(click == 'remove' && quantidade > 0) {
        quantidade--;
        resultado = (totalNumber - valorUni).toFixed(2);
    }
    else if (quantidade <= 0){
        return;
    }

    tagQuantidade.textContent = `${quantidade}x`;
    document.querySelector('.total-compra').textContent = `R$ ${resultado}`;

    // Atualiza os itens e o valor armazenado
    sessionStorage.setItem('total', JSON.stringify(parseFloat(resultado).toFixed(2))); 
    console.log(sessionStorage.getItem('total'))
    armazenarCompra(itemProduto);
}

// Função para adicionar ou remover um item do sessionStorage/carrinho
function armazenarCompra(span){
    const nome = span.querySelector('.nome').textContent; 
    let quantidade = span.querySelector('.qtd').textContent;
    quantidade = Number(quantidade.slice(-2,1));

    if(quantidade == 0){
        const tbody = span.parentElement;
        const tabela = tbody.parentElement;
        tabela.deleteRow(span.rowIndex); // Retira o produto da tabela renderizada
    }
   
    compras = compras.filter(produto => {
        if(nome == produto.nome){
            produto.quantidade = quantidade;
        }
        return produto.quantidade > 0;
    })

    sessionStorage.setItem('store', JSON.stringify(compras));
    console.log(sessionStorage.getItem('store'));
}