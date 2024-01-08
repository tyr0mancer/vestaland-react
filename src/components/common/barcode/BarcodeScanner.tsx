import React, {useState, useEffect} from 'react';
import Webcam from "react-webcam";
import {BrowserMultiFormatReader} from '@zxing/library';

const BarcodeScanner = () => {
  const webcamRef = React.useRef<Webcam>(null);
  const [barcode, setBarcode] = useState('');

  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot() || '';

      const codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromImage(undefined, imageSrc)
        .then((result: any) => {
          setBarcode(result.text);
        })
        .catch(() => {
          // Handhabung von Fehlern oder nicht erkannten Barcodes
        });
    }
  }, [webcamRef]);


  useEffect(() => {
    const interval = setInterval(capture, 1000);
    return () => clearInterval(interval);
  }, [capture]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
      />
      <p>Barcode: {barcode}</p>
    </div>
  );
};

export default BarcodeScanner;
