import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail, Star, Send, Clock, CheckCircle } from 'lucide-react';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'user',
      message: 'Hello, I need help with my vehicle tracking.',
      timestamp: new Date(Date.now() - 300000).toISOString()
    },
    {
      id: 2,
      type: 'support',
      message: 'Hi! I\'d be happy to help. What seems to be the issue with your vehicle tracking?',
      timestamp: new Date(Date.now() - 240000).toISOString()
    },
    {
      id: 3,
      type: 'user',
      message: 'The live location is not updating properly.',
      timestamp: new Date(Date.now() - 180000).toISOString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [feedback, setFeedback] = useState({
    rating: 0,
    comment: '',
    category: 'general'
  });

  const supportCategories = [
    { id: 'technical', label: 'Technical Support', icon: '🔧' },
    { id: 'billing', label: 'Billing Issues', icon: '💰' },
    { id: 'vehicle', label: 'Vehicle Problems', icon: '🚗' },
    { id: 'app', label: 'App Features', icon: '📱' },
    { id: 'emergency', label: 'Emergency', icon: '🚨' },
    { id: 'general', label: 'General Inquiry', icon: '💬' }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        message: newMessage,
        timestamp: new Date().toISOString()
      };
      setMessages([...messages, userMessage]);
      setNewMessage('');

      // Simulate support response
      setTimeout(() => {
        const supportMessage = {
          id: messages.length + 2,
          type: 'support',
          message: 'Thank you for your message. Our support team will get back to you shortly.',
          timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 2000);
    }
  };

  const submitFeedback = () => {
    if (feedback.rating > 0) {
      alert('Thank you for your feedback!');
      setFeedback({ rating: 0, comment: '', category: 'general' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-blue-900">Support Center</h2>
          <p className="text-blue-900/70">Get help and share your feedback</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-2 rounded-lg">
          <CheckCircle className="w-4 h-4" />
          <span className="text-sm font-semibold">Support Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Support Options */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Support Options</h3>
            <div className="space-y-3">
              <SupportOption
                icon={<MessageCircle className="w-4 h-4" />}
                label="Live Chat"
                description="Instant help"
                active={activeTab === 'chat'}
                onClick={() => setActiveTab('chat')}
              />
              <SupportOption
                icon={<Phone className="w-4 h-4" />}
                label="Call Support"
                description="+1 (555) 123-4567"
                active={activeTab === 'call'}
                onClick={() => setActiveTab('call')}
              />
              <SupportOption
                icon={<Mail className="w-4 h-4" />}
                label="Email Support"
                description="support@yantrakavasam.com"
                active={activeTab === 'email'}
                onClick={() => setActiveTab('email')}
              />
              <SupportOption
                icon={<Star className="w-4 h-4" />}
                label="Feedback"
                description="Share your experience"
                active={activeTab === 'feedback'}
                onClick={() => setActiveTab('feedback')}
              />
            </div>
          </div>

          {/* Quick Help */}
          <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
            <h3 className="font-bold text-blue-900 mb-4">Quick Help</h3>
            <div className="space-y-2">
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-sm">
                How to set up geo-fencing?
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-sm">
                Understanding driving scores
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-sm">
                Billing and payment help
              </button>
              <button className="w-full text-left p-3 bg-blue-50 rounded-lg border border-blue-200 hover:bg-blue-100 transition text-sm">
                Vehicle maintenance guide
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {activeTab === 'chat' && (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg overflow-hidden">
              <div className="p-4 border-b border-white/20">
                <h3 className="font-bold text-blue-900">Live Chat Support</h3>
                <p className="text-sm text-blue-900/70">Chat with our support team in real-time</p>
              </div>
              
              {/* Chat Messages */}
              <div className="h-96 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${
                      msg.type === 'user' 
                        ? 'bg-blue-600 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-900 rounded-bl-none'
                    }`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className={`text-xs mt-1 ${
                        msg.type === 'user' ? 'text-blue-200' : 'text-gray-600'
                      }`}>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-bold text-blue-900 mb-4">Share Your Feedback</h3>
              
              {/* Rating */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  How would you rate your experience?
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setFeedback({...feedback, rating: star})}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition ${
                        star <= feedback.rating
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      <Star className={`w-5 h-5 ${star <= feedback.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Category
                </label>
                <select
                  value={feedback.category}
                  onChange={(e) => setFeedback({...feedback, category: e.target.value})}
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {supportCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>
                      {cat.icon} {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-blue-900 mb-3">
                  Your Comments
                </label>
                <textarea
                  value={feedback.comment}
                  onChange={(e) => setFeedback({...feedback, comment: e.target.value})}
                  rows="4"
                  placeholder="Tell us about your experience..."
                  className="w-full px-3 py-2 border border-blue-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <button
                onClick={submitFeedback}
                disabled={feedback.rating === 0}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-semibold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Submit Feedback
              </button>
            </div>
          )}

          {activeTab === 'call' && (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Call Support</h3>
              <p className="text-blue-900/70 mb-4">Speak directly with our support team</p>
              <div className="text-2xl font-bold text-blue-900 mb-6">+1 (555) 123-4567</div>
              <div className="space-y-2 text-sm text-blue-900/70">
                <p>🕐 Available 24/7</p>
                <p>🌍 International toll-free</p>
                <p>⚡ Emergency support</p>
              </div>
            </div>
          )}

          {activeTab === 'email' && (
            <div className="bg-white/60 backdrop-blur-lg border border-white/30 rounded-2xl p-8 shadow-lg text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-2">Email Support</h3>
              <p className="text-blue-900/70 mb-4">Send us an email and we'll respond within 24 hours</p>
              <div className="text-xl font-bold text-blue-900 mb-2">support@yantrakavasam.com</div>
              <p className="text-sm text-blue-900/70 mb-6">For general inquiries and non-urgent matters</p>
              <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold">
                Compose Email
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SupportOption = ({ icon, label, description, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full p-3 rounded-xl border text-left transition-colors ${
      active
        ? 'bg-blue-600 text-white border-blue-600'
        : 'bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-700'
    }`}
  >
    <div className="flex items-center gap-3">
      {React.cloneElement(icon, { className: 'w-4 h-4' })}
      <div>
        <div className="font-semibold text-sm">{label}</div>
        <div className="text-xs opacity-70">{description}</div>
      </div>
    </div>
  </button>
);

export default SupportCenter;