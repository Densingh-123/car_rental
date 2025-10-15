import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Car,
  Users,
  MapPin,
  AlertTriangle,
  Fuel,
  Gauge,
  Battery,
  Navigation,
  FileText,   // ← added
  Settings    // ← added
} from 'lucide-react';

const FleetOverview = ({ vehicles, drivers, fleetStats, recentAlerts, enterpriseData }) => {
  const [liveData, setLiveData] = useState({});

  // Simulate live data updates
  useEffect(() => {
    const interval = setInterval(() => {
      const newData = {};
      vehicles.forEach((vehicle) => {
        if (vehicle.status === 'active') {
          newData[vehicle.id] = {
            speed: Math.floor(Math.random() * 100),
            fuel: Math.max(20, (vehicle.fuelLevel || 100) - Math.random() * 0.1),
            location: {
              lat: 12.9716 + (Math.random() - 0.5) * 0.02,
              lng: 77.5946 + (Math.random() - 0.5) * 0.02,
            },
            timestamp: new Date().toISOString(),
          };
        }
      });
      setLiveData(newData);
    }, 5000);

    return () => clearInterval(interval);
  }, [vehicles]);

  const activeVehicles = vehicles.filter((v) => v.status === 'active');
  const activeDrivers = drivers.filter((d) => d.status === 'active');

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {fleetStats.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-900/70">{stat.label}</p>
                <p className="text-2xl font-extrabold text-blue-900">{stat.value}</p>
                <p
                  className={`text-xs font-semibold ${
                    stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  {stat.change} from last week
                </p>
              </div>
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                  stat.color === 'blue'
                    ? 'bg-blue-100'
                    : stat.color === 'green'
                    ? 'bg-green-100'
                    : stat.color === 'yellow'
                    ? 'bg-yellow-100'
                    : stat.color === 'red'
                    ? 'bg-red-100'
                    : 'bg-purple-100'
                }`}
              >
                {React.cloneElement(stat.icon, {
                  className: `w-6 h-6 ${
                    stat.color === 'blue'
                      ? 'text-blue-600'
                      : stat.color === 'green'
                      ? 'text-green-600'
                      : stat.color === 'yellow'
                      ? 'text-yellow-600'
                      : stat.color === 'red'
                      ? 'text-red-600'
                      : 'text-purple-600'
                  }`,
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Enterprise Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-4">Enterprise Information</h3>
            <div className="space-y-3">
              <InfoItem label="Company Name" value={enterpriseData.name} />
              <InfoItem label="Contact" value={enterpriseData.contact} />
              <InfoItem label="Email" value={enterpriseData.email} />
              <InfoItem label="Address" value={enterpriseData.address} />
              <InfoItem label="Subscription" value={enterpriseData.subscription} />
              <InfoItem label="Active Since" value={enterpriseData.activeSince} />
            </div>
          </motion.div>

          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Recent Alerts</h3>
              <p className="text-sm text-blue-900/70">Latest system notifications</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {recentAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="p-4 border-b border-white/20 hover:bg-white/30 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        alert.severity === 'critical'
                          ? 'bg-red-500'
                          : alert.severity === 'warning'
                          ? 'bg-yellow-500'
                          : 'bg-blue-500'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 text-sm">{alert.message}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-blue-900/70">
                        <span>{alert.vehicle}</span>
                        <span>{alert.driver}</span>
                        <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Middle Column - Active Vehicles */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Active Vehicles</h3>
              <p className="text-sm text-blue-900/70">Currently operating fleet</p>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {activeVehicles.map((vehicle, index) => {
                const data = liveData[vehicle.id];
                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 border-b border-white/20 hover:bg-white/30 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h4 className="font-bold text-blue-900">{vehicle.plateNumber}</h4>
                        <p className="text-sm text-blue-900/70">{vehicle.model}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        Active
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Gauge className="w-3 h-3 text-blue-600" />
                        <span>{data?.speed || 0} km/h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Fuel className="w-3 h-3 text-green-600" />
                        <span>{data?.fuel?.toFixed(1) || 0}%</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Navigation className="w-3 h-3 text-purple-600" />
                        <span>{vehicle.driverName}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* Right Column - Quick Actions & Stats */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-blue-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton
                icon={<Car className="w-4 h-4" />}
                label="Add New Vehicle"
                description="Register a new vehicle to fleet"
                color="blue"
              />
              <ActionButton
                icon={<Users className="w-4 h-4" />}
                label="Add Driver"
                description="Register a new driver"
                color="green"
              />
              <ActionButton
                icon={<FileText className="w-4 h-4" />}
                label="Generate Report"
                description="Create fleet performance report"
                color="purple"
              />
              <ActionButton
                icon={<Settings className="w-4 h-4" />}
                label="Fleet Settings"
                description="Configure fleet parameters"
                color="orange"
              />
            </div>
          </motion.div>

          {/* Fleet Health */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-blue-900 mb-4">Fleet Health</h3>
            <div className="space-y-4">
              <HealthMetric
                label="Vehicle Availability"
                value={((activeVehicles.length / vehicles.length) * 100).toFixed(1)}
                color="green"
              />
              <HealthMetric
                label="Driver Compliance"
                value="94.2"
                color="blue"
              />
              <HealthMetric
                label="Fuel Efficiency"
                value="14.8"
                color="purple"
              />
              <HealthMetric
                label="Maintenance Score"
                value="88.5"
                color="orange"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold text-sm">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

const ActionButton = ({ icon, label, description, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700';
      case 'green':
        return 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700';
      case 'purple':
        return 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700';
      case 'orange':
        return 'bg-orange-50 border-orange-200 hover:bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700';
    }
  };

  return (
    <button
      className={`w-full p-3 rounded-xl border text-left transition-colors ${getColorClasses(
        color
      )}`}
    >
      <div className="flex items-center gap-3">
        {React.cloneElement(icon, { className: 'w-4 h-4' })}
        <div>
          <div className="font-semibold text-sm">{label}</div>
          <div className="text-xs opacity-70">{description}</div>
        </div>
      </div>
    </button>
  );
};

const HealthMetric = ({ label, value, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'green':
        return 'text-green-600';
      case 'blue':
        return 'text-blue-600';
      case 'purple':
        return 'text-purple-600';
      case 'orange':
        return 'text-orange-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-900/70 text-sm font-semibold">{label}</span>
        <span className={`font-bold ${getColorClass(color)}`}>{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClass(color).replace(
            'text',
            'bg'
          )}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FleetOverview;