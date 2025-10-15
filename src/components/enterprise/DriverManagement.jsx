import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Plus, Edit, Trash2, Phone, Mail, Car, Award } from 'lucide-react';

const DriverManagement = ({ drivers, onAddUser, onUpdateUser, onDeleteUser }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    license: '',
    experience: '',
    status: 'active',
    role: 'driver'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onAddUser(formData);
      setShowAddModal(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        license: '',
        experience: '',
        status: 'active',
        role: 'driver'
      });
    } catch (error) {
      alert('Error adding driver: ' + error.message);
    }
  };

  const handleDelete = async (driverId) => {
    if (window.confirm('Are you sure you want to delete this driver?')) {
      try {
        await onDeleteUser(driverId);
      } catch (error) {
        alert('Error deleting driver: ' + error.message);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Driver Management</h2>
          <p className="text-blue-900/70">Manage your drivers and assignments</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          Add Driver
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Drivers List */}
        <div className="lg:col-span-2">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Drivers ({drivers.length})</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {drivers.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 border-b border-white/20 cursor-pointer transition-all ${
                    selectedDriver?.id === driver.id ? 'bg-blue-50' : 'hover:bg-white/30'
                  }`}
                  onClick={() => setSelectedDriver(driver)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-900">{driver.name}</h4>
                        <p className="text-sm text-blue-900/70">{driver.license}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(driver.status)}`}>
                      {driver.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                    <div className="flex items-center gap-2">
                      <Mail className="w-3 h-3 text-blue-600" />
                      <span className="truncate text-black font-bold">{driver.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3 text-green-600 " />
                      <span className="truncate text-black font-bold">{driver.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-3 h-3 text-purple-600" />
                      <span className="truncate text-black font-bold">{driver.experience} experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Car className="w-3 h-3 text-orange-600" />
                      <span className="truncate text-black font-bold">Assigned: 1</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 bg-blue-100 text-blue-700 py-1 rounded text-sm font-semibold hover:bg-blue-200 transition flex items-center justify-center gap-1">
                      <Edit className="w-3 h-3" />
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(driver.id);
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

        {/* Driver Details */}
        <div className="space-y-6">
          {selectedDriver ? (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-4">Driver Details</h3>
              <div className="space-y-4">
                <DetailItem label="Full Name" value={selectedDriver.name} />
                <DetailItem label="Email" value={selectedDriver.email} />
                <DetailItem label="Phone" value={selectedDriver.phone} />
                <DetailItem label="License" value={selectedDriver.license} />
                <DetailItem label="Experience" value={selectedDriver.experience} />
                <DetailItem label="Status" value={selectedDriver.status} />
                {selectedDriver.createdAt && (
                  <DetailItem 
                    label="Joined" 
                    value={new Date(selectedDriver.createdAt).toLocaleDateString()} 
                  />
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">Performance</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <PerformanceMetric label="Safety Score" value="88" color="green" />
                  <PerformanceMetric label="Trips Completed" value="156" color="blue" />
                  <PerformanceMetric label="Fuel Efficiency" value="15.2" color="purple" />
                  <PerformanceMetric label="Rating" value="4.8" color="orange" />
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-12 shadow-lg text-center">
              <Users className="w-16 h-16 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-900 mb-2">Select a Driver</h3>
              <p className="text-blue-900/70">Choose a driver from the list to view details</p>
            </div>
          )}

          {/* Driver Stats */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Driver Statistics</h3>
            <div className="space-y-3">
              <StatItem label="Total Drivers" value={drivers.length} />
              <StatItem label="Active" value={drivers.filter(d => d.status === 'active').length} />
              <StatItem label="Available" value={drivers.filter(d => !d.assignedVehicle).length} />
              <StatItem label="Avg. Rating" value="4.7" />
            </div>
          </div>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-6 w-full max-w-md"
          >
            <h3 className="text-xl font-bold text-blue-900 mb-4">Add New Driver</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="john@example.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-blue-900 mb-2">License</label>
                  <input
                    type="text"
                    required
                    value={formData.license}
                    onChange={(e) => setFormData({...formData, license: e.target.value})}
                    className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="DL0420181234567"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-blue-900 mb-2">Experience</label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) => setFormData({...formData, experience: e.target.value})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="5 years"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                  Add Driver
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

const PerformanceMetric = ({ label, value, color }) => {
  const getColorClass = (color) => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'blue': return 'text-blue-600';
      case 'purple': return 'text-purple-600';
      case 'orange': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="text-center">
      <div className="text-xs text-blue-900/70 mb-1">{label}</div>
      <div className={`text-lg font-bold ${getColorClass(color)}`}>{value}</div>
    </div>
  );
};

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center">
    <span className="text-blue-900/70">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default DriverManagement;