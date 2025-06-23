import { Fragment, useState } from "react";
import { useColumnStore } from '../../hooks/useColumnStores';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

const SubHeader = () => {
    const addColumn = useColumnStore((state) => state.addColumn);
    const [open, setOpen] = useState(false);
    const [columnName, setColumnName] = useState('');

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setColumnName('');
    };

    const handleAdd = () => {
        if (columnName.trim()) {
            addColumn(columnName.trim());
        }
        handleClose();
    };

    return (
        <Fragment>
            <div className="flex justify-between border-1 border-gray-200 p-3 items-center">
                <p className="text-gray-700">Hey! Your are in retrospective tool - RetroStorm - Let's start</p>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOpen}
                >
                    Add Column
                </Button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Adicionar nova coluna</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nome da coluna"
                        fullWidth
                        value={columnName}
                        onChange={e => setColumnName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button onClick={handleAdd} variant="contained" color="primary">Adicionar</Button>
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default SubHeader;