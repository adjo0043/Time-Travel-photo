
import React from 'react';
import { Image as ImageIcon, Loader } from './icons';

interface ResultDisplayProps {
  imageSrc: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ imageSrc, isLoading, loadingMessage }) => {
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-600 flex justify-center items-center">
      {isLoading ? (
        <div className="text-center text-gray-400">
          <Loader className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="font-semibold text-lg">{loadingMessage}</p>
          <p className="text-sm">This can take a moment...</p>
        </div>
      ) : imageSrc ? (
        <img src={imageSrc} alt="Generated time-travel" className="w-full h-full object-contain rounded-md" />
      ) : (
        <div className="text-center text-gray-500">
          <ImageIcon className="h-12 w-12 mx-auto mb-4" />
          <p className="font-semibold text-lg">Your generated image will appear here.</p>
        </div>
      )}
    </div>
  );
};
