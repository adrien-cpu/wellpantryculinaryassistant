import React, { useState, ChangeEvent, useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

// Note: For a production app, you'd want to load a model more specific to food classification.
interface ImageRecognizerProps {
  isOpen: boolean; // Prop to indicate if the recognizer drawer is open
  onImageRecognized: (foodItem: { name: string; category?: string }) => void;
}

const ImageRecognizer: React.FC<ImageRecognizerProps> = ({ isOpen, onImageRecognized }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [modelLoading, setModelLoading] = useState(true);
  const [model, setModel] = useState<tf.GraphModel | null>(null);
  const [modelError, setModelError] = useState<string | null>(null); // State for model loading errors
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        const mobilenetModel = await tf.loadGraphModel(
          'https://tfhub.dev/google/tfjs-model/imagenet/mobilenet_v2_140_224/classification/3/default/1', // Fixed URL
          { fromTFHub: true }
        );
        setModel(mobilenetModel);
        setModelLoading(false);
      } catch (error) {
        setModelError('Failed to load the recognition model.'); // Set error state
        console.error('Error loading the model:', error);
        setModelLoading(false);
      }
    };
    loadModel();
  }, []); // Empty dependency array ensures this runs only once on mount

  useEffect(() => {
    let animationFrameId: number;
    let stream: MediaStream | null = null;

    const startCamera = async () => {
      if (!isOpen || !videoRef.current) {
        return;
      }

      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }); // Prefer rear camera
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        recognizeFrame(); // Start recognizing frames
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    const recognizeFrame = async () => {
      if (!model || !videoRef.current || videoRef.current.readyState !== 4) { // readyState 4 means HAVE_ENOUGH_DATA
        animationFrameId = requestAnimationFrame(recognizeFrame); // Continue loop if not ready
        return;
      }

      try {
        const tensor = tf.browser.fromPixels(videoRef.current).resizeNearestNeighbor([224, 224]).toFloat().expandDims(0);
        const normalized = tensor.div(127.5).sub(1); // Normalize to [-1, 1]

        const predictions = model.predict(normalized) as tf.Tensor;
        const values = await predictions.data(); // Get prediction values

        // TODO: Process predictions (e.g., find top K, map to food items)
        // For now, a placeholder:
        console.log('Frame processed, received predictions (mock):', values.slice(0, 5)); // Log first 5 values

        // Mock recognition trigger - replace with actual prediction threshold/logic
        // if (values[someIndex] > someThreshold) {
        //   onImageRecognized({ name: 'Recognized Food', category: 'Recognized Category' });
        //   setIsRecognizingImage(false); // Close drawer (assuming parent controls this state)
        // }

        tensor.dispose();
        normalized.dispose();
        predictions.dispose();

      } catch (error) {
        console.error('Error processing frame:', error);
      }
      animationFrameId = requestAnimationFrame(recognizeFrame); // Continue the loop      
    }; // Added closing brace for recognizeFrame function

    if (isOpen && model && !modelLoading) {
      startCamera();
    }

    return () => {
      // Cleanup function to stop camera and animation frame
      cancelAnimationFrame(animationFrameId);
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen, model, modelLoading]); // Re-run effect if drawer opens/closes, model loads

  // When isOpen is true, we show the camera feed for real-time recognition.
  // When isOpen is false, or model is loading, we might show a loading state or the file upload option (optional).

  return (
    <div>
      <h2>Image Recognition</h2>
      {modelError ? (
        <p className="text-red-500">{modelError}</p>
      ) : modelLoading ? (
        <p>Loading model...</p>
      ) : isOpen ? (
        <div>
          <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px' }} />
        </div>
      ) : null}
    </div>
  );
};

export default ImageRecognizer;