import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Building, Mail, Phone, MapPin, Users, Shield, Bell, Save } from 'lucide-react';

const EnterpriseSettings = ({ enterpriseData }) => {
  const [settings, setSettings] = useState({
    company: {
      name: enterpriseData.name,
      email: enterpriseData.email,
      phone: enterpriseData.contact,
      address: enterpriseData.address
    },
    notifications: {
      emailAlerts: true,
      pushNotifications: true,
      smsAlerts: false,
      weeklyReports: true
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    }
  });

  const handleSave = () => {
    // Save settings to Firebase
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Enterprise Settings</h2>
          <p className="text-blue-900/70">Manage your enterprise profile and preferences</p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Company Information</h3>
            <div className="space-y-4">
              <SettingsInput
                icon={<Building className="w-4 h-4" />}
                label="Company Name"
                value={settings.company.name}
                onChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, name: value }
                })}
              />
              <SettingsInput
                icon={<Mail className="w-4 h-4" />}
                label="Email"
                type="email"
                value={settings.company.email}
                onChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, email: value }
                })}
              />
              <SettingsInput
                icon={<Phone className="w-4 h-4" />}
                label="Phone"
                type="tel"
                value={settings.company.phone}
                onChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, phone: value }
                })}
              />
              <SettingsInput
                icon={<MapPin className="w-4 h-4" />}
                label="Address"
                value={settings.company.address}
                onChange={(value) => setSettings({
                  ...settings,
                  company: { ...settings.company, address: value }
                })}
              />
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Security Settings</h3>
            <div className="space-y-4">
              <SettingsToggle
                icon={<Shield className="w-4 h-4" />}
                label="Two-Factor Authentication"
                description="Add an extra layer of security to your account"
                enabled={settings.security.twoFactorAuth}
                onChange={(value) => setSettings({
                  ...settings,
                  security: { ...settings.security, twoFactorAuth: value }
                })}
              />
              <SettingsSelect
                label="Session Timeout"
                description="Automatically log out after period of inactivity"
                value={settings.security.sessionTimeout}
                options={[
                  { value: 15, label: '15 minutes' },
                  { value: 30, label: '30 minutes' },
                  { value: 60, label: '1 hour' },
                  { value: 120, label: '2 hours' }
                ]}
                onChange={(value) => setSettings({
                  ...settings,
                  security: { ...settings.security, sessionTimeout: value }
                })}
              />
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <SettingsToggle
                icon={<Bell className="w-4 h-4" />}
                label="Email Alerts"
                description="Receive important alerts via email"
                enabled={settings.notifications.emailAlerts}
                onChange={(value) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, emailAlerts: value }
                })}
              />
              <SettingsToggle
                icon={<Bell className="w-4 h-4" />}
                label="Push Notifications"
                description="Get instant notifications in your browser"
                enabled={settings.notifications.pushNotifications}
                onChange={(value) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, pushNotifications: value }
                })}
              />
              <SettingsToggle
                icon={<Bell className="w-4 h-4" />}
                label="SMS Alerts"
                description="Receive critical alerts via SMS"
                enabled={settings.notifications.smsAlerts}
                onChange={(value) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, smsAlerts: value }
                })}
              />
              <SettingsToggle
                icon={<Bell className="w-4 h-4" />}
                label="Weekly Reports"
                description="Get weekly performance reports"
                enabled={settings.notifications.weeklyReports}
                onChange={(value) => setSettings({
                  ...settings,
                  notifications: { ...settings.notifications, weeklyReports: value }
                })}
              />
            </div>
          </div>

          {/* Account Summary */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-blue-900 mb-4">Account Summary</h3>
            <div className="space-y-3">
              <SummaryItem label="Plan" value={enterpriseData.subscription} />
              <SummaryItem label="Billing Cycle" value={enterpriseData.billingCycle} />
              <SummaryItem label="Active Since" value={enterpriseData.activeSince} />
              <SummaryItem label="Fleet Size" value={`${enterpriseData.fleetSize} vehicles`} />
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-white/60 backdrop-blur-lg border border-red-200 rounded-2xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-red-900 mb-4">Danger Zone</h3>
            <div className="space-y-3">
              <button className="w-full bg-red-100 text-red-700 py-3 rounded-lg hover:bg-red-200 transition font-semibold">
                Export All Data
              </button>
              <button className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition font-semibold">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SettingsInput = ({ icon, label, type = 'text', value, onChange }) => (
  <div>
    <label className="block text-sm font-semibold text-blue-900 mb-2">
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

const SettingsToggle = ({ icon, label, description, enabled, onChange }) => (
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
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const SettingsSelect = ({ label, description, value, options, onChange }) => (
  <div>
    <div className="mb-2">
      <div className="font-semibold text-blue-900 text-sm">{label}</div>
      <div className="text-xs text-blue-900/70">{description}</div>
    </div>
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

const SummaryItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2 border-b border-blue-100">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-semibold text-blue-900">{value}</span>
  </div>
);

export default EnterpriseSettings;