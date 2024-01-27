import React, {ForwardedRef, useState} from "react";
import {useQuery} from "@tanstack/react-query";

import {useField} from "formik";
import {FileUploader} from 'react-drag-drop-files';
import {Box, IconButton, ImageList, ImageListItem, Modal, Paper, Tooltip, Typography} from "@mui/material";

import {
  Collections as OpenGalleryIcon,
  HideImage as DeleteIcon,
} from "@mui/icons-material";



import {getFileUrl} from "../../formatting/RezeptBild";
import {CustomFileDropperProps} from "./types";
import {APIService} from "../../../../util/api/APIService";
import {ConditionalDisplay} from "../../../layout/ConditionalDisplay";
import {Datei} from "../../../../shared-types/models/Datei";

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
    setValue(undefined)

  const handleOpen = () =>
    setOpen(s => !s)

  const handleSelect = (datei: Datei) => {
    setValue(datei)
      .then(() => setOpen(false))
  }


  return (<Box className="file-picker">
    <Typography variant="h6" borderBottom={1}>{label}</Typography>

    <FileUploader handleChange={handleUpload} name="file-uploader" types={fileTypes}>
      <div className="drag-drop-area">
        <img src={getFileUrl(value?.filename)} height={'100%'} alt={value?.beschreibung || 'Platzhalter'}/>
      </div>
    </FileUploader>

    <Tooltip title={'Aus Galerie auswählen'}>
    <IconButton
      onClick={handleOpen}
    ><OpenGalleryIcon/></IconButton>
    </Tooltip>

    <Tooltip title={'Kein Bild'}>
      <IconButton
        onClick={handleClear}
      ><DeleteIcon/></IconButton>
    </Tooltip>

    <Modal
      open={open}
      onClose={handleOpen}
      aria-labelledby="gallery-modal"
      aria-describedby="zeige-bildauswahl"
    >
      <Gallery onSelect={handleSelect}/>
    </Modal>

  </Box>)
}


const Gallery = React.forwardRef(function RefGallery({onSelect}: { onSelect: (datei: Datei) => void }, ref: ForwardedRef<HTMLDivElement>) {
    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgColor: 'white',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };

    const {data, isLoading, error} = useQuery(
      {
        queryKey: ["datei-auswahl"],
        queryFn: () => APIService.search<Datei>('datei')
      });

    return <ConditionalDisplay status={{isLoading, error}}>
      <div ref={ref}>
        <Paper sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Bild auswählen
          </Typography>
          <Typography id="modal-modal-description" sx={{mt: 2}}>

            <ImageList cols={3} rowHeight={150}>
              {(data ?? []).map(datei => (
                <ImageListItem key={datei.filename}>
                  <img onClick={() => onSelect(datei)}
                       srcSet={`${getFileUrl(datei.filename)}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                       src={`${getFileUrl(datei.filename)}?w=164&h=164&fit=crop&auto=format`}
                       alt={datei.beschreibung}
                       loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Typography>
        </Paper>
      </div>
    </ConditionalDisplay>
  }
)
