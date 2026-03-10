// pages/Travel.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaPlane,
  FaPlay,
  FaEye,
  FaClock,
  FaHeart,
  FaMapMarkerAlt,
  FaGlobeAsia,
  FaCamera,
  FaSun,
  FaUmbrellaBeach,
  FaMountain,
  FaCity,
  FaTree,
  FaWater
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

// ট্রাভেল ভিডিও ডেটা
const TRAVEL_VIDEOS = [
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", location: "Worldwide", category: "nature", likes: "800K" },
  { id: "X48VuDVv0do", title: "Bali Travel Guide - Paradise Island", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", location: "Bali, Indonesia", category: "beach", likes: "200K" },
  { id: "l482T0yNkeo", title: "Swiss Alps - Switzerland 4K", channel: "Drone Adventures", views: "22M", time: "3 years ago", duration: "8:45", location: "Switzerland", category: "mountain", likes: "400K" },
  { id: "2b9txcUW4xs", title: "Japan Travel Guide 4K", channel: "Travel Japan", views: "8M", time: "2 years ago", duration: "15:30", location: "Japan", category: "city", likes: "120K" },
  { id: "3tR4v3x_TVM", title: "Iceland - Land of Fire and Ice", channel: "Nature Relaxation", views: "5M", time: "3 years ago", duration: "11:20", location: "Iceland", category: "nature", likes: "80K" },
  { id: "p3l7fgvrEKM", title: "Maldives Paradise 4K", channel: "Travel Wild", views: "7M", time: "2 years ago", duration: "10:15", location: "Maldives", category: "beach", likes: "150K" },
  { id: "V7CqHtdPw6A", title: "Thailand Travel Guide", channel: "Travel Thirsty", views: "6M", time: "3 years ago", duration: "25:30", location: "Thailand", category: "beach", likes: "90K" },
  { id: "qeMFq3Dp-DE", title: "New York City 4K", channel: "Amazing Places", views: "15M", time: "4 years ago", duration: "12:45", location: "USA", category: "city", likes: "250K" },
  { id: "WlL8l3S_zUw", title: "Paris France 4K", channel: "Travel Europe", views: "9M", time: "3 years ago", duration: "14:20", location: "France", category: "city", likes: "180K" },
  { id: "J_-5n1XbF2c", title: "Dubai 4K - City of Gold", channel: "Travel Middle East", views: "11M", time: "2 years ago", duration: "18:30", location: "UAE", category: "city", likes: "220K" },
  { id: "T3AG4SYYF8c", title: "Australia Travel Guide", channel: "Down Under Travel", views: "7M", time: "3 years ago", duration: "22:15", location: "Australia", category: "nature", likes: "140K" },
  { id: "XaYsdJPRw0Y", title: "Norway - Land of Fjords", channel: "Scandinavia Travel", views: "8M", time: "2 years ago", duration: "16:40", location: "Norway", category: "nature", likes: "160K" },
];

// ডেস্টিনেশন ডেটা
const DESTINATIONS = [
  { name: "Bali", country: "Indonesia", image: "bali", videos: 24, category: "beach" },
  { name: "Swiss Alps", country: "Switzerland", image: "swiss", videos: 18, category: "mountain" },
  { name: "Tokyo", country: "Japan", image: "tokyo", videos: 32, category: "city" },
  { name: "Maldives", country: "Maldives", image: "maldives", videos: 15, category: "beach" },
  { name: "Paris", country: "France", image: "paris", videos: 28, category: "city" },
  { name: "Iceland", country: "Iceland", image: "iceland", videos: 12, category: "nature" },
  { name: "New York", country: "USA", image: "nyc", videos: 35, category: "city" },
  { name: "Thailand", country: "Thailand", image: "thailand", videos: 22, category: "beach" },
];

const Travel = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { isLiked } = useLikes();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(TRAVEL_VIDEOS);
  const [searchTerm, setSearchTerm] = useState("");

  // লোকেশন লিস্ট
  const locations = [...new Set(TRAVEL_VIDEOS.map(v => v.location.split(',')[1]?.trim() || v.location))];

  useEffect(() => {
    let result = [...TRAVEL_VIDEOS];

    if (selectedCategory !== "all") {
      result = result.filter(v => v.category === selectedCategory);
    }

    if (selectedLocation !== "all") {
      result = result.filter(v => v.location.includes(selectedLocation));
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.title.toLowerCase().includes(term) || 
        v.location.toLowerCase().includes(term)
      );
    }

    setFilteredVideos(result);
  }, [selectedCategory, selectedLocation, searchTerm]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-4`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <FaPlane className="text-red-600 text-2xl" />
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Travel
            </h1>
          </div>
        </div>
      </div>

      {/* হিরো সেকশন */}
      <div className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore the World</h1>
            <p className="text-xl mb-8">Discover amazing places through our travel videos</p>
            <div className="max-w-2xl mx-auto px-4">
              <div className={`flex items-center bg-white rounded-full overflow-hidden`}>
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-6 py-3 text-gray-900 outline-none"
                />
                <button className="px-6 py-3 bg-red-600 text-white hover:bg-red-700">
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-8">
        
        {/* ডেস্টিনেশন গ্রিড */}
        <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          Popular Destinations
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {DESTINATIONS.map((dest, index) => (
            <div
              key={index}
              className="relative group cursor-pointer rounded-xl overflow-hidden"
              onClick={() => setSearchTerm(dest.name)}
            >
              <div className="aspect-video bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center">
                <FaGlobeAsia className="text-white text-4xl opacity-50" />
              </div>
              <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-4">
                <h3 className="text-white font-bold">{dest.name}</h3>
                <p className="text-white/80 text-sm">{dest.country}</p>
                <p className="text-white/60 text-xs mt-1">{dest.videos} videos</p>
              </div>
            </div>
          ))}
        </div>

        {/* ফিল্টার */}
        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              selectedCategory === "all"
                ? 'bg-red-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {[
            { id: "nature", label: "Nature", icon: <FaTree /> },
            { id: "beach", label: "Beach", icon: <FaUmbrellaBeach /> },
            { id: "mountain", label: "Mountain", icon: <FaMountain /> },
            { id: "city", label: "City", icon: <FaCity /> },
          ].map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat.icon}
              {cat.label}
            </button>
          ))}
        </div>

        {/* লোকেশন ফিল্টার */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setSelectedLocation("all")}
            className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
              selectedLocation === "all"
                ? 'bg-red-600 text-white'
                : isDarkMode
                  ? 'bg-gray-800 text-gray-300'
                  : 'bg-gray-200 text-gray-700'
            }`}
          >
            All Locations
          </button>
          {locations.map(loc => (
            <button
              key={loc}
              onClick={() => setSelectedLocation(loc)}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                selectedLocation === loc
                  ? 'bg-red-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300'
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              {loc}
            </button>
          ))}
        </div>

        {/* ভিডিও গ্রিড */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVideos.map(video => (
            <Link key={video.id} to={`/video/${video.id}`} className="group">
              <div className="relative rounded-lg overflow-hidden aspect-video">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <FaPlay className="text-white text-3xl" />
                </div>
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
                <div className="absolute top-2 left-2 bg-red-600/80 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                  <FaMapMarkerAlt size={10} />
                  <span className="truncate max-w-[100px]">{video.location.split(',')[0]}</span>
                </div>
              </div>
              <h3 className={`text-sm font-semibold mt-2 line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {video.title}
              </h3>
              <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {video.channel}
              </p>
              <div className="flex items-center gap-2 text-xs mt-1">
                <span className="flex items-center gap-1">
                  <FaEye className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={10} />
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.views}</span>
                </span>
                <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
                <span className="flex items-center gap-1">
                  <FaClock className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={10} />
                  <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.time}</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Travel;