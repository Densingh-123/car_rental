import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {  MapPin, AlertTriangle, Settings, Plus, Trash2, Edit, Navigation } from 'lucide-react';

const BoundaryManagement = ({ vehicles }) => {
  const [boundaries, setBoundaries] = useState([]);
  const [selectedBoundary, setSelectedBoundary] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newBoundary, setNewBoundary] = useState({
    name: '',
    type: 'city',
    coordinates: {
      north: '',
      south: '',
      east: '',
      west: ''
    },
    speedLimit: 80,
    alertsEnabled: true,
    vehicles: []
  });

  useEffect(() => {
    // Sample boundaries data
    const sampleBoundaries = [
      {
        id: 1,
        name: 'Bangalore City Limits',
        type: 'city',
        coordinates: {
          north: 13.1000,
          south: 12.8000,
          east: 77.7000,
          west: 77.5000
        },
        speedLimit: 80,
        alertsEnabled: true,
        vehicles: ['KA01AB1234', 'KA01CD5678'],
        breachesToday: 3,
        totalBreaches: 45,
        created: new Date('2024-01-01').toISOString()
      },
      {
        id: 2,
        name: 'Corporate Zone',
        type: 'restricted',
        coordinates: {
          north: 12.9800,
          south: 12.9600,
          east: 77.6500,
          west: 77.6200
        },
        speedLimit: 40,
        alertsEnabled: true,
        vehicles: ['KA01EF9012'],
        breachesToday: 1,
        totalBreaches: 12,
        created: new Date('2024-01-15').toISOString()
      },
      {
        id: 3,
        name: 'Highway Stretch',
        type: 'highway',
        coordinates: {
          north: 13.0500,
          south: 12.9500,
          east: 77.7500,
          west: 77.6000
        },
        speedLimit: 100,
        alertsEnabled: true,
        vehicles: [],
        breachesToday: 0,
        totalBreaches: 8,
        created: new Date('2024-01-20').toISOString()
      }
    ];
    setBoundaries(sampleBoundaries);
  }, []);

  const handleCreateBoundary = () => {
    const boundary = {
      id: Date.now(),
      ...newBoundary,
      breachesToday: 0,
      totalBreaches: 0,
      created: new Date().toISOString()
    };
    setBoundaries(prev => [...prev, boundary]);
    setShowCreateModal(false);
    setNewBoundary({
      name: '',
      type: 'city',
      coordinates: { north: '', south: '', east: '', west: '' },
      speedLimit: 80,
      alertsEnabled: true,
      vehicles: []
    });
  };

  const handleDeleteBoundary = (id) => {
    if (window.confirm('Are you sure you want to delete this boundary?')) {
      setBoundaries(prev => prev.filter(b => b.id !== id));
      if (selectedBoundary?.id === id) {
        setSelectedBoundary(null);
      }
    }
  };

  const getBoundaryTypeColor = (type) => {
    switch (type) {
      case 'city': return 'text-blue-600 bg-blue-100';
      case 'restricted': return 'text-red-600 bg-red-100';
      case 'highway': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getBoundaryStats = () => {
    return {
      total: boundaries.length,
      active: boundaries.filter(b => b.alertsEnabled).length,
      breachesToday: boundaries.reduce((sum, b) => sum + b.breachesToday, 0),
      totalVehicles: boundaries.reduce((sum, b) => sum + b.vehicles.length, 0)
    };
  };

  const stats = getBoundaryStats();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Boundary Management</h2>
          <p className="text-blue-900/70">Geo-fence boundaries and speed monitoring</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Create Boundary
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          label="Total Boundaries"
          value={stats.total}
          icon={<MapPin className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          label="Active Alerts"
          value={stats.active}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="green"
        />
        <StatCard
          label="Breaches Today"
          value={stats.breachesToday}
          icon={<Navigation className="w-6 h-6" />}
          color="red"
        />
        <StatCard
          label="Monitored Vehicles"
          value={stats.totalVehicles}
          icon={<MapPin className="w-6 h-6" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Boundaries List */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Geo-Fence Boundaries</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {boundaries.map((boundary, index) => (
                <motion.div
                  key={boundary.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedBoundary?.id === boundary.id 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-white/50 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedBoundary(boundary)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-bold text-blue-900">{boundary.name}</h4>
                      <p className="text-sm text-blue-900/70">
                        {boundary.vehicles.length} vehicle{boundary.vehicles.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getBoundaryTypeColor(boundary.type)}`}>
                      {boundary.type}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      <span>{boundary.breachesToday} today</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Navigation className="w-3 h-3 text-blue-600" />
                      <span>{boundary.speedLimit} km/h</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-1 rounded text-sm font-semibold hover:bg-blue-200 transition">
                      <Edit className="w-3 h-3 inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBoundary(boundary.id);
                      }}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm font-semibold hover:bg-red-200 transition"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Boundary Details */}
        <div className="lg:col-span-2 space-y-6">
          {selectedBoundary ? (
            <>
              {/* Boundary Overview */}
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-blue-900">{selectedBoundary.name}</h3>
                    <p className="text-blue-900/70">
                      Created {new Date(selectedBoundary.created).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getBoundaryTypeColor(selectedBoundary.type)}`}>
                      {selectedBoundary.type.toUpperCase()}
                    </span>
                    <div className={`w-3 h-3 rounded-full ${selectedBoundary.alertsEnabled ? 'bg-green-500' : 'bg-gray-500'}`} />
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <DetailCard
                    label="Speed Limit"
                    value={`${selectedBoundary.speedLimit} km/h`}
                    icon={<Navigation className="w-4 h-4" />}
                  />
                  <DetailCard
                    label="Breaches Today"
                    value={selectedBoundary.breachesToday}
                    icon={<AlertTriangle className="w-4 h-4" />}
                  />
                  <DetailCard
                    label="Total Breaches"
                    value={selectedBoundary.totalBreaches}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                  <DetailCard
                    label="Monitored Vehicles"
                    value={selectedBoundary.vehicles.length}
                    icon={<MapPin className="w-4 h-4" />}
                  />
                </div>

                {/* Coordinates */}
                <div className="border-t border-blue-200 pt-4">
                  <h4 className="font-semibold text-blue-900 mb-3">Boundary Coordinates</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <CoordinateItem label="North" value={selectedBoundary.coordinates.north} />
                    <CoordinateItem label="South" value={selectedBoundary.coordinates.south} />
                    <CoordinateItem label="East" value={selectedBoundary.coordinates.east} />
                    <CoordinateItem label="West" value={selectedBoundary.coordinates.west} />
                  </div>
                </div>

                {/* Assigned Vehicles */}
                {selectedBoundary.vehicles.length > 0 && (
                  <div className="border-t border-blue-200 pt-4 mt-4">
                    <h4 className="font-semibold text-blue-900 mb-3">Assigned Vehicles</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedBoundary.vehicles.map((vehicle, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold"
                        >
                          {vehicle}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Map Visualization */}
              <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-white/20 flex items-center justify-between">
                  <h3 className="font-bold text-blue-900">Boundary Visualization</h3>
                  <div className="flex items-center gap-2 text-sm text-blue-900/70">
                    <MapPin className="w-4 h-4" />
                    <span>Interactive Map</span>
                  </div>
                </div>
                <div className="h-64 bg-gradient-to-br from-blue-100 to-cyan-100 relative">
                  {/* Simulated Map with Boundary */}
                  <div
                    className="absolute border-2 border-red-500 border-dashed bg-red-50/30"
                    style={{
                      left: `${((selectedBoundary.coordinates.west - 77.5000) / 0.2) * 100}%`,
                      top: `${((selectedBoundary.coordinates.south - 12.8000) / 0.3) * 100}%`,
                      width: `${((selectedBoundary.coordinates.east - selectedBoundary.coordinates.west) / 0.2) * 100}%`,
                      height: `${((selectedBoundary.coordinates.north - selectedBoundary.coordinates.south) / 0.3) * 100}%`
                    }}
                  >
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-red-600 font-semibold text-sm bg-white/80 px-2 py-1 rounded">
                        {selectedBoundary.name}
                      </div>
                    </div>
                  </div>
                  
                  {/* Map Grid */}
                  <div className="absolute inset-0 opacity-20">
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="absolute w-full h-px bg-blue-300 top-1/4"></div>
                    ))}
                    {Array.from({ length: 10 }).map((_, i) => (
                      <div key={i} className="absolute h-full w-px bg-blue-300 left-1/4"></div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <MapPin className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Boundary</h3>
              <p className="text-blue-900/70">Choose a geo-fence boundary to view details and manage settings</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Boundary Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4">Create New Boundary</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Boundary Name</label>
                  <input
                    type="text"
                    value={newBoundary.name}
                    onChange={(e) => setNewBoundary({...newBoundary, name: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter boundary name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Type</label>
                  <select
                    value={newBoundary.type}
                    onChange={(e) => setNewBoundary({...newBoundary, type: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="city">City</option>
                    <option value="restricted">Restricted</option>
                    <option value="highway">Highway</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Speed Limit (km/h)</label>
                <input
                  type="number"
                  value={newBoundary.speedLimit}
                  onChange={(e) => setNewBoundary({...newBoundary, speedLimit: Number(e.target.value)})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  min="20"
                  max="120"
                />
              </div>

              <div>
                <h4 className="font-semibold text-blue-900 mb-3">Boundary Coordinates</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-blue-900/70 mb-1">North Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newBoundary.coordinates.north}
                      onChange={(e) => setNewBoundary({
                        ...newBoundary, 
                        coordinates: {...newBoundary.coordinates, north: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-blue-900/70 mb-1">South Latitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newBoundary.coordinates.south}
                      onChange={(e) => setNewBoundary({
                        ...newBoundary, 
                        coordinates: {...newBoundary.coordinates, south: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-blue-900/70 mb-1">East Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newBoundary.coordinates.east}
                      onChange={(e) => setNewBoundary({
                        ...newBoundary, 
                        coordinates: {...newBoundary.coordinates, east: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-blue-900/70 mb-1">West Longitude</label>
                    <input
                      type="number"
                      step="any"
                      value={newBoundary.coordinates.west}
                      onChange={(e) => setNewBoundary({
                        ...newBoundary, 
                        coordinates: {...newBoundary.coordinates, west: e.target.value}
                      })}
                      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={newBoundary.alertsEnabled}
                  onChange={(e) => setNewBoundary({...newBoundary, alertsEnabled: e.target.checked})}
                  className="rounded border-blue-300 text-blue-600 focus:ring-blue-500"
                />
                <label className="text-sm font-semibold text-blue-900">Enable breach alerts</label>
              </div>
            </div>

            <div className="flex gap-3 pt-6">
              <button
                onClick={handleCreateBoundary}
                className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Create Boundary
              </button>
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ label, value, icon, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'red': return 'bg-red-100 text-red-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-900/70">{label}</p>
          <p className="text-2xl font-extrabold text-blue-900">{value}</p>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColorClasses(color)}`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

const DetailCard = ({ label, value, icon }) => (
  <div className="bg-blue-50 rounded-xl p-4 text-center">
    <div className="flex justify-center mb-2">
      {React.cloneElement(icon, { className: 'w-5 h-5 text-blue-600' })}
    </div>
    <div className="text-xs font-semibold text-blue-900/70 mb-1">{label}</div>
    <div className="text-lg font-bold text-blue-900">{value}</div>
  </div>
);

const CoordinateItem = ({ label, value }) => (
  <div className="text-center">
    <div className="text-sm font-semibold text-blue-900/70">{label}</div>
    <div className="text-blue-900 font-bold">{value}</div>
  </div>
);

export default BoundaryManagement;