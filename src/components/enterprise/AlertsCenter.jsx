import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Filter, CheckCircle, Car, Users, MapPin } from 'lucide-react';

const AlertsCenter = ({ vehicles, drivers }) => {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState('all');
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false
  });

  useEffect(() => {
    // Simulate alerts data
    const sampleAlerts = [
      {
        id: 1,
        type: 'overspeed',
        vehicle: 'KA01AB1234',
        driver: 'Raj Kumar',
        message: 'Vehicle exceeding speed limit by 25km/h',
        location: 'MG Road, Bangalore',
        speed: 105,
        limit: 80,
        severity: 'high',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        status: 'new'
      },
      {
        id: 2,
        type: 'harsh_braking',
        vehicle: 'KA01CD5678',
        driver: 'Suresh P',
        message: 'Harsh braking detected',
        location: 'Electronic City',
        severity: 'medium',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'acknowledged'
      },
      {
        id: 3,
        type: 'geo_fence',
        vehicle: 'KA01EF9012',
        driver: 'Mohan R',
        message: 'Vehicle entered restricted area',
        location: 'Corporate Zone',
        severity: 'high',
        timestamp: new Date(Date.now() - 900000).toISOString(),
        status: 'new'
      },
      {
        id: 4,
        type: 'maintenance',
        vehicle: 'KA01GH3456',
        driver: 'Anita S',
        message: 'Maintenance due in 200km',
        severity: 'low',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'resolved'
      }
    ];
    setAlerts(sampleAlerts);
  }, []);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'new': return 'bg-green-500';
      case 'acknowledged': return 'bg-yellow-500';
      case 'resolved': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const handleAcknowledge = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'acknowledged' } : alert
    ));
  };

  const handleResolve = (alertId) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  };

  const filteredAlerts = filter === 'all' 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Alerts Center</h2>
          <p className="text-blue-900/70">Monitor and manage fleet alerts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-lg">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {alerts.filter(a => a.status === 'new').length} New Alerts
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Alert Settings & Stats */}
        <div className="space-y-6">
          {/* Alert Settings */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Alert Settings</h3>
            <div className="space-y-4">
              <SettingToggle
                label="Push Notifications"
                enabled={settings.pushNotifications}
                onChange={(val) => setSettings({...settings, pushNotifications: val})}
              />
              <SettingToggle
                label="Email Alerts"
                enabled={settings.emailAlerts}
                onChange={(val) => setSettings({...settings, emailAlerts: val})}
              />
              <SettingToggle
                label="SMS Alerts"
                enabled={settings.smsAlerts}
                onChange={(val) => setSettings({...settings, smsAlerts: val})}
              />
            </div>
          </div>

          {/* Alert Statistics */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Alert Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Total Alerts Today" value={alerts.length} />
              <StatItem label="High Priority" value={alerts.filter(a => a.severity === 'high').length} />
              <StatItem label="Unacknowledged" value={alerts.filter(a => a.status === 'new').length} />
              <StatItem label="Avg Response Time" value="8.2 min" />
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-blue-900">All Alerts</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      filter === 'all' ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setFilter('high')}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      filter === 'high' ? 'bg-red-600 text-white' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    High
                  </button>
                  <button
                    onClick={() => setFilter('medium')}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      filter === 'medium' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    Medium
                  </button>
                </div>
              </div>
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {filteredAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-white/20 hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${getStatusColor(alert.status)}`} />
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="text-sm text-blue-900/70">{alert.type.replace('_', ' ')}</span>
                        </div>
                        <p className="font-semibold text-blue-900 text-sm mb-1">{alert.message}</p>
                        <div className="flex items-center gap-4 text-xs text-blue-900/70">
                          <div className="flex items-center gap-1">
                            <Car className="w-3 h-3" />
                            <span>{alert.vehicle}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            <span>{alert.driver}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs text-blue-900/60">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    {alert.speed && (
                      <div className="text-sm text-blue-900/70">
                        Speed: <span className="font-semibold">{alert.speed} km/h</span> 
                        (Limit: {alert.limit} km/h)
                      </div>
                    )}
                    <div className="flex gap-2">
                      {alert.status === 'new' && (
                        <>
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition flex items-center gap-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                            Acknowledge
                          </button>
                          <button
                            onClick={() => handleResolve(alert.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition flex items-center gap-1"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition flex items-center gap-1"
                        >
                          Mark Resolved
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingToggle = ({ label, enabled, onChange }) => (
  <div className="flex items-center justify-between">
    <span className="text-sm font-semibold text-blue-900">{label}</span>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default AlertsCenter;