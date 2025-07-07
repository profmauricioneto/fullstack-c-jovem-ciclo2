import React, { useState } from 'react';
import ColumnArea from './components/ColumnArea';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Login from './components/Login';
import LoginAlertSuccess from './components/LoginAlertSuccess';
import CustomPrompt from './components/CustomPrompt';
import CustomConfirm from './components/CustomConfirm';
import { useColumnStore } from '../hooks/useColumnStores';
import { useAuthStore } from '../hooks/useAuthStore';

const App = () => {
    const { columns, cards, addCard, editCard, deleteCard } = useColumnStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [showAlert, setShowAlert] = useState(true);
    
    const [promptConfig, setPromptConfig] = useState({
        isOpen: false,
        title: '',
        placeholder: '',
        defaultValue: '',
        onConfirm: null
    });
    
    const [confirmConfig, setConfirmConfig] = useState({
        isOpen: false,
        title: '',
        message: '',
        onConfirm: null
    });

    if (!isAuthenticated) {
        return <Login />;
    }

    const handleAddCard = (columnIndex) => {
        setPromptConfig({
            isOpen: true,
            title: 'Adicionar novo card',
            placeholder: 'Digite o texto do card...',
            defaultValue: '',
            onConfirm: (text) => {
                addCard(columnIndex, text);
                setPromptConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    const handleEditCard = (columnIndex, cardId) => {
        const currentCard = cards[columnIndex]?.find(card => card.id === cardId);
        if (currentCard) {
            setPromptConfig({
                isOpen: true,
                title: 'Editar card',
                placeholder: 'Digite o novo texto do card...',
                defaultValue: currentCard.text,
                onConfirm: (newText) => {
                    editCard(columnIndex, cardId, newText);
                    setPromptConfig(prev => ({ ...prev, isOpen: false }));
                }
            });
        }
    };

    const handleDeleteCard = (columnIndex, cardId) => {
        setConfirmConfig({
            isOpen: true,
            title: 'Confirmar exclusão',
            message: 'Tem certeza que deseja excluir este card? Esta ação não pode ser desfeita.',
            onConfirm: () => {
                deleteCard(columnIndex, cardId);
                setConfirmConfig(prev => ({ ...prev, isOpen: false }));
            }
        });
    };

    return (
        <>
            <Header/>
            <SubHeader/>
            <div className='flex'>
                {columns.map((title, idx) => (
                    <ColumnArea 
                        key={idx} 
                        titleColumn={title}
                        cards={cards[idx] || []}
                        onAddCard={() => handleAddCard(idx)}
                        onEditCard={(cardId) => handleEditCard(idx, cardId)}
                        onDeleteCard={(cardId) => handleDeleteCard(idx, cardId)}
                    />
                ))}
            </div>
            {showAlert && (
                <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
                    <LoginAlertSuccess onClose={() => setShowAlert(false)} />
                </div>
            )}
            
            <CustomPrompt
                isOpen={promptConfig.isOpen}
                onClose={() => setPromptConfig(prev => ({ ...prev, isOpen: false }))}
                onConfirm={promptConfig.onConfirm}
                title={promptConfig.title}
                placeholder={promptConfig.placeholder}
                defaultValue={promptConfig.defaultValue}
            />
            
            <CustomConfirm
                isOpen={confirmConfig.isOpen}
                onClose={() => setConfirmConfig(prev => ({ ...prev, isOpen: false }))}
                onConfirm={confirmConfig.onConfirm}
                title={confirmConfig.title}
                message={confirmConfig.message}
            />
        </>
    );
}

export default App;