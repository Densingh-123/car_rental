import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Fuel, Car, Users, DollarSign, Award } from 'lucide-react';

const AnalyticsDashboard = ({ vehicles, drivers }) => {
  const analyticsData = {
    fleetPerformance: {
      availability: 94.2,
      utilization: 78.5,
      efficiency: 14.8,
      compliance: 92.1
    },
    monthlyStats: {
      revenue: 245000,
      distance: 12450,
      trips: 345,
      fuel: 8450
    },
    driverPerformance: [
      { name: 'Raj Kumar', score: 92, trips: 45, efficiency: 15.2 },
      { name: 'Suresh P', score: 88, trips: 38, efficiency: 14.8 },
      { name: 'Mohan R', score: 85, trips: 42, efficiency: 14.2 },
      { name: 'Anita S', score: 95, trips: 48, efficiency: 16.1 }
    ],
    vehicleUtilization: [
      { vehicle: 'KA01AB1234', utilization: 85, trips: 32, distance: 2450 },
      { vehicle: 'KA01CD5678', utilization: 78, trips: 28, distance: 1980 },
      { vehicle: 'KA01EF9012', utilization: 92, trips: 41, distance: 3120 },
      { vehicle: 'KA01GH3456', utilization: 65, trips: 24, distance: 1650 }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Analytics Dashboard</h2>
          <p className="text-blue-900/70">Comprehensive fleet performance insights</p>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
          <BarChart3 className="w-4 h-4" />
          <span className="text-sm font-semibold">Real-time Analytics</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Key Metrics */}
        {[
          { label: 'Monthly Revenue', value: '₹2.45L', change: '+12%', icon: DollarSign, color: 'green' },
          { label: 'Total Distance', value: '12,450 km', change: '+8%', icon: Car, color: 'blue' },
          { label: 'Trips Completed', value: '345', change: '+15%', icon: TrendingUp, color: 'purple' },
          { label: 'Fuel Consumed', value: '8,450 L', change: '-3%', icon: Fuel, color: 'orange' }
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-900/70">{metric.label}</p>
                <p className="text-2xl font-extrabold text-blue-900">{metric.value}</p>
                <p className={`text-xs font-semibold ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {metric.change} from last month
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                metric.color === 'green' ? 'bg-green-100' :
                metric.color === 'blue' ? 'bg-blue-100' :
                metric.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'
              }`}>
                <metric.icon className={`w-6 h-6 ${
                  metric.color === 'green' ? 'text-green-600' :
                  metric.color === 'blue' ? 'text-blue-600' :
                  metric.color === 'purple' ? 'text-purple-600' : 'text-orange-600'
                }`} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fleet Performance */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-6">Fleet Performance</h3>
          <div className="space-y-4">
            {Object.entries(analyticsData.fleetPerformance).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-blue-900 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="font-bold text-blue-900">{value}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${value}%` }}
                  ></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Driver Performance */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-6">Top Driver Performance</h3>
          <div className="space-y-4">
            {analyticsData.driverPerformance.map((driver, index) => (
              <motion.div
                key={driver.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-900">{driver.name}</div>
                    <div className="text-sm text-blue-900/70">{driver.trips} trips</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-yellow-500" />
                    <span className="font-bold text-blue-900">{driver.score}</span>
                  </div>
                  <div className="text-sm text-blue-900/70">{driver.efficiency} km/l</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Utilization */}
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-6">Vehicle Utilization</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {analyticsData.vehicleUtilization.map((vehicle, index) => (
            <motion.div
              key={vehicle.vehicle}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-blue-50 rounded-xl p-4 border border-blue-200"
            >
              <div className="text-center mb-3">
                <div className="font-bold text-blue-900 text-sm mb-1">{vehicle.vehicle}</div>
                <div className="text-2xl font-extrabold text-blue-900">{vehicle.utilization}%</div>
                <div className="text-xs text-blue-900/70">Utilization</div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="text-center">
                  <div className="font-semibold text-blue-900">{vehicle.trips}</div>
                  <div className="text-blue-900/70">Trips</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold text-blue-900">{vehicle.distance}</div>
                  <div className="text-blue-900/70">km</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;