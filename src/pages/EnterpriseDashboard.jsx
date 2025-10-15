// src/pages/EnterpriseDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Car, 
  Users, 
  MapPin, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Settings,
  Plus,
  Building,
  BarChart3,
  Shield,
  Wrench,
  FileText,
  Calendar,
  Download,
  UserPlus,
  Bell,
  Fuel,
  Gauge,
  Battery,
  Navigation
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { 
  getVehicles, 
  getUsers, 
  subscribeToVehicles, 
  subscribeToUsers,
  addVehicle,
  updateVehicle,
  deleteVehicle,
  addUser,
  updateUser,
  deleteUser
} from '../firebase/services';

// Import components
import FleetOverview from '../components/enterprise/FleetOverview';
import VehicleManagement from '../components/enterprise/VehicleManagement';
import DriverManagement from '../components/enterprise/DriverManagement';
import AlertsCenter from '../components/enterprise/AlertsCenter';
import AnalyticsDashboard from '../components/enterprise/AnalyticsDashboard';
import BillingManagement from '../components/enterprise/BillingManagement';
import EnterpriseSettings from '../components/enterprise/EnterpriseSettings';

const EnterpriseDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [enterpriseData, setEnterpriseData] = useState({});
  const [loading, setLoading] = useState(true);
  const { userProfile } = useAuth();

  const tabs = [
    { id: 'overview', label: 'Fleet Overview', icon: <Car className="w-4 h-4" /> },
    { id: 'vehicles', label: 'Vehicle Management', icon: <Car className="w-4 h-4" /> },
    { id: 'drivers', label: 'Driver Management', icon: <Users className="w-4 h-4" /> },
    { id: 'alerts', label: 'Alerts Center', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'billing', label: 'Billing & Reports', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'settings', label: 'Enterprise Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  useEffect(() => {
    // Simulate enterprise data
    const enterpriseInfo = {
      name: userProfile?.companyName || 'Acme Corporation',
      contact: userProfile?.contact || '+91 9876543210',
      email: userProfile?.email || 'admin@acme.com',
      address: 'Bangalore, Karnataka',
      fleetSize: 24,
      activeSince: '2022-01-15',
      subscription: 'Enterprise Pro',
      billingCycle: 'Monthly'
    };
    setEnterpriseData(enterpriseInfo);

    // Subscribe to real-time data
    const unsubscribeVehicles = subscribeToVehicles(setVehicles);
    const unsubscribeUsers = subscribeToUsers((users) => {
      const drivers = users.filter(user => user.role === 'driver');
      setDrivers(drivers);
    });

    setLoading(false);

    return () => {
      unsubscribeVehicles();
      unsubscribeUsers();
    };
  }, [userProfile]);

  const fleetStats = [
    { 
      label: 'Total Vehicles', 
      value: vehicles.length.toString(), 
      change: '+2', 
      icon: <Car className="w-6 h-6" />, 
      color: 'blue' 
    },
    { 
      label: 'Active Drivers', 
      value: drivers.filter(d => d.status === 'active').length.toString(), 
      change: '+3', 
      icon: <Users className="w-6 h-6" />, 
      color: 'green' 
    },
    { 
      label: 'In Maintenance', 
      value: vehicles.filter(v => v.status === 'maintenance').length.toString(), 
      change: '-1', 
      icon: <Wrench className="w-6 h-6" />, 
      color: 'yellow' 
    },
    { 
      label: 'Active Alerts', 
      value: '5', 
      change: '+1', 
      icon: <AlertTriangle className="w-6 h-6" />, 
      color: 'red' 
    },
    { 
      label: 'Monthly Revenue', 
      value: '₹2.4L', 
      change: '+12%', 
      icon: <DollarSign className="w-6 h-6" />, 
      color: 'purple' 
    },
    { 
      label: 'Fuel Efficiency', 
      value: '14.8 km/l', 
      change: '+0.5', 
      icon: <Fuel className="w-6 h-6" />, 
      color: 'green' 
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'overspeed',
      vehicle: 'KA01AB1234',
      driver: 'Raj Kumar',
      message: 'Overspeed detected (85 km/h)',
      severity: 'warning',
      timestamp: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 2,
      type: 'geo_fence',
      vehicle: 'KA01CD5678',
      driver: 'Suresh P',
      message: 'Entered restricted zone',
      severity: 'critical',
      timestamp: new Date(Date.now() - 600000).toISOString()
    },
    {
      id: 3,
      type: 'maintenance',
      vehicle: 'KA01EF9012',
      driver: 'Mohan R',
      message: 'Maintenance due in 200km',
      severity: 'info',
      timestamp: new Date(Date.now() - 900000).toISOString()
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return <FleetOverview 
          vehicles={vehicles} 
          drivers={drivers}
          fleetStats={fleetStats}
          recentAlerts={recentAlerts}
          enterpriseData={enterpriseData}
        />;
      case 'vehicles':
        return <VehicleManagement 
          vehicles={vehicles}
          onAddVehicle={addVehicle}
          onUpdateVehicle={updateVehicle}
          onDeleteVehicle={deleteVehicle}
        />;
      case 'drivers':
        return <DriverManagement 
          drivers={drivers}
          onAddUser={addUser}
          onUpdateUser={updateUser}
          onDeleteUser={deleteUser}
        />;
      case 'alerts':
        return <AlertsCenter vehicles={vehicles} drivers={drivers} />;
      case 'analytics':
        return <AnalyticsDashboard vehicles={vehicles} drivers={drivers} />;
      case 'billing':
        return <BillingManagement vehicles={vehicles} drivers={drivers} />;
      case 'settings':
        return <EnterpriseSettings enterpriseData={enterpriseData} />;
      default:
        return <FleetOverview 
          vehicles={vehicles} 
          drivers={drivers}
          fleetStats={fleetStats}
          recentAlerts={recentAlerts}
          enterpriseData={enterpriseData}
        />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-blue-900 font-semibold">Loading Enterprise Dashboard...</p>
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
                Enterprise Dashboard
              </h1>
              <p className="text-blue-900/70">Manage your fleet efficiently</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
                <Building className="w-4 h-4" />
                <span className="text-sm font-semibold">{enterpriseData.name}</span>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-white
                bg-gradient-to-r from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-blue-500/30 transition">
                <Download className="w-4 h-4" />
                Export Report
              </button>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-6 overflow-x-auto pb-2">
  {tabs.map((tab) => (
    <button
      key={tab.id}
      onClick={() => setActiveTab(tab.id)}
      className={`flex items-center gap-2 py-3 px-3 rounded-md font-semibold text-sm whitespace-nowrap
        transition-all duration-300 ease-in-out
        ${
          activeTab === tab.id
            ? 'text-blue-600 bg-blue-50 shadow-inner'
            : 'text-blue-900/70 hover:text-blue-700 hover:bg-blue-100 hover:shadow-md hover:scale-[1.03]'
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
    </div>
  );
};

export default EnterpriseDashboard;