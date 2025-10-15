import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, AlertTriangle, Award, Shield, Clock, Gauge, Zap } from 'lucide-react';

const AIDriverScore = ({ vehicles }) => {
  const [driverScores, setDriverScores] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);

  useEffect(() => {
    // Simulate AI driver scores with behavior analysis
    const scores = vehicles.map(vehicle => {
      const baseScore = 85 + Math.random() * 15;
      const harshEvents = Math.floor(Math.random() * 5);
      const speedingEvents = Math.floor(Math.random() * 8);
      const smoothScore = 90 + Math.random() * 10;
      
      return {
        id: vehicle.id,
        driverName: vehicle.driverName,
        vehicle: vehicle.plateNumber,
        overallScore: Math.round(baseScore - harshEvents * 2 - speedingEvents * 1.5),
        behaviorScore: Math.round(baseScore - harshEvents * 3),
        safetyScore: Math.round(baseScore - speedingEvents * 2),
        smoothScore: Math.round(smoothScore),
        harshBraking: harshEvents,
        overspeeding: speedingEvents,
        rapidAcceleration: Math.floor(Math.random() * 3),
        seatbeltUsage: Math.random() > 0.1 ? 100 : 0,
        lastTripDistance: (10 + Math.random() * 90).toFixed(1),
        riskLevel: baseScore > 90 ? 'low' : baseScore > 80 ? 'medium' : 'high',
        trends: {
          week: (Math.random() - 0.5) * 10,
          month: (Math.random() - 0.3) * 8
        },
        lastUpdated: new Date().toISOString()
      };
    });
    setDriverScores(scores);
  }, [vehicles]);

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'low': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'high': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    if (score >= 70) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">AI Driver Score</h2>
          <p className="text-blue-900/70">Behavior analysis & risk predictions</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
            <Brain className="w-4 h-4" />
            <span className="text-sm font-semibold">AI Powered</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drivers List */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Driver Performance</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {driverScores.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedDriver?.id === driver.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-white/50 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-blue-900">{driver.driverName}</h4>
                      <p className="text-sm text-blue-900/70">{driver.vehicle}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRiskColor(driver.riskLevel)}`}>
                      {driver.riskLevel.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className={`w-4 h-4 ${getScoreColor(driver.overallScore)}`} />
                      <span className={`text-lg font-bold ${getScoreColor(driver.overallScore)}`}>
                        {driver.overallScore}
                      </span>
                    </div>
                    <div className="text-right text-sm text-blue-900/70">
                      <div className="flex items-center gap-1">
                        {driver.trends.week > 0 ? (
                          <TrendingUp className="w-3 h-3 text-green-600" />
                        ) : (
                          <TrendingUp className="w-3 h-3 text-red-600 rotate-180" />
                        )}
                        <span>{Math.abs(driver.trends.week).toFixed(1)}% this week</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Driver Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedDriver ? (
            <>
              {/* Overall Score */}
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{selectedDriver.driverName}</h3>
                    <p className="text-blue-900/70">Vehicle: {selectedDriver.vehicle}</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${getScoreColor(selectedDriver.overallScore)}`}>
                      {selectedDriver.overallScore}
                    </div>
                    <div className="text-sm text-blue-900/70">Overall Score</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <ScoreCard
                    label="Behavior"
                    score={selectedDriver.behaviorScore}
                    icon={<Brain className="w-4 h-4" />}
                  />
                  <ScoreCard
                    label="Safety"
                    score={selectedDriver.safetyScore}
                    icon={<Shield className="w-4 h-4" />}
                  />
                  <ScoreCard
                    label="Smoothness"
                    score={selectedDriver.smoothScore}
                    icon={<Zap className="w-4 h-4" />}
                  />
                  <ScoreCard
                    label="Compliance"
                    score={selectedDriver.seatbeltUsage}
                    icon={<Award className="w-4 h-4" />}
                  />
                </div>

                {/* Risk Factors */}
                <div className="border-t border-blue-200 pt-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Risk Factors</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <RiskFactor
                      label="Harsh Braking"
                      value={selectedDriver.harshBraking}
                      max={5}
                      color="red"
                    />
                    <RiskFactor
                      label="Overspeeding"
                      value={selectedDriver.overspeeding}
                      max={8}
                      color="yellow"
                    />
                    <RiskFactor
                      label="Rapid Acceleration"
                      value={selectedDriver.rapidAcceleration}
                      max={3}
                      color="orange"
                    />
                  </div>
                </div>
              </div>

              {/* Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Performance Trends</h4>
                  <div className="space-y-3">
                    <TrendItem
                      label="Weekly Change"
                      value={selectedDriver.trends.week}
                      isPositive={selectedDriver.trends.week > 0}
                    />
                    <TrendItem
                      label="Monthly Change"
                      value={selectedDriver.trends.month}
                      isPositive={selectedDriver.trends.month > 0}
                    />
                    <TrendItem
                      label="Last Trip Distance"
                      value={`${selectedDriver.lastTripDistance} km`}
                      isPositive={true}
                    />
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">AI Recommendations</h4>
                  <div className="space-y-3">
                    {selectedDriver.overspeeding > 5 && (
                      <Recommendation
                        icon={<Gauge className="w-4 h-4" />}
                        text="Reduce speeding incidents"
                        priority="high"
                      />
                    )}
                    {selectedDriver.harshBraking > 3 && (
                      <Recommendation
                        icon={<AlertTriangle className="w-4 h-4" />}
                        text="Improve braking smoothness"
                        priority="medium"
                      />
                    )}
                    {selectedDriver.seatbeltUsage < 100 && (
                      <Recommendation
                        icon={<Shield className="w-4 h-4" />}
                        text="Ensure seatbelt usage"
                        priority="high"
                      />
                    )}
                    {selectedDriver.overallScore >= 90 && (
                      <Recommendation
                        icon={<Award className="w-4 h-4" />}
                        text="Excellent performance maintained"
                        priority="low"
                      />
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <Brain className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Driver</h3>
              <p className="text-blue-900/70">Choose a driver from the list to view detailed AI analysis and behavior scores</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({ label, score, icon }) => (
  <div className="bg-blue-50 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: `w-5 h-5 ${getScoreColor(score)}` })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className={`text-xl font-bold ${getScoreColor(score)}`}>{score}</div>
  </div>
);

const RiskFactor = ({ label, value, max, color }) => {
  const percentage = (value / max) * 100;
  const getColorClass = (color) => {
    switch (color) {
      case 'red': return 'bg-red-500';
      case 'yellow': return 'bg-yellow-500';
      case 'orange': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="text-center">
      <div className="text-sm font-semibold text-blue-900 mb-2">{label}</div>
      <div className="text-2xl font-bold text-blue-900 mb-2">{value}</div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClass(color)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const TrendItem = ({ label, value, isPositive }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70">{label}</span>
    <div className="flex items-center gap-1">
      {isPositive ? (
        <TrendingUp className="w-4 h-4 text-green-600" />
      ) : (
        <TrendingUp className="w-4 h-4 text-red-600 rotate-180" />
      )}
      <span className={`font-semibold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {typeof value === 'number' ? `${value > 0 ? '+' : ''}${value.toFixed(1)}%` : value}
      </span>
    </div>
  </div>
);

const Recommendation = ({ icon, text, priority }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-white/50">
      {React.cloneElement(icon, { className: 'w-4 h-4 text-blue-600' })}
      <span className="flex-1 text-sm text-blue-900">{text}</span>
      <span className={`px-2 py-1 rounded text-xs font-semibold ${getPriorityColor(priority)}`}>
        {priority}
      </span>
    </div>
  );
};

// Helper function for score colors
const getScoreColor = (score) => {
  if (score >= 90) return 'text-green-600';
  if (score >= 80) return 'text-yellow-600';
  if (score >= 70) return 'text-orange-600';
  return 'text-red-600';
};

export default AIDriverScore;