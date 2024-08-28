const buttonApagar = document.querySelector('#apagarFuncionario');
const button_atualizar = document.querySelector('#button_atualizar');
// const checkAtivo = document.querySelector('#status_ativo');
// const checkDesativado = document.querySelector('#status_desativado');

// eventos da página -->

 // Deleta usuário com base no e-mail;
 
buttonApagar.addEventListener('click', (e) => {
    e.preventDefault();
  
    const email = document.getElementById('email_edit').value;

    alert('usuário excluido!')
  
    fetch(`/delete?email_user=${encodeURIComponent(email)}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao excluir o usuário');
        }
        return response.json();
    })
    .then(data => {
        console.log('Usuário excluído com sucesso:', data.message);
    })
    .catch(error => {
        console.error('Erro ao excluir o usuário:', error);
    });


  })

// Essa função ou evento realiza a atualização dos dados do usuário, porém ainda iremos entrar em validação de como ela irá funcionar corretamente.

  button_atualizar.addEventListener('click', (e) => {
    e.preventDefault();
    
    const form = document.querySelector('#formulario');
    const formatandoDados = new FormData(form);

    const dados = {
        nome: formatandoDados.get('nome_user'),
        sobrenome: formatandoDados.get('sobrenome_user'),
        email: formatandoDados.get('email_user'),
        telefone: formatandoDados.get('tel_user'),
    }

    fetch('/atualizando', {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao buscar os dados');
        }
        return response.json();
    })
    .then(data => {
    })
    .catch(error => {
        console.error('Erro:', error);
    });

})
