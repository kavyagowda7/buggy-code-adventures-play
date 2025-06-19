
import React from 'react';
import GameInterface from '../components/GameInterface';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg animate-bounce">
            🐞 Buggy's Code Adventure
          </h1>
          <p className="text-xl text-white/90 font-medium">
            Learn coding by helping Buggy reach the goal!
          </p>
        </header>
        <GameInterface />
      </div>
    </div>
  );
};

export default Index;
