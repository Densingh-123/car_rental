import React from 'react';
import { motion } from 'framer-motion';
import { Award, TrendingUp, AlertTriangle, Zap, Clock, Shield } from 'lucide-react';

const PerformanceAnalytics = ({ driverId }) => {
  const performanceMetrics = [
    {
      category: 'Safety',
      score: 88,
      trend: 5,
      details: [
        { label: 'Harsh Braking', value: 2, max: 5 },
        { label: 'Overspeeding', value: 3, max: 8 },
        { label: 'Seatbelt Usage', value: 100, max: 100 }
      ]
    },
    {
      category: 'Efficiency',
      score: 85,
      trend: 2,
      details: [
        { label: 'Fuel Economy', value: 15.2, max: 20 },
        { label: 'Idle Time', value: 8, max: 15 },
        { label: 'Route Optimization', value: 92, max: 100 }
      ]
    },
    {
      category: 'Punctuality',
      score: 94,
      trend: 3,
      details: [
        { label: 'On-time Arrival', value: 94, max: 100 },
        { label: 'Trip Duration', value: 88, max: 100 },
        { label: 'Schedule Adherence', value: 96, max: 100 }
      ]
    }
  ];

  const weeklyPerformance = [
    { day: 'Mon', safety: 85, efficiency: 82, punctuality: 90 },
    { day: 'Tue', safety: 88, efficiency: 84, punctuality: 92 },
    { day: 'Wed', safety: 82, efficiency: 80, punctuality: 88 },
    { day: 'Thu', safety: 90, efficiency: 86, punctuality: 94 },
    { day: 'Fri', safety: 87, efficiency: 85, punctuality: 91 },
    { day: 'Sat', safety: 92, efficiency: 88, punctuality: 96 },
    { day: 'Sun', safety: 95, efficiency: 90, punctuality: 98 }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Performance Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {performanceMetrics.map((metric, index) => (
            <motion.div
              key={metric.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-blue-50 rounded-xl p-6 border border-blue-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-900">{metric.category}</h3>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">+{metric.trend}</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <div className={`text-3xl font-bold ${getScoreColor(metric.score)}`}>
                  {metric.score}
                </div>
                <div className="text-sm text-blue-900/70">/100</div>
              </div>

              <div className="space-y-2">
                {metric.details.map((detail, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm text-blue-900/70 mb-1">
                      <span>{detail.label}</span>
                      <span>{detail.value}{typeof detail.value === 'number' && detail.label !== 'Fuel Economy' ? '%' : ''}</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(detail.value / detail.max) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Weekly Performance Chart */}
        <div>
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Weekly Performance Trend</h3>
          <div className="grid grid-cols-7 gap-2">
            {weeklyPerformance.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="text-sm font-semibold text-blue-900 mb-2">{day.day}</div>
                <div className="space-y-1">
                  <div className="text-xs text-green-600">{day.safety}S</div>
                  <div className="text-xs text-blue-600">{day.efficiency}E</div>
                  <div className="text-xs text-purple-600">{day.punctuality}P</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;