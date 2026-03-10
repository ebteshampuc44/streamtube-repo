// pages/Videos.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaVideo,
  FaPlay,
  FaEye,
  FaClock,
  FaHeart,
  FaComment,
  FaShare,
  FaFilter,
  FaSortAmountDown,
  FaTimes,
  FaSearch,
  FaUser,
  FaCalendar,
  FaThumbsUp,
  FaPlayCircle
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

// ইউটিউব ভিডিও ডেটাবেস
const ALL_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "trending", likes: "15M", comments: "1.2M" },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "Luis Fonsi", views: "8.2B", time: "7 years ago", duration: "4:41", category: "trending", likes: "52M", comments: "3.1M" },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "trending", likes: "31M", comments: "2.8M" },
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "music", likes: "26M", comments: "1.8M" },
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", views: "200M", time: "1 year ago", duration: "1:31", category: "gaming", likes: "5M", comments: "800K" },
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", category: "travel", likes: "800K", comments: "45K" },
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", views: "55M", time: "1 year ago", duration: "6:23", category: "sports", likes: "1.2M", comments: "120K" },
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", views: "12M", time: "5 months ago", duration: "22:30", category: "latest", likes: "300K", comments: "25K" },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "music", likes: "22M", comments: "1.5M" },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "music", likes: "18M", comments: "1.2M" },
  { id: "FkklG9MA0vM", title: "Minecraft Movie Official Trailer", channel: "Warner Bros.", views: "50M", time: "6 months ago", duration: "2:30", category: "gaming", likes: "1.2M", comments: "80K" },
  { id: "X48VuDVv0do", title: "Bali Travel Guide", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", category: "travel", likes: "200K", comments: "15K" },
  { id: "VDONxJNOzN0", title: "NBA Best Plays 2024", channel: "NBA", views: "30M", time: "8 months ago", duration: "8:15", category: "sports", likes: "600K", comments: "45K" },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", views: "5M", time: "1 year ago", duration: "18:45", category: "latest", likes: "150K", comments: "12K" },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk", channel: "Mark Ronson", views: "5.2B", time: "9 years ago", duration: "4:30", category: "trending", likes: "28M", comments: "2.1M" },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", views: "3.3B", time: "8 years ago", duration: "6:07", category: "trending", likes: "24M", comments: "1.8M" },
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
  const { isLiked } = useLikes();

  return (
    <Link to={`/video/${video.id}`} className="group cursor-pointer">
      <YTThumbnail videoId={video.id} title={video.title} duration={video.duration} />
      <div className="flex gap-2">
        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
          {video.channel[0]}
        </div>
        <div className="flex-1 min-w-0">
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
          <div className="flex items-center gap-3 mt-1">
            <span className="flex items-center gap-1">
              <FaHeart className={isLiked(video.id) ? 'text-red-600' : (isDarkMode ? 'text-gray-600' : 'text-gray-400')} size={10} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{video.likes}</span>
            </span>
            <span className="flex items-center gap-1">
              <FaComment className={isDarkMode ? 'text-gray-600' : 'text-gray-400'} size={10} />
              <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{video.comments}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

const Videos = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [sortBy, setSortBy] = useState("latest");
  const [filterBy, setFilterBy] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredVideos, setFilteredVideos] = useState(ALL_VIDEOS);

  // ফিল্টার এবং সর্ট ফাংশন
  useEffect(() => {
    let result = [...ALL_VIDEOS];

    // সার্চ ফিল্টার
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(v => 
        v.title.toLowerCase().includes(term) || 
        v.channel.toLowerCase().includes(term)
      );
    }

    // ক্যাটাগরি ফিল্টার
    if (filterBy !== "all") {
      result = result.filter(v => v.category === filterBy);
    }

    // সর্টিং
    switch (sortBy) {
      case "latest":
        result.sort((a, b) => (b.time || "").localeCompare(a.time || ""));
        break;
      case "mostViewed":
        result.sort((a, b) => {
          const viewsA = parseInt(a.views) || 0;
          const viewsB = parseInt(b.views) || 0;
          return viewsB - viewsA;
        });
        break;
      case "mostLiked":
        result.sort((a, b) => {
          const likesA = parseInt(a.likes) || 0;
          const likesB = parseInt(b.likes) || 0;
          return likesB - likesA;
        });
        break;
      case "mostCommented":
        result.sort((a, b) => {
          const commentsA = parseInt(a.comments) || 0;
          const commentsB = parseInt(b.comments) || 0;
          return commentsB - commentsA;
        });
        break;
      default:
        break;
    }

    setFilteredVideos(result);
  }, [searchTerm, filterBy, sortBy]);

  // পরিসংখ্যান
  const totalViews = filteredVideos.reduce((sum, v) => sum + (parseInt(v.views) || 0), 0);
  const totalLikes = filteredVideos.reduce((sum, v) => sum + (parseInt(v.likes) || 0), 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-4`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaVideo className="text-red-600 text-2xl" />
              <div>
                <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Videos
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {filteredVideos.length} videos • {totalViews.toLocaleString()} total views
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* ভিউ মোড টগল */}
              <div className={`flex rounded-lg overflow-hidden ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === "grid"
                      ? 'bg-red-600 text-white'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`px-3 py-2 text-sm transition-colors ${
                    viewMode === "list"
                      ? 'bg-red-600 text-white'
                      : isDarkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  List
                </button>
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
          
          {/* সার্চ বার */}
          <div className="mt-3">
            <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-full px-4 py-2 flex items-center`}>
              <FaSearch className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={14} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search videos..."
                className="bg-transparent border-none outline-none text-sm px-2 w-full"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm("")}>
                  <FaTimes className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={14} />
                </button>
              )}
            </div>
          </div>
          
          {/* ফিল্টার অপশন */}
          {showFilters && (
            <div className={`mt-3 p-4 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FaSortAmountDown className="inline mr-1" /> Sort by:
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border-gray-700'
                        : 'bg-white text-gray-900 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-red-500`}
                  >
                    <option value="latest">Latest</option>
                    <option value="mostViewed">Most Viewed</option>
                    <option value="mostLiked">Most Liked</option>
                    <option value="mostCommented">Most Commented</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <FaFilter className="inline mr-1" /> Filter by category:
                  </label>
                  <select
                    value={filterBy}
                    onChange={(e) => setFilterBy(e.target.value)}
                    className={`w-full px-3 py-2 rounded-lg ${
                      isDarkMode
                        ? 'bg-gray-800 text-white border-gray-700'
                        : 'bg-white text-gray-900 border-gray-300'
                    } border focus:outline-none focus:ring-2 focus:ring-red-500`}
                  >
                    <option value="all">All Categories</option>
                    <option value="trending">Trending</option>
                    <option value="music">Music</option>
                    <option value="gaming">Gaming</option>
                    <option value="travel">Travel</option>
                    <option value="sports">Sports</option>
                    <option value="latest">Latest</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-6">
        
        {/* ভিডিও গ্রিড/লিস্ট */}
        {filteredVideos.length === 0 ? (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaVideo className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No videos found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterBy("all");
              }}
              className="mt-2 text-red-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredVideos.map(video => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredVideos.map(video => (
              <Link
                key={video.id}
                to={`/video/${video.id}`}
                className={`flex gap-4 p-3 rounded-lg transition-colors ${
                  isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'
                }`}
              >
                <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                    {video.duration}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {video.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">
                      {video.channel[0]}
                    </div>
                    <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {video.channel}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-2 text-sm">
                    <span className="flex items-center gap-1">
                      <FaEye className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={12} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{video.views}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaHeart className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={12} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{video.likes}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaComment className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={12} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{video.comments}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <FaClock className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={12} />
                      <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{video.time}</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* স্ট্যাটিস্টিকস ফুটার */}
        <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Showing <span className="font-semibold text-red-600">{filteredVideos.length}</span> videos
          </div>
          <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaEye className="inline mr-1" /> {totalViews.toLocaleString()} total views
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;