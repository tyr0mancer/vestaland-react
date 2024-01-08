import React from "react";
import {CustomFieldProps} from "./types";
import {Datei} from "../../../shared-types/models/Datei";
import {useFormikContext} from "formik";
import {FileUploader} from 'react-drag-drop-files';
import {Button, Paper} from "@mui/material";
import {fileUploadService, getFileUrl} from "../../../util/api/fileService";

/**
 * TS Doc Info
 * @component CustomFile
 */
export function CustomFile({name, values}: CustomFieldProps<Datei>): React.ReactElement {
  const {setFieldValue} = useFormikContext();
  const handleUpload = async (values: File) => {
    if (!values)
      return
    const res = await fileUploadService(values)
    await setFieldValue(name, res)
  }

  const handleDelete = async () => {
    await setFieldValue(name, null)
  }

  return (<Paper variant="outlined" sx={{padding: 2, textAlign: 'center'}}>
    <FileUploader handleChange={handleUpload} name="file" types={fileTypes}/>
    <img src={getFileUrl(values?.dateiNameServer)} height={200} alt={values?.beschreibung || 'Platzhalter'}/>
    <Button onClick={handleDelete}>delete</Button>
  </Paper>)
}



const fileTypes = ["JPG", "PNG", "GIF"];
