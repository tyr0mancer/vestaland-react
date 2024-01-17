import React, {useState} from "react";
import {useField} from "formik";
import {FileUploader} from 'react-drag-drop-files';
import {Box, Button, Modal, Typography} from "@mui/material";
import {getFileUrl} from "../../formatting/RezeptBild";
import {CustomFileDropperProps} from "./types";

const fileTypes = ["JPG", "PNG", "GIF"];


/**
 * CustomFileDropper Komponente - Eine spezialisierte Komponente zum Hochladen von Dateien, integriert mit Formik.
 *
 * @typeParam T - Der Typ des Objekts, das nach dem Hochladen eines Files zurückgegeben wird.
 *
 * @param props - Die Props des CustomFileDropper, definiert in CustomFileDropperProps.
 * @returns Eine React-Komponente für einen benutzerdefinierten FileDropper mit Formik-Integration.
 *
 * @example
 * <CustomFileDropper
 *  name={'bild'}
 *  label={'Rezept-Bild'}
 *  uploadFn={(file: File) => APIService.upload<Datei>('datei', file, 'bild')}
 * />
 */
export function CustomFileDropper<T>({name, label, uploadFn}: CustomFileDropperProps<T>): React.ReactElement {
  const [{value}, , {setValue}] = useField(name);
  const [open, setOpen] = useState(false)

  const handleUpload = (file: File) =>
    uploadFn(file).then(setValue).catch(console.log)

  const handleClear = () =>
    setValue(null)

  const handleOpen = () =>
    setOpen(s => !s)

  const style = {
    position: 'absolute',
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
    <Typography variant="h6" borderBottom={1}>{label}</Typography>

    <FileUploader handleChange={handleUpload} name="file-uploader" types={fileTypes}>
      <div className="drag-drop-area">
        <img src={getFileUrl(value?.filename)} height={'100%'} alt={value?.beschreibung || 'Platzhalter'}/>
      </div>
    </FileUploader>

    <Button onClick={handleOpen}>Aus Galerie</Button>
    <Button onClick={handleClear}>Entfernen</Button>

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


