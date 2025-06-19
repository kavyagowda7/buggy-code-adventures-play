
import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import GameGrid from './GameGrid';
import BlocklyEditor from './BlocklyEditor';
import BadgePopup from './BadgePopup';
import SkillTracker from './SkillTracker';
import { GameState, Badge, Level } from '../types/game';
import { sampleLevel } from '../data/levels';
import { badges } from '../data/badges';
import { executeCode } from '../utils/codeExecutor';

const GameInterface = () => {
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    buggyPosition: [0, 0],
    isRunning: false,
    isComplete: false,
    xp: 0,
    unlockedBadges: [],
    skills: {
      loops: 0,
      sequencing: 0,
      debugging: 0,
      conditionals: 0,
      functions: 0
    }
  });

  const [currentLevel] = useState<Level>(sampleLevel);
  const [showBadge, setShowBadge] = useState<Badge | null>(null);
  const [executionPath, setExecutionPath] = useState<[number, number][]>([]);
  const blocklyRef = useRef<any>(null);

  // Initialize Buggy position
  useEffect(() => {
    setGameState(prev => ({
      ...prev,
      buggyPosition: [...currentLevel.start]
    }));
  }, [currentLevel]);

  const runCode = async () => {
    if (!blocklyRef.current) return;

    setGameState(prev => ({ ...prev, isRunning: true, isComplete: false }));
    
    try {
      const code = blocklyRef.current.getCode();
      console.log('Generated code:', code);
      
      const result = await executeCode(code, currentLevel, gameState);
      
      if (result.success) {
        setGameState(prev => ({ 
          ...prev, 
          isComplete: true, 
          xp: prev.xp + 50,
          skills: {
            ...prev.skills,
            sequencing: prev.skills.sequencing + 1
          }
        }));
        
        // Check for badge rewards
        checkBadgeRewards();
        
        // Show celebration animation
        setTimeout(() => {
          setExecutionPath([]);
        }, 2000);
      } else {
        console.log('Level not completed:', result.message);
      }
      
      setExecutionPath(result.path);
      setGameState(prev => ({ ...prev, buggyPosition: result.finalPosition }));
      
    } catch (error) {
      console.error('Code execution error:', error);
    } finally {
      setGameState(prev => ({ ...prev, isRunning: false }));
    }
  };

  const checkBadgeRewards = () => {
    const earnedBadges = badges.filter(badge => {
      if (gameState.unlockedBadges.includes(badge.id)) return false;
      
      switch (badge.id) {
        case 'first_steps':
          return gameState.skills.sequencing >= 1;
        case 'loop_legend':
          return gameState.skills.loops >= 3;
        default:
          return false;
      }
    });

    if (earnedBadges.length > 0) {
      const newBadge = earnedBadges[0];
      setShowBadge(newBadge);
      setGameState(prev => ({
        ...prev,
        unlockedBadges: [...prev.unlockedBadges, newBadge.id],
        xp: prev.xp + newBadge.xp
      }));
    }
  };

  const resetLevel = () => {
    setGameState(prev => ({
      ...prev,
      buggyPosition: [...currentLevel.start],
      isComplete: false,
      isRunning: false
    }));
    setExecutionPath([]);
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Game Grid */}
        <div className="lg:col-span-1 order-2 lg:order-1">
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                Level {currentLevel.level}
              </h3>
              <p className="text-sm text-gray-600">
                Help Buggy reach the 🎯 goal!
              </p>
            </div>
            <GameGrid 
              level={currentLevel}
              buggyPosition={gameState.buggyPosition}
              executionPath={executionPath}
              isComplete={gameState.isComplete}
            />
            <div className="mt-4 flex gap-2 justify-center">
              <Button 
                onClick={runCode} 
                disabled={gameState.isRunning}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-bold text-lg shadow-lg transform hover:scale-105 transition-all"
              >
                {gameState.isRunning ? '🏃 Running...' : '▶️ Run Code'}
              </Button>
              <Button 
                onClick={resetLevel}
                variant="outline"
                className="border-2 border-orange-400 text-orange-600 hover:bg-orange-50 px-4 py-2 rounded-full font-medium"
              >
                🔄 Reset
              </Button>
            </div>
          </Card>
        </div>

        {/* Blockly Editor */}
        <div className="lg:col-span-2 order-1 lg:order-2">
          <Card className="p-6 bg-white/95 backdrop-blur-sm shadow-xl">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                🧩 Code Blocks
              </h3>
              <p className="text-sm text-gray-600">
                Drag blocks to create code that moves Buggy!
              </p>
            </div>
            <BlocklyEditor ref={blocklyRef} />
          </Card>
        </div>

        {/* Skill Tracker */}
        <div className="lg:col-span-3 order-3">
          <SkillTracker 
            skills={gameState.skills} 
            xp={gameState.xp}
            level={currentLevel}
          />
        </div>
      </div>

      {/* Badge Popup */}
      {showBadge && (
        <BadgePopup 
          badge={showBadge} 
          onClose={() => setShowBadge(null)} 
        />
      )}
    </div>
  );
};

export default GameInterface;
