import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Power, Lock, Unlock, AlertTriangle, CheckCircle, Car, Battery } from 'lucide-react';

const RemoteImmobilizer = ({ vehicles, onUpdateVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [actionHistory, setActionHistory] = useState([
    {
      id: 1,
      vehicle: 'KA01AB1234',
      action: 'engine_kill',
      status: 'success',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      initiatedBy: 'Admin User'
    },
    {
      id: 2,
      vehicle: 'KA01CD5678',
      action: 'engine_resume',
      status: 'success',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      initiatedBy: 'Admin User'
    }
  ]);

  const handleImmobilize = async (vehicleId) => {
    if (window.confirm(`Are you sure you want to immobilize vehicle ${vehicleId}? This will shut down the engine immediately.`)) {
      try {
        await onUpdateVehicle(vehicleId, { 
          status: 'immobilized',
          lastImmobilized: new Date().toISOString()
        });
        
        setActionHistory(prev => [{
          id: Date.now(),
          vehicle: vehicles.find(v => v.id === vehicleId)?.plateNumber,
          action: 'engine_kill',
          status: 'success',
          timestamp: new Date().toISOString(),
          initiatedBy: 'Admin User'
        }, ...prev]);

        alert('Vehicle successfully immobilized');
      } catch (error) {
        alert('Error immobilizing vehicle: ' + error.message);
      }
    }
  };

  const handleResume = async (vehicleId) => {
    try {
      await onUpdateVehicle(vehicleId, { 
        status: 'active',
        lastResumed: new Date().toISOString()
      });
      
      setActionHistory(prev => [{
        id: Date.now(),
        vehicle: vehicles.find(v => v.id === vehicleId)?.plateNumber,
        action: 'engine_resume',
        status: 'success',
        timestamp: new Date().toISOString(),
        initiatedBy: 'Admin User'
      }, ...prev]);

      alert('Vehicle engine resumed successfully');
    } catch (error) {
      alert('Error resuming vehicle: ' + error.message);
    }
  };

  const getVehicleStatus = (vehicle) => {
    if (vehicle.status === 'immobilized') return 'immobilized';
    if (vehicle.status === 'active') return 'active';
    return 'inactive';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'immobilized': return 'text-red-600 bg-red-100';
      case 'inactive': return 'text-gray-600 bg-gray-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Remote Immobilizer</h2>
          <p className="text-blue-900/70">One-click engine kill / resume for security</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-red-100 text-red-800 px-3 py-2 rounded-lg">
            <Shield className="w-4 h-4" />
            <span className="text-sm font-semibold">Security Active</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles List */}
        <div className="space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-4 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Fleet Control</h3>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {vehicles.map((vehicle, index) => {
                const status = getVehicleStatus(vehicle);
                
                return (
                  <motion.div
                    key={vehicle.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedVehicle?.id === vehicle.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-white/50 hover:border-blue-300'
                    }`}
                    onClick={() => setSelectedVehicle(vehicle)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          status === 'active' ? 'bg-green-500' :
                          status === 'immobilized' ? 'bg-red-500' : 'bg-gray-500'
                        }`} />
                        <div>
                          <h4 className="font-bold text-blue-900">{vehicle.plateNumber}</h4>
                          <p className="text-sm text-blue-900/70">{vehicle.driverName}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {status === 'active' ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleImmobilize(vehicle.id);
                          }}
                          className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center gap-2"
                        >
                          <Power className="w-4 h-4" />
                          Immobilize
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleResume(vehicle.id);
                          }}
                          className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2"
                        >
                          <Power className="w-4 h-4" />
                          Resume
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Control Panel and History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Control Panel */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-6">Remote Control Panel</h3>
            
            {selectedVehicle ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Car className="w-8 h-8 text-green-600" />
                    </div>
                    <h4 className="font-semibold text-blue-900 mb-2">{selectedVehicle.plateNumber}</h4>
                    <p className="text-sm text-blue-900/70">{selectedVehicle.model}</p>
                    <p className="text-sm text-blue-900/70">Driver: {selectedVehicle.driverName}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Current Status:</span>
                      <span className={`font-semibold ${getStatusColor(getVehicleStatus(selectedVehicle))}`}>
                        {getVehicleStatus(selectedVehicle).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Fuel Level:</span>
                      <span className="font-semibold text-blue-900">{selectedVehicle.fuelLevel || 100}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-900/70">Last Update:</span>
                      <span className="font-semibold text-blue-900">
                        {selectedVehicle.lastImmobilized || selectedVehicle.lastResumed 
                          ? new Date(selectedVehicle.lastImmobilized || selectedVehicle.lastResumed).toLocaleTimeString()
                          : 'Never'
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-blue-200 pt-6">
                  <div className="flex gap-4 justify-center">
                    {getVehicleStatus(selectedVehicle) === 'active' ? (
                      <button
                        onClick={() => handleImmobilize(selectedVehicle.id)}
                        className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2 font-semibold"
                      >
                        <Lock className="w-5 h-5" />
                        IMMOBILIZE VEHICLE
                      </button>
                    ) : (
                      <button
                        onClick={() => handleResume(selectedVehicle.id)}
                        className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 font-semibold"
                      >
                        <Unlock className="w-5 h-5" />
                        RESUME VEHICLE
                      </button>
                    )}
                  </div>
                  
                  <div className="mt-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm text-blue-900/70">
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                      <span>Immobilization will shut down engine immediately</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Shield className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-blue-900 mb-2">Select a Vehicle</h4>
                <p className="text-blue-900/70">Choose a vehicle to enable remote immobilization controls</p>
              </div>
            )}
          </div>

          {/* Action History */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Action History</h3>
            </div>
            <div className="max-h-64 overflow-y-auto">
              {actionHistory.map((action, index) => (
                <div key={action.id} className="p-4 border-b border-white/20 hover:bg-white/30 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {action.status === 'success' ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-5 h-5 text-red-600" />
                      )}
                      <div>
                        <span className="font-semibold text-blue-900">{action.vehicle}</span>
                        <span className="text-blue-900/70 mx-2">•</span>
                        <span className="text-blue-900/70 capitalize">{action.action.replace('_', ' ')}</span>
                      </div>
                    </div>
                    <span className="text-sm text-blue-900/60">
                      {new Date(action.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="text-sm text-blue-900/70">
                    Initiated by {action.initiatedBy} • Status: 
                    <span className={`ml-1 font-semibold ${
                      action.status === 'success' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {action.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RemoteImmobilizer;