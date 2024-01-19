import React from 'react';
import {createRoot} from "react-dom/client";
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {ThemeProvider} from '@mui/material/styles';
import {themeMUI} from "../../../assets/style/themeMUI";


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
      root.unmount()
    };

    root.render(
      <ThemeProvider theme={themeMUI}>
        <ConfirmDialog
          title={title}
          open={true}
          label={label}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          onConfirm={handleConfirm}
          onClose={handleClose}
        />
      </ThemeProvider>)
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
        <Button onClick={onClose} variant={'contained'} color="secondary">
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm} variant={'contained'} color="warning" autoFocus>
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
