
import React, { useEffect } from 'react';
import { Badge } from '../types/game';

interface BadgePopupProps {
  badge: Badge;
  onClose: () => void;
}

const BadgePopup: React.FC<BadgePopupProps> = ({ badge, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl p-8 max-w-md mx-4 text-center shadow-2xl animate-scale-in">
        <div className="text-8xl mb-4 animate-bounce">🏆</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Badge Earned!
        </h2>
        <h3 className="text-2xl font-bold text-purple-600 mb-4">
          {badge.name}
        </h3>
        <p className="text-gray-600 mb-4">
          Skill: {badge.skill}
        </p>
        <div className="bg-yellow-100 rounded-lg p-4 mb-6">
          <p className="text-lg font-semibold text-yellow-800">
            +{badge.xp} XP Bonus! ⭐
          </p>
        </div>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-bold text-lg hover:scale-105 transform transition-all shadow-lg"
        >
          Awesome! 🎉
        </button>
      </div>
    </div>
  );
};

export default BadgePopup;
