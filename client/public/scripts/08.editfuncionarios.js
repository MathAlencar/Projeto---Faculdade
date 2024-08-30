const buttonApagar = document.querySelector('#apagarFuncionario');
const button_atualizar = document.querySelector('#button_atualizar');
// const checkAtivo = document.querySelector('#status_ativo');
// const checkDesativado = document.querySelector('#status_desativado');

// eventos da página -->

//Dados do funcionario que será editado
const editData = JSON.parse(sessionStorage.getItem('editData'));
const nomeInput = document.querySelector('#nome_edit');
const sobrenomeInput = document.querySelector('#lastname_edit');
const emailInput = document.querySelector('#email_edit');
const numberInput = document.querySelector('#number_edit')

const nomee = editData.nome.indexOf(' ')
nomeInput.value = editData.nome.slice(0, nomee);;
sobrenomeInput.value = editData.nome.slice(nomee + 1);;
emailInput.value = editData.email;
numberInput.value = editData.contato;


 // Deleta usuário com base no e-mail;
buttonApagar.addEventListener('click', (e) => {
    e.preventDefault();
    const email = document.getElementById('email_edit').value;

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
        alert(data.message);
        if(data.status == "sucesso!") window.location.href = '/funcionarios';
        else {
            window.location.href = '/funcionarios/editar';
        }
    })
    .catch(error => {
        alert('Erro ao excluir o usuário!');
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
        alert('usuário atualizado!')
    })
    .catch(error => {
        console.error('Erro:', error);
    });

})
