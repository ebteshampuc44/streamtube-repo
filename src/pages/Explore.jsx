// pages/Explore.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaCompass,
  FaFire,
  FaMusic,
  FaGamepad,
  FaPlane,
  FaFutbol,
  FaNewspaper,
  FaPlay,
  FaEye,
  FaClock,
  FaHeart,
  FaSearch,
  FaTimes,
  FaFilter,
  FaSortAmountDown
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

// ইউটিউব ভিডিও ডেটাবেস (Home.jsx থেকে ইম্পোর্ট করা যাবে, এখানে পুনরায় ব্যবহার)
const ALL_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "trending" },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "Luis Fonsi", views: "8.2B", time: "7 years ago", duration: "4:41", category: "trending" },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "trending" },
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "music" },
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", views: "200M", time: "1 year ago", duration: "1:31", category: "gaming" },
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", category: "travel" },
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", views: "55M", time: "1 year ago", duration: "6:23", category: "sports" },
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", views: "12M", time: "5 months ago", duration: "22:30", category: "latest" },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "music" },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "music" },
  { id: "FkklG9MA0vM", title: "Minecraft Movie Official Trailer", channel: "Warner Bros.", views: "50M", time: "6 months ago", duration: "2:30", category: "gaming" },
  { id: "X48VuDVv0do", title: "Bali Travel Guide", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", category: "travel" },
  { id: "VDONxJNOzN0", title: "NBA Best Plays 2024", channel: "NBA", views: "30M", time: "8 months ago", duration: "8:15", category: "sports" },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", views: "5M", time: "1 year ago", duration: "18:45", category: "latest" },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk", channel: "Mark Ronson", views: "5.2B", time: "9 years ago", duration: "4:30", category: "trending" },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", views: "3.3B", time: "8 years ago", duration: "6:07", category: "trending" },
  { id: "2SKi-NK_TPA", title: "Cyberpunk 2077 Gameplay", channel: "CD PROJEKT RED", views: "13M", time: "4 years ago", duration: "5:37", category: "gaming" },
  { id: "l482T0yNkeo", title: "Swiss Alps 4K", channel: "Drone Adventures", views: "22M", time: "3 years ago", duration: "8:45", category: "travel" },
  { id: "aLBjnrQhPW4", title: "Boxing Knockouts 2024", channel: "Boxing World", views: "15M", time: "5 months ago", duration: "10:22", category: "sports" },
  { id: "aircAruvnKk", title: "Neural Networks Explained", channel: "3Blue1Brown", views: "18M", time: "5 years ago", duration: "19:13", category: "latest" },
];

// ক্যাটাগরি ডেটা
const categories = [
  { id: "all", label: "All", icon: "🌐", color: "bg-gray-500" },
  { id: "trending", label: "Trending", icon: "🔥", color: "bg-orange-500" },
  { id: "music", label: "Music", icon: "🎵", color: "bg-purple-500" },
  { id: "gaming", label: "Gaming", icon: "🎮", color: "bg-blue-500" },
  { id: "travel", label: "Travel", icon: "✈️", color: "bg-green-500" },
  { id: "sports", label: "Sports", icon: "⚽", color: "bg-red-500" },
  { id: "latest", label: "Latest", icon: "🆕", color: "bg-yellow-500" },
];

// ইউটিউব থাম্বনেইল কম্পোনেন্ট
const YTThumbnail = ({ videoId, title, duration }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="relative rounded-lg overflow-hidden mb-2 aspect-video bg-black group-hover:opacity-90 transition-opacity">
      {!imgError ? (
        <img
          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gray-800 flex items-center justify-center">
          <FaPlay className="text-gray-400 text-4xl" />
        </div>
      )}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-12 h-12 bg-red-600/90 rounded-full flex items-center justify-center">
          <FaPlay className="text-white text-lg ml-1" />
        </div>
      </div>
      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
        {duration}
      </span>
    </div>
  );
};

