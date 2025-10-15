import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, AlertTriangle, CheckCircle, Clock, Car, MapPin } from 'lucide-react';

const AlertsNotifications = ({ driverId }) => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'harsh_braking',
      title: 'Harsh Braking Detected',
      message: 'Sudden brake application detected near MG Road',
      severity: 'high',
      time: '2024-01-15T10:30:00Z',
      location: 'MG Road, Bangalore',
      acknowledged: false
    },
    {
      id: 2,
      type: 'overspeeding',
      title: 'Speed Limit Exceeded',
      message: 'Vehicle speed exceeded limit by 15km/h on Highway',
      severity: 'medium',
      time: '2024-01-15T09:15:00Z',
      location: 'NH44, Bangalore',
      acknowledged: true
    },
    {
      id: 3,
      type: 'maintenance',
      title: 'Maintenance Reminder',
      message: 'Next service due in 500km',
      severity: 'low',
      time: '2024-01-14T16:45:00Z',
      location: 'System',
      acknowledged: false
    },
    {
      id: 4,
      type: 'fuel',
      title: 'Low Fuel Warning',
      message: 'Fuel level below 25%. Consider refueling soon.',
      severity: 'medium',
      time: '2024-01-14T14:20:00Z',
      location: 'System',
      acknowledged: true
    }
  ]);

  const handleAcknowledge = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'low': return <Bell className="w-4 h-4" />;
      default: return <Bell className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Alerts & Notifications</h2>
          <p className="text-blue-900/70">Stay updated with important notifications</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {alerts.filter(a => !a.acknowledged).length} Unread
          </span>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h3 className="font-bold text-blue-900">Recent Alerts</h3>
        </div>
        <div className="divide-y divide-white/20">
          {alerts.map((alert, index) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 hover:bg-white/30 transition-colors ${!alert.acknowledged ? 'bg-yellow-50/50' : ''}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    alert.severity === 'high' ? 'bg-red-100 text-red-600' :
                    alert.severity === 'medium' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {getSeverityIcon(alert.severity)}
                  </div>
                  <div>
                    <h4 className="font-bold text-blue-900">{alert.title}</h4>
                    <p className="text-blue-900/70 text-sm">{alert.message}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4 text-blue-900/70">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(alert.time).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    <span>{alert.location}</span>
                  </div>
                </div>

                {!alert.acknowledged && (
                  <button
                    onClick={() => handleAcknowledge(alert.id)}
                    className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Acknowledge
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AlertsNotifications;