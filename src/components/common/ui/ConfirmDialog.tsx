import React from 'react';
import {createRoot} from "react-dom/client";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const customConfirm = (options: { label: string, title?: string }): Promise<boolean> => {
  return new Promise((resolve) => {

    const div = document.createElement('div');
    const container = document.body.appendChild(div);
    const root = createRoot(container!)


    const handleConfirm = () => {
      resolve(true)
      root.unmount()
    };

    const handleClose = () => {
      resolve(false)
      root.unmount()
    };

    root.render(
      <ConfirmDialog
        title={options.title}
        open={true}
        label={options.label}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />)
  })
}


interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
  title?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({open, onClose, onConfirm, label, title}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{label}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Abbrechen
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}

