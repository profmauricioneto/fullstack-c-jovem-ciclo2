import React, { Fragment, useState } from 'react';

export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        if ( name === 'email' ) setEmail(value);
        if ( name === 'senha') setSenha(value);
    };

    const handlSubmit = (event) => {
        // TODO
    }

    return(
        <Fragment>
            <form onSubmit={}>
                <h2>Login</h2>
                <input type="text" name='email' value={email} onChange={handleChange} placeholder='user@email.com'/>
                <input type="password" name='senha' value={senha} onChange={handleChange} />

                <button type='submit'>Entrar</button>
                {error && <p>({error})</p>}
            </form>
        </Fragment>
    )
}