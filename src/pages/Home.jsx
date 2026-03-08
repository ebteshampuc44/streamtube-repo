import React, { useContext, useState, useEffect } from "react";
import {
  FaHome,
  FaGlobe,
  FaVideo,
  FaStar,
  FaThumbsUp,
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
  FaPlay,
  FaClock,
  FaEye,
  FaHeart
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // মোবাইলের জন্য ক্যাটাগরি স্ক্রোল
  const categories = [
    "All", "Gaming", "Music", "Travel", "Sports", "News", "Live", "Podcasts"
  ];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>

      {/* মোবাইলের জন্য ক্যাটাগরি স্ক্রোল বার */}
      {isMobile && (
        <div className="sticky top-0 z-40 bg-inherit py-3 px-4 overflow-x-auto scrollbar-hide border-b border-gray-200 dark:border-gray-800">
          <div className="flex space-x-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat.toLowerCase()
                    ? 'bg-red-600 text-white'
                    : isDarkMode 
                      ? 'bg-[#1e1e1e] text-gray-300 hover:bg-[#2e2e2e]' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* সাইডবার - ডেস্কটপে দেখাবে */}
      {!isMobile && (
        <div className={`fixed left-0 top-0 w-20 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-600 border-r border-gray-200'} flex flex-col items-center py-6 space-y-8 h-screen transition-colors duration-300 z-30`}>
          <FaHome size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaGlobe size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaVideo size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaStar size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaThumbsUp size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaUser size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaMapMarkerAlt size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
          <FaEdit size={20} className="hover:text-red-500 cursor-pointer transition-colors" />
        </div>
      )}

      {/* MAIN CONTENT - মোবাইলে ফুল উইডথ, ডেস্কটপে সাইডবারের জন্য মার্জিন */}
      <div className={`${!isMobile ? 'ml-20' : ''} p-4 md:p-6`}>

        {/* হিরো সেকশন - মোবাইলে ভিন্ন ডিজাইন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* ফিচার্ড ভিডিও - মোবাইলে ফুল স্ক্রিন */}
          <div className="md:col-span-2 relative rounded-xl overflow-hidden group">
            <div className="relative">
              <video
                className="w-full h-[200px] sm:h-[250px] md:h-[420px] object-cover transition-transform duration-500 group-hover:scale-105"
                autoPlay
                muted
                loop
                poster="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              >
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              </video>
              
              {/* গ্রেডিয়েন্ট ওভারলে */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* প্লে বাটন - মোবাইলে */}
              {isMobile && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <FaPlay className="text-white text-lg" />
                  </div>
                </div>
              )}
            </div>

            {/* ভিডিও ইনফো */}
            <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-auto">
              <span className={`${isDarkMode ? 'bg-red-600' : 'bg-red-600'} px-2 md:px-3 py-1 text-xs md:text-sm text-white font-medium rounded-full`}>
                GAMING
              </span>

              <h1 className="text-lg sm:text-xl md:text-3xl font-bold mt-2 md:mt-3 text-white line-clamp-2">
                New MMORPG coming this summer
              </h1>

              <div className="flex items-center gap-3 mt-1 text-xs md:text-sm text-gray-200">
                <span>Audrey</span>
                <span>•</span>
                <span>3.2K views</span>
                <span>•</span>
                <span>2 hours ago</span>
              </div>
            </div>

            {/* লাইভ ব্যাজ */}
            <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
              LIVE
            </div>
          </div>

          {/* রাইট সাইড ভিডিও - মোবাইলে অনুভূমিক স্ক্রোল */}
          <div className={`${isMobile ? 'grid grid-cols-2' : 'grid grid-rows-2'} gap-4`}>

            {/* টপ ভিডিও */}
            <div className="relative rounded-xl overflow-hidden group">
              <div className="relative">
                <video
                  className="w-full h-[120px] sm:h-[150px] md:h-[200px] object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="bg-red-600 px-2 py-0.5 text-xs text-white font-medium rounded-full">MUSIC</span>
                <h3 className="text-sm font-semibold mt-1 text-white line-clamp-1">All Out of Love</h3>
                <p className="text-xs text-gray-200">Alden • 1.2K views</p>
              </div>
            </div>

            {/* নিচের ছোট ভিডিও - মোবাইলে ২টি */}
            <div className="grid grid-cols-1 gap-4">
              <div className="relative rounded-xl overflow-hidden group">
                <video
                  className="w-full h-[120px] object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-red-600 px-2 py-0.5 text-xs text-white font-medium rounded-full">MUSIC</span>
                  <p className="text-xs font-semibold text-white mt-1">Sweet love</p>
                </div>
              </div>

              <div className="relative rounded-xl overflow-hidden group">
                <video
                  className="w-full h-[120px] object-cover transition-transform duration-500 group-hover:scale-105"
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-3">
                  <span className="bg-red-600 px-2 py-0.5 text-xs text-white font-medium rounded-full">GAMING</span>
                  <p className="text-xs font-semibold text-white mt-1">Star Wars</p>
                </div>
                <div className="absolute top-3 right-3 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs">
                  LIVE
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* টপ প্লেলিস্ট - মোবাইলে অনুভূমিক স্ক্রোল */}
        <div className="mt-8 md:mt-14">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TOP PLAYLISTS</h2>
            {isMobile && (
              <button className="text-red-600 text-sm font-medium">See All</button>
            )}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-6'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[200px]' : ''} relative rounded-xl overflow-hidden group cursor-pointer flex-shrink-0`}>
                <div className="relative">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1507525428034-b723cf961d3e" :
                      item === 2 ? "1605902711622-cfb43c4437d1" :
                      item === 3 ? "1493225457124-a3eb161ffa5f" : "1517649763962-0c623066013b"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-sm md:text-base font-semibold text-white">
                    {item === 1 ? "Travel Vibes" : 
                     item === 2 ? "Gaming Mix" :
                     item === 3 ? "Pop Hits" : "Funny Moments"}
                  </p>
                  <p className="text-xs text-gray-300 mt-1">{item === 1 ? "14 videos" : item === 2 ? "11 videos" : item === 3 ? "11 videos" : "9 videos"}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* রিভিউ সেকশন - মোবাইলে কার্ড স্টাইল */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>REVIEWS</h2>
            <button className={`${isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 text-sm rounded-full transition-colors duration-200 font-medium`}>
              VIEW MORE
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="w-full h-28 sm:h-32 md:h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1614850715776-a749a85b4144" :
                      item === 2 ? "1542751371-adc38448a05e" :
                      item === 3 ? "1500530855697-b586d89ba3ee" : "1497032205916-ac775f0649ae"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  
                  {/* ভিডিও ডিউরেশন */}
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 text-xs rounded-md flex items-center gap-1">
                    <FaClock className="text-xs" /> 15:20
                  </span>

                  {/* রেটিং */}
                  <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs">
                    <FaStar className="text-yellow-400" /> 4.8
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    {item === 1 ? "Star Wars Visions Review" :
                     item === 2 ? "Star Wars Battlefront Gameplay" :
                     item === 3 ? "Horizon Zero Dawn Complete Guide" : "Imagine Dragons - New Album Review"}
                  </h3>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>2.5K views</span>
                    <span>•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* শর্টস সেকশন - মোবাইলে অনুভূমিক স্ক্রোল */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SHORTS</h2>
            {isMobile && (
              <button className="text-red-600 text-sm font-medium">See All</button>
            )}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-3 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-4'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[120px]' : ''} relative rounded-xl overflow-hidden group cursor-pointer flex-shrink-0`}>
                <div className="relative">
                  <video
                    className="h-48 sm:h-56 md:h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1516280440614-37939baac9e1" :
                      item === 2 ? "1534528741775-53994a69daeb" :
                      item === 3 ? "1506794778200-c1d2c5dabc8" : "1534528741775-53994a69daeb"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-3 left-3">
                  <p className="text-sm font-semibold text-white">Short {item}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-200 mt-1">
                    <FaEye /> 1.2M
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* গেমিং সেকশন */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GAMING</h2>
            {isMobile && <button className="text-red-600 text-sm font-medium">See All</button>}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-6'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[200px]' : ''} group cursor-pointer flex-shrink-0`}>
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1542751371-adc38448a05e" :
                      item === 2 ? "1605902711622-cfb43c4437d1" :
                      item === 3 ? "1511512222254" : "1538488887510"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    20:15
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Gaming Video {item} - Epic Gameplay
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Gaming Channel • 50K views • 1 day ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* মিউজিক সেকশন */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>MUSIC</h2>
            {isMobile && <button className="text-red-600 text-sm font-medium">See All</button>}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-6'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[200px]' : ''} group cursor-pointer flex-shrink-0`}>
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1511379938547-c1f69419868d" :
                      item === 2 ? "1493225457124-a3eb161ffa5f" :
                      item === 3 ? "1505740420928-5e560c06d30e" : "1511671782779"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    3:45
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Music Video {item} - Official Audio
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Music Channel • 100K views • 3 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ট্রাভেল সেকশন */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TRAVEL</h2>
            {isMobile && <button className="text-red-600 text-sm font-medium">See All</button>}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-6'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[200px]' : ''} group cursor-pointer flex-shrink-0`}>
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1507525428034-b723cf961d3e" :
                      item === 2 ? "1488645552072-1f0fe6e9c4c3" :
                      item === 3 ? "1500530855697-b586d89ba3ee" : "1469470160168"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    10:30
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Travel Video {item} - Beautiful Destinations
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Travel Channel • 30K views • 5 days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* স্পোর্টস সেকশন */}
        <div className="mt-10 md:mt-16">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SPORTS</h2>
            {isMobile && <button className="text-red-600 text-sm font-medium">See All</button>}
          </div>

          <div className={`${isMobile ? 'flex overflow-x-auto gap-4 pb-4 scrollbar-hide' : 'grid grid-cols-4 gap-6'}`}>
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className={`${isMobile ? 'min-w-[200px]' : ''} group cursor-pointer flex-shrink-0`}>
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1517649763962-0c623066013b" :
                      item === 2 ? "1461891447649" :
                      item === 3 ? "1579952365527-9f2c2f8b9b7e" : "1517466781591"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    15:45
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Sports Video {item} - Highlights
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Sports Channel • 75K views • 2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* লেটেস্ট ভিডিও সেকশন */}
        <div className="mt-10 md:mt-16 mb-6 md:mb-8">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LATEST VIDEOS</h2>
            {isMobile && <button className="text-red-600 text-sm font-medium">See All</button>}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    className="h-28 sm:h-32 md:h-40 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    muted
                    loop
                    poster={`https://images.unsplash.com/photo-${
                      item === 1 ? "1614850715776-a749a85b4144" :
                      item === 2 ? "1497032205916-ac775f0649ae" :
                      item === 3 ? "1511671782779" : "1500530855697-b586d89ba3ee"
                    }`}
                  >
                    <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                  </video>
                  <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded-full font-medium">
                    NEW
                  </span>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    8:22
                  </div>
                </div>
                
                <div className="mt-2">
                  <h3 className={`text-xs md:text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    Latest Video {item} - Trending Now
                  </h3>
                  <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Channel Name • 2 hours ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* স্ক্রলবার হাইড করার জন্য CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Home;