
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptControls } from './components/PromptControls';
import { ResultDisplay } from './components/ResultDisplay';
import { analyzeImageForFace, generateHistoricalImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { AlertTriangle } from './components/icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<{ base64: string; mimeType: string; } | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('Place this person in a 1920s jazz club, looking stylish.');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [isFaceDetected, setIsFaceDetected] = useState<boolean>(false);

  const resetState = () => {
    setOriginalImage(null);
    setGeneratedImage(null);
    setIsLoading(false);
    setError(null);
    setIsFaceDetected(false);
    setLoadingMessage('');
  };

  const handleImageUpload = useCallback(async (file: File) => {
    resetState();
    setIsLoading(true);
    setError(null);
    setLoadingMessage('Analyzing image for a clear face...');

    try {
      const { base64, mimeType } = await fileToBase64(file);
      setOriginalImage({ base64, mimeType });

      const faceFound = await analyzeImageForFace(base64, mimeType);
      if (faceFound) {
        setIsFaceDetected(true);
        setGeneratedImage(null); // Clear previous result
      } else {
        setError('No clear face detected. Please upload a different photo with a clear, forward-facing portrait.');
        setOriginalImage(null);
        setIsFaceDetected(false);
      }
    } catch (err) {
      setError('Could not process the image. Please try again.');
      console.error(err);
      setOriginalImage(null);
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);
  
  const handleGenerate = useCallback(async () => {
    if (!originalImage || !prompt) {
      setError('Please upload an image and enter a prompt first.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    setLoadingMessage('Warming up the time machine...');

    try {
      const newImageBase64 = await generateHistoricalImage(originalImage.base64, originalImage.mimeType, prompt);
      setGeneratedImage(`data:image/jpeg;base64,${newImageBase64}`);
    } catch (err) {
        const error = err as Error;
        setError(`Failed to generate image: ${error.message}. Please try a different prompt or image.`);
        console.error(err);
    } finally {
        setIsLoading(false);
        setLoadingMessage('');
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col font-sans">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col items-center">
        {error && (
          <div className="w-full max-w-4xl bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative mb-6 flex items-center space-x-3">
            <AlertTriangle className="h-6 w-6" />
            <span>{error}</span>
          </div>
        )}
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <h2 className="text-2xl font-bold text-cyan-400">1. Your Portrait</h2>
            <ImageUploader 
              onImageUpload={handleImageUpload} 
              imageSrc={originalImage?.base64 || null} 
              isLoading={isLoading && !isFaceDetected}
              loadingMessage={loadingMessage}
            />
          </div>
          <div className="flex flex-col space-y-6">
             <h2 className="text-2xl font-bold text-cyan-400">2. Your Destination</h2>
            {isFaceDetected && originalImage ? (
                <>
                <PromptControls 
                    prompt={prompt} 
                    setPrompt={setPrompt} 
                    onSubmit={handleGenerate} 
                    isLoading={isLoading} 
                />
                <ResultDisplay 
                    imageSrc={generatedImage} 
                    isLoading={isLoading && !!generatedImage === false} 
                    loadingMessage={loadingMessage}
                />
                </>
            ) : (
                <div className="h-full flex flex-col justify-center items-center bg-gray-800/50 rounded-lg p-8 border-2 border-dashed border-gray-600">
                    <p className="text-gray-400 text-center">Your time-travel destination will appear here once a valid portrait is uploaded.</p>
                </div>
            )}
          </div>
        </div>
      </main>
      <footer className="text-center p-4 text-gray-500 text-sm">
        Powered by Gemini AI. Create your own temporal masterpiece.
      </footer>
    </div>
  );
};

export default App;
