import React, { useRef, useState, useEffect } from 'react';
import { scanBarcode, stopScan, getProductInfo } from '@/lib/barcodeScanner';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, ShieldAlert, CheckCircle2, XCircle } from "lucide-react";

interface BarcodeScannerProps {
  onBarcodeDetected: (productInfo: any) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Vérifier le statut de la permission caméra au chargement
  useEffect(() => {
    const checkPermission = async () => {
      try {
        // Vérifier si l'API permissions est disponible
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
          
          // Écouter les changements de permission
          result.addEventListener('change', () => {
            setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
          });
        }
      } catch (err) {
        console.log('Permission API not supported or other error:', err);
      }
    };
    
    checkPermission();
    
    // Nettoyage à la fermeture
    return () => {
      stopScan();
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    setIsScanning(true);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Préférer la caméra arrière
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        setIsCameraOn(true);
        setPermissionStatus('granted');
      }
    } catch (err: any) {
      console.error("Error accessing camera:", err);
      setIsCameraOn(false);
      
      if (err.name === 'NotAllowedError') {
        setPermissionStatus('denied');
        setError("L'accès à la caméra a été refusé. Veuillez autoriser l'accès dans les paramètres de votre navigateur.");
      } else if (err.name === 'NotFoundError') {
        setError("Aucune caméra n'a été détectée sur votre appareil.");
      } else {
        setError(`Erreur lors de l'accès à la caméra: ${err.message}`);
      }
    } finally {
      setIsScanning(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
    stopScan();
  };

  const handleStartScan = async () => {
    if (!isCameraOn) return;
    
    setIsScanning(true);
    setError(null);
    
    try {
      if (videoRef.current) {
        const barcode = await scanBarcode(videoRef.current);
        if (barcode) {
          setScannedBarcode(barcode);
          
          // Récupérer les informations du produit
          const productInfo = await getProductInfo(barcode);
          onBarcodeDetected(productInfo || { name: `Produit (${barcode})`, barcode });
        } else {
          setError("Aucun code-barres détecté. Veuillez réessayer.");
        }
      }
    } catch (err: any) {
      console.error("Error scanning barcode:", err);
      setError(`Erreur lors du scan: ${err.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full">
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-semibold text-wp-green-dark dark:text-wp-green">Scanner un code-barres</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Erreur
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {permissionStatus === 'denied' ? (
        <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200 w-full">
          <ShieldAlert className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-medium text-amber-800 mb-2">Accès à la caméra refusé</h3>
          <p className="text-amber-700 mb-4">
            Pour scanner des codes-barres, vous devez autoriser l'accès à votre caméra dans les paramètres de votre navigateur.
          </p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
            className="border-amber-500 text-amber-700"
          >
            Réessayer
          </Button>
        </div>
      ) : (
        <>
          <div className="relative w-full max-w-md aspect-video bg-black rounded-lg overflow-hidden">
            {isCameraOn ? (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                playsInline 
                muted
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {isCameraOn && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-1/3 border-2 border-wp-green rounded-lg opacity-70"></div>
              </div>
            )}
          </div>
          
          <div className="flex gap-3 w-full max-w-md">
            {!isCameraOn ? (
              <Button 
                onClick={startCamera} 
                className="flex-1 bg-wp-green hover:bg-wp-green-dark"
                disabled={isScanning}
              >
                <Camera className="mr-2 h-4 w-4" />
                Activer la caméra
              </Button>
            ) : (
              <>
                <Button 
                  onClick={stopCamera} 
                  variant="outline" 
                  className="flex-1 border-wp-gray-dark"
                >
                  Arrêter la caméra
                </Button>
                <Button 
                  onClick={handleStartScan} 
                  className="flex-1 bg-wp-green hover:bg-wp-green-dark"
                  disabled={isScanning}
                >
                  {isScanning ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Scan en cours...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Scanner
                    </>
                  )}
                </Button>
              </>
            )}
          </div>
          
          {scannedBarcode && (
            <div className="p-4 bg-wp-green-light/20 rounded-lg border border-wp-green-light w-full max-w-md">
              <h3 className="font-medium text-wp-green-dark mb-2">Code-barres détecté</h3>
              <p className="text-wp-gray-dark font-mono">{scannedBarcode}</p>
            </div>
          )}
          
          <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-2 w-full max-w-md">
            <p className="mb-2">
              <strong>Conseils pour un scan optimal :</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assurez-vous que le code-barres est bien éclairé</li>
              <li>Tenez votre appareil stable</li>
              <li>Alignez le code-barres dans le cadre</li>
              <li>Évitez les reflets sur le code-barres</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default BarcodeScanner;