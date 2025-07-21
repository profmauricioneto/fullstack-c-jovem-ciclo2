import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ColumnArea from './ColumnArea';
import Header from './Header';
import SubHeader from './SubHeader';
import CustomPrompt from './CustomPrompt';
import CustomConfirm from './CustomConfirm';
import { useColumnStore } from '../hooks/useColumnStores';


export default function MainPage() {
  const { columns, cards, addCard, editCard, deleteCard } = useColumnStore();

  const [promptConfig, setPromptConfig] = useState({
    isOpen: false,
    title: "",
    placeholder: "",
    defaultValue: "",
    onConfirm: null,
  });

  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
  });

 

  const handleAddCard = (columnIndex) => {
    setPromptConfig({
      isOpen: true,
      title: "Adicionar novo card",
      placeholder: "Digite o texto do card...",
      defaultValue: "",
      onConfirm: (text) => {
        addCard(columnIndex, text);
        setPromptConfig((prev) => ({ ...prev, isOpen: false }));
        toast.success("Card adicionado com sucesso!");
      },
    });
  };

  const handleEditCard = (columnIndex, cardId) => {
    const currentCard = cards[columnIndex]?.find((card) => card.id === cardId);
    if (currentCard) {
      setPromptConfig({
        isOpen: true,
        title: "Editar card",
        placeholder: "Digite o novo texto do card...",
        defaultValue: currentCard.text,
        onConfirm: (newText) => {
          editCard(columnIndex, cardId, newText);
          setPromptConfig((prev) => ({ ...prev, isOpen: false }));
          toast.info("Card editado com sucesso!");
        },
      });
    }
  };

  const handleDeleteCard = (columnIndex, cardId) => {
    setConfirmConfig({
      isOpen: true,
      title: "Confirmar exclusão",
      message:
        "Tem certeza que deseja excluir este card? Esta ação não pode ser desfeita.",
      onConfirm: () => {
        deleteCard(columnIndex, cardId);
        setConfirmConfig((prev) => ({ ...prev, isOpen: false }));
        toast.error("Card excluído com sucesso!");
      },
    });
  };

  return (
    <>
      <Header />
      <SubHeader />
      <div className="flex overflow-x-auto overflow-y-hidden min-h-screen pb-4 px-4 gap-4 scroll-smooth">
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
        onClose={() => setPromptConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={promptConfig.onConfirm}
        title={promptConfig.title}
        placeholder={promptConfig.placeholder}
        defaultValue={promptConfig.defaultValue}
      />

      <CustomConfirm
        isOpen={confirmConfig.isOpen}
        onClose={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
        onConfirm={confirmConfig.onConfirm}
        title={confirmConfig.title}
        message={confirmConfig.message}
      />
    </>
  );
}
