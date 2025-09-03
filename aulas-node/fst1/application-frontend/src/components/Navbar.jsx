import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className='bg-blue-500 shadow-lg'>
                <div className='container mx-auto py-4 space-x-4'>
                    <Link 
                        to={'/login'}
                        className='text-white text-sm hover:text-blue-200 transition-colors'
                    >Login</Link>

                    <Link 
                        to={'/cadastro'}
                        className='text-white text-sm bg-green-700 px-4 py-2 rounded hover:bg-green-600 transition-colors'
                    >Cadastro</Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar