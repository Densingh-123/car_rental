// src/components/DrivingScore.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp } from 'lucide-react';

const DrivingScore = ({ score = 85 }) => {
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Good';
    if (score >= 70) return 'Average';
    return 'Needs Improvement';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Driving Score</h3>
        <Award className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="text-center mb-4">
        <div className="relative inline-block">
          <div className="w-32 h-32 rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-3xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-gray-500">/100</div>
            </div>
          </div>
          <div 
            className="absolute top-0 left-0 w-32 h-32 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 transform -rotate-45"
            style={{
              clipPath: `inset(0 0 ${100 - score}% 0)`
            }}
          ></div>
        </div>
      </div>

      <div className="text-center">
        <p className={`text-lg font-semibold ${getScoreColor(score)} mb-2`}>
          {getScoreLevel(score)}
        </p>
        <p className="text-sm text-gray-600 flex items-center justify-center gap-1">
          <TrendingUp className="w-4 h-4 text-green-500" />
          +5 points from last week
        </p>
      </div>
    </motion.div>
  );
};

export default DrivingScore;