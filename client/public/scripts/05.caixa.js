// Realizar compra no sistema do funcionario


// Busca dados dos produtos cadastrados no banco
fetch('/chamada/produto')
.then(response => {
    if (!response.ok) throw new Error('Erro ao buscar os dados');
    return response.json();
})
.then(data => construirTabela(data)) //Chama a função que constroi a tabela e exibe os produtos encontrados
.catch(error => console.error('Erro:', error));

function construirTabela(dados){
    const produtos = dados.produtos;
    const tabela = document.querySelector('#tabelaProdutos');
    let i = 0;
    produtos.forEach(item => {
        let tr = document.createElement('tr'); //Cria linha da tabela
        console.log(tr)
        let tdProduto = document.createElement('td')
        tdProduto.setAttribute('id', 'prod');

        let tdValorUni = document.createElement('td')
        tdValorUni.setAttribute('id', 'vlrUnitario');

        let tdQtd = document.createElement('td')
        tdQtd.setAttribute('id', 'qtd');

        let spanAdd = document.createElement('span');
        spanAdd.setAttribute('class','material-icons-outlined addProdutos');
        spanAdd.innerHTML = 'add_circle'
        let spanRemove = document.createElement('span');
        spanRemove.setAttribute('class','material-icons-outlined removeProdutos');
        spanRemove.innerHTML = 'do_not_disturb_on'
        let spanQtd = document.createElement('span')
        spanQtd.setAttribute('class','qtdAtual');
        spanQtd.innerHTML = '0';
        tdQtd.append(spanAdd,spanQtd,spanRemove);

        let tdValor = document.createElement('td')
        tdValor.setAttribute('id', 'vlrTotal');

        let tdButton = document.createElement('td')
        tdButton.setAttribute('id', 'tdButton');
        let button = document.createElement('button')
        button.setAttribute('class', 'btnAdd');
        tdButton.appendChild(button);

        tdProduto.innerHTML = item.nome_Prd;
        tdValorUni.innerHTML = `R$ ${item.vlr_Unit}`;
        tdValor.innerHTML = `R$ 0`;
        button.innerHTML = 'Adicionar ao carrinho';

        tr.append(tdProduto,tdValorUni,tdQtd,tdValor,tdButton);

        tabela.appendChild(tr);
        if (i % 2 == 0) tr.setAttribute('class', 'linha-par');
        else tr.setAttribute('class', 'linha-impar');
        i++
    })
    verificaClick(tabela);
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

function verificaClick(tabela){
    tabela.addEventListener('click', (e) => {
        const tag = e.target;
        let span = tag.parentElement;
        const tr = span.parentElement;
        const spanQtd = span.querySelector('.qtdAtual');

        if(tag.classList.contains('addProdutos')){
            const button = 'add';
            multiplicaValorTotal(spanQtd,tr,button);
        }
        if(tag.classList.contains('removeProdutos')){
            const button = 'remove';
            multiplicaValorTotal(spanQtd,tr,button);
        }
        if(tag.classList.contains('btnAdd')){
            e.preventDefault();
            console.log(tr);
            const produto = tr.querySelector('#prod').textContent; // Obtem o nome do produto
            const qtd = tr.querySelector('.qtdAtual').textContent; // Obtem a qtd
            const valor = tr.querySelector('#vlrTotal').textContent; // Obtem o valor

            if(parseInt(qtd) <= 0){
                console.log('não foi adicionado nada');
                return
            }

            let compra = JSON.parse(sessionStorage.getItem('compra')) || [];
            compra.push({produto,qtd,valor});
            sessionStorage.setItem('compra', JSON.stringify(compra)); // Salva temporiamente essas informações
        }
    })
}

// Função que realiza conta do valor TOTAL (qtd * valor unitario) e adiciona no front
function multiplicaValorTotal(spanQtd,tr,button){
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

