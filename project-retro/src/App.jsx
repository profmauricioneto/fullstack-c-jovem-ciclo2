import React, { useState } from 'react';
import ColumnArea from './components/ColumnArea';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Login from './components/Login';
import LoginAlertSuccess from './components/LoginAlertSuccess';
import { useColumnStore } from '../hooks/useColumnStores';
import { useAuthStore } from '../hooks/useAuthStore';

const App = () => {
    const columns = useColumnStore((state) => state.columns);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [showAlert, setShowAlert] = useState(true);

    if (!isAuthenticated) {
        return <Login />;
    }

    return (
        <>
            <Header/>
            <SubHeader/>
            <div className='flex'>
                {columns.map((title, idx) => (
                    <ColumnArea key={idx} titleColumn={title} />
                ))}
            </div>
            {showAlert && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                    <LoginAlertSuccess onClose={() => setShowAlert(false)} />
                </div>
            )}
        </>
    );
}

export default App;