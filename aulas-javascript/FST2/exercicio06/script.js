function adicionarTarefa() {
    const tarefa = document.querySelector('#tarefa');
    const novoItem = document.createElement('li');

    if (!tarefa.value) {
        alert('conteúdo vazio');
        return;
    }

    // criando o botão de remover
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'Remover';
    btnRemover.onclick = function() {
        novoItem.remove();
    }

    novoItem.appendChild(document.createTextNode(tarefa.value));
    novoItem.appendChild(btnRemover);

    const lista = document.querySelector('#lista');
    lista.appendChild(novoItem);

    tarefa.value = '';
}

const botaoEnviar = document.querySelector('#btn-send');
botaoEnviar.addEventListener('click', adicionarTarefa);