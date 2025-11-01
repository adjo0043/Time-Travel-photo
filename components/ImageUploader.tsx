
import React, { useRef } from 'react';
import { UploadCloud, Loader } from './icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  imageSrc: string | null;
  isLoading: boolean;
  loadingMessage: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, imageSrc, isLoading, loadingMessage }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  return (
    <div className="relative aspect-square w-full max-w-md mx-auto bg-gray-800/50 rounded-lg p-4 border-2 border-dashed border-gray-600 hover:border-cyan-400 transition-colors duration-300">
      <input
        type="file"
        ref={inputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="w-full h-full flex flex-col justify-center items-center cursor-pointer"
      >
        {isLoading ? (
          <div className="text-center text-gray-400">
            <Loader className="h-12 w-12 animate-spin mx-auto mb-4" />
            <p className="font-semibold text-lg">{loadingMessage}</p>
          </div>
        ) : imageSrc ? (
          <img src={imageSrc} alt="Uploaded portrait" className="w-full h-full object-contain rounded-md" />
        ) : (
          <div className="text-center text-gray-500">
            <UploadCloud className="h-12 w-12 mx-auto mb-4" />
            <p className="font-semibold text-lg">
              <span className="text-cyan-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm">PNG, JPG, or WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};
