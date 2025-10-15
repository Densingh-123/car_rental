import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Plus, Edit, Trash2, Fuel, Gauge, Battery, MapPin, Users } from 'lucide-react';

const VehicleManagement = ({ vehicles, onAddVehicle, onUpdateVehicle, onDeleteVehicle }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    driverName: '',
    driverPhone: '',
    fuelType: 'petrol',
    maxSpeed: '120',
    status: 'active'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddVehicle(formData);
      setShowAddModal(false);
      setFormData({
        plateNumber: '',
        model: '',
        driverName: '',
        driverPhone: '',
        fuelType: 'petrol',
        maxSpeed: '120',
        status: 'active'
      });
    } catch (error) {
      alert('Error adding vehicle: ' + error.message);
    }
  };

  const handleDelete = async (vehicleId) => {
    if (window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await onDeleteVehicle(vehicleId);
      } catch (error) {
        alert('Error deleting vehicle: ' + error.message);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-yellow-600 bg-yellow-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Vehicle Management</h2>
          <p className="text-blue-900/70">Manage your fleet vehicles and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Vehicles List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Fleet Vehicles ({vehicles.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {vehicles.map((vehicle, index) => (
                <motion.div
                  key={vehicle.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 border-b border-white/20 cursor-pointer transition-all ${
                    selectedVehicle?.id === vehicle.id ? 'bg-blue-50' : 'hover:bg-white/30'
                  }`}
                  onClick={() => setSelectedVehicle(vehicle)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900">{vehicle.plateNumber}</h4>
                        <p className="text-sm text-blue-900/70">{vehicle.model}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Users className="w-3 h-3 text-blue-600" />
                      <span>{vehicle.driverName || 'Unassigned'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Fuel className="w-3 h-3 text-green-600" />
                      <span>{vehicle.fuelType}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Gauge className="w-3 h-3 text-purple-600" />
                      <span>{vehicle.maxSpeed} km/h limit</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Battery className="w-3 h-3 text-orange-600" />
                      <span>Good</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-1 rounded text-sm font-semibold hover:bg-blue-200 transition flex items-center justify-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(vehicle.id);
                      }}
                      className="flex-1 bg-red-100 text-red-700 py-1 rounded text-sm font-semibold hover:bg-red-200 transition flex items-center justify-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className="space-y-6">
          {selectedVehicle ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4">Vehicle Details</h3>
              <div className="space-y-4">
                <DetailItem label="Plate Number" value={selectedVehicle.plateNumber} />
                <DetailItem label="Model" value={selectedVehicle.model} />
                <DetailItem label="Driver" value={selectedVehicle.driverName || 'Unassigned'} />
                <DetailItem label="Phone" value={selectedVehicle.driverPhone || 'N/A'} />
                <DetailItem label="Fuel Type" value={selectedVehicle.fuelType} />
                <DetailItem label="Max Speed" value={`${selectedVehicle.maxSpeed} km/h`} />
                <DetailItem label="Status" value={selectedVehicle.status} />
                {selectedVehicle.createdAt && (
                  <DetailItem 
                    label="Registered" 
                    value={new Date(selectedVehicle.createdAt).toLocaleDateString()} 
                  />
                )}
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <Car className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Vehicle</h3>
              <p className="text-blue-900/70">Choose a vehicle from the list to view details</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Fleet Summary</h3>
            <div className="space-y-3">
              <SummaryItem label="Total Vehicles" value={vehicles.length} />
              <SummaryItem label="Active" value={vehicles.filter(v => v.status === 'active').length} />
              <SummaryItem label="In Maintenance" value={vehicles.filter(v => v.status === 'maintenance').length} />
              <SummaryItem label="Available" value={vehicles.filter(v => !v.driverName).length} />
            </div>
          </div>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4">Add New Vehicle</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Plate Number</label>
                <input
                  type="text"
                  required
                  value={formData.plateNumber}
                  onChange={(e) => setFormData({...formData, plateNumber: e.target.value})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Toyota Innova"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Driver Name</label>
                  <input
                    type="text"
                    value={formData.driverName}
                    onChange={(e) => setFormData({...formData, driverName: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Driver Phone</label>
                  <input
                    type="tel"
                    value={formData.driverPhone}
                    onChange={(e) => setFormData({...formData, driverPhone: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Optional"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Fuel Type</label>
                  <select
                    value={formData.fuelType}
                    onChange={(e) => setFormData({...formData, fuelType: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="electric">Electric</option>
                    <option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Max Speed</label>
                  <input
                    type="number"
                    required
                    value={formData.maxSpeed}
                    onChange={(e) => setFormData({...formData, maxSpeed: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="120"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add Vehicle
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-100">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900/70">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default VehicleManagement;