import React, { Fragment, useEffect, useState } from 'react';

export default function ListaTarefas() {

    const [tarefas, setTarefas] = useState([]);

    useEffect(() => {
        setTimeout(() => {
            const tarefas = [
                {id: 1, conteudo: 'estudar react'},
                {id: 2, conteudo: 'estudar javascript'},
                {id: 3, conteudo: 'estudar hooks'},
                {id: 4, conteudo: 'estudar react router dom'},
            ];
            setTarefas(tarefas);
        }, 2000);
    }, [])

    return (
        <>
            <div>
                <h2>Lista de Tarefas</h2>
            </div>
        </>
    )
}