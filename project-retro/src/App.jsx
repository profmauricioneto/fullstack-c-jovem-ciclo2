import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ColumnArea from './components/ColumnArea';
import Header from './components/Header';
import SubHeader from './components/SubHeader';
import Login from './components/Login';
import CustomPrompt from './components/CustomPrompt';
import CustomConfirm from './components/CustomConfirm';
import { useColumnStore } from '../hooks/useColumnStores';
import { useAuthStore } from '../hooks/useAuthStore';

const App = () => {
    const { columns, cards, addCard, editCard, deleteCard } = useColumnStore();
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const [hasShownWelcome, setHasShownWelcome] = useState(false);
    
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

    // Mostra toast quando o usuário faz login
    useEffect(() => {
        if (isAuthenticated && !hasShownWelcome) {
            toast.success('Login realizado com sucesso! 🎉', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setHasShownWelcome(true);
        }
    }, [isAuthenticated, hasShownWelcome]);

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
                toast.success('Card adicionado com sucesso!');
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
                    toast.info('Card editado com sucesso!');
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
                toast.error('Card excluído com sucesso!');
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