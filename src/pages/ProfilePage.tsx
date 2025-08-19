import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Camera, 
  Save, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Sparkles,
  Target,
  Trophy,
  BookOpen
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [profileImage, setProfileImage] = useState<string>('');
  const [profileData, setProfileData] = useState({
    name: 'Samiksha Kumari',
    email: 'samiksha@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    bio: 'Aspiring IIT student passionate about technology and innovation. Currently preparing for JEE Advanced with Saarathi as my AI mentor.',
    goal: 'IIT Bombay - Computer Science',
    joinDate: 'January 2024',
    studyStreak: '45 days',
    completedTasks: '127',
    currentLevel: 'Advanced'
  });

  const [tempData, setTempData] = useState(profileData);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
    // Here you would typically save to backend
    console.log('Profile updated:', tempData);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const stats = [
    { label: 'Study Streak', value: profileData.studyStreak, icon: Target, color: 'cyber-blue' },
    { label: 'Tasks Completed', value: profileData.completedTasks, icon: Trophy, color: 'neon-green' },
    { label: 'Current Level', value: profileData.currentLevel, icon: BookOpen, color: 'cyber-purple' },
  ];

  return (
    <div className="min-h-screen bg-dark-bg pt-16 relative overflow-hidden">
      {/* Animated Background */}
      <div className="animated-bg" />
      <div className="absolute top-20 left-20 w-80 h-80 bg-cyber-blue/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyber-purple/10 rounded-full blur-3xl animate-float-complex" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
            <p className="text-gray-300">Manage your account and preferences</p>
          </div>
          
          <button
            onClick={() => navigate('/dashboard')}
            className="glass-morphism px-6 py-3 rounded-xl text-white hover-scale"
          >
            Back to Dashboard
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="glass-card p-8 rounded-3xl text-center">
              {/* Profile Image */}
              <div className="relative mb-6">
                <div className="w-32 h-32 mx-auto relative">
                  <div className="w-full h-full bg-gradient-cyber rounded-full flex items-center justify-center overflow-hidden">
                    {profileImage ? (
                      <img 
                        src={profileImage} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User size={48} className="text-white" />
                    )}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-2 right-2 w-10 h-10 bg-gradient-cyber rounded-full flex items-center justify-center shadow-xl"
                  >
                    <Camera size={16} className="text-white" />
                  </motion.button>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">{profileData.name}</h2>
              <p className="text-cyber-blue mb-4">{profileData.goal}</p>
              <p className="text-gray-300 text-sm">Member since {profileData.joinDate}</p>

              {/* Quick Stats */}
              <div className="mt-6 space-y-4">
                {stats.map((stat, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-gradient-to-r from-${stat.color} to-${stat.color}/70 rounded-lg flex items-center justify-center`}>
                        <stat.icon size={16} className="text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{stat.label}</span>
                    </div>
                    <span className="text-white font-semibold">{stat.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Profile Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-2xl font-bold text-white">Personal Information</h3>
                
                {!isEditing ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 bg-gradient-cyber text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    <Edit3 size={16} />
                    <span>Edit Profile</span>
                  </motion.button>
                ) : (
                  <div className="flex space-x-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleCancel}
                      className="glass-morphism text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={handleSave}
                      className="flex items-center space-x-2 bg-gradient-cyber text-white px-6 py-3 rounded-xl font-semibold"
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="block text-white font-medium mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={isEditing ? tempData.name : profileData.name}
                      onChange={(e) => setTempData({...tempData, name: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white font-medium mb-2">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={isEditing ? tempData.email : profileData.email}
                      onChange={(e) => setTempData({...tempData, email: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-white font-medium mb-2">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="tel"
                      value={isEditing ? tempData.phone : profileData.phone}
                      onChange={(e) => setTempData({...tempData, phone: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-white font-medium mb-2">Location</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={isEditing ? tempData.location : profileData.location}
                      onChange={(e) => setTempData({...tempData, location: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Goal */}
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">Career Goal</label>
                  <div className="relative">
                    <Target className="absolute left-4 top-4 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={isEditing ? tempData.goal : profileData.goal}
                      onChange={(e) => setTempData({...tempData, goal: e.target.value})}
                      disabled={!isEditing}
                      className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div className="md:col-span-2">
                  <label className="block text-white font-medium mb-2">Bio</label>
                  <textarea
                    value={isEditing ? tempData.bio : profileData.bio}
                    onChange={(e) => setTempData({...tempData, bio: e.target.value})}
                    disabled={!isEditing}
                    rows={4}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-cyber-blue transition-colors disabled:opacity-50 resize-none"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;