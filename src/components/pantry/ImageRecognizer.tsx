import React, { useRef, useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Camera, ShieldAlert, XCircle, Loader2, ImageIcon, Check } from "lucide-react";

interface ImageRecognizerProps {
  isOpen: boolean;
  onImageRecognized: (foodItem: { name: string; category?: string }) => void;
  onClose: () => void;
}

const ImageRecognizer: React.FC<ImageRecognizerProps> = ({ isOpen, onImageRecognized, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'prompt' | 'granted' | 'denied' | 'unknown'>('unknown');
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<{ name: string; confidence: number; category?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [useMockRecognition, setUseMockRecognition] = useState(true); // Always use mock recognition for now
  
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
    
    if (useMockRecognition) {
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
      
      // Fallback to mock recognition
      setUseMockRecognition(true);
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

  const captureImage = () => {
    if (useMockRecognition) {
      // En mode mock, simuler la capture d'image
      setCapturedImage('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D');
      stopCamera();
      return;
    }
    
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Définir les dimensions du canvas pour correspondre à la vidéo
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Dessiner l'image de la vidéo sur le canvas
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convertir le canvas en URL de données
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // Arrêter la caméra après la capture
      stopCamera();
    }
  };

  const mockImageRecognition = async (): Promise<{ name: string; category: string; confidence: number }> => {
    // Simuler un délai de traitement
    await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
    
    // Base de données d'aliments pour la reconnaissance simulée
    const foodItems = [
      { name: "Pomme", category: "Fruits" },
      { name: "Banane", category: "Fruits" },
      { name: "Orange", category: "Fruits" },
      { name: "Carotte", category: "Légumes" },
      { name: "Tomate", category: "Légumes" },
      { name: "Brocoli", category: "Légumes" },
      { name: "Pain", category: "Féculents" },
      { name: "Pâtes", category: "Féculents" },
      { name: "Riz", category: "Féculents" },
      { name: "Fromage", category: "Produits laitiers" },
      { name: "Lait", category: "Produits laitiers" },
      { name: "Yaourt", category: "Produits laitiers" },
      { name: "Poulet", category: "Viandes" },
      { name: "Bœuf", category: "Viandes" },
      { name: "Poisson", category: "Poissons" },
      { name: "Œufs", category: "Protéines" },
      { name: "Huile d'olive", category: "Condiments" },
      { name: "Sel", category: "Condiments" },
      { name: "Poivre", category: "Épices" },
      { name: "Basilic", category: "Herbes" }
    ];
    
    // Sélectionner un aliment aléatoire
    const randomIndex = Math.floor(Math.random() * foodItems.length);
    const recognizedItem = foodItems[randomIndex];
    
    // Simuler un niveau de confiance réaliste
    const confidence = 0.65 + Math.random() * 0.3; // Entre 0.65 et 0.95
    
    return {
      name: recognizedItem.name,
      category: recognizedItem.category,
      confidence: parseFloat(confidence.toFixed(2))
    };
  };

  const recognizeImage = async () => {
    if (!capturedImage) {
      setError("Impossible de reconnaître l'image. Veuillez réessayer.");
      return;
    }
    
    setIsRecognizing(true);
    setError(null);
    
    try {
      // Toujours utiliser la reconnaissance simulée
      const result = await mockImageRecognition();
      setRecognitionResult(result);
    } catch (err: any) {
      console.error("Error recognizing image:", err);
      setError(`Erreur lors de la reconnaissance: ${err.message}`);
    } finally {
      setIsRecognizing(false);
    }
  };

  const handleConfirmResult = () => {
    if (recognitionResult) {
      onImageRecognized({
        name: recognitionResult.name,
        category: recognitionResult.category
      });
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
    setRecognitionResult(null);
  };

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full">
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-semibold text-wp-green-dark dark:text-wp-green">Reconnaissance d'image</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>
      
      {useMockRecognition && (
        <Alert className="mb-4 w-full border-blue-200 bg-blue-50">
          <AlertTitle className="flex items-center text-blue-800">
            <ImageIcon className="h-4 w-4 mr-2" />
            Mode démonstration
          </AlertTitle>
          <AlertDescription className="text-blue-700">
            Le système utilise une reconnaissance simulée pour la démonstration. Les résultats sont générés aléatoirement.
          </AlertDescription>
        </Alert>
      )}
      
      {error && (
        <Alert variant="destructive" className="mb-4 w-full">
          <AlertTitle className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Erreur
          </AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {permissionStatus === 'denied' && !useMockRecognition ? (
        <div className="text-center p-4 bg-amber-50 rounded-lg border border-amber-200 w-full">
          <ShieldAlert className="h-8 w-8 text-amber-500 mx-auto mb-2" />
          <h3 className="font-medium text-amber-800 mb-2">Accès à la caméra refusé</h3>
          <p className="text-amber-700 mb-4">
            Pour reconnaître des aliments, vous devez autoriser l'accès à votre caméra dans les paramètres de votre navigateur.
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
            {isCameraOn && !capturedImage ? (
              useMockRecognition ? (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-2/3 h-2/3 border-2 border-wp-green rounded-lg opacity-70"></div>
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
            ) : capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <ImageIcon className="h-16 w-16 text-gray-400" />
              </div>
            )}
          </div>
          
          <canvas ref={canvasRef} className="hidden" />
          
          {!capturedImage ? (
            <div className="flex gap-3 w-full max-w-md">
              {!isCameraOn ? (
                <Button 
                  onClick={startCamera} 
                  className="flex-1 bg-wp-green hover:bg-wp-green-dark"
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
                    Annuler
                  </Button>
                  <Button 
                    onClick={captureImage} 
                    className="flex-1 bg-wp-green hover:bg-wp-green-dark"
                  >
                    Prendre une photo
                  </Button>
                </>
              )}
            </div>
          ) : (
            <>
              {!recognitionResult ? (
                <div className="flex gap-3 w-full max-w-md">
                  <Button 
                    onClick={resetCapture} 
                    variant="outline" 
                    className="flex-1 border-wp-gray-dark"
                  >
                    Reprendre
                  </Button>
                  <Button 
                    onClick={recognizeImage} 
                    className="flex-1 bg-wp-green hover:bg-wp-green-dark"
                    disabled={isRecognizing}
                  >
                    {isRecognizing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Analyse en cours...
                      </>
                    ) : (
                      <>
                        <ImageIcon className="mr-2 h-4 w-4" />
                        Analyser l'image
                      </>
                    )}
                  </Button>
                </div>
              ) : (
                <>
                  <div className="p-4 bg-wp-green-light/20 rounded-lg border border-wp-green-light w-full max-w-md">
                    <h3 className="font-medium text-wp-green-dark mb-2">Aliment reconnu</h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-wp-gray-dark text-lg font-semibold">{recognitionResult.name}</p>
                        {recognitionResult.category && (
                          <p className="text-wp-gray-dark text-sm">Catégorie: {recognitionResult.category}</p>
                        )}
                      </div>
                      <div className="bg-wp-green text-white px-2 py-1 rounded text-sm">
                        {Math.round(recognitionResult.confidence * 100)}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3 w-full max-w-md">
                    <Button 
                      onClick={resetCapture} 
                      variant="outline" 
                      className="flex-1 border-wp-gray-dark"
                    >
                      Reprendre
                    </Button>
                    <Button 
                      onClick={handleConfirmResult} 
                      className="flex-1 bg-wp-green hover:bg-wp-green-dark"
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Confirmer
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
          
          <div className="text-sm text-wp-gray-dark dark:text-wp-gray-light mt-2 w-full max-w-md">
            <p className="mb-2">
              <strong>Conseils pour une meilleure reconnaissance :</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Assurez-vous que l'aliment est bien éclairé</li>
              <li>Centrez l'aliment dans le cadre</li>
              <li>Évitez les arrière-plans encombrés</li>
              <li>Prenez la photo de près pour plus de détails</li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default ImageRecognizer;