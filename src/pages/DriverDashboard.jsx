// src/pages/DriverDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Car,
  MapPin,          // ← used instead of Route
  Award,
  Clock,
  Zap,
  AlertTriangle,
  Play,
  Square,
  User,
  Settings,
  Bell,
  BarChart3,
  Wrench,
  Fuel,
  Shield,
  Navigation,
  Battery,
  Gauge,
  TrendingUp,
  FileText,
  Calendar
} from 'lucide-react';

// Import components
import DrivingScore from '../components/driver/DrivingScore';
import TripHistory from '../components/driver/TripHistory';
import VehicleInfo from '../components/driver/VehicleInfo';
import PerformanceAnalytics from '../components/driver/PerformanceAnalytics';
import AlertsNotifications from '../components/driver/AlertsNotifications';
import StartTripModal from '../components/driver/StartTripModal';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOnTrip, setIsOnTrip] = useState(false);
  const [showStartTripModal, setShowStartTripModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState(null);
  const [driverData, setDriverData] = useState({});
  const [liveData, setLiveData] = useState({});

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'trips', label: 'My Trips', icon: <MapPin className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Award className="w-4 h-4" /> },
    { id: 'vehicle', label: 'Vehicle', icon: <Car className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts', icon: <Bell className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> }
  ];

  useEffect(() => {
    // Simulate driver data
    const driverInfo = {
      name: 'Raj Kumar',
      license: 'DL0420181234567',
      experience: '5 years',
      contact: '+91 9876543210',
      email: 'raj.kumar@example.com',
      vehicle: {
        plate: 'KA01AB1234',
        model: 'Toyota Innova Crysta',
        fuelType: 'Diesel',
        capacity: '7 Seater',
        insurance: '2024-12-31',
        registration: '2022-01-15'
      },
      stats: {
        totalTrips: 156,
        totalDistance: 23450,
        totalHours: 480,
        rating: 4.8
      }
    };
    setDriverData(driverInfo);

    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveData({
        speed: Math.floor(Math.random() * 100),
        fuel: Math.max(20, (driverData.vehicle?.fuelLevel || 100) - Math.random() * 0.1),
        engineTemp: 85 + Math.floor(Math.random() * 10),
        battery: 90 + Math.floor(Math.random() * 10),
        location: {
          lat: 12.9716 + (Math.random() - 0.5) * 0.01,
          lng: 77.5946 + (Math.random() - 0.5) * 0.01
        },
        timestamp: new Date().toISOString()
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const driverStats = [
    { 
      label: 'Today\'s Trips', 
      value: '3', 
      change: '+1', 
      icon: <Car className="w-6 h-6" />, 
      color: 'blue' 
    },
    { 
      label: 'Driving Score', 
      value: '88/100', 
      change: '+5', 
      icon: <Award className="w-6 h-6" />, 
      color: 'green' 
    },
    { 
      label: 'Total Hours', 
      value: '6.5h', 
      change: '+2.1h', 
      icon: <Clock className="w-6 h-6" />, 
      color: 'purple' 
    },
    { 
      label: 'Fuel Efficiency', 
      value: '15.2 km/l', 
      change: '+0.8', 
      icon: <Zap className="w-6 h-6" />, 
      color: 'yellow' 
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'harsh_braking',
      message: 'Harsh braking detected',
      time: '10 minutes ago',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'overspeeding',
      message: 'Speed limit exceeded by 15km/h',
      time: '25 minutes ago',
      severity: 'high'
    },
    {
      id: 3,
      type: 'maintenance',
      message: 'Next service due in 500km',
      time: '2 hours ago',
      severity: 'low'
    }
  ];

  const handleStartTrip = (tripData) => {
    const newTrip = {
      id: Date.now(),
      startTime: new Date().toISOString(),
      startLocation: tripData.startLocation,
      destination: tripData.destination,
      purpose: tripData.purpose,
      status: 'active'
    };
    setCurrentTrip(newTrip);
    setIsOnTrip(true);
    setShowStartTripModal(false);
  };

  const handleEndTrip = () => {
    if (currentTrip) {
      const endedTrip = {
        ...currentTrip,
        endTime: new Date().toISOString(),
        status: 'completed',
        distance: (Math.random() * 200 + 50).toFixed(1),
        duration: (Math.random() * 4 + 1).toFixed(1),
        score: 80 + Math.floor(Math.random() * 20)
      };
      // Here you would save the trip to your database
      console.log('Trip ended:', endedTrip);
    }
    setCurrentTrip(null);
    setIsOnTrip(false);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab 
          driverStats={driverStats} 
          recentAlerts={recentAlerts}
          liveData={liveData}
          currentTrip={currentTrip}
          driverData={driverData}
        />;
      case 'trips':
        return <TripHistory driverId="driver_123" />;
      case 'performance':
        return <PerformanceAnalytics driverId="driver_123" />;
      case 'vehicle':
        return <VehicleInfo vehicle={driverData.vehicle} liveData={liveData} />;
      case 'analytics':
        return <AnalyticsTab driverData={driverData} />;
      case 'alerts':
        return <AlertsNotifications driverId="driver_123" />;
      case 'profile':
        return <ProfileTab driverData={driverData} />;
      default:
        return <OverviewTab 
          driverStats={driverStats} 
          recentAlerts={recentAlerts}
          liveData={liveData}
          currentTrip={currentTrip}
          driverData={driverData}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-xl border-b border-white/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-cyan-500">
                Driver Dashboard
              </h1>
              <p className="text-blue-900/70">Welcome back, {driverData.name}!</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <Car className="w-4 h-4" />
                <span className="text-sm font-semibold">{driverData.vehicle?.plate}</span>
              </div>
              
              {!isOnTrip ? (
                <button
                  onClick={() => setShowStartTripModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold shadow-lg hover:shadow-green-500/30"
                >
                  <Play className="w-4 h-4" />
                  Start Trip
                </button>
              ) : (
                <button
                  onClick={handleEndTrip}
                  className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition font-semibold shadow-lg hover:shadow-red-500/30"
                >
                  <Square className="w-4 h-4" />
                  End Trip
                </button>
              )}
              
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
                className={`flex items-center gap-2 py-3 px-1 border-b-2 font-semibold text-sm whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-blue-900/60 hover:text-blue-700 hover:border-blue-300'
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

      {/* Start Trip Modal */}
      {showStartTripModal && (
        <StartTripModal 
          onClose={() => setShowStartTripModal(false)}
          onStartTrip={handleStartTrip}
          vehicle={driverData.vehicle}
        />
      )}
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ driverStats, recentAlerts, liveData, currentTrip, driverData }) => {
  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {driverStats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-blue-900/70">{stat.label}</p>
                <p className="text-2xl font-extrabold text-blue-900">{stat.value}</p>
                <p className="text-xs font-semibold text-green-600">
                  {stat.change} from yesterday
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner ${
                stat.color === 'blue' ? 'bg-blue-100' :
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'purple' ? 'bg-purple-100' : 'bg-yellow-100'
              }`}>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Trip Status */}
        <div className="lg:col-span-2 space-y-6">
          {/* Driving Score */}
          <DrivingScore score={88} />

          {/* Live Vehicle Data */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-bold text-blue-900 mb-4">Live Vehicle Data</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <LiveDataCard
                icon={<Gauge className="w-5 h-5" />}
                label="Current Speed"
                value={`${liveData.speed || 0} km/h`}
                color={liveData.speed > 80 ? 'text-red-600' : 'text-green-600'}
              />
              <LiveDataCard
                icon={<Fuel className="w-5 h-5" />}
                label="Fuel Level"
                value={`${liveData.fuel?.toFixed(1) || '0'}%`}
                color="text-blue-600"
              />
              <LiveDataCard
                icon={<Battery className="w-5 h-5" />}
                label="Battery"
                value={`${liveData.battery || 0}%`}
                color="text-green-600"
              />
              <LiveDataCard
                icon={<Navigation className="w-5 h-5" />}
                label="Engine Temp"
                value={`${liveData.engineTemp || 0}°C`}
                color={liveData.engineTemp > 90 ? 'text-red-600' : 'text-blue-600'}
              />
            </div>
          </motion.div>

          {/* Current Trip Info */}
          {currentTrip && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4">Current Trip</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-blue-900/70">From</p>
                  <p className="font-semibold text-blue-900">{currentTrip.startLocation}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-900/70">To</p>
                  <p className="font-semibold text-blue-900">{currentTrip.destination}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-900/70">Purpose</p>
                  <p className="font-semibold text-blue-900">{currentTrip.purpose}</p>
                </div>
                <div>
                  <p className="text-sm text-blue-900/70">Started</p>
                  <p className="font-semibold text-blue-900">
                    {new Date(currentTrip.startTime).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Recent Alerts */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
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
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} />
                    <div className="flex-1">
                      <p className="font-semibold text-blue-900 text-sm">{alert.message}</p>
                      <p className="text-xs text-blue-900/70">{alert.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
          >
            <h3 className="font-bold text-blue-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <StatItem label="Total Trips" value={driverData.stats?.totalTrips || 0} />
              <StatItem label="Total Distance" value={`${(driverData.stats?.totalDistance || 0).toLocaleString()} km`} />
              <StatItem label="Driving Hours" value={`${driverData.stats?.totalHours || 0}h`} />
              <StatItem label="Rating" value={driverData.stats?.rating || 0} />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Analytics Tab Component
const AnalyticsTab = ({ driverData }) => {
  const weeklyData = [
    { day: 'Mon', trips: 4, score: 85, distance: 240 },
    { day: 'Tue', trips: 6, score: 88, distance: 320 },
    { day: 'Wed', trips: 5, score: 82, distance: 280 },
    { day: 'Thu', trips: 7, score: 90, distance: 380 },
    { day: 'Fri', trips: 8, score: 87, distance: 420 },
    { day: 'Sat', trips: 3, score: 92, distance: 180 },
    { day: 'Sun', trips: 2, score: 95, distance: 120 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Driving Analytics</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Performance */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Weekly Performance</h3>
            <div className="space-y-3">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-semibold text-blue-900 w-12">{day.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex justify-between text-sm text-blue-900/70 mb-1">
                      <span>Score: {day.score}</span>
                      <span>{day.distance}km</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(day.score / 100) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-blue-900">{day.trips} trips</span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <MetricItem label="Safety Score" value={88} max={100} color="green" />
              <MetricItem label="Fuel Efficiency" value={15.2} max={20} color="blue" />
              <MetricItem label="On-time Performance" value={94} max={100} color="purple" />
              <MetricItem label="Vehicle Maintenance" value={85} max={100} color="orange" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Profile Tab Component
const ProfileTab = ({ driverData }) => {
  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Driver Profile</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Personal Information */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <ProfileField label="Full Name" value={driverData.name} />
              <ProfileField label="License Number" value={driverData.license} />
              <ProfileField label="Experience" value={driverData.experience} />
              <ProfileField label="Contact" value={driverData.contact} />
              <ProfileField label="Email" value={driverData.email} />
            </div>
          </div>

          {/* Vehicle Information */}
          <div>
            <h3 className="text-lg font-semibold text-blue-900 mb-4">Assigned Vehicle</h3>
            <div className="space-y-4">
              <ProfileField label="Plate Number" value={driverData.vehicle?.plate} />
              <ProfileField label="Model" value={driverData.vehicle?.model} />
              <ProfileField label="Fuel Type" value={driverData.vehicle?.fuelType} />
              <ProfileField label="Capacity" value={driverData.vehicle?.capacity} />
              <ProfileField label="Insurance Valid Until" value={driverData.vehicle?.insurance} />
              <ProfileField label="Registration Date" value={driverData.vehicle?.registration} />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 pt-6 border-t border-blue-200">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
            Edit Profile
          </button>
          <button className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition font-semibold">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Components
const LiveDataCard = ({ icon, label, value, color }) => (
  <div className="bg-blue-50 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: `w-5 h-5 ${color}` })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className={`text-lg font-bold ${color}`}>{value}</div>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

const MetricItem = ({ label, value, max, color }) => {
  const percentage = (value / max) * 100;
  const getColorClass = (color) => {
    switch (color) {
      case 'green': return 'bg-green-500';
      case 'blue': return 'bg-blue-500';
      case 'purple': return 'bg-purple-500';
      case 'orange': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-blue-900 font-semibold">{label}</span>
        <span className="text-blue-900 font-bold">{value}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${getColorClass(color)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const ProfileField = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-blue-100">
    <span className="font-semibold text-blue-900/70">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

export default DriverDashboard;
