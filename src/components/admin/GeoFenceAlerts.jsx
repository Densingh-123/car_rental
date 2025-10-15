import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, MapPin, Bell, MessageSquare, Phone, Clock, Car, Navigation } from 'lucide-react';

const GeoFenceAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [settings, setSettings] = useState({
    pushEnabled: true,
    smsEnabled: true,
    emailEnabled: false,
    speedThreshold: 80,
    boundaryCheck: true
  });

  // Simulate geo-fence alerts
  useEffect(() => {
    const sampleAlerts = [
      {
        id: 1,
        type: 'boundary_breach',
        vehicle: 'KA01AB1234',
        driver: 'Raj Kumar',
        message: 'Vehicle exited designated boundary zone',
        location: { lat: 12.9789, lng: 77.5912 },
        boundary: 'Bangalore City Limits',
        timestamp: new Date(Date.now() - 5 * 60000).toISOString(),
        severity: 'high',
        status: 'new',
        notified: ['push', 'sms']
      },
      {
        id: 2,
        type: 'overspeeding',
        vehicle: 'KA01CD5678',
        driver: 'John Smith',
        message: 'Vehicle exceeding speed limit by 25km/h',
        speed: 105,
        limit: 80,
        location: { lat: 12.9712, lng: 77.5923 },
        timestamp: new Date(Date.now() - 15 * 60000).toISOString(),
        severity: 'medium',
        status: 'acknowledged',
        notified: ['push']
      },
      {
        id: 3,
        type: 'boundary_breach',
        vehicle: 'KA01EF9012',
        driver: 'Priya Sharma',
        message: 'Vehicle entered restricted area',
        location: { lat: 12.9654, lng: 77.5887 },
        boundary: 'Corporate Zone',
        timestamp: new Date(Date.now() - 25 * 60000).toISOString(),
        severity: 'high',
        status: 'resolved',
        notified: ['push', 'sms']
      }
    ];
    setAlerts(sampleAlerts);

    // Simulate new alerts
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const newAlert = {
          id: Date.now(),
          type: Math.random() > 0.5 ? 'boundary_breach' : 'overspeeding',
          vehicle: `KA01${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          driver: ['Raj Kumar', 'John Smith', 'Priya Sharma'][Math.floor(Math.random() * 3)],
          message: Math.random() > 0.5 ? 'Vehicle exited designated boundary' : 'Overspeeding detected',
          location: {
            lat: 12.9716 + (Math.random() - 0.5) * 0.02,
            lng: 77.5946 + (Math.random() - 0.5) * 0.02
          },
          timestamp: new Date().toISOString(),
          severity: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
          status: 'new',
          notified: ['push']
        };
        setAlerts(prev => [newAlert, ...prev]);
      }
    }, 30000);

    return () => clearInterval(interval);
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Geo-Fence Alerts</h2>
          <p className="text-blue-900/70">Instant boundary breach push + SMS notifications</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-lg">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-sm font-semibold">{alerts.filter(a => a.status === 'new').length} New Alerts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Alert Settings */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Alert Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-blue-900">Push Notifications</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.pushEnabled}
                    onChange={(e) => setSettings({...settings, pushEnabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-blue-900">SMS Alerts</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={settings.smsEnabled}
                    onChange={(e) => setSettings({...settings, smsEnabled: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-purple-600" />
                  <span className="font-semibold text-blue-900">Speed Threshold</span>
                </div>
                <select
                  value={settings.speedThreshold}
                  onChange={(e) => setSettings({...settings, speedThreshold: Number(e.target.value)})}
                  className="px-3 py-1 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value={60}>60 km/h</option>
                  <option value={80}>80 km/h</option>
                  <option value={100}>100 km/h</option>
                  <option value={120}>120 km/h</option>
                </select>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Alert Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Total Alerts Today" value={alerts.length} color="text-blue-600" />
              <StatItem label="Boundary Breaches" value={alerts.filter(a => a.type === 'boundary_breach').length} color="text-red-600" />
              <StatItem label="Overspeeding" value={alerts.filter(a => a.type === 'overspeeding').length} color="text-yellow-600" />
              <StatItem label="Avg Response Time" value="2.3 min" color="text-green-600" />
            </div>
          </div>
        </div>

        {/* Alerts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20 flex items-center justify-between">
              <h3 className="font-bold text-blue-900">Recent Alerts</h3>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold">
                  All
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                  New
                </button>
                <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-semibold">
                  Resolved
                </button>
              </div>
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
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(alert.status)}`} />
                      <div className="flex items-center gap-2">
                        <Car className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-blue-900">{alert.vehicle}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                        {alert.severity}
                      </span>
                    </div>
                    <span className="text-sm text-blue-900/60">
                      {new Date(alert.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <p className="text-blue-900 mb-2">{alert.message}</p>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4 text-blue-900/70">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span>Lat: {alert.location.lat.toFixed(4)}, Lng: {alert.location.lng.toFixed(4)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>{alert.driver}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {alert.status === 'new' && (
                        <>
                          <button
                            onClick={() => handleAcknowledge(alert.id)}
                            className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg text-sm font-semibold hover:bg-yellow-200 transition"
                          >
                            Acknowledge
                          </button>
                          <button
                            onClick={() => handleResolve(alert.id)}
                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition"
                          >
                            Resolve
                          </button>
                        </>
                      )}
                      {alert.status === 'acknowledged' && (
                        <button
                          onClick={() => handleResolve(alert.id)}
                          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition"
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

const StatItem = ({ label, value, color }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className={`font-bold ${color}`}>{value}</span>
  </div>
);

export default GeoFenceAlerts;