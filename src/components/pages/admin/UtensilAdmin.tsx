import React, { useState } from 'react';
import Webcam from "react-webcam";
import Quagga from 'quagga';


export const UtensilAdmin = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [barcode, setBarcode] = useState("");

  const capture = React.useCallback(() => {
    if (!webcamRef.current) {
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc)

    Quagga.decodeSingle({
      src: imageSrc,
      numOfWorkers: 0,
      inputStream: {
        size: 800
      },
      decoder: {
        readers: ["code_128_reader"]
      },
    }, (result:any) => {
      if(result && result.codeResult) {
        setBarcode(result.codeResult.code);
      }
    });
  }, [webcamRef]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <button onClick={capture}>Scan Barcode</button>
      {barcode && <p>Barcode: {barcode}</p>}
    </div>
  );
};
