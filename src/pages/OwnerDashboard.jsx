// src/pages/OwnerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  MapPin, 
  AlertTriangle, 
  Battery, 
  Thermometer, 
  Zap,
  Play,
  StopCircle,
  Download,
  Navigation,
  User,
  Settings,
  Bell,
  MessageCircle,
  Heart,
  Star,
  Shield,
  Wrench,
  FileText,
  BarChart3,
  Calendar,
  Phone,
  Mail,
  Map
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Import components
import VehicleHealth from '../components/owner/VehicleHealth';
import TripHistory from '../components/owner/TripHistory';
import DrivingScore from '../components/owner/DrivingScore';
import BillingPanel from '../components/owner/BillingPanel';
import AlertsCenter from '../components/owner/AlertsCenter';
import LiveTracking from '../components/owner/LiveTracking';
import OwnerProfile from '../components/owner/OwnerProfile';
import Notifications from '../components/owner/Notifications';
import SupportCenter from '../components/owner/SupportCenter';

const OwnerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicleData, setVehicleData] = useState({});
  const [liveData, setLiveData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'tracking', label: 'Live Tracking', icon: <Navigation className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts Center', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'trips', label: 'Trip History', icon: <MapPin className="w-4 h-4" /> },
    { id: 'health', label: 'Vehicle Health', icon: <Battery className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing', icon: <FileText className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'support', label: 'Support', icon: <MessageCircle className="w-4 h-4" /> }
  ];

  useEffect(() => {
    // Simulate vehicle data from Firebase
    const vehicleInfo = {
      id: 'VH001',
      name: 'My Vehicle',
      model: 'Toyota Camry 2023',
      plateNumber: 'KA01AB1234',
      fuelType: 'Petrol',
      gpsId: 'GPS_001_XYZ',
      insurance: '2024-12-31',
      registration: '2023-01-15',
      driver: {
        name: 'Raj Kumar',
        phone: '+91 9876543210',
        license: 'DL0420181234567'
      },
      stats: {
        totalTrips: 156,
        totalDistance: 23450,
        monthlyCost: 2450,
        fuelEfficiency: 15.2
      }
    };
    setVehicleData(vehicleInfo);

    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveData({
        speed: Math.floor(Math.random() * 100),
        fuel: Math.max(20, (vehicleData.fuelLevel || 100) - Math.random() * 0.1),
        engineTemp: 85 + Math.floor(Math.random() * 10),
        battery: 90 + Math.floor(Math.random() * 10),
        location: {
          lat: 12.9716 + (Math.random() - 0.5) * 0.01,
          lng: 77.5946 + (Math.random() - 0.5) * 0.01
        },
        timestamp: new Date().toISOString()
      });
    }, 3000);

    setLoading(false);

    return () => clearInterval(interval);
  }, []);

  const ownerStats = [
    { 
      label: 'Current Speed', 
      value: `${liveData.speed || 0} km/h`, 
      change: 'Normal', 
      icon: <Zap className="w-6 h-6" />, 
      color: 'green' 
    },
    { 
      label: 'Driving Score', 
      value: '88/100', 
      change: '+5', 
      icon: <Navigation className="w-6 h-6" />, 
      color: 'blue' 
    },
    { 
      label: "Today's Distance", 
      value: '156 km', 
      change: '+12 km', 
      icon: <MapPin className="w-6 h-6" />, 
      color: 'purple' 
    },
    { 
      label: 'Active Alerts', 
      value: '3', 
      change: '+1', 
      icon: <AlertTriangle className="w-6 h-6" />, 
      color: 'red' 
    },
    { 
      label: 'Fuel Level', 
      value: `${liveData.fuel?.toFixed(1) || 0}%`, 
      change: '-2%', 
      icon: <Thermometer className="w-6 h-6" />, 
      color: 'orange' 
    },
    { 
      label: 'Battery Health', 
      value: `${liveData.battery || 0}%`, 
      change: 'Good', 
      icon: <Battery className="w-6 h-6" />, 
      color: 'green' 
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'overspeed',
      message: 'Overspeed detected: 85 km/h',
      severity: 'warning',
      timestamp: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 2,
      type: 'harsh_braking',
      message: 'Harsh braking detected',
      severity: 'warning',
      timestamp: new Date(Date.now() - 600000).toISOString()
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Next service due in 500km',
      severity: 'info',
      timestamp: new Date(Date.now() - 900000).toISOString()
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab 
          ownerStats={ownerStats} 
          recentAlerts={recentAlerts}
          vehicleData={vehicleData}
          liveData={liveData}
        />;
      case 'tracking':
        return <LiveTracking vehicleData={vehicleData} liveData={liveData} />;
      case 'alerts':
        return <AlertsCenter alerts={recentAlerts} />;
      case 'trips':
        return <TripHistory vehicleId={vehicleData.id} />;
      case 'health':
        return <VehicleHealth vehicleData={vehicleData} liveData={liveData} />;
      case 'billing':
        return <BillingPanel vehicleData={vehicleData} />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <OwnerProfile userProfile={userProfile} vehicleData={vehicleData} />;
      case 'support':
        return <SupportCenter />;
      default:
        return <OverviewTab 
          ownerStats={ownerStats} 
          recentAlerts={recentAlerts}
          vehicleData={vehicleData}
          liveData={liveData}
        />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-900 font-semibold">Loading Owner Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Glass Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                Owner Dashboard
              </h1>
              <p className="text-blue-900/70">Welcome back! Here's your vehicle overview</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <Car className="w-4 h-4" />
                <span className="text-sm font-semibold">{vehicleData.plateNumber}</span>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex space-x-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap
                  transition-all ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-blue-900/60 hover:text-blue-700 hover:border-blue-300'}`}
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
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ ownerStats, recentAlerts, vehicleData, liveData }) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
        {ownerStats.map((stat, idx) => (
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
                <p className={`text-xs font-semibold ${
                  stat.change.startsWith('+') ? 'text-green-600' : 
                  stat.change.startsWith('-') ? 'text-red-600' : 'text-blue-600'
                }`}>
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'purple' ? 'bg-purple-100' :
                stat.color === 'red' ? 'bg-red-100' : 'bg-orange-100'
              }`}>
                {React.cloneElement(stat.icon, {
                  className: `w-6 h-6 ${
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'red' ? 'text-red-600' : 'text-orange-600'
                  }`
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Vehicle Health */}
          <VehicleHealth vehicleData={vehicleData} liveData={liveData} />

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <ActionButton 
                icon={<MapPin className="w-4 h-4" />}
                label="Set Geo-Fence"
                description="Define safe operating areas"
                color="blue"
              />
              <ActionButton 
                icon={<StopCircle className="w-4 h-4" />}
                label="Immobilize Vehicle"
                description="Emergency stop (if stolen)"
                color="red"
              />
              <ActionButton 
                icon={<Play className="w-4 h-4" />}
                label="Start Trip"
                description="Begin new journey tracking"
                color="green"
              />
              <ActionButton 
                icon={<Shield className="w-4 h-4" />}
                label="Insurance Renewal"
                description="Due in 45 days"
                color="purple"
              />
            </div>
          </motion.div>
        </div>

        {/* Middle Column */}
        <div className="space-y-6">
          {/* Driving Score */}
          <DrivingScore score={88} />

          {/* Vehicle Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-4">Vehicle Information</h3>
            <div className="space-y-3">
              <InfoItem label="Vehicle Model" value={vehicleData.model} />
              <InfoItem label="Plate Number" value={vehicleData.plateNumber} />
              <InfoItem label="Fuel Type" value={vehicleData.fuelType} />
              <InfoItem label="Insurance" value={vehicleData.insurance} />
              <InfoItem label="Registration" value={vehicleData.registration} />
              <InfoItem label="Assigned Driver" value={vehicleData.driver?.name} />
            </div>
          </motion.div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Recent Alerts</h3>
              <p className="text-sm text-blue-900/70">Today's notifications</p>
            </div>
            <div className="divide-y divide-white/20">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className="p-4 hover:bg-white/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      alert.severity === 'warning' ? 'bg-yellow-500' :
                      alert.severity === 'info' ? 'bg-blue-500' : 'bg-red-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 text-sm">{alert.message}</p>
                      <p className="text-xs text-blue-900/70">
                        {new Date(alert.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vehicle Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-blue-900 mb-4">Vehicle Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Total Trips" value={vehicleData.stats?.totalTrips || 0} />
              <StatItem label="Total Distance" value={`${(vehicleData.stats?.totalDistance || 0).toLocaleString()} km`} />
              <StatItem label="Monthly Cost" value={`₹${vehicleData.stats?.monthlyCost || 0}`} />
              <StatItem label="Fuel Efficiency" value={`${vehicleData.stats?.fuelEfficiency || 0} km/l`} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const ActionButton = ({ icon, label, description, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700';
      case 'red': return 'bg-red-50 border-red-200 hover:bg-red-100 text-red-700';
      case 'green': return 'bg-green-50 border-green-200 hover:bg-green-100 text-green-700';
      case 'purple': return 'bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-700';
      default: return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700';
    }
  };

  return (
    <button className={`w-full p-3 rounded-xl border text-left transition-colors ${getColorClasses(color)}`}>
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

const InfoItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-100">
    <span className="text-blue-900/70 font-semibold text-sm">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default OwnerDashboard;