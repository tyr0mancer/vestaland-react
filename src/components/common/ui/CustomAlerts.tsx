import React, {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
import {AlertTitle, Fade} from "@mui/material";

/**
 * TS Doc Info
 * @component CustomAlerts
 */
export function CustomAlerts() {
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      setChecked(true)
      // @todo timeStamp, type
      // console.log(event)
      setError(event.detail);
    };
    window.addEventListener('api-error', handleApiError as EventListener);
    return () => {
      window.removeEventListener('api-error', handleApiError as EventListener);
    };
  }, [setError]);


  return (
    <div>
      <Fade in={checked}>
        <Alert severity="warning" onClose={() => setChecked(false)}>
          <AlertTitle>{error?.status} - {error?.message}</AlertTitle>

          {error?.errors?.map((err: any, index: number) => (<div key={index}>
            <pre>{err.path.slice(1).join(' > ')}</pre>
            <pre>{err.message}</pre>
            <hr/>
          </div>))}
        </Alert>
      </Fade>
    </div>
  )
}

