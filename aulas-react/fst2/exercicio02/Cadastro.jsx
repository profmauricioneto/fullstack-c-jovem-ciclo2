import React, { Fragment, useState } from 'react';
import {useNavigate} from 'react-router-dom';

export default function Cadastro() {
    
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const onChangeHandle = (event) => {
        const {name, value} = event.target;
        if (name === 'fullname') {
            setFullname(value);
        }
        if(name === 'email') {
            setEmail(value);
        }
        if(name === 'password') {
            setPassword(value);
        }
    };

    const onSubmitHandle = (event) => {
        event.preventDefault();
        if (!fullname || !email || !password) {
            setError('Existem campos obrigatórios não preenchidos!');
        } else {
            console.log('Data sended: ', {fullname, email, password});    
            setError('');
            setFullname('');
            setEmail('');
            setPassword('');
            navigate('/login');
        }
    };

    
    return (
        <Fragment>
            <form
                onSubmit={onSubmitHandle}
                className='max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-xl flex flex-col gap-4'
            >
                <h2
                    className='text-center m-2 font-bold text-xl font-mono'
                >Formulário de Cadastro</h2>

                <input 
                    type="text"
                    name='fullname'
                    value={fullname}
                    placeholder='digite seu nome completo'
                    // required
                    onChange={onChangeHandle}
                    className='border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <input 
                    type="text" 
                    name='email'
                    value={email}
                    placeholder='usuario@provedor.com'
                    // required
                    onChange={onChangeHandle}
                    className='border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <input 
                    type="password"
                    name='password'
                    value={password}
                    placeholder='senha-forte'
                    // required
                    onChange={onChangeHandle}
                    className='border border-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                />

                <button 
                    type="submit"
                    className='bg-blue-500 text-white rounded-lg px-4 py-2 cursor-pointer font-semibold hover:bg-blue-600 transition-colors'
                >Cadastrar</button>

                {error && (<p
                className='text-center text-red-500'
                >{error}</p>)}

                <button
                    type='button'
                    className='bg-gray-300 text-blue-600 rounded-lg px-4 py-2 cursor-pointer font-semibold hover:bg-gray-400 transition-colors'
                    onClick={() => navigate('/login')}
                >Já tem conta? Vá para o login!</button>
            </form>
        </Fragment>
    )
}