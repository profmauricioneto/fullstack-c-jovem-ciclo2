import React, { Fragment, useState } from "react";
import Button from "@mui/material/Button";
import { useColumnStore } from "../hooks/useColumnStore";
import Dialog from "@mui/material/Dialog";
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function SubHeader() {
  const addColumn = useColumnStore((state) => state.addColumn);
  const [columnName, setColumnName] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false)
    setColumnName('');
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleAddColumn = () => {
    if (columnName.trim()) {
        addColumn(columnName.trim())
    }
    handleClose();
  }
  

  return (
    <Fragment>
      <div className="flex justify-between border-1 border-gray-200 p-3 items-center">
        <p className="text-gray-600">Welcome to Retro-Dev Tool!</p>
        <Button 
            variant="contained" 
            color="primary"
            onClick={handleOpen}>
          Add Column
        </Button>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Adding a New Column</DialogTitle>
        <DialogContent sx={{ paddingBottom: 0 }}>
            <TextField
              autoFocus
              required
              margin="dense"
              label="Column Name"
              fullWidth
              variant="standard"
              value={columnName}
              onChange={(e) => setColumnName(e.target.value)}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit" onClick={handleAddColumn}>Create Column</Button>
            </DialogActions>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}
