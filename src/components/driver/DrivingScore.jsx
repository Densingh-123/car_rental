import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, AlertTriangle, Zap } from 'lucide-react';

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

  const getScoreMessage = (score) => {
    if (score >= 90) return 'Outstanding driving performance!';
    if (score >= 80) return 'Good job, keep it up!';
    if (score >= 70) return 'Room for improvement.';
    return 'Focus on safe driving practices.';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-blue-900">Driving Score</h3>
          <p className="text-blue-900/70">Your current performance rating</p>
        </div>
        <Award className="w-6 h-6 text-yellow-500" />
      </div>
      
      <div className="text-center mb-6">
        <div className="relative inline-block mb-4">
          <div className="w-40 h-40 rounded-full border-8 border-gray-200 flex items-center justify-center">
            <div className="text-center">
              <div className={`text-4xl font-bold ${getScoreColor(score)}`}>
                {score}
              </div>
              <div className="text-sm text-gray-500">/100</div>
            </div>
          </div>
          <div 
            className="absolute top-0 left-0 w-40 h-40 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500 transform -rotate-45"
            style={{
              clipPath: `inset(0 0 ${100 - score}% 0)`
            }}
          ></div>
        </div>

        <div>
          <p className={`text-xl font-semibold ${getScoreColor(score)} mb-2`}>
            {getScoreLevel(score)}
          </p>
          <p className="text-blue-900/70">{getScoreMessage(score)}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-green-500" />
          <span>+5 from last week</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-500" />
          <span>2 incidents this week</span>
        </div>
      </div>
    </motion.div>
  );
};

export default DrivingScore;