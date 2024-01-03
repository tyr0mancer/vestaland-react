import {Form, Formik, FormikValues} from "formik";
import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";

interface AddOptionDialogProps<T> {
  open: boolean
  title:string
  handleClose: () => void
  onAdded?: (value: T) => void
  initialValues: T
  children: any;
  mutationFn: (value: T) => Promise<T>
}


export function AddOptionDialog<T extends FormikValues>({
                                                          open,
                                                          title,
                                                          handleClose,
                                                          onAdded,
                                                          initialValues,
                                                          children,
                                                          mutationFn
                                                        }: AddOptionDialogProps<T>) {
  const onHandelSubmit = async (value: T) => {
    mutationFn(value).then((res) => {
      if (onAdded)
        onAdded(res)
      handleClose()
    })
      .catch(err => {
        console.log(err)
      })
  }

  return (<Dialog open={open} onClose={handleClose}>
    <DialogTitle>{title}</DialogTitle>
    <Formik<T>
      initialValues={initialValues}
      onSubmit={onHandelSubmit}
    >
      {() => <Form>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type={'submit'}>Add</Button>
        </DialogActions>
      </Form>}
    </Formik>
  </Dialog>)

}
