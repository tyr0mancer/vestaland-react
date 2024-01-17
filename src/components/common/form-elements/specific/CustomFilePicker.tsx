import React, {useState} from "react";
import {CustomFieldProps} from "../types";
import {Datei} from "../../../../shared-types/models/Datei";
import {useFormikContext} from "formik";
import {FileUploader} from 'react-drag-drop-files';
import {Box, Button, Modal, Typography} from "@mui/material";
import {getFileUrl} from "../../formatting/RezeptBild";
import {APIService} from "../../../../util/api/APIService";

/**
 * TS Doc Info
 * @component CustomFile
 */
export function CustomFilePicker({name, values}: CustomFieldProps<Datei>): React.ReactElement {
  const [open, setOpen] = useState(false)
  const {setFieldValue} = useFormikContext();
  const handleUpload = async (values: File) => {
    if (!values)
      return
    const res = await APIService.upload('datei', values)
    await setFieldValue(name, res)
  }

  const handleDelete = async () => {
    await setFieldValue(name, null)
  }

  const handleOpen = async () => {
    setOpen(s => !s)
  }

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (<Box className="file-picker">
    <Typography variant="h6" borderBottom={1}> Rezept-Bild wählen oder hochladen </Typography>

    <FileUploader handleChange={handleUpload} name="file" types={fileTypes}>
      <div className="drag-drop-area">
        <img src={getFileUrl(values?.filename)} height={200} alt={values?.beschreibung || 'Platzhalter'}/>
      </div>
    </FileUploader>

    <Button onClick={handleOpen}>Aus Galerie</Button>
    <Button onClick={handleDelete}>Entfernen</Button>

    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Bild auswählen
        </Typography>
        <Typography id="modal-modal-description" sx={{mt: 2}}>
          Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
        </Typography>
      </Box>
    </Modal>
  </Box>)
}


const fileTypes = ["JPG", "PNG", "GIF"];
