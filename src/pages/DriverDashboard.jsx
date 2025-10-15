// src/pages/DriverDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  Award, 
  Clock, 
  Zap,
  AlertTriangle,
  Play,
  Square
} from 'lucide-react';
import MapComponent from '../components/MapComponent';
const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnTrip, setIsOnTrip] = useState(false);
  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'trips', label: 'My Trips', icon: <MapPin className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Award className="w-4 h-4" /> }
  ];
  const driverStats = [
    { label: 'Today\'s Trips', value: '3', icon: <Car className="w-6 h-6" />, color: 'blue' },
    { label: 'Driving Score', value: '88/100', icon: <Award className="w-6 h-6" />, color: 'green' },
    { label: 'Total Hours', value: '6.5h', icon: <Clock className="w-6 h-6" />, color: 'purple' },
    { label: 'Fuel Efficiency', value: '15.2 km/l', icon: <Zap className="w-6 h-6" />, color: 'yellow' }
  ];

  const recentTrips = [
    { id: 1, date: '2024-01-15', start: 'Bangalore', end: 'Chennai', distance: '350 km', duration: '6h 30m', score: 92 },
    { id: 2, date: '2024-01-14', start: 'Bangalore', end: 'Mysore', distance: '150 km', duration: '3h 15m', score: 85 },
    { id: 3, date: '2024-01-13', start: 'Bangalore', end: 'Hyderabad', distance: '570 km', duration: '9h 45m', score: 88 }
  ];

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Driver Dashboard</h1>
              <p className="text-gray-600">Welcome back, Raj Kumar!</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsOnTrip(!isOnTrip)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  isOnTrip
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {isOnTrip ? <Square className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isOnTrip ? 'End Trip' : 'Start Trip'}
              </button>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {driverStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 ${
                      stat.color === 'blue' ? 'bg-blue-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
                    } rounded-full flex items-center justify-center`}>
                      {React.cloneElement(stat.icon, {
                        className: `w-6 h-6 ${
                          stat.color === 'blue' ? 'text-blue-600' :
                          stat.color === 'green' ? 'text-green-600' :
                          stat.color === 'purple' ? 'text-purple-600' : 'text-yellow-600'
                        }`
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Trip Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Current Location</h3>
                  <p className="text-gray-600">Real-time tracking</p>
                </div>
                <div className="h-80">
                  <MapComponent 
                    center={[12.9716, 77.5946]}
                    markers={[{ lat: 12.9716, lng: 77.5946, vehicle: { name: 'Your Vehicle' } }]}
                  />
                </div>
              </motion.div>

              {/* Performance Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Safety Score</span>
                      <span className="text-sm font-bold text-green-600">88/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">Fuel Efficiency</span>
                      <span className="text-sm font-bold text-blue-600">15.2 km/l</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">On-time Performance</span>
                      <span className="text-sm font-bold text-purple-600">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Trips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Trips</h3>
                <p className="text-gray-600">Your last 3 trips</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Route
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Distance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Duration
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {recentTrips.map((trip) => (
                      <tr key={trip.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {trip.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{trip.start}</div>
                          <div className="text-sm text-gray-500">to {trip.end}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {trip.distance}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {trip.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-sm font-bold ${getScoreColor(trip.score)}`}>
                            {trip.score}/100
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverDashboard;