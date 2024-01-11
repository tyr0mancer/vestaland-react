import React from 'react';
import {createRoot} from "react-dom/client";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";


interface CustomConfirmProps {
  label: string
  title?: string
  confirmLabel?: string
  cancelLabel?: string
}

export const customConfirm = ({label, title, confirmLabel, cancelLabel}: CustomConfirmProps): Promise<boolean> => {
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
        title={title}
        open={true}
        label={label}
        confirmLabel={confirmLabel}
        cancelLabel={cancelLabel}
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
  confirmLabel?: string
  cancelLabel?: string
}

/**
 * TS Doc Info
 * @component ConfirmDialog
 */
export function ConfirmDialog({
                                open,
                                onClose,
                                onConfirm,
                                label,
                                title,
                                confirmLabel = 'OK',
                                cancelLabel = 'Abbrechen'
                              }: ConfirmDialogProps): React.ReactElement {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{label}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
