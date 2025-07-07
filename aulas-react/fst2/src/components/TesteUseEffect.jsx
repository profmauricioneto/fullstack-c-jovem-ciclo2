import React, { Fragment, useEffect } from 'react';

export default function TesteUseEffect() {
    useEffect(() => {
        console.log(`Função sendo executada durante a renderização!`);

        return (() => console.log(`Aplicação sendo desmontada!`))
    }, []);
    
    return(
        <Fragment>
            <h2>Testando o useEffect</h2>
        </Fragment>
    )
}