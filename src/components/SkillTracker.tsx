
import React from 'react';
import { Card } from '@/components/ui/card';
import { Skills, Level } from '../types/game';

interface SkillTrackerProps {
  skills: Skills;
  xp: number;
  level: Level;
}

const SkillTracker: React.FC<SkillTrackerProps> = ({ skills, xp, level }) => {
  const getStars = (skillLevel: number) => {
    const maxStars = 5;
    const filledStars = Math.min(skillLevel, maxStars);
    return '★'.repeat(filledStars) + '☆'.repeat(maxStars - filledStars);
  };

  return (
    <Card className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Skills Progress */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            📊 Your Skills Progress
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">🔄 Loops</span>
              <span className="text-xl">{getStars(skills.loops)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">📝 Sequencing</span>
              <span className="text-xl">{getStars(skills.sequencing)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">🐛 Debugging</span>
              <span className="text-xl">{getStars(skills.debugging)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">🤔 Conditionals</span>
              <span className="text-xl">{getStars(skills.conditionals)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium text-gray-700">⚙️ Functions</span>
              <span className="text-xl">{getStars(skills.functions)}</span>
            </div>
          </div>
        </div>

        {/* Level Info & XP */}
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            🎯 Level Info
          </h3>
          <div className="bg-white rounded-lg p-4 shadow-inner">
            <div className="mb-4">
              <p className="text-lg font-semibold text-purple-600 mb-2">
                You'll learn:
              </p>
              <div className="flex flex-wrap gap-2">
                {level.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-medium text-gray-700">
                Total XP:
              </span>
              <span className="text-2xl font-bold text-yellow-600">
                {xp} ⭐
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SkillTracker;
