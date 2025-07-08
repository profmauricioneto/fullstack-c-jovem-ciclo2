import React, { Fragment, useEffect, useState } from 'react';
import { useStore } from '../hooks/useStore';

export default function ListaTarefas() {

    const [tarefa, setTarefa] = useState('');
    const [id, setId] = useState(5);
    const [tarefas, setTarefas] = useState([]);
    const [carregamento, setCarregamento] = useState(true);
    const {store, action } = useStore();

    useEffect(() => {
        setTimeout(() => {
            const tarefasCarregadas = [
                {id: 1, conteudo: 'estudar react'},
                {id: 2, conteudo: 'estudar javascript'},
                {id: 3, conteudo: 'estudar hooks'},
                {id: 4, conteudo: 'estudar react router dom'},
            ];
            setTarefas(tarefasCarregadas);
            setCarregamento(false);
        }, 2000);
    }, []);

    const adicionarTarefa = () => {
        const novaTarefa = {id: id, conteudo: `novo conteúdo ${tarefa}`}
        setTarefas((tarefasAnteriores) => [...tarefasAnteriores, novaTarefa]);
        setId((previousId) => previousId + 1);
        console.log(tarefas);
        setTarefa('');

        console.log(store);
        action();
        console.log(store);
        
    }

    return (
        <>
            <div>
                <h2 className='text-center py-2 text-xl font-bold'>Lista de Tarefas</h2>

                { carregamento ? (
                    <p className='text-red-500 text-xl text-center'>Carregando tarefas via API...</p>
                ) : (
                    <ul className='list-disc m-2 p-2 capitalize'>
                        {tarefas.map((tarefa) => (
                            <li key={tarefa.id}>{tarefa.conteudo}</li>
                        ))}
                    </ul>
                )}

                <div className='flex flex-col'>
                    <input 
                        type="text" 
                        name='conteudo-tarefa'
                        placeholder='descricao da tarefa...'
                        value={tarefa}
                        onChange={(event) => setTarefa(event.target.value)}
                        className='m-2 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus: ring-2 focus: ring-blue-500'
                        />

                    <button
                        onClick={adicionarTarefa}
                        className='m-2 bg-blue-500 text-white text-center rounded-lg px-3 py-2 hover:bg-blue-700 transition-colors cursor-pointer font-semibold'
                    >Adicionar Tarefa</button>
                </div>
            </div>
        </>
    )
}