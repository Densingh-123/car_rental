// src/components/AlertPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Info, XCircle, CheckCircle } from 'lucide-react';

const AlertPanel = ({ alerts, showHeader = true }) => {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-green-50 border-green-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border">
      {showHeader && (
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Alerts & Notifications</h2>
          <p className="text-gray-600">Real-time alerts from your vehicle</p>
        </div>
      )}
      
      <div className="divide-y">
        {alerts.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-4 ${getSeverityColor(alert.severity)} border-l-4 ${
              alert.severity === 'critical' ? 'border-l-red-500' :
              alert.severity === 'warning' ? 'border-l-yellow-500' :
              alert.severity === 'info' ? 'border-l-blue-500' : 'border-l-green-500'
            }`}
          >
            <div className="flex items-start gap-3">
              {getSeverityIcon(alert.severity)}
              <div className="flex-1">
                <p className="font-medium text-gray-900">{alert.message}</p>
                <p className="text-sm text-gray-600 mt-1">
                  {alert.timestamp.toLocaleString()}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
        
        {alerts.length === 0 && (
          <div className="p-8 text-center">
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
            <p className="text-gray-600">No alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlertPanel;