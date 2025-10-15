import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Settings, CheckCircle, AlertTriangle, Info, MessageCircle } from 'lucide-react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'alert',
      title: 'Overspeed Alert',
      message: 'Your vehicle exceeded speed limit by 15km/h',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      read: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'maintenance',
      title: 'Service Reminder',
      message: 'Next service due in 500km',
      timestamp: new Date(Date.now() - 600000).toISOString(),
      read: false,
      priority: 'medium'
    },
    {
      id: 3,
      type: 'info',
      title: 'System Update',
      message: 'New features available in your dashboard',
      timestamp: new Date(Date.now() - 900000).toISOString(),
      read: true,
      priority: 'low'
    },
    {
      id: 4,
      type: 'billing',
      title: 'Payment Successful',
      message: 'Your monthly subscription has been renewed',
      timestamp: new Date(Date.now() - 1200000).toISOString(),
      read: true,
      priority: 'low'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif => 
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert': return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'maintenance': return <Settings className="w-5 h-5 text-yellow-500" />;
      case 'billing': return <CheckCircle className="w-5 h-5 text-green-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-red-500';
      case 'medium': return 'border-l-yellow-500';
      case 'low': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Notifications</h2>
          <p className="text-blue-900/70">Stay updated with important alerts and messages</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-2 rounded-lg">
            <Bell className="w-4 h-4" />
            <span className="text-sm font-semibold">{unreadCount} Unread</span>
          </div>
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            <CheckCircle className="w-4 h-4" />
            Mark All Read
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Notification Settings */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Notification Settings</h3>
            <div className="space-y-4">
              <NotificationSetting
                label="Push Notifications"
                description="Receive instant browser notifications"
                enabled={true}
              />
              <NotificationSetting
                label="Email Alerts"
                description="Get important updates via email"
                enabled={true}
              />
              <NotificationSetting
                label="SMS Notifications"
                description="Critical alerts via SMS"
                enabled={false}
              />
              <NotificationSetting
                label="Weekly Reports"
                description="Weekly vehicle performance summary"
                enabled={true}
              />
            </div>
          </div>

          {/* Notification Stats */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Notification Stats</h3>
            <div className="space-y-3">
              <StatItem label="Total Notifications" value={notifications.length} />
              <StatItem label="Unread" value={unreadCount} />
              <StatItem label="This Week" value="12" />
              <StatItem label="Alerts" value="8" />
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="lg:col-span-3">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
            <div className="p-4 border-b border-white/20">
              <h3 className="font-bold text-blue-900">Recent Notifications</h3>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-4 border-b border-white/20 hover:bg-white/30 transition-colors border-l-4 ${getPriorityColor(notification.priority)} ${
                    !notification.read ? 'bg-blue-50/50' : ''
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-blue-100">
                        {getNotificationIcon(notification.type)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h4 className="font-semibold text-blue-900">{notification.title}</h4>
                          {!notification.read && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                              New
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-blue-900/70">{notification.message}</p>
                      </div>
                    </div>
                    <span className="text-xs text-blue-900/60">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-blue-900/60">
                      {new Date(notification.timestamp).toLocaleDateString()}
                    </span>
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-semibold hover:bg-green-200 transition flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark Read
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const NotificationSetting = ({ label, description, enabled }) => (
  <div className="flex items-center justify-between">
    <div>
      <div className="font-semibold text-blue-900 text-sm">{label}</div>
      <div className="text-xs text-blue-900/70">{description}</div>
    </div>
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={enabled}
        className="sr-only peer"
        readOnly
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
    </label>
  </div>
);

const StatItem = ({ label, value }) => (
  <div className="flex justify-between items-center py-2">
    <span className="text-blue-900/70 font-semibold">{label}</span>
    <span className="font-bold text-blue-900">{value}</span>
  </div>
);

export default Notifications;