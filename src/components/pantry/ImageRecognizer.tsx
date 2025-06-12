import React, { useState, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
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
  const [modelLoading, setModelLoading] = useState(true);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [modelError, setModelError] = useState<string | null>(null);
  const [isRecognizing, setIsRecognizing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [recognitionResult, setRecognitionResult] = useState<{ name: string; confidence: number; category?: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // Vérifier le statut de la permission caméra au chargement
  useEffect(() => {
    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({ name: 'camera' as PermissionName });
          setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
          
          result.addEventListener('change', () => {
            setPermissionStatus(result.state as 'prompt' | 'granted' | 'denied');
          });
        }
      } catch (err) {
        console.log('Permission API not supported or other error:', err);
      }
    };
    
    checkPermission();
  }, []);

  // Charger le modèle TensorFlow.js
  useEffect(() => {
    const loadModel = async () => {
      try {
        setModelLoading(true);
        setModelError(null);
        
        // Pour l'exemple, nous utilisons MobileNet, mais dans une application réelle,
        // vous pourriez utiliser un modèle plus spécifique à la reconnaissance alimentaire
        const mobilenetModel = await tf.loadGraphModel(
          'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_100_224/classification/5/default/1',
          { fromTFHub: true }
        );
        
        setModel(mobilenetModel);
        setModelLoading(false);
      } catch (error: any) {
        console.error('Error loading the model:', error);
        setModelError(`Erreur lors du chargement du modèle: ${error.message}`);
        setModelLoading(false);
      }
    };
    
    if (isOpen) {
      loadModel();
    }
    
    return () => {
      // Nettoyer les ressources du modèle si nécessaire
      if (model) {
        // model.dispose(); // Décommenter si nécessaire pour libérer la mémoire
      }
    };
  }, [isOpen]);

  // Nettoyer les ressources de la caméra lors de la fermeture
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setError(null);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
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

  const recognizeImage = async () => {
    if (!model || !capturedImage || !canvasRef.current) {
      setError("Impossible de reconnaître l'image. Veuillez réessayer.");
      return;
    }
    
    setIsRecognizing(true);
    setError(null);
    
    try {
      // Charger l'image capturée dans un élément Image
      const img = new Image();
      img.src = capturedImage;
      await new Promise(resolve => { img.onload = resolve; });
      
      // Prétraiter l'image pour le modèle
      const tensor = tf.browser.fromPixels(img)
        .resizeBilinear([224, 224]) // Redimensionner pour MobileNet
        .toFloat()
        .expandDims(0);
      
      // Normaliser les valeurs de pixels
      const normalized = tensor.div(127.5).sub(1);
      
      // Faire la prédiction
      const predictions = await model.predict(normalized) as tf.Tensor;
      const data = await predictions.data();
      
      // Trouver l'indice de la classe avec la plus haute probabilité
      const maxIndex = Array.from(data).indexOf(Math.max(...Array.from(data)));
      
      // Simuler un résultat de reconnaissance (dans une application réelle, vous auriez un mapping des indices aux noms d'aliments)
      // Ici, nous simulons quelques résultats pour l'exemple
      const foodItems = [
        { name: "Pomme", category: "Fruits" },
        { name: "Banane", category: "Fruits" },
        { name: "Carotte", category: "Légumes" },
        { name: "Tomate", category: "Légumes" },
        { name: "Pain", category: "Féculents" },
        { name: "Fromage", category: "Produits laitiers" }
      ];
      
      // Sélectionner un aliment aléatoire pour la démonstration
      const randomIndex = Math.floor(Math.random() * foodItems.length);
      const recognizedItem = foodItems[randomIndex];
      
      // Simuler un niveau de confiance
      const confidence = 0.7 + Math.random() * 0.25; // Entre 0.7 et 0.95
      
      setRecognitionResult({
        name: recognizedItem.name,
        category: recognizedItem.category,
        confidence: parseFloat(confidence.toFixed(2))
      });
      
      // Nettoyer les tenseurs
      tensor.dispose();
      normalized.dispose();
      predictions.dispose();
      
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

  if (modelLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-wp-green" />
        <p className="text-center text-wp-gray-dark dark:text-wp-gray-light">
          Chargement du modèle de reconnaissance...
        </p>
      </div>
    );
  }

  if (modelError) {
    return (
      <div className="p-4">
        <Alert variant="destructive">
          <AlertTitle className="flex items-center">
            <ShieldAlert className="h-4 w-4 mr-2" />
            Erreur de chargement
          </AlertTitle>
          <AlertDescription>{modelError}</AlertDescription>
        </Alert>
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose}>Fermer</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 space-y-4 w-full">
      <div className="flex justify-between items-center w-full mb-2">
        <h2 className="text-xl font-semibold text-wp-green-dark dark:text-wp-green">Reconnaissance d'image</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <XCircle className="h-5 w-5" />
        </Button>
      </div>
      
      {error && (
        <Alert variant="destructive" className="mb-4 w-full">
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
            {isCameraOn && !capturedImage && (
              <video 
                ref={videoRef} 
                className="w-full h-full object-cover"
                playsInline 
                muted
              />
            )}
            
            {capturedImage ? (
              <img 
                src={capturedImage} 
                alt="Captured" 
                className="w-full h-full object-cover"
              />
            ) : !isCameraOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <ImageIcon className="h-16 w-16 text-gray-400" />
              </div>
            )}
            
            {isCameraOn && !capturedImage && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-2/3 h-2/3 border-2 border-wp-green rounded-lg opacity-70"></div>
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