import React, { Fragment, useEffect, useState } from "react";
import { useStore } from "../hooks/useStore";

export default function ListaTarefas() {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [contador, setContador] = useState(5);
  const { state, action} = useStore();

  useEffect(() => {
    setTimeout(() => {
      const tarefasIniciais = [
        { id: 1, conteudo: "estudar javascript" },
        { id: 2, conteudo: "estudar react" },
        { id: 3, conteudo: "praticar com react" },
        { id: 4, conteudo: "desenvolver um projeto" },
      ];
      setTarefas(tarefasIniciais);
      setCarregando(false);
    }, 2000);
  });

  const adicionarTarefa = () => {
    const novaTarefa = { id: contador, conteudo: `nova tarefa ${tarefa}` };
    setTarefas((tarefasAnteriores) => [...tarefasAnteriores, novaTarefa]);
    setContador((contadorAnterior) => contadorAnterior + 1);
    setTarefa('');

    console.log(state);
    action();
    console.log(state);
  };

  return (
    <Fragment>
      <h1 className="text-center py-2 text-xl font-bold">Lista de Tarefas</h1>

      {carregando ? (
        <p className="text-center text-xl font-bold text-red-500 ">Carregando as tarefas...</p>
      ) : (
        <ul className="list-disc m-2 p-2 capitalize">
          {tarefas.map((tarefa) => (
            <li key={tarefa.id} className="border rounded-lg m-2 p-2">
              {tarefa.conteudo}
            </li>
          ))}
        </ul>
      )}
      <div className="flex flex-col">
        <input
          type="text"
          name="conteudo-tarefa"
          placeholder="digite uma tarefa"
          value={tarefa}
          onChange={(e) => setTarefa(e.target.value)}
          className="m-2 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button 
            onClick={adicionarTarefa}
            className="m-2 text-white bg-blue-500 text-center rounded-lg px-4 py-2 hover:bg-blue-600 transition-colors cursor-pointer font-bold"
        >Adicionar uma nova tarefa </button>
      </div>
    </Fragment>
  );
}
