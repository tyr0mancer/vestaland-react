import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import {useEffect} from "react";

interface ConfirmDialogButtonProps {
  label: string;
  labelConfirm?: string;
  labelReject?: string;
  children?: React.ReactNode;
  onConfirm: () => void;
  autoConfirm?: () => boolean
}

export function ConfirmDialogButton({
                                      children,
                                      label,
                                      onConfirm,
                                      autoConfirm,
                                      labelConfirm = "OK",
                                      labelReject = "Abbrechen"
                                    }: ConfirmDialogButtonProps) {

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    if (open && autoConfirm !== undefined && autoConfirm())
      onConfirm()
  }, [open, autoConfirm, onConfirm])


  return (
    <>
      <Button variant="outlined" onClick={() => setOpen(true)}>
        {label}
      </Button>
      <Dialog onClose={() => setOpen(false)} open={open}>
        {children}
        <Button variant="contained" color={"warning"}  onClick={onConfirm}>{labelConfirm}</Button>
        {labelReject && <Button color={"success"} variant="contained" onClick={() => setOpen(false)}>{labelReject}</Button>}
      </Dialog>
    </>
  );
}