// ভিডিও কার্ড কম্পোনেন্ট
const VideoCard = ({ video }) => {
  const { isDarkMode } = useContext(ThemeContext);
  
  return (
    <Link to={`/video/${video.id}`} className="group cursor-pointer">
      <YTThumbnail videoId={video.id} title={video.title} duration={video.duration} />
      <h3 className={`text-sm font-semibold line-clamp-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {video.title}
      </h3>
      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
        {video.channel}
      </p>
      <div className="flex items-center gap-2 text-xs">
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
  );
};

const Explore = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(ALL_VIDEOS);
  
  // পরিসংখ্যান
  const totalVideos = ALL_VIDEOS.length;
  const categoryCounts = categories.map(cat => ({
    ...cat,
    count: cat.id === "all" ? totalVideos : ALL_VIDEOS.filter(v => v.category === cat.id).length
  }));

  // ফিল্টার এবং সর্ট ফাংশন
  useEffect(() => {
    let result = [...ALL_VIDEOS];

    // ক্যাটাগরি ফিল্টার
    if (selectedCategory !== "all") {
      result = result.filter(v => v.category === selectedCategory);
    }

    // সার্চ ফিল্টার
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.title.toLowerCase().includes(term) || 
        v.channel.toLowerCase().includes(term)
      );
    }

    // সর্টিং
    switch (sortBy) {
      case "latest":
        result.sort((a, b) => (b.time || "").localeCompare(a.time || ""));
        break;
      case "oldest":
        result.sort((a, b) => (a.time || "").localeCompare(b.time || ""));
        break;
      case "mostViewed":
        result.sort((a, b) => {
          const viewsA = parseInt(a.views) || 0;
          const viewsB = parseInt(b.views) || 0;
          return viewsB - viewsA;
        });
        break;
      case "a-z":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    setFilteredVideos(result);
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-4`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCompass className="text-red-600 text-2xl" />
              <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Explore
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {/* সার্চ */}
              <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-full px-4 py-2 flex items-center w-64 md:w-80`}>
                <FaSearch className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={14} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Explore videos..."
                  className="bg-transparent border-none outline-none text-sm px-2 w-full"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm("")}>
                    <FaTimes className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={14} />
                  </button>
                )}
              </div>
              
              {/* ফিল্টার বাটন */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaFilter className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
              </button>
            </div>
          </div>
          
          {/* ফিল্টার অপশন */}
          {showFilters && (
            <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center gap-4 flex-wrap`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaSortAmountDown className="inline mr-1" /> Sort by:
              </span>
              <div className="flex gap-2 flex-wrap">
                {[
                  { value: "relevance", label: "Relevance" },
                  { value: "latest", label: "Latest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "mostViewed", label: "Most Viewed" },
                  { value: "a-z", label: "A-Z" }
                ].map(option => (
                  <button
                    key={option.value}
                    onClick={() => setSortBy(option.value)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                      sortBy === option.value
                        ? 'bg-red-600 text-white'
                        : isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-white text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-6">
        
        {/* ক্যাটাগরি গ্রিড */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mb-8">
          {categoryCounts.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative group p-4 rounded-xl transition-all transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? `${cat.color} text-white shadow-lg`
                  : isDarkMode
                    ? 'bg-gray-900 text-gray-300 hover:bg-gray-800'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{cat.icon}</div>
              <div className="text-xs font-semibold">{cat.label}</div>
              <div className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                selectedCategory === cat.id
                  ? 'bg-white text-gray-900'
                  : isDarkMode
                    ? 'bg-red-600 text-white'
                    : 'bg-red-600 text-white'
              }`}>
                {cat.count}
              </div>
            </button>
          ))}
        </div>

        {/* ফলাফল হেডার */}
        <div className="flex items-center justify-between mb-4">
          <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {searchTerm ? `Search results for "${searchTerm}"` : `${categories.find(c => c.id === selectedCategory)?.label} Videos`}
          </h2>
          <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {filteredVideos.length} videos
          </p>
        </div>

        {/* ভিডিও গ্রিড */}
        {filteredVideos.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaCompass className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No videos found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-2 text-red-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        )}

        {/* ট্রেন্ডিং টপিক্স */}
        <div className={`mt-12 p-6 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'} shadow-sm`}>
          <h3 className={`font-semibold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            <FaFire className="text-red-600" />
            Trending Topics
          </h3>
          <div className="flex flex-wrap gap-3">
            {["#Music", "#Gaming", "#Travel", "#Tech", "#Sports", "#Viral", "#Tutorial", "#Comedy"].map(topic => (
              <button
                key={topic}
                onClick={() => setSearchTerm(topic.substring(1))}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;