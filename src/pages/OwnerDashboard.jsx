// src/pages/OwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  MapPin, 
  AlertTriangle, 
  Battery, 
  Thermometer, 
  Zap,
  Play,
  StopCircle,
  Download,
  Car,
  Navigation
} from 'lucide-react';
import MapComponent from '../components/MapComponent';
import AlertPanel from '../components/AlertPanel';
import VehicleHealth from '../components/VehicleHealth';
import TripHistory from '../components/TripHistory';
import DrivingScore from '../components/DrivingScore';
import BillingPanel from '../components/BillingPanel';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicleData, setVehicleData] = useState({
    id: 'VH001',
    name: 'My Vehicle',
    model: 'Toyota Camry 2023',
    regNo: 'KA01AB1234',
    fuelType: 'Petrol',
    gpsId: 'GPS_001_XYZ'
  });

  const [liveLocation, setLiveLocation] = useState({
    lat: 12.9716,
    lng: 77.5946,
    speed: 45,
    heading: 180
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'map', label: 'Live Map', icon: <Navigation className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'trips', label: 'Trip History', icon: <MapPin className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <Download className="w-4 h-4" /> }
  ];

  // Mock data - replace with Firebase data
  const alerts = [
    { id: 1, type: 'overspeed', message: 'Overspeed detected: 85 km/h', severity: 'warning', timestamp: new Date() },
    { id: 2, type: 'harsh_braking', message: 'Harsh braking detected', severity: 'warning', timestamp: new Date() },
    { id: 3, type: 'geo_fence', message: 'Vehicle entered restricted zone', severity: 'critical', timestamp: new Date() }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Owner Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's your vehicle overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{vehicleData.name}</p>
                <p className="text-sm text-gray-600">{vehicleData.regNo}</p>
              </div>
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Current Speed</p>
                    <p className="text-2xl font-bold text-gray-900">{liveLocation.speed} km/h</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Driving Score</p>
                    <p className="text-2xl font-bold text-gray-900">85/100</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Navigation className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Today's Distance</p>
                    <p className="text-2xl font-bold text-gray-900">156 km</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl p-6 shadow-sm border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Active Alerts</p>
                    <p className="text-2xl font-bold text-gray-900">3</p>
                  </div>
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Vehicle Health */}
              <div className="lg:col-span-1">
                <VehicleHealth />
              </div>

              {/* Driving Score */}
              <div className="lg:col-span-1">
                <DrivingScore score={85} />
              </div>

              {/* Quick Actions */}
              <div className="lg:col-span-1">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl p-6 shadow-sm border"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-700">Set Geo-Fence</span>
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-700">Immobilize Vehicle</span>
                      <StopCircle className="w-5 h-5 text-red-400" />
                    </button>
                    <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <span className="text-gray-700">Start Trip</span>
                      <Play className="w-5 h-5 text-green-400" />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Recent Alerts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <AlertPanel alerts={alerts} />
            </motion.div>
          </div>
        )}

        {activeTab === 'map' && (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">Live Vehicle Tracking</h2>
              <p className="text-gray-600">Real-time location and movement tracking</p>
            </div>
            <div className="h-96">
              <MapComponent 
                center={[liveLocation.lat, liveLocation.lng]} 
                markers={[{ lat: liveLocation.lat, lng: liveLocation.lng, vehicle: vehicleData }]}
              />
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <AlertPanel alerts={alerts} showHeader />
        )}

        {activeTab === 'trips' && (
          <TripHistory />
        )}

        {activeTab === 'billing' && (
          <BillingPanel />
        )}
      </div>
    </div>
  );
};

export default OwnerDashboard;