function adicionarTarefa() {
    const tarefa = document.querySelector('#nova-tarefa').value;

    if (!tarefa) {
        alert('tarefa vazia!');
        return;
    }

    const novoItem = document.createElement('li');
    const btnRemover = document.createElement('button');
    btnRemover.textContent = 'remover';
    btnRemover.onclick = function() {
        novoItem.remove();
    };

    novoItem.appendChild(document.createTextNode(tarefa));
    novoItem.appendChild(btnRemover);

    const lista = document.querySelector('#lista-tarefas');
    lista.appendChild(novoItem);

    tarefa.value = '';
}

let btnEnviar = document.querySelector('#btn-send');
btnEnviar.addEventListener('click', adicionarTarefa)

