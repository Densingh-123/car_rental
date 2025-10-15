import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Bell, Filter, CheckCircle, MapPin, Clock } from 'lucide-react';

const AlertsCenter = ({ alerts }) => {
  const [filter, setFilter] = useState('all');
  const [alertSettings, setAlertSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    smsAlerts: false,
    overspeedAlerts: true,
    geoFenceAlerts: true,
    maintenanceAlerts: true
  });

  const alertTypes = [
    { type: 'overspeed', label: 'Overspeeding', count: 12, color: 'red' },
    { type: 'harsh_braking', label: 'Harsh Braking', count: 8, color: 'orange' },
    { type: 'geo_fence', label: 'Geo-fence Breach', count: 3, color: 'purple' },
    { type: 'maintenance', label: 'Maintenance', count: 5, color: 'blue' }
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical': return 'text-red-600 bg-red-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'info': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'info': return <Bell className="w-4 h-4 text-blue-600" />;
      default: return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Alerts Center</h2>
          <p className="text-blue-900/70">Monitor and manage vehicle alerts</p>
        </div>
        <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-lg">
          <Bell className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {alerts.filter(a => a.severity === 'warning' || a.severity === 'critical').length} Active Alerts
          </span>
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
                enabled={alertSettings.pushNotifications}
                onChange={(val) => setAlertSettings({...alertSettings, pushNotifications: val})}
              />
              <SettingToggle
                label="Email Alerts"
                enabled={alertSettings.emailAlerts}
                onChange={(val) => setAlertSettings({...alertSettings, emailAlerts: val})}
              />
              <SettingToggle
                label="SMS Alerts"
                enabled={alertSettings.smsAlerts}
                onChange={(val) => setAlertSettings({...alertSettings, smsAlerts: val})}
              />
            </div>
          </div>

          {/* Alert Types */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Alert Types</h3>
            <div className="space-y-3">
              {alertTypes.map((type, index) => (
                <div key={type.type} className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-blue-900">{type.label}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    type.color === 'red' ? 'bg-red-100 text-red-800' :
                    type.color === 'orange' ? 'bg-orange-100 text-orange-800' :
                    type.color === 'purple' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {type.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="font-bold text-blue-900">Recent Alerts</h3>
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
                    onClick={() => setFilter('warning')}
                    className={`px-3 py-1 rounded-lg text-sm font-semibold ${
                      filter === 'warning' ? 'bg-yellow-600 text-white' : 'bg-yellow-100 text-yellow-700'
                    }`}
                  >
                    Warnings
                  </button>
                </div>
              </div>
              <Filter className="w-4 h-4 text-blue-600" />
            </div>
            <div className="max-h-96 overflow-y-auto">
              {alerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 border-b border-white/20 hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-red-50">
                        {getSeverityIcon(alert.severity)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                          <span className="text-sm text-blue-900/70">{alert.type.replace('_', ' ')}</span>
                        </div>
                        <p className="font-semibold text-blue-900 text-sm">{alert.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-900/60">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-blue-900/70">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(alert.timestamp).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      <span>MG Road, Bangalore</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Mark Read
                    </button>
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition">
                      View Details
                    </button>
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

export default AlertsCenter;