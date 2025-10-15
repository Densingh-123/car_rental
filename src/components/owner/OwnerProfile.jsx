// src/components/owner/OwnerProfile.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Shield, Bell, Save, Edit } from 'lucide-react';

const OwnerProfile = ({ userProfile, vehicleData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userProfile?.displayName || 'John Doe',
    email: userProfile?.email || 'john.doe@example.com',
    phone: '+91 9876543210',
    address: 'Bangalore, Karnataka, India',
    emergencyContact: '+91 9876543211',
    notifications: { email: true, push: true, sms: false },
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Profile Settings</h2>
          <p className="text-blue-900/70">Manage your personal information and preferences</p>
        </div>
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              <Edit className="w-4 h-4" />
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Personal Information */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <ProfileField
                icon={<User className="w-4 h-4" />}
                label="Full Name"
                value={profileData.name}
                editing={isEditing}
                onChange={(value) => setProfileData({ ...profileData, name: value })}
              />
              <ProfileField
                icon={<Mail className="w-4 h-4" />}
                label="Email Address"
                value={profileData.email}
                editing={isEditing}
                onChange={(value) => setProfileData({ ...profileData, email: value })}
              />
              <ProfileField
                icon={<Phone className="w-4 h-4" />}
                label="Phone Number"
                value={profileData.phone}
                editing={isEditing}
                onChange={(value) => setProfileData({ ...profileData, phone: value })}
              />
              <ProfileField
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value={profileData.address}
                editing={isEditing}
                onChange={(value) => setProfileData({ ...profileData, address: value })}
              />
              <ProfileField
                icon={<Shield className="w-4 h-4" />}
                label="Emergency Contact"
                value={profileData.emergencyContact}
                editing={isEditing}
                onChange={(value) => setProfileData({ ...profileData, emergencyContact: value })}
              />
            </div>
          </div>

          {/* Notification Preferences */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <NotificationToggle
                icon={<Bell className="w-4 h-4" />}
                label="Email Notifications"
                description="Receive important updates via email"
                enabled={profileData.notifications.email}
                onChange={(value) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, email: value },
                  })
                }
              />
              <NotificationToggle
                icon={<Bell className="w-4 h-4" />}
                label="Push Notifications"
                description="Get instant notifications in your browser"
                enabled={profileData.notifications.push}
                onChange={(value) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, push: value },
                  })
                }
              />
              <NotificationToggle
                icon={<Bell className="w-4 h-4" />}
                label="SMS Alerts"
                description="Receive critical alerts via SMS"
                enabled={profileData.notifications.sms}
                onChange={(value) =>
                  setProfileData({
                    ...profileData,
                    notifications: { ...profileData.notifications, sms: value },
                  })
                }
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Summary */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">{profileData.name}</h3>
              <p className="text-blue-900/70">Vehicle Owner</p>
              <p className="text-sm text-blue-900/70 mt-2">Member since 2023</p>
            </div>
          </div>

          {/* Vehicle Summary */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Vehicle Summary</h3>
            <div className="space-y-3">
              <SummaryItem label="Vehicle" value={vehicleData.model} />
              <SummaryItem label="Plate Number" value={vehicleData.plateNumber} />
              <SummaryItem label="Assigned Driver" value={vehicleData.driver?.name} />
              <SummaryItem label="Insurance" value={vehicleData.insurance} />
              <SummaryItem label="Total Trips" value={vehicleData.stats?.totalTrips || 0} />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition">
                <div className="font-semibold text-blue-900 text-sm">Change Password</div>
                <div className="text-xs text-blue-900/70">Update your login credentials</div>
              </button>
              <button className="w-full text-left p-3 bg-green-50 rounded-lg border border-green-200 hover:bg-green-100 transition">
                <div className="font-semibold text-blue-900 text-sm">Download Data</div>
                <div className="text-xs text-blue-900/70">Export your vehicle history</div>
              </button>
              <button className="w-full text-left p-3 bg-red-50 rounded-lg border border-red-200 hover:bg-red-100 transition">
                <div className="font-semibold text-red-900 text-sm">Delete Account</div>
                <div className="text-xs text-red-900/70">Permanently remove your account</div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ------------------------------------------------------------------
// Helper components
// ------------------------------------------------------------------
const ProfileField = ({ icon, label, value, editing, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-blue-900 mb-2">
      <div className="flex items-center gap-2">{icon}{label}</div>
    </label>
    {editing ? (
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
      />
    ) : (
      <div className="w-full px-3 py-2 border border-transparent rounded-lg bg-blue-50 text-black">{value}</div>
    )}
  </div>
);

const NotificationToggle = ({ icon, label, description, enabled, onChange }) => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { className: 'w-4 h-4 text-blue-600' })}
      <div>
        <div className="font-semibold text-blue-900 text-sm">{label}</div>
        <div className="text-xs text-blue-900/70">{description}</div>
      </div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={enabled}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-600 peer-focus:ring-4 peer-focus:ring-blue-300 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full peer-checked:after:border-white" />
    </label>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-100">
    <span className="text-blue-900/70 text-sm">{label}</span>
    <span className="font-semibold text-blue-900 text-sm">{value ?? '—'}</span>
  </div>
);

export default OwnerProfile;