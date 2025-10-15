import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Thermometer, Gauge, Wrench, AlertTriangle, CheckCircle } from 'lucide-react';

const VehicleHealth = ({ vehicleData, liveData }) => {
  const healthMetrics = [
    {
      component: 'Engine',
      status: 'Excellent',
      value: 95,
      color: 'green',
      icon: <Gauge className="w-4 h-4" />
    },
    {
      component: 'Battery',
      status: 'Good',
      value: 88,
      color: 'blue',
      icon: <Battery className="w-4 h-4" />
    },
    {
      component: 'Brakes',
      status: 'Good',
      value: 85,
      color: 'green',
      icon: <AlertTriangle className="w-4 h-4" />
    },
    {
      component: 'Tires',
      status: 'Needs Check',
      value: 72,
      color: 'yellow',
      icon: <Wrench className="w-4 h-4" />
    },
    {
      component: 'Transmission',
      status: 'Excellent',
      value: 92,
      color: 'green',
      icon: <Thermometer className="w-4 h-4" />
    },
    {
      component: 'Suspension',
      status: 'Good',
      value: 84,
      color: 'blue',
      icon: <CheckCircle className="w-4 h-4" />
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Needs Check': return 'text-yellow-600 bg-yellow-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProgressColor = (value) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 80) return 'bg-blue-500';
    if (value >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-bold text-blue-900 mb-4">Vehicle Health</h3>
      
      <div className="space-y-4">
        {healthMetrics.map((metric, index) => (
          <motion.div
            key={metric.component}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'blue' ? 'bg-blue-100' :
                metric.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
              }`}>
                {React.cloneElement(metric.icon, {
                  className: `w-4 h-4 ${
                    metric.color === 'green' ? 'text-green-600' :
                    metric.color === 'blue' ? 'text-blue-600' :
                    metric.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                  }`
                })}
              </div>
              <div>
                <div className="font-semibold text-blue-900 text-sm">{metric.component}</div>
                <div className="text-xs text-blue-900/70">Health: {metric.value}%</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getProgressColor(metric.value)}`}
                  style={{ width: `${metric.value}%` }}
                ></div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(metric.status)}`}>
                {metric.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Maintenance Alert */}
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <span className="text-sm font-semibold text-yellow-800">
            Next service due in 500km
          </span>
        </div>
      </div>
    </div>
  );
};

export default VehicleHealth;