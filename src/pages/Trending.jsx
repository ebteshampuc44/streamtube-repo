// pages/Trending.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaFire,
  FaPlay,
  FaEye,
  FaClock,
  FaHeart,
  FaComment,
  FaArrowUp,
  FaCalendar,
  FaGlobe,
  FaMusic,
  FaGamepad,
  FaPlane,
  FaFutbol
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

// ট্রেন্ডিং ভিডিও ডেটা
const TRENDING_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "music", trend: "#1 Trending", trendScore: 98, likes: "15M", comments: "1.2M" },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "Luis Fonsi", views: "8.2B", time: "7 years ago", duration: "4:41", category: "music", trend: "#2 Trending", trendScore: 95, likes: "52M", comments: "3.1M" },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "music", trend: "#3 Trending", trendScore: 92, likes: "31M", comments: "2.8M" },
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "music", trend: "#4 Trending", trendScore: 89, likes: "26M", comments: "1.8M" },
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", views: "200M", time: "1 year ago", duration: "1:31", category: "gaming", trend: "#5 Trending", trendScore: 87, likes: "5M", comments: "800K" },
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", category: "travel", trend: "#6 Trending", trendScore: 84, likes: "800K", comments: "45K" },
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", views: "55M", time: "1 year ago", duration: "6:23", category: "sports", trend: "#7 Trending", trendScore: 82, likes: "1.2M", comments: "120K" },
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", views: "12M", time: "5 months ago", duration: "22:30", category: "tech", trend: "#8 Trending", trendScore: 79, likes: "300K", comments: "25K" },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "music", trend: "#9 Trending", trendScore: 77, likes: "22M", comments: "1.5M" },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "music", trend: "#10 Trending", trendScore: 75, likes: "18M", comments: "1.2M" },
  { id: "FkklG9MA0vM", title: "Minecraft Movie Official Trailer", channel: "Warner Bros.", views: "50M", time: "6 months ago", duration: "2:30", category: "gaming", trend: "#11 Trending", trendScore: 73, likes: "1.2M", comments: "80K" },
  { id: "X48VuDVv0do", title: "Bali Travel Guide", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", category: "travel", trend: "#12 Trending", trendScore: 71, likes: "200K", comments: "15K" },
  { id: "VDONxJNOzN0", title: "NBA Best Plays 2024", channel: "NBA", views: "30M", time: "8 months ago", duration: "8:15", category: "sports", trend: "#13 Trending", trendScore: 69, likes: "600K", comments: "45K" },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", views: "5M", time: "1 year ago", duration: "18:45", category: "tech", trend: "#14 Trending", trendScore: 67, likes: "150K", comments: "12K" },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk", channel: "Mark Ronson", views: "5.2B", time: "9 years ago", duration: "4:30", category: "music", trend: "#15 Trending", trendScore: 65, likes: "28M", comments: "2.1M" },
];

// টপ ট্রেন্ডিং (শীর্ষ ৩)
const TOP_TRENDING = TRENDING_VIDEOS.slice(0, 3);

const Trending = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { isLiked } = useLikes();
  const [timeRange, setTimeRange] = useState("today"); // today, week, month
  const [category, setCategory] = useState("all");
  const [filteredVideos, setFilteredVideos] = useState(TRENDING_VIDEOS);

  // ক্যাটাগরি ফিল্টার
  useEffect(() => {
    if (category === "all") {
      setFilteredVideos(TRENDING_VIDEOS);
    } else {
      setFilteredVideos(TRENDING_VIDEOS.filter(v => v.category === category));
    }
  }, [category]);

  const getTrendColor = (score) => {
    if (score >= 90) return "text-red-600";
    if (score >= 80) return "text-orange-500";
    if (score >= 70) return "text-yellow-500";
    return "text-blue-500";
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-4`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <FaFire className="text-red-600 text-3xl" />
                <FaArrowUp className="absolute -top-1 -right-1 text-green-500 text-xs" />
              </div>
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Trending
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  What's hot right now
                </p>
              </div>
            </div>
            
            {/* টাইম রেঞ্জ ফিল্টার */}
            <div className={`flex rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              {["today", "week", "month"].map(range => (
                <button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    timeRange === range
                      ? 'bg-red-600 text-white'
                      : isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {range.charAt(0).toUpperCase() + range.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* ক্যাটাগরি ফিল্টার */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
            {[
              { id: "all", label: "All", icon: <FaGlobe /> },
              { id: "music", label: "Music", icon: <FaMusic /> },
              { id: "gaming", label: "Gaming", icon: <FaGamepad /> },
              { id: "travel", label: "Travel", icon: <FaPlane /> },
              { id: "sports", label: "Sports", icon: <FaFutbol /> },
              { id: "tech", label: "Tech", icon: "💻" },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  category === cat.id
                    ? 'bg-red-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <span className="text-sm">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-6">
        
        {/* টপ ট্রেন্ডিং ব্যানার */}
        {category === "all" && (
          <div className="mb-8">
            <h2 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              🔥 Top Trending Now
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {TOP_TRENDING.map((video, index) => (
                <Link
                  key={video.id}
                  to={`/video/${video.id}`}
                  className={`group relative overflow-hidden rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all transform hover:scale-105`}
                >
                  <div className="relative aspect-video">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/maxresdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${video.id}/hqdefault.jpg`;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      #{index + 1} Trending
                    </div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-sm font-semibold line-clamp-2">{video.title}</p>
                      <p className="text-white/70 text-xs mt-1">{video.channel}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ট্রেন্ডিং লিস্ট */}
        <div className="space-y-3">
          {filteredVideos.map((video, index) => (
            <Link
              key={video.id}
              to={`/video/${video.id}`}
              className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
              }`}
            >
              {/* র‍্যাঙ্ক */}
              <div className="flex-shrink-0 w-8 text-center">
                <span className={`font-bold text-lg ${getTrendColor(video.trendScore)}`}>
                  #{index + 1}
                </span>
              </div>

              {/* থাম্বনেইল */}
              <div className="relative flex-shrink-0 w-32 h-20 rounded-lg overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video.duration}
                </span>
              </div>

              {/* ইনফো */}
              <div className="flex-1 min-w-0">
                <h3 className={`font-semibold line-clamp-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {video.title}
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {video.channel}
                </p>
                <div className="flex items-center gap-3 mt-1 text-xs">
                  <span className="flex items-center gap-1">
                    <FaEye className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.views}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className={isLiked(video.id) ? 'text-red-600' : (isDarkMode ? 'text-gray-500' : 'text-gray-400')} />
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.comments}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaClock className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.time}</span>
                  </span>
                </div>
              </div>

              {/* ট্রেন্ড স্কোর */}
              <div className="flex-shrink-0 text-right">
                <div className={`text-sm font-bold ${getTrendColor(video.trendScore)}`}>
                  {video.trendScore}%
                </div>
                <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  trending
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ট্রেন্ডিং ইনফো */}
        <div className={`mt-8 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-white'} text-center`}>
          <FaGlobe className={`mx-auto text-3xl mb-2 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`} />
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Trending is based on views, likes, comments and shares from the last {timeRange}
          </p>
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default Trending;