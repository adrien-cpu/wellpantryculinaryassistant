import React, { useRef, useState, useEffect } from 'react';
import { scanBarcode, getProductInfo } from '@/lib/barcodeScanner';

interface BarcodeScannerProps {
  onBarcodeDetected: (productInfo: any) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);

  useEffect(() => {
    if (isCameraOn) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          // Start scanning once the video stream is ready
          if (videoRef.current) {
            scanBarcode(videoRef.current).then(async (barcode) => {
              if (barcode) {
                const productInfo = await getProductInfo(barcode);
 onBarcodeDetected(productInfo); // Always call, let parent decide what to do with null/data
                setIsCameraOn(false); // Stop scanning after detection
                setScannedBarcode(barcode);
              } else {
                console.log("No barcode detected");
              }
            });
          }
        }) // Close the .then() block for getUserMedia
        .catch((err) => {
          console.error("Error accessing camera:", err);
          setIsCameraOn(false); // Turn off camera state if access fails
        });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    }

    // Cleanup function to turn off camera when component unmounts or isCameraOn changes
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [isCameraOn]);

  const handleToggleCamera = () => {
    setIsCameraOn(prevState => !prevState);
  };
 
return (
    <div>
      <h2>Barcode Scanner</h2>
      <button onClick={handleToggleCamera}>
        {isCameraOn ? 'Turn Camera Off' : 'Turn Camera On'}
      </button>
      {isCameraOn && (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px' }} />
          {scannedBarcode && <p>Scanned Barcode: {scannedBarcode}</p>}
        </div>
      )}
    </div>
 );
};

export default BarcodeScanner;