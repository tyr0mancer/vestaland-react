import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

export const customConfirm = (options: { label: string }): Promise<boolean> => {
  return new Promise((resolve) => {
    const div = document.createElement('div');
    document.body.appendChild(div);

    const handleConfirm = () => {
      resolve(true);
      ReactDOM.unmountComponentAtNode(div);
      div.remove();
    };

    const handleClose = () => {
      resolve(false);
      ReactDOM.unmountComponentAtNode(div);
      div.remove();
    };

    ReactDOM.render(
      <ConfirmDialog
        open={true}
        label={options.label}
        onConfirm={handleConfirm}
        onClose={handleClose}
      />,
      div
    );
  });
};


interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  label: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({open, onClose, onConfirm, label}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>{label}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
