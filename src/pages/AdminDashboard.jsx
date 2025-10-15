// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Car, 
  MapPin, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Shield,
  Download,
  Settings,
  Brain,
  Wrench,
  Navigation,
  Battery,
  Fuel,
  Gauge,
  Calendar,
  Phone,
  Mail,
  Map
} from 'lucide-react';
import { 
  subscribeToUsers, 
  subscribeToVehicles, 
  addUser, 
  updateUser, 
  deleteUser,
  addVehicle,
  updateVehicle,
  deleteVehicle
} from '../firebase/services';

// Import components
import UserManagement from '../components/admin/UserManagement';
import VehicleManagement from '../components/admin/VehicleManagement';
import RealTimeTracking from '../components/admin/RealTimeTracking';
import GeoFenceAlerts from '../components/admin/GeoFenceAlerts';
import AIDriverScore from '../components/admin/AIDriverScore';
import RemoteImmobilizer from '../components/admin/RemoteImmobilizer';
import PredictiveMaintenance from '../components/admin/PredictiveMaintenance';
import UsageBasedBilling from '../components/admin/UsageBasedBilling';
import BoundaryManagement from '../components/admin/BoundaryManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'users', label: 'User Management', icon: <Users className="w-4 h-4" /> },
    { id: 'vehicles', label: 'Vehicles', icon: <Car className="w-4 h-4" /> },
    { id: 'add-vehicle', label: 'Add Vehicle', icon: <Car className="w-4 h-4" /> },
    { id: 'boundary', label: 'Boundary Management', icon: <MapPin className="w-4 h-4" /> },
    { id: 'tracking', label: 'Real-time Tracking', icon: <Navigation className="w-4 h-4" /> },
    { id: 'geo-fence', label: 'Geo-Fence Alerts', icon: <MapPin className="w-4 h-4" /> },
    { id: 'ai-driver', label: 'AI Driver Score', icon: <Brain className="w-4 h-4" /> },
    { id: 'immobilizer', label: 'Remote Immobilizer', icon: <Shield className="w-4 h-4" /> },
    { id: 'maintenance', label: 'Predictive Maintenance', icon: <Wrench className="w-4 h-4" /> },
    { id: 'billing', label: 'Usage-based Billing', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }
  ];

  useEffect(() => {
    const unsubscribeUsers = subscribeToUsers(setUsers);
    const unsubscribeVehicles = subscribeToVehicles(setVehicles);
    
    setLoading(false);
    
    return () => {
      unsubscribeUsers();
      unsubscribeVehicles();
    };
  }, []);

  const systemStats = [
    { 
      label: 'Total Users', 
      value: users.length.toString(), 
      change: '+12%', 
      icon: <Users className="w-6 h-6" />, 
      color: 'blue' 
    },
    { 
      label: 'Active Vehicles', 
      value: vehicles.filter(v => v.status === 'active').length.toString(), 
      change: '+8%', 
      icon: <Car className="w-6 h-6" />, 
      color: 'green' 
    },
    { 
      label: 'Alerts Today', 
      value: '23', 
      change: '-5%', 
      icon: <AlertTriangle className="w-6 h-6" />, 
      color: 'yellow' 
    },
    { 
      label: 'Revenue', 
      value: '₹1.2L', 
      change: '+15%', 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'purple' 
    },
    { 
      label: 'Overspeeding', 
      value: vehicles.filter(v => v.currentSpeed > 80).length.toString(), 
      change: '+3%', 
      icon: <Gauge className="w-6 h-6" />, 
      color: 'red' 
    },
    { 
      label: 'Maintenance Due', 
      value: vehicles.filter(v => v.maintenanceStatus === 'due').length.toString(), 
      change: '+2%', 
      icon: <Wrench className="w-6 h-6" />, 
      color: 'orange' 
    }
  ];

  const recentAlerts = [
    { id: 1, type: 'speed', vehicle: 'KA01AB1234', message: 'Overspeeding detected', time: '2 mins ago', severity: 'high' },
    { id: 2, type: 'boundary', vehicle: 'KA01CD5678', message: 'Geo-fence breach', time: '5 mins ago', severity: 'medium' },
    { id: 3, type: 'maintenance', vehicle: 'KA01EF9012', message: 'Brake maintenance due', time: '10 mins ago', severity: 'low' },
    { id: 4, type: 'driver', vehicle: 'KA01GH3456', message: 'Harsh braking detected', time: '15 mins ago', severity: 'medium' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <OverviewTab users={users} vehicles={vehicles} systemStats={systemStats} recentAlerts={recentAlerts} />;
      case 'users':
        return <UserManagement users={users} onAddUser={addUser} onUpdateUser={updateUser} onDeleteUser={deleteUser} />;
      case 'vehicles':
        return <VehicleManagement vehicles={vehicles} onUpdateVehicle={updateVehicle} onDeleteVehicle={deleteVehicle} />;
      case 'add-vehicle':
        return <AddVehicleTab onAddVehicle={addVehicle} />;
      case 'tracking':
        return <RealTimeTracking vehicles={vehicles} />;
      case 'geo-fence':
        return <GeoFenceAlerts />;
      case 'ai-driver':
        return <AIDriverScore vehicles={vehicles} />;
      case 'immobilizer':
        return <RemoteImmobilizer vehicles={vehicles} onUpdateVehicle={updateVehicle} />;
      case 'maintenance':
        return <PredictiveMaintenance vehicles={vehicles} />;
      case 'billing':
        return <UsageBasedBilling users={users} />;
      case 'boundary':
        return <BoundaryManagement vehicles={vehicles} />;
      case 'security':
        return <SecurityTab />;
      default:
        return <OverviewTab users={users} vehicles={vehicles} systemStats={systemStats} recentAlerts={recentAlerts} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-900 font-semibold">Loading Admin Dashboard...</p>
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
                Fleet Management Admin
              </h1>
              <p className="text-blue-900/70">Real-time vehicle monitoring & control</p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 transition">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-4 overflow-x-auto pb-2">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 py-2 px-4 rounded-lg font-semibold text-sm whitespace-nowrap transition-all duration-300 ease-in-out
        ${
          activeTab === tab.id
            ? 'bg-blue-50 text-blue-700 shadow-inner'
            : 'text-gray-500 hover:text-blue-700 hover:bg-blue-100/30 hover:shadow-sm hover:scale-105'
        }`}
    >
      {tab.icon}
      <span className="whitespace-nowrap">{tab.label}</span>
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
const OverviewTab = ({ users, vehicles, systemStats, recentAlerts }) => {
  const activeVehicles = vehicles.filter(v => v.status === 'active');
  const overspeedingVehicles = vehicles.filter(v => v.currentSpeed > 80);

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-6">
        {systemStats.map((stat, idx) => (
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
                <p className={`text-xs font-semibold ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change} from last week
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-inner
                ${stat.color === 'blue' ? 'bg-blue-100' :
                  stat.color === 'green' ? 'bg-green-100' :
                  stat.color === 'yellow' ? 'bg-yellow-100' :
                  stat.color === 'purple' ? 'bg-purple-100' :
                  stat.color === 'red' ? 'bg-red-100' : 'bg-orange-100'}`}
              >
                {React.cloneElement(stat.icon, {
                  className: `w-6 h-6 ${stat.color === 'blue' ? 'text-blue-600' :
                    stat.color === 'green' ? 'text-green-600' :
                    stat.color === 'yellow' ? 'text-yellow-600' :
                    stat.color === 'purple' ? 'text-purple-600' :
                    stat.color === 'red' ? 'text-red-600' : 'text-orange-600'}`
                })}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Alerts */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-white/20">
            <h3 className="text-lg font-bold text-blue-900">Recent Alerts</h3>
            <p className="text-sm text-blue-900/70">Real-time system alerts</p>
          </div>
          <div className="divide-y divide-white/20">
            {recentAlerts.map((alert) => (
              <div key={alert.id} className="p-4 hover:bg-white/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      alert.severity === 'high' ? 'bg-red-500' :
                      alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></div>
                    <div>
                      <p className="font-semibold text-blue-900">{alert.message}</p>
                      <p className="text-sm text-blue-900/70">Vehicle: {alert.vehicle}</p>
                    </div>
                  </div>
                  <span className="text-sm text-blue-900/60">{alert.time}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Active Vehicles */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-white/20">
            <h3 className="text-lg font-bold text-blue-900">Active Vehicles</h3>
            <p className="text-sm text-blue-900/70">Currently operating vehicles</p>
          </div>
          <div className="divide-y divide-white/20">
            {activeVehicles.slice(0, 5).map((vehicle) => (
              <div key={vehicle.id} className="p-4 hover:bg-white/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-blue-900">{vehicle.plateNumber}</p>
                    <p className="text-sm text-blue-900/70">{vehicle.model} • {vehicle.driverName}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-900">{vehicle.currentSpeed} km/h</p>
                    <p className={`text-sm ${
                      vehicle.currentSpeed > 80 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {vehicle.currentSpeed > 80 ? 'Overspeeding' : 'Normal'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Add Vehicle Tab Component
const AddVehicleTab = ({ onAddVehicle }) => {
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    driverName: '',
    driverPhone: '',
    fuelType: 'petrol',
    maxSpeed: '120',
    boundary: {
      minLat: '',
      maxLat: '',
      minLng: '',
      maxLng: ''
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddVehicle(formData);
      setFormData({
        plateNumber: '',
        model: '',
        driverName: '',
        driverPhone: '',
        fuelType: 'petrol',
        maxSpeed: '120',
        boundary: {
          minLat: '',
          maxLat: '',
          minLng: '',
          maxLng: ''
        }
      });
      alert('Vehicle registered successfully!');
    } catch (error) {
      alert('Error registering vehicle: ' + error.message);
    }
  };

  return (
    <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-6">Register New Vehicle</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Plate Number</label>
            <input
              type="text"
              required
              value={formData.plateNumber}
              onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="KA01AB1234"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Vehicle Model</label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Toyota Innova"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Driver Name</label>
            <input
              type="text"
              required
              value={formData.driverName}
              onChange={(e) => setFormData({...formData, driverName: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Driver Phone</label>
            <input
              type="tel"
              required
              value={formData.driverPhone}
              onChange={(e) => setFormData({...formData, driverPhone: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="+91 9876543210"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Fuel Type</label>
            <select
              value={formData.fuelType}
              onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-blue-900 mb-2">Max Speed Limit (km/h)</label>
            <input
              type="number"
              required
              value={formData.maxSpeed}
              onChange={(e) => setFormData({...formData, maxSpeed: e.target.value})}
              className="w-full px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="120"
            />
          </div>
        </div>

        <div className="border-t border-blue-200 pt-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Boundary Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              step="any"
              value={formData.boundary.minLat}
              onChange={(e) => setFormData({...formData, boundary: {...formData.boundary, minLat: e.target.value}})}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min Latitude"
            />
            <input
              type="number"
              step="any"
              value={formData.boundary.maxLat}
              onChange={(e) => setFormData({...formData, boundary: {...formData.boundary, maxLat: e.target.value}})}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max Latitude"
            />
            <input
              type="number"
              step="any"
              value={formData.boundary.minLng}
              onChange={(e) => setFormData({...formData, boundary: {...formData.boundary, minLng: e.target.value}})}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Min Longitude"
            />
            <input
              type="number"
              step="any"
              value={formData.boundary.maxLng}
              onChange={(e) => setFormData({...formData, boundary: {...formData.boundary, maxLng: e.target.value}})}
              className="px-4 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Max Longitude"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition"
        >
          Register Vehicle
        </button>
      </form>
    </div>
  );
};

// Security Tab Component
const SecurityTab = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-blue-900 mb-6">Security Dashboard</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="font-semibold text-red-900">Security Breaches</h3>
                <p className="text-2xl font-bold text-red-600">3</p>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
              <div>
                <h3 className="font-semibold text-yellow-900">Suspicious Activities</h3>
                <p className="text-2xl font-bold text-yellow-600">12</p>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              <div>
                <h3 className="font-semibold text-green-900">Secure Vehicles</h3>
                <p className="text-2xl font-bold text-green-600">45</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-blue-900">Security Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Real-time Monitoring</h4>
              <p className="text-sm text-blue-700">24/7 vehicle tracking and anomaly detection</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Remote Immobilization</h4>
              <p className="text-sm text-blue-700">Instant vehicle disable in case of theft</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Geo-fence Alerts</h4>
              <p className="text-sm text-blue-700">Instant notifications for boundary breaches</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Driver Behavior Analysis</h4>
              <p className="text-sm text-blue-700">AI-powered risk assessment and scoring</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;