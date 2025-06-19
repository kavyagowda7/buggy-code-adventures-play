
import React from 'react';
import { Level } from '../types/game';

interface GameGridProps {
  level: Level;
  buggyPosition: [number, number];
  executionPath: [number, number][];
  isComplete: boolean;
}

const GameGrid: React.FC<GameGridProps> = ({ 
  level, 
  buggyPosition, 
  executionPath, 
  isComplete 
}) => {
  const [buggyX, buggyY] = buggyPosition;
  const [goalX, goalY] = level.goal;

  const getCellContent = (row: number, col: number) => {
    // Buggy position
    if (row === buggyY && col === buggyX) {
      return (
        <div className={`text-4xl transform transition-all duration-300 ${
          isComplete ? 'animate-bounce scale-110' : 'hover:scale-110'
        }`}>
          🤖
        </div>
      );
    }
    
    // Goal position
    if (row === goalY && col === goalX) {
      return (
        <div className={`text-4xl transform transition-all duration-300 ${
          isComplete ? 'animate-pulse scale-110' : ''
        }`}>
          🎯
        </div>
      );
    }
    
    // Wall
    if (level.grid[row][col] === 1) {
      return (
        <div className="w-full h-full bg-gray-700 rounded-lg shadow-inner flex items-center justify-center">
          <span className="text-2xl">🧱</span>
        </div>
      );
    }
    
    // Path trail
    const isInPath = executionPath.some(([x, y]) => x === col && y === row);
    if (isInPath) {
      return (
        <div className="w-full h-full bg-yellow-200 rounded-lg border-2 border-yellow-400 flex items-center justify-center">
          <span className="text-lg">👣</span>
        </div>
      );
    }
    
    return null;
  };

  const getCellStyle = (row: number, col: number) => {
    let baseStyle = "w-16 h-16 border-2 border-gray-300 rounded-lg flex items-center justify-center transition-all duration-200 ";
    
    // Empty cell
    if (level.grid[row][col] === 0) {
      baseStyle += "bg-green-100 hover:bg-green-200 ";
    }
    
    // Goal highlight
    if (row === goalY && col === goalX) {
      baseStyle += isComplete 
        ? "bg-gradient-to-r from-yellow-300 to-orange-300 animate-pulse " 
        : "bg-gradient-to-r from-blue-200 to-purple-200 ";
    }
    
    return baseStyle;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid grid-cols-5 gap-1 p-4 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-inner">
        {level.grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={getCellStyle(rowIndex, colIndex)}
            >
              {getCellContent(rowIndex, colIndex)}
            </div>
          ))
        )}
      </div>
      
      {isComplete && (
        <div className="mt-4 text-center animate-fade-in">
          <div className="text-6xl animate-bounce">🎉</div>
          <p className="text-2xl font-bold text-green-600 mt-2">
            Great job! Level Complete!
          </p>
        </div>
      )}
    </div>
  );
};

export default GameGrid;
