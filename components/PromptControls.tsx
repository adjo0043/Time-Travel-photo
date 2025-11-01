
import React from 'react';
import { Loader, Sparkles } from './icons';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

const PRESET_PROMPTS = [
  'A Roman senator giving a speech in the Forum.',
  'An elegant guest at a 1920s jazz club.',
  'An astronaut on the surface of the moon.',
  'A knight in shining armor posing for a portrait.',
  'A cyberpunk hacker in a futuristic neon-lit city.',
  'A pirate captain on the deck of a ship.',
];

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onSubmit, isLoading }) => {
  return (
    <div className="w-full flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <label htmlFor="prompt-input" className="font-semibold text-gray-300">Describe the scene:</label>
        <textarea
          id="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., An astronaut on the moon"
          rows={3}
          className="w-full p-3 bg-gray-800 border-2 border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 focus:outline-none transition-colors duration-300"
          disabled={isLoading}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {PRESET_PROMPTS.map((p) => (
          <button
            key={p}
            onClick={() => setPrompt(p)}
            disabled={isLoading}
            className="px-3 py-1 bg-gray-700 text-sm text-gray-300 rounded-full hover:bg-cyan-600 hover:text-white transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="w-full flex justify-center items-center space-x-2 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
      >
        {isLoading ? (
          <>
            <Loader className="h-5 w-5 animate-spin" />
            <span>Generating...</span>
          </>
        ) : (
          <>
            <Sparkles className="h-5 w-5" />
            <span>Time-Travel!</span>
          </>
        )}
      </button>
    </div>
  );
};
