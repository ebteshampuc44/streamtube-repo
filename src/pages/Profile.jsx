// pages/Profile.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaCog,
  FaHeart,
  FaVideo,
  FaClock,
  FaEye,
  FaEdit,
  FaCamera,
  FaCheck,
  FaTimes,
  FaSignOutAlt,
  FaBell,
  FaLock,
  FaPalette,
  FaLanguage,
  FaHistory,
  FaPlayCircle,
  FaThumbsUp,
  FaComment,
  FaShare
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

const Profile = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { likedVideos } = useLikes();
  const [activeTab, setActiveTab] = useState("overview"); // overview, videos, liked, settings
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    bio: "Video enthusiast | Content creator | Tech lover",
    location: "New York, USA",
    joinDate: "January 2024",
    avatar: "J"
  });

  // পরিসংখ্যান
  const stats = {
    totalVideos: 24,
    totalViews: "1.2M",
    totalLikes: likedVideos.length,
    totalComments: 342,
    watchTime: "124 hours"
  };

  // ইউজারের ভিডিও (ডেমো)
  const userVideos = [
    { id: "dQw4w9WgXcQ", title: "My First Vlog", views: "45K", time: "2 days ago", duration: "10:23" },
    { id: "kJQP7kiw5Fk", title: "Tech Review 2024", views: "23K", time: "1 week ago", duration: "15:47" },
    { id: "JGwWNGJdvx8", title: "Travel Diaries", views: "12K", time: "2 weeks ago", duration: "8:32" },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* কভার ফটো */}
      <div className="relative h-48 md:h-64 bg-gradient-to-r from-red-600 to-red-800">
        <button className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/50 text-white text-sm rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm">
          <FaCamera className="inline mr-1" /> Change Cover
        </button>
      </div>

      {/* প্রোফাইল হেডার */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6">
        <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-start md:items-end gap-4">
          {/* অ্যাভাটার */}
          <div className="relative">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-full border-4 ${
              isDarkMode ? 'border-gray-900' : 'border-white'
            } bg-red-600 flex items-center justify-center text-white text-4xl md:text-5xl font-bold`}>
              {profileData.avatar}
            </div>
            <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-colors">
              <FaCamera size={14} />
            </button>
          </div>

          {/* ইউজার ইনফো */}
          <div className="flex-1">
            <div className="flex flex-col md:flex-row md:items-center gap-3">
              <div>
                <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {profileData.name}
                </h1>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  @{profileData.username}
                </p>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                  isDarkMode
                    ? 'bg-gray-800 text-white hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                }`}
              >
                <FaEdit /> Edit Profile
              </button>
            </div>
            <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              {profileData.bio}
            </p>
            <div className="flex items-center gap-4 mt-2 text-sm">
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                📍 {profileData.location}
              </span>
              <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                📅 Joined {profileData.joinDate}
              </span>
            </div>
          </div>
        </div>

        {/* স্ট্যাটিস্টিকস কার্ড */}
        <div className={`grid grid-cols-2 md:grid-cols-5 gap-3 mb-6`}>
          {[
            { label: "Videos", value: stats.totalVideos, icon: <FaVideo /> },
            { label: "Views", value: stats.totalViews, icon: <FaEye /> },
            { label: "Likes", value: stats.totalLikes, icon: <FaHeart /> },
            { label: "Comments", value: stats.totalComments, icon: <FaComment /> },
            { label: "Watch Time", value: stats.watchTime, icon: <FaClock /> },
          ].map((stat, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              } shadow-sm`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                  {stat.icon}
                </span>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {stat.label}
                </span>
              </div>
              <p className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* ট্যাব নেভিগেশন */}
        <div className={`flex gap-1 mb-6 border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}`}>
          {[
            { id: "overview", label: "Overview", icon: <FaUser /> },
            { id: "videos", label: "Videos", icon: <FaVideo /> },
            { id: "liked", label: "Liked", icon: <FaHeart /> },
            { id: "settings", label: "Settings", icon: <FaCog /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-red-600 text-red-600'
                  : isDarkMode
                    ? 'border-transparent text-gray-400 hover:text-white'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* ট্যাব কন্টেন্ট */}
        <div className="pb-8">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* সাম্প্রতিক অ্যাক্টিভিটি */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FaHistory />
                  Recent Activity
                </h3>
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-16 h-10 bg-gray-700 rounded overflow-hidden">
                        <img
                          src={`https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Watched "Video Title"
                        </p>
                        <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          2 hours ago
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* পরিসংখ্যান চার্ট */}
              <div className={`p-4 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
                <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FaEye />
                  Views Overview
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Mon", views: 1200 },
                    { day: "Tue", views: 1500 },
                    { day: "Wed", views: 1800 },
                    { day: "Thu", views: 2200 },
                    { day: "Fri", views: 1900 },
                    { day: "Sat", views: 2500 },
                    { day: "Sun", views: 2100 },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className={`text-xs w-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.day}
                      </span>
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-600 rounded-full"
                          style={{ width: `${(item.views / 2500) * 100}%` }}
                        />
                      </div>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {item.views}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "videos" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Your Videos
                </h3>
                <button className="px-4 py-2 bg-red-600 text-white text-sm rounded-full hover:bg-red-700">
                  Upload Video
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userVideos.map(video => (
                  <Link key={video.id} to={`/video/${video.id}`} className="group">
                    <div className="relative rounded-lg overflow-hidden aspect-video">
                      <img
                        src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                        {video.duration}
                      </span>
                    </div>
                    <h4 className={`text-sm font-semibold mt-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {video.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs mt-1">
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {video.views} views
                      </span>
                      <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                        {video.time}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {activeTab === "liked" && (
            <div>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Liked Videos ({likedVideos.length})
              </h3>
              {likedVideos.length === 0 ? (
                <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  <FaHeart className="mx-auto text-4xl mb-3 opacity-30" />
                  <p>No liked videos yet</p>
                  <Link to="/" className="mt-2 text-red-600 hover:underline inline-block">
                    Browse videos
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {likedVideos.slice(0, 8).map(video => (
                    <Link key={video.id} to={`/video/${video.id}`} className="group">
                      <div className="relative rounded-lg overflow-hidden aspect-video">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h4 className={`text-sm font-semibold mt-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {video.title}
                      </h4>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {video.channel}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <h3 className={`font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Account Settings
              </h3>
              
              <div className="space-y-4">
                {/* প্রোফাইল এডিট ফর্ম */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Username
                    </label>
                    <input
                      type="text"
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Email
                    </label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Location
                    </label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode
                          ? 'bg-gray-800 border-gray-700 text-white'
                          : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Bio
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows="3"
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode
                        ? 'bg-gray-800 border-gray-700 text-white'
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                  />
                </div>

                {/* সেটিংস অপশন */}
                <div className={`border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} pt-4 mt-4`}>
                  <h4 className={`font-medium mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Preferences
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaPalette className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Dark Mode</span>
                      </div>
                      <button
                        onClick={toggleTheme}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          isDarkMode ? 'bg-red-600' : 'bg-gray-300'
                        } relative`}
                      >
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          isDarkMode ? 'translate-x-7' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaBell className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Notifications</span>
                      </div>
                      <button className={`px-3 py-1 rounded-full text-xs ${
                        isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-200 text-gray-700'
                      }`}>
                        Enable
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <FaLanguage className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                        <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>Language</span>
                      </div>
                      <select className={`px-3 py-1 rounded-lg text-xs ${
                        isDarkMode
                          ? 'bg-gray-800 text-white border-gray-700'
                          : 'bg-gray-200 text-gray-900 border-gray-300'
                      } border`}>
                        <option>English</option>
                        <option>বাংলা</option>
                        <option>Hindi</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* অ্যাকশন বাটন */}
                <div className="flex items-center gap-3 pt-4">
                  <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                    Save Changes
                  </button>
                  <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ${
                    isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}>
                    <FaLock /> Change Password
                  </button>
                  <button className={`px-4 py-2 rounded-lg flex items-center gap-2 ml-auto ${
                    isDarkMode
                      ? 'text-red-500 hover:bg-red-600/10'
                      : 'text-red-600 hover:bg-red-50'
                  }`}>
                    <FaSignOutAlt /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;