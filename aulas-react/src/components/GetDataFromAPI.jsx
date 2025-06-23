import { useEffect, useState } from "react";

export default function GetDataFromAPI() {
    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(`Loading the data from API`);
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((result) => result.json())
        .then((currentData) => {
            setData(currentData)
            console.log(data);
        })
        .catch((err) => console.error(`An error occurs: ${err}`));
    }, [data]);

    return (
        <>
            <div>
                <h3 className="text-center font-bold">Carregando dados da API</h3>
                <ul className="m-2">
                    {data.map((item) => (
                        <li className="border-2 border-gray-500 rounded-md p-2" key={item.id}>{item.id} - {item.body}</li>
                    ))}
                </ul>
            </div>
        </>
    )
}