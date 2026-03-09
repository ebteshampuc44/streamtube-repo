// pages/Liked.jsx
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaPlay,
  FaTrash,
  FaArrowLeft,
  FaSearch,
  FaFilter,
  FaSortAmountDown,
  FaTimes,
  FaEye,
  FaClock
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

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
        {duration || "3:33"}
      </span>
    </div>
  );
};

// ভিডিও কার্ড কম্পোনেন্ট
const LikedVideoCard = ({ video, onUnlike }) => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleUnlike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm('Remove this video from your liked videos?')) {
      onUnlike(video.id);
    }
  };

  return (
    <div
      onClick={() => navigate(`/video/${video.id}`)}
      className="group cursor-pointer relative"
    >
      <YTThumbnail
        videoId={video.id}
        title={video.title}
        duration={video.duration}
      />
      
      {/* লাইক রিমুভ বাটন */}
      <button
        onClick={handleUnlike}
        className="absolute top-2 right-2 z-10 w-8 h-8 bg-red-600/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-700"
      >
        <FaTrash className="text-white text-sm" />
      </button>

      {/* ভিডিও ইনফো */}
      <h3 className={`text-sm font-semibold line-clamp-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {video.title}
      </h3>
      
      <div className="flex items-center gap-1 text-xs">
        <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
          {video.channel}
        </p>
      </div>
      
      <div className="flex items-center gap-2 text-xs mt-1">
        <span className="flex items-center gap-1">
          <FaEye className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={10} />
          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.views || "N/A"}</span>
        </span>
        <span className={isDarkMode ? 'text-gray-600' : 'text-gray-300'}>•</span>
        <span className="flex items-center gap-1">
          <FaClock className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={10} />
          <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.time || "recent"}</span>
        </span>
      </div>

      {/* লাইক ব্যাজ */}
      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 opacity-90">
        <FaHeart size={10} />
        <span>Liked</span>
      </div>
    </div>
  );
};

// খালি স্টেট কম্পোনেন্ট
const EmptyLiked = ({ isDarkMode, onBrowse }) => (
  <div className={`text-center py-16 px-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
    <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-600/10 flex items-center justify-center">
      <FaHeart className="text-red-600 text-4xl" />
    </div>
    <h2 className={`text-2xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
      No liked videos yet
    </h2>
    <p className="text-base mb-8 max-w-md mx-auto">
      Videos you like will appear here. Start exploring and like some videos!
    </p>
    <button
      onClick={onBrowse}
      className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors inline-flex items-center gap-2"
    >
      <FaPlay size={14} />
      Browse Videos
    </button>
  </div>
);

const Liked = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const { likedVideos, removeLike } = useLikes();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  // ফিল্টার এবং সর্ট ফাংশন
  useEffect(() => {
    let result = [...likedVideos];

    // সার্চ ফিল্টার
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      result = result.filter(video =>
        video.title?.toLowerCase().includes(term) ||
        video.channel?.toLowerCase().includes(term) ||
        (video.category && video.category.toLowerCase().includes(term))
      );
    }

    // সর্টিং
    switch (sortBy) {
      case "newest":
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
      default:
        break;
    }

    setFilteredVideos(result);
  }, [likedVideos, searchTerm, sortBy]);

  const handleUnlike = (videoId) => {
    removeLike(videoId);
  };

  const handleClearAll = () => {
    if (likedVideos.length === 0) return;
    if (window.confirm(`Are you sure you want to remove all ${likedVideos.length} liked videos?`)) {
      likedVideos.forEach(video => removeLike(video.id));
    }
  };

  const handleBrowse = () => {
    navigate('/');
  };

  // পরিসংখ্যান
  const totalViews = likedVideos.reduce((sum, video) => {
    const views = parseInt(video.views) || 0;
    return sum + views;
  }, 0);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-3`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-full ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaArrowLeft className={isDarkMode ? 'text-white' : 'text-gray-700'} />
              </button>
              <div>
                <h1 className={`text-xl font-bold flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  <FaHeart className="text-red-600" />
                  Liked Videos
                </h1>
                <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {likedVideos.length} {likedVideos.length === 1 ? 'video' : 'videos'} • {totalViews.toLocaleString()} total views
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* সার্চ */}
              <div className={`relative ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} rounded-full px-3 py-1.5 flex items-center`}>
                <FaSearch className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} size={14} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search liked videos..."
                  className="bg-transparent border-none outline-none text-sm px-2 w-40 md:w-60"
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

              {/* ক্লিয়ার অল বাটন - শুধু ভিডিও থাকলে */}
              {likedVideos.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* ফিল্টার অপশন */}
          {showFilters && (
            <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} flex items-center gap-4`}>
              <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <FaSortAmountDown className="inline mr-1" /> Sort by:
              </span>
              <div className="flex gap-2">
                {[
                  { value: "newest", label: "Newest" },
                  { value: "oldest", label: "Oldest" },
                  { value: "mostViewed", label: "Most Viewed" }
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
        
        {/* খালি স্টেট */}
        {likedVideos.length === 0 && (
          <EmptyLiked isDarkMode={isDarkMode} onBrowse={handleBrowse} />
        )}

        {/* ভিডিও গ্রিড */}
        {likedVideos.length > 0 && (
          <>
            {/* ফিল্টার রেজাল্ট ইনফো */}
            {searchTerm && (
              <div className={`mb-4 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Found {filteredVideos.length} {filteredVideos.length === 1 ? 'video' : 'videos'} matching "{searchTerm}"
              </div>
            )}

            {filteredVideos.length === 0 ? (
              <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <p className="text-lg">No videos match your search</p>
                <button
                  onClick={() => setSearchTerm("")}
                  className="mt-2 text-red-600 hover:underline"
                >
                  Clear search
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredVideos.map(video => (
                  <LikedVideoCard
                    key={video.id}
                    video={video}
                    onUnlike={handleUnlike}
                  />
                ))}
              </div>
            )}

            {/* স্ট্যাটিস্টিকস ফুটার */}
            <div className={`mt-8 pt-4 border-t ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} flex justify-between items-center`}>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-semibold text-red-600">{filteredVideos.length}</span> videos showing •{' '}
                <span className="font-semibold">{likedVideos.length}</span> total liked
              </div>
              <div className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <FaEye className="inline mr-1" /> {totalViews.toLocaleString()} total views
              </div>
            </div>
          </>
        )}
      </div>

      {/* কাস্টম স্টাইল */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .grid > * {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
};

export default Liked;