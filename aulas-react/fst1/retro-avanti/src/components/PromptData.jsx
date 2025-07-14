import React, { Fragment, useEffect, useState } from 'react';

export default function PromptData({ isOpen, onClose, onConfirm, title, placeholder, inputDefault = ''}) {
    const [input, setInput] = useState(inputDefault);

    useEffect(() => {
        setInput(inputDefault);
    }, [isOpen, inputDefault])

    const handleCancel = () => {
        onClose(),
        setInput()
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (input.trim()) {
            onConfirm(input.trim());
            setInput('');
        }
    }

    if (!isOpen) return null;

    return(
        <Fragment>
            <div>
                <div>
                    <h3>{title}</h3>
                    <form onSubmit={handleSubmit}>
                    <textarea 
                        value={input} 
                        rows={4}
                        autoFocus
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                    ></textarea>
                    <div>
                        <button
                            type='button'
                            onClick={handleCancel}
                            className=''
                        >
                            Cancel
                        </button>
                        <button
                            type='button'
                            onClick={handleSubmit}
                            className=''
                        >
                            Confirm
                        </button>
                        </div>
                        </form>
                </div>
            </div>
        </Fragment>
    )
}