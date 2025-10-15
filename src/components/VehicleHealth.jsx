// src/components/VehicleHealth.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Battery, Thermometer, Zap, Wifi } from 'lucide-react';

const VehicleHealth = () => {
  const healthMetrics = [
    { label: 'Battery', value: '85%', icon: <Battery className="w-5 h-5" />, color: 'green' },
    { label: 'Engine Temp', value: '82°C', icon: <Thermometer className="w-5 h-5" />, color: 'blue' },
    { label: 'Fuel Level', value: '65%', icon: <Zap className="w-5 h-5" />, color: 'yellow' },
    { label: 'Signal', value: 'Strong', icon: <Wifi className="w-5 h-5" />, color: 'purple' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Vehicle Health</h3>
      <div className="grid grid-cols-2 gap-4">
        {healthMetrics.map((metric, index) => (
          <div key={metric.label} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
              metric.color === 'green' ? 'bg-green-100' :
              metric.color === 'blue' ? 'bg-blue-100' :
              metric.color === 'yellow' ? 'bg-yellow-100' : 'bg-purple-100'
            }`}>
              {React.cloneElement(metric.icon, {
                className: `w-5 h-5 ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  metric.color === 'yellow' ? 'text-yellow-600' : 'text-purple-600'
                }`
              })}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">{metric.label}</p>
              <p className="text-lg font-bold text-gray-900">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default VehicleHealth;