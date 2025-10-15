// src/pages/EnterpriseDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Car, 
  Users, 
  MapPin, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Settings,
  Plus
} from 'lucide-react';
import MapComponent from '../components/MapComponent';
import AlertPanel from '../components/AlertPanel';

const EnterpriseDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Fleet Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'vehicles', label: 'Vehicles', icon: <Car className="w-4 h-4" /> },
    { id: 'drivers', label: 'Drivers', icon: <Users className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <DollarSign className="w-4 h-4" /> }
  ];

  const fleetStats = [
    { label: 'Total Vehicles', value: '24', change: '+2', color: 'blue' },
    { label: 'Active Now', value: '18', change: '+3', color: 'green' },
    { label: 'In Maintenance', value: '3', change: '-1', color: 'yellow' },
    { label: 'Needs Attention', value: '2', change: '+1', color: 'red' }
  ];

  const vehicles = [
    { id: 'VH001', name: 'Delivery Van 1', driver: 'Raj Kumar', status: 'active', speed: 45, location: 'Bangalore' },
    { id: 'VH002', name: 'Delivery Van 2', driver: 'Suresh P', status: 'active', speed: 38, location: 'Chennai' },
    { id: 'VH003', name: 'Truck 1', driver: 'Mohan R', status: 'maintenance', speed: 0, location: 'Depot' },
    { id: 'VH004', name: 'Car 1', driver: 'Anita S', status: 'idle', speed: 0, location: 'Office' }
  ];

  const alerts = [
    { id: 1, type: 'overspeed', message: 'VH001: Overspeed detected (85 km/h)', severity: 'warning', timestamp: new Date() },
    { id: 2, type: 'geo_fence', message: 'VH002: Entered restricted zone', severity: 'critical', timestamp: new Date() },
    { id: 3, type: 'maintenance', message: 'VH003: Maintenance due', severity: 'info', timestamp: new Date() }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'idle': return 'bg-yellow-100 text-yellow-800';
      case 'maintenance': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h1>
              <p className="text-gray-600">Manage your fleet efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Vehicle
              </button>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
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
              {fleetStats.map((stat, index) => (
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
                      <p className={`text-sm ${
                        stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.change} from last week
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${
                      stat.color === 'blue' ? 'bg-blue-100' :
                      stat.color === 'green' ? 'bg-green-100' :
                      stat.color === 'yellow' ? 'bg-yellow-100' : 'bg-red-100'
                    } rounded-full flex items-center justify-center`}>
                      <Car className={`w-6 h-6 ${
                        stat.color === 'blue' ? 'text-blue-600' :
                        stat.color === 'green' ? 'text-green-600' :
                        stat.color === 'yellow' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fleet Map */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-sm border overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h3 className="text-lg font-semibold text-gray-900">Live Fleet Tracking</h3>
                  <p className="text-gray-600">Real-time location of all vehicles</p>
                </div>
                <div className="h-80">
                  <MapComponent 
                    center={[12.9716, 77.5946]}
                    markers={[
                      { lat: 12.9716, lng: 77.5946, vehicle: { name: 'VH001', regNo: 'KA01AB1234' } },
                      { lat: 13.0827, lng: 80.2707, vehicle: { name: 'VH002', regNo: 'TN01CD5678' } }
                    ]}
                  />
                </div>
              </motion.div>

              {/* Recent Alerts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <AlertPanel alerts={alerts} showHeader />
              </motion.div>
            </div>

            {/* Vehicles Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-sm border overflow-hidden"
            >
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold text-gray-900">Recent Vehicles</h3>
                <p className="text-gray-600">Latest activity from your fleet</p>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vehicle
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Driver
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Speed
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {vehicles.map((vehicle) => (
                      <tr key={vehicle.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{vehicle.name}</div>
                            <div className="text-sm text-gray-500">{vehicle.id}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vehicle.driver}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(vehicle.status)}`}>
                            {vehicle.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {vehicle.speed} km/h
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {vehicle.location}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <AlertPanel alerts={alerts} showHeader />
        )}
      </div>
    </div>
  );
};

export default EnterpriseDashboard;