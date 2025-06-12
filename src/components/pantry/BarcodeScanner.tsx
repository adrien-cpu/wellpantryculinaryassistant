import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, ShieldAlert, XCircle, Loader2, CheckCircle2 } from "lucide-react";

interface BarcodeScannerProps {
  onBarcodeDetected: (productInfo: any) => void;
  onClose: () => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onBarcodeDetected, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [isScanning, setIsScanning] = useState(false);
  const [scannedBarcode, setScannedBarcode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useMockScanner, setUseMockScanner] = useState(true); // Always use mock scanner for now

  // Vérifier le statut de la permission caméra au chargement
  useEffect(() => {
    const checkPermission = async () => {
      try {
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
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    
    if (useMockScanner) {
      // En mode mock, simuler l'activation de la caméra
      setIsCameraOn(true);
      setPermissionStatus('granted');
      return;
    }
    
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
      
      // Fallback to mock scanner
      setUseMockScanner(true);
      setIsCameraOn(true);
      setPermissionStatus('granted');
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
  };

  const mockScanBarcode = async (): Promise<string> => {
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Base de données simulée de codes-barres
    const mockBarcodes = [
      '3017620422003', // Nutella
      '3017620425035', // Pâtes Panzani
      '3245390096265', // Yaourt Nature Danone
      '3228857000166', // Lait Demi-écrémé Lactel
      '3560070976478', // Jus d'orange Carrefour
      '123456789012'   // Produit Test
    ];
    
    // Sélectionner un code-barres aléatoire
    const randomIndex = Math.floor(Math.random() * mockBarcodes.length);
    return mockBarcodes[randomIndex];
  };

  const handleStartScan = async () => {
    if (!isCameraOn) return;
    
    setIsScanning(true);
    setError(null);
    
    try {
      let barcode: string | null = null;
      
      if (useMockScanner) {
        barcode = await mockScanBarcode();
      } else {
        // Ici, vous auriez votre logique réelle de scan
        // Pour l'instant, on utilise toujours le mock
        barcode = await mockScanBarcode();
      }
      
      if (barcode) {
        setScannedBarcode(barcode);
        
        // Récupérer les informations du produit
        const productInfo = await getProductInfo(barcode);
        onBarcodeDetected(productInfo || { name: `Produit (${barcode})`, barcode });
      } else {
        setError("Aucun code-barres détecté. Veuillez réessayer.");
      }
    } catch (err: any) {
      console.error("Error scanning barcode:", err);
      setError(`Erreur lors du scan: ${err.message}`);
    } finally {
      setIsScanning(false);
    }
  };

  // Simule la récupération d'informations sur un produit à partir d'un code-barres
  const getProductInfo = async (barcode: string): Promise<any> => {
    // Simuler un délai réseau
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Base de données simulée de produits
    const mockProducts: Record<string, any> = {
      '3017620422003': {
        name: 'Nutella',
        category: 'Épicerie',
        quantity: '400g',
        expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      },
      '3017620425035': {
        name: 'Pâtes Panzani',
        category: 'Féculents',
        quantity: '500g',
        expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      },
      '3245390096265': {
        name: 'Yaourt Nature Danone',
        category: 'Produits laitiers',
        quantity: '4x125g',
        expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      },
      '3228857000166': {
        name: 'Lait Demi-écrémé Lactel',
        category: 'Produits laitiers',
        quantity: '1L',
        expiryDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      },
      '3560070976478': {
        name: 'Jus d\'orange Carrefour',
        category: 'Boissons',
        quantity: '1L',
        expiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      },
      '123456789012': {
        name: 'Produit Test',
        category: 'Test',
        quantity: '100g',
        expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
      }
    };

    // Vérifier si le code-barres existe dans notre base de données simulée
    if (barcode in mockProducts) {
      console.log("Product found:", mockProducts[barcode]);
      return mockProducts[barcode];
    }
    
    // Pour les codes-barres inconnus, retourner un produit générique
    return {
      name: `Produit (${barcode})`,
      category: 'Divers',
      quantity: '1 unité',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('fr-FR'),
    };
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full">
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-semibold text-wp-green-dark dark:text-wp-green">Scanner un code-barres</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>
      
      {useMockScanner && (
        <Alert className="mb-4 w-full border-blue-200 bg-blue-50">
          <AlertTitle className="flex items-center text-blue-800">
            <Camera className="h-4 w-4 mr-2" />
            Mode démonstration
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            Le scanner utilise une simulation pour la démonstration. Les codes-barres sont générés aléatoirement.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertTitle className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Erreur
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {permissionStatus === 'denied' && !useMockScanner ? (
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
              useMockScanner ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2/3 h-1/3 border-2 border-wp-green rounded-lg opacity-70 relative">
                      {isScanning && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-full h-1 bg-wp-green animate-pulse"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <video 
                  ref={videoRef} 
                  className="w-full h-full object-cover"
                  playsInline 
                  muted
                />
              )
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <Camera className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {isCameraOn && !useMockScanner && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-1/3 border-2 border-wp-green rounded-lg opacity-70"></div>
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
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
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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