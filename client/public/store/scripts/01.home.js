// Inicializa o array 'compra' com dados armazenados no sessionStorage
let compra = JSON.parse(sessionStorage.getItem('store')) || [];

// Busca dados dos produtos cadastrados no banco
fetch('/chamada/produto')
.then(response => {
    if (!response.ok) throw new Error('Erro ao buscar os dados');
    return response.json();
})
.then(data => exibirProdutos(data.produtos)) //Chama a função que constroi a tabela e exibe os produtos encontrados
.catch(error => console.error('Erro:', error));

// Função que exibe os produtos recebidos do servidor na interface
function exibirProdutos(produtos){
    const sessaoDoce = document.querySelector('#Doces');
    const sessaoSalgado = document.querySelector('#Salgados');
    const sessaoBebida = document.querySelector('#Bebidas');    
    const template = document.querySelector('#produto-template');

    // Percorre a lista de produtos para criar e exibir cada um
    for(let produto of produtos){
        const p = template.content.cloneNode(true);
        
        p.querySelector('.prod').textContent = produto.nome_Prd;
        p.querySelector('.vlrUnitario').textContent = `R$ ${produto.vlr_Unit}`;

        // Percorre pelo "sessionStorage" para verificar se o produto já foi armazenado
        for(let i of compra){
            if(i.nome == produto.nome_Prd){
                p.querySelector('.qtdAtual').textContent = i.quantidade;
                
                // Atualiza a qtd total
                let qtdElemento = document.querySelector('#qtdItens');
                let qtdText = qtdElemento.textContent.split(' ');
                qtdElemento.textContent = `${Number(qtdText[0]) +  i.quantidade} itens`;


                // Carrega o valor total
                let totalElemento = document.querySelector('#valorTotal');
                let totalText = parseFloat(totalElemento.textContent.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));
                let pruduto = parseFloat(produto.vlr_Unit) * i.quantidade;
                totalElemento.innerHTML = `R$ ${(totalText + pruduto).toFixed(2)}`;
            }
        }

        if(produto.tipo_produto == "Salgado") sessaoSalgado.appendChild(p);
        else if(produto.tipo_produto == "Bebida") sessaoBebida.appendChild(p);
        else sessaoDoce.appendChild(p);
    }

    // Configura os eventos de clique para os produtos em cada seção
    verificarClick(sessaoDoce);
    verificarClick(sessaoSalgado);
    verificarClick(sessaoBebida);
}

function verificarClick(sessaoDoce){
    sessaoDoce.addEventListener('click', (e) => {
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


// Função que realiza conta do valor TOTAL (qtd * valor unitario) e adiciona no front
function atualizaValorTotal (span,click){
    let valorUni = span.querySelector('.vlrUnitario');

    // Variaveis da qtd total
    let qtdTotal =  document.querySelector('#qtdItens').textContent;
    qtdTotal = parseFloat(qtdTotal.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));

    // Variaveis da qtd do produto
    let tagQtd = span.querySelector('.qtdAtual');
    let qtd = parseFloat(tagQtd.textContent);

    // Variaveis do valor total
    let valorTotal = document.querySelector('#valorTotal');
    let totalNumber = valorTotal.textContent;
    totalNumber = parseFloat(totalNumber.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'))

    // Variabel do valor unitario do produto
    valorUni = valorUni.textContent;
    valorUni = parseFloat(valorUni.replace(/^R\$ /, '').replace(/\./g, '').replace(/(\d{2})$/, '.$1'));

    let resultado;

    // Verica se o click foi para adicionar produto ou retirar e atualiza a qtd total
    if(click == 'add') {
        qtd++;
        document.querySelector('#qtdItens').textContent = `${1 + qtdTotal} itens`;
        resultado = (totalNumber + valorUni).toFixed(2);
    }
    else if(click == 'remove' && qtd > 0) {
        qtd--;
        document.querySelector('#qtdItens').textContent = `${qtdTotal-1} itens`;
        resultado = (totalNumber - valorUni).toFixed(2);
    }
    else if (qtd <= 0){
        return;
    }

    tagQtd.innerHTML = qtd;
    valorTotal.innerHTML = `R$ ${resultado}`;

    sessionStorage.setItem('total', JSON.stringify(parseFloat(resultado).toFixed(2))); 
    console.log(sessionStorage.getItem('total'))
    
    armazenarCompra(span);
}

// Função para adicionar ou remover um item do sessionStorage/carrinho
function armazenarCompra(span){
    const nome = span.querySelector('.prod').textContent; 
    const valor = span.querySelector('.vlrUnitario').textContent; 
    let quantidade = span.querySelector('.qtdAtual').textContent;
    quantidade = Number(quantidade);

    // Filtra os produtos para atualizar a quantidade ou remover se for 0
    let igual = false; // booleano para verificar se o produto já existe no sessionStorage
    compra = compra.filter(produto => {
        if(nome == produto.nome){
            produto.quantidade = quantidade;
            igual = true;
        }
        return produto.quantidade > 0;
    })

    // Se o produto não for encontrado no sessionStorage, adiciona-o como um novo item
    if(!igual) compra.push({nome, quantidade, valor});

    sessionStorage.setItem('store', JSON.stringify(compra)); 
}
