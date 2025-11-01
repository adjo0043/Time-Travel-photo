
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm p-4 shadow-lg shadow-cyan-500/10 sticky top-0 z-10">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
          Time-Travel Photo Booth
        </h1>
        <p className="text-gray-400 mt-1">Journey Through History with AI</p>
      </div>
    </header>
  );
};
