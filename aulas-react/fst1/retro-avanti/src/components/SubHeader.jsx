import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useColumnStore } from '../hooks/useColumnStore';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

export default function SubHeader() {

    const addColumn = useColumnStore((state) => state.addColumn);
    const [columnName, setColumnName] = useState('');
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true);
    
    const handleClose = () => {
        setOpen(false);
        setColumnName('');
    }

    const handleAddColumn = () => {
        if (columnName.trim()) {
            addColumn(columnName.trim())
        }
        handleClose();
    }
    

    return (
        <>
            <div className='flex justify-between p-2 items-center border-1 border-gray-400'>
                <p className='text-gray-700'>Welcome to Retro-Avanti Application</p>
                <Button 
                    variant="contained"
                    color='primary'
                    onClick={handleOpen}    
                >Add Column</Button>
                <Dialog open={open}>
                    <DialogTitle>Add new Column</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin='dense'
                            label='Column Name'
                            fullWidth
                            value={columnName}
                            onChange={(e) => setColumnName(e.target.value)}
                        />
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={handleAddColumn}>Submit</Button>
                        </DialogActions>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}