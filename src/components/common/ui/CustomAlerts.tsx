import React, {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
import {AlertTitle, Container, Fade} from "@mui/material";

/**
 * TS Doc Info
 * @component CustomAlerts
 */
export function CustomAlerts() {
  const [open, setOpen] = useState(false)
  const [errorList, setErrorList] = useState<any[]>([]);

  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      // @todo log timeStamp and Error-Type
      // console.log(event)
      setTimeout(() => {
        setOpen(false)
      }, 10000)

      setOpen(true)
      setErrorList(err => [...err, event.detail]);
    };
    window.addEventListener('api-error', handleApiError as EventListener);
    return () => {
      window.removeEventListener('api-error', handleApiError as EventListener);
    };
  }, [setErrorList]);

  if (!errorList.length)
    return <></>

  const message = errorList[0].message || ''
  const errors = errorList[0].errors || []


  return (
    <Container>
      <Fade in={open}>
        <Alert severity="warning" onClose={() => setOpen(false)}>
          <AlertTitle>Server meldet: {message}</AlertTitle>
          {errors?.map((err: any, index: number) => (<div key={index}>
            {err.path && <pre>{err.path.slice(1).join(' > ')}</pre>}
            <pre>{err.message}</pre>
            <hr/>
          </div>))}
        </Alert>
      </Fade>
    </Container>
  )
}


