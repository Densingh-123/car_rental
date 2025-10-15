import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Gauge, Fuel, MapPin, Edit, Trash2, Battery, Wrench } from 'lucide-react';

const VehicleManagement = ({ vehicles, onUpdateVehicle, onDeleteVehicle }) => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleStatusChange = async (vehicleId, newStatus) => {
    try {
      await onUpdateVehicle(vehicleId, { status: newStatus });
    } catch (error) {
      alert('Error updating vehicle: ' + error.message);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-900">Vehicle Management</h2>
        <p className="text-blue-900/70">Monitor and manage fleet vehicles</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicles List */}
        <div className="space-y-4">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white/60 backdrop-blur-lg border rounded-2xl p-4 shadow-lg cursor-pointer hover:shadow-xl transition ${
                selectedVehicle?.id === vehicle.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-white/30'
              }`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-blue-900">{vehicle.plateNumber}</h3>
                    <p className="text-sm text-blue-900/70">{vehicle.model}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  vehicle.status === 'active' ? 'bg-green-100 text-green-800' : 
                  vehicle.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-blue-600" />
                  <span>{vehicle.currentSpeed || 0} km/h</span>
                </div>
                <div className="flex items-center gap-2">
                  <Fuel className="w-4 h-4 text-green-600" />
                  <span>{vehicle.fuelLevel || 100}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-purple-600" />
                  <span>{vehicle.maintenanceStatus || 'Good'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-red-600" />
                  <span>{vehicle.driverName || 'No driver'}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <select
                  value={vehicle.status}
                  onChange={(e) => handleStatusChange(vehicle.id, e.target.value)}
                  className="flex-1 text-sm border border-blue-200 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(vehicle.id);
                  }}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vehicle Details */}
        <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-bold text-blue-900 mb-4">Vehicle Details</h3>
          {selectedVehicle ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Plate Number" value={selectedVehicle.plateNumber} />
                <DetailItem label="Model" value={selectedVehicle.model} />
                <DetailItem label="Driver" value={selectedVehicle.driverName} />
                <DetailItem label="Phone" value={selectedVehicle.driverPhone} />
                <DetailItem label="Fuel Type" value={selectedVehicle.fuelType} />
                <DetailItem label="Max Speed" value={`${selectedVehicle.maxSpeed} km/h`} />
              </div>
              
              <div className="border-t border-blue-200 pt-4">
                <h4 className="font-semibold text-blue-900 mb-3">Real-time Data</h4>
                <div className="grid grid-cols-2 gap-3">
                  <DataCard 
                    icon={<Gauge className="w-4 h-4" />}
                    label="Current Speed"
                    value={`${selectedVehicle.currentSpeed || 0} km/h`}
                    color={selectedVehicle.currentSpeed > 80 ? 'text-red-600' : 'text-green-600'}
                  />
                  <DataCard 
                    icon={<Fuel className="w-4 h-4" />}
                    label="Fuel Level"
                    value={`${selectedVehicle.fuelLevel || 100}%`}
                    color="text-blue-600"
                  />
                  <DataCard 
                    icon={<Battery className="w-4 h-4" />}
                    label="Engine Health"
                    value={selectedVehicle.maintenanceStatus || 'Good'}
                    color={selectedVehicle.maintenanceStatus === 'due' ? 'text-yellow-600' : 'text-green-600'}
                  />
                  <DataCard 
                    icon={<Wrench className="w-4 h-4" />}
                    label="Brake Condition"
                    value="Good"
                    color="text-green-600"
                  />
                </div>
              </div>

              {selectedVehicle.boundary && (
                <div className="border-t border-blue-200 pt-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Boundary Settings</h4>
                  <div className="text-sm text-blue-900/70 space-y-1">
                    <div>Latitude: {selectedVehicle.boundary.minLat} to {selectedVehicle.boundary.maxLat}</div>
                    <div>Longitude: {selectedVehicle.boundary.minLng} to {selectedVehicle.boundary.maxLng}</div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center text-blue-900/60 py-8">
              <Car className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Select a vehicle to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }) => (
  <div>
    <p className="text-sm font-semibold text-blue-900/70">{label}</p>
    <p className="text-blue-900 font-medium">{value || 'N/A'}</p>
  </div>
);

const DataCard = ({ icon, label, value, color }) => (
  <div className="bg-blue-50 rounded-lg p-3">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="text-xs font-semibold text-blue-900/70">{label}</span>
    </div>
    <p className={`font-bold ${color}`}>{value}</p>
  </div>
);

export default VehicleManagement;