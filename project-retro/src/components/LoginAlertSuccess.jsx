import * as React from 'react';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

export default function LoginAlertSuccess({ onClose }) {
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      action={
        <IconButton
          aria-label="close"
          color="inherit"
          size="small"
          onClick={onClose}
        >
          <CloseIcon fontSize="inherit" />
        </IconButton>
      }
      sx={{ alignItems: 'center', fontSize: '1.2rem', maxWidth: 400, margin: '100px auto' }}
    >
      Your login was successful!
    </Alert>
  );
}