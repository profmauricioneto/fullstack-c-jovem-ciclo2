import React, {useEffect, useState} from 'react';
import RetroPage from './components/RetroPage';
import { useAuthStore } from './hooks/useAuthStore';
import { toast } from 'react-toastify';
import Login from './components/Login';

export default function App() {

    const isAuthorizated = useAuthStore((state) => state.isAuthorizated);
    const [hasShowWelcome, setHasShowWelcome] = useState(false);

    useEffect(() => {
        if (isAuthorizated && !hasShowWelcome) {
            toast.success('Login realizado com sucesso!', {
                position: 'top-right',
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setHasShowWelcome(true);
        }
    }, [isAuthorizated, hasShowWelcome]);

    if (!isAuthorizated) {
        return <Login />; 
    }

    return (
        <>
         <RetroPage />
        </>
    );
}