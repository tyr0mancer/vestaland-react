import React, {useEffect, useState} from "react";
import Alert from '@mui/material/Alert';
import {AlertTitle} from "@mui/material";

interface ZodErrorFormat {
  message: 'Schema ist nicht Valide',
  errors: any[]
}

/**
 * TS Doc Info
 * @component CustomAlerts
 */
export function CustomAlerts() {
  const [error, setError] = useState<ZodErrorFormat | null>(null);

  useEffect(() => {
    const handleApiError = (event: CustomEvent) => {
      setError(event.detail);
    };

    window.addEventListener('api-error', handleApiError as EventListener);

    return () => {
      window.removeEventListener('api-error', handleApiError as EventListener);
    };
  }, [setError]);

  return (
    <>
      {error && <Alert severity="error" onClose={() =>setError(null)}>
          <AlertTitle>{'Schema ist nicht valide'}</AlertTitle>
        {error.errors?.map((err, index) => (<div key={index}>
          <pre>{err.path.slice(1).join(' > ')}</pre>
          <pre>{err.message}</pre>
          <hr/>

        </div>))}
      </Alert>}
    </>
  );
}


