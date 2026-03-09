// pages/Shorts.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import {
  FaHeart, FaComment, FaShare, FaVolumeUp, FaVolumeMute,
  FaChevronUp, FaChevronDown,
  FaMusic, FaExternalLinkAlt, FaPlus
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";
import { Link, useNavigate } from "react-router-dom";

// রিয়েল ইউটিউব শর্টস / ভার্টিকাল ভিডিও
const shortsData = [
  {
    id: "dQw4w9WgXcQ",
    youtubeId: "dQw4w9WgXcQ",
    user: "rickastley",
    fullName: "Rick Astley",
    avatar: "R",
    description: "Never Gonna Give You Up - Classic 80s Pop 🎵 #rickroll #music #classic #80s",
    likes: "15M",
    comments: "1.2M",
    shares: "5.4M",
    music: "Never Gonna Give You Up - Rick Astley",
    title: "Rick Astley - Never Gonna Give You Up",
    channel: "Rick Astley",
    views: "1.5B",
    time: "15 years ago",
    duration: "0:33"
  },
  {
    id: "kJQP7kiw5Fk",
    youtubeId: "kJQP7kiw5Fk",
    user: "luisfonsi",
    fullName: "Luis Fonsi",
    avatar: "L",
    description: "Despacito ft. Daddy Yankee 🎶 #despacito #latin #music #viral",
    likes: "52M",
    comments: "3.1M",
    shares: "12M",
    music: "Despacito - Luis Fonsi ft. Daddy Yankee",
    title: "Luis Fonsi - Despacito ft. Daddy Yankee",
    channel: "Luis Fonsi",
    views: "8.2B",
    time: "7 years ago",
    duration: "0:41"
  },
  {
    id: "hT_nvWreIhg",
    youtubeId: "hT_nvWreIhg",
    user: "theweeknd",
    fullName: "The Weeknd",
    avatar: "W",
    description: "Blinding Lights 🌃 The retro synth-pop masterpiece! #theweeknd #blindinglights #pop",
    likes: "26M",
    comments: "2.8M",
    shares: "8.1M",
    music: "Blinding Lights - The Weeknd",
    title: "The Weeknd - Blinding Lights",
    channel: "The Weeknd",
    views: "4.2B",
    time: "4 years ago",
    duration: "0:20"
  },
  {
    id: "EHXhcD6Pkgs",
    youtubeId: "EHXhcD6Pkgs",
    user: "rockstargames",
    fullName: "Rockstar Games",
    avatar: "R",
    description: "GTA 6 Official Trailer 🎮 The most anticipated game EVER! #gta6 #gaming #rockstar",
    likes: "5M",
    comments: "800K",
    shares: "2.1M",
    music: "GTA 6 Official Soundtrack",
    title: "GTA 6 - Official Trailer",
    channel: "Rockstar Games",
    views: "200M",
    time: "1 year ago",
    duration: "0:31"
  },
  {
    id: "M68BuiStGKQ",
    youtubeId: "M68BuiStGKQ",
    user: "discoverearth",
    fullName: "Discover Earth",
    avatar: "D",
    description: "Most Beautiful Places on Earth 🌍✨ #travel #nature #4k #beautiful #wanderlust",
    likes: "800K",
    comments: "45K",
    shares: "320K",
    music: "Nature Sounds - Relaxing Music",
    title: "Most Beautiful Places in the World 4K",
    channel: "Discover Earth",
    views: "45M",
    time: "2 years ago",
    duration: "0:58"
  },
  {
    id: "nfWlot6h_JM",
    youtubeId: "nfWlot6h_JM",
    user: "taylorswift",
    fullName: "Taylor Swift",
    avatar: "T",
    description: "Shake It Off Dance Challenge 💃 #taylorswift #shakeitoff #pop #dance",
    likes: "22M",
    comments: "1.8M",
    shares: "4.2M",
    music: "Shake It Off - Taylor Swift",
    title: "Taylor Swift - Shake It Off",
    channel: "Taylor Swift",
    views: "3.8B",
    time: "9 years ago",
    duration: "0:30"
  },
  {
    id: "FZGMYJdaZMg",
    youtubeId: "FZGMYJdaZMg",
    user: "fifa",
    fullName: "FIFA",
    avatar: "F",
    description: "Cristiano Ronaldo's Best Skills ⚽🔥 #ronaldo #football #soccer #cr7",
    likes: "1.2M",
    comments: "120K",
    shares: "450K",
    music: "FIFA World Cup Theme",
    title: "Cristiano Ronaldo Top 10 Goals",
    channel: "FIFA",
    views: "55M",
    time: "1 year ago",
    duration: "0:23"
  },
  {
    id: "2Bkd0VoFBkM",
    youtubeId: "2Bkd0VoFBkM",
    user: "mkbhd",
    fullName: "MKBHD",
    avatar: "M",
    description: "iPhone 16 Pro First Look 📱 #iphone16 #apple #tech #review",
    likes: "300K",
    comments: "25K",
    shares: "80K",
    music: "Tech Review Music",
    title: "iPhone 16 Pro Review",
    channel: "MKBHD",
    views: "12M",
    time: "5 months ago",
    duration: "0:30"
  },
];

const Shorts = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { toggleLike, isLiked } = useLikes(); // লাইক ফাংশন যোগ করা হয়েছে
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedShorts, setLikedShorts] = useState({});
  const [savedShorts, setSavedShorts] = useState({});
  const [isMuted, setIsMuted] = useState(false);
  const containerRef = useRef(null);

  // স্ক্রোল হ্যান্ডলার
  useEffect(() => {
    const handleScroll = (e) => {
      e.preventDefault();
      const delta = e.deltaY;
      if (Math.abs(delta) > 50) {
        if (delta > 0 && currentIndex < shortsData.length - 1) {
          setCurrentIndex(prev => prev + 1);
        } else if (delta < 0 && currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
        }
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }
    return () => {
      if (container) container.removeEventListener('wheel', handleScroll);
    };
  }, [currentIndex]);

  // Touch সাপোর্ট
  useEffect(() => {
    let touchStartY = 0;
    const handleTouchStart = (e) => { touchStartY = e.touches[0].clientY; };
    const handleTouchEnd = (e) => {
      const diff = touchStartY - e.changedTouches[0].clientY;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < shortsData.length - 1) setCurrentIndex(p => p + 1);
        else if (diff < 0 && currentIndex > 0) setCurrentIndex(p => p - 1);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart);
      container.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [currentIndex]);

  // কীবোর্ড কন্ট্রোল
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp') { 
        e.preventDefault(); 
        setCurrentIndex(p => Math.max(0, p - 1)); 
      }
      else if (e.key === 'ArrowDown') { 
        e.preventDefault(); 
        setCurrentIndex(p => Math.min(shortsData.length - 1, p + 1)); 
      }
      else if (e.key === 'Escape') {
        navigate('/');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  const goToPrev = () => setCurrentIndex(p => Math.max(0, p - 1));
  const goToNext = () => setCurrentIndex(p => Math.min(shortsData.length - 1, p + 1));

  const handleLike = (short) => {
    // শর্টস ডাটাকে ভিডিও ফরম্যাটে কনভার্ট করে LikeContext এ পাঠানো
    const videoData = {
      id: short.id,
      title: short.title,
      channel: short.channel,
      views: short.views,
      time: short.time,
      duration: short.duration,
      category: "shorts"
    };
    toggleLike(videoData);
    setLikedShorts(prev => ({ ...prev, [short.id]: !prev[short.id] }));
  };

  const handleSave = (id) => setSavedShorts(prev => ({ ...prev, [id]: !prev[id] }));

  const currentShort = shortsData[currentIndex];

  return (
    <div className={`h-screen overflow-hidden ${isDarkMode ? 'bg-black' : 'bg-gray-900'}`}>
      <div ref={containerRef} className="relative h-full">

        {/* শর্টস স্লাইড */}
        <div
          className="h-full transition-transform duration-400 ease-out"
          style={{ transform: `translateY(-${currentIndex * 100}%)` }}
        >
          {shortsData.map((short, index) => (
            <div key={short.id} className="h-screen w-full relative flex items-center justify-center bg-black">

              {/* YouTube iframe embed */}
              <div className="relative w-full h-full max-w-sm mx-auto">
                {Math.abs(index - currentIndex) <= 1 ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${short.youtubeId}?autoplay=${index === currentIndex ? 1 : 0}&loop=1&playlist=${short.youtubeId}&controls=0&rel=0&modestbranding=1&playsinline=1&mute=${isMuted ? 1 : 0}`}
                    title={short.description}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="w-full h-full bg-gray-900 flex items-center justify-center">
                    <img
                      src={`https://img.youtube.com/vi/${short.youtubeId}/hqdefault.jpg`}
                      alt={short.description}
                      className="w-full h-full object-cover opacity-50"
                    />
                  </div>
                )}
              </div>

              {/* ওভারলে — শুধু অ্যাকটিভ শর্টে */}
              {index === currentIndex && (
                <div className="absolute inset-0">
                  
                  {/* গ্র্যাডিয়েন্ট - নিচে */}
                  <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* টপ গ্র্যাডিয়েন্ট */}
                  <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/60 to-transparent" />

                  {/* ইউজার ইনফো এবং ডেসক্রিপশন - নিচে বামে */}
                  <div className="absolute bottom-20 left-4 right-20 text-white">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold border-2 border-white">
                        {short.avatar}
                      </div>
                      <div>
                        <span className="font-semibold text-sm">@{short.user}</span>
                        <span className="text-gray-300 text-xs ml-2">{short.fullName}</span>
                      </div>
                      <button className="ml-2 px-3 py-1 bg-red-600 text-white text-xs rounded-full hover:bg-red-700 transition-colors flex items-center gap-1">
                        <FaPlus size={8} /> Follow
                      </button>
                    </div>
                    <p className="text-sm mb-2 line-clamp-2">{short.description}</p>
                    <div className="flex items-center gap-2 text-gray-300 text-xs">
                      <FaMusic size={11} />
                      <span className="truncate max-w-[200px]">{short.music}</span>
                    </div>
                  </div>

                  {/* অ্যাকশন বাটন - ডান পাশে, রিলের পাশে */}
                  <div className="absolute right-4 bottom-24 flex flex-col items-center gap-4 z-20">

                    {/* মিউট/আনমিউট */}
                    <button 
                      onClick={() => setIsMuted(!isMuted)} 
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        {isMuted ? 
                          <FaVolumeMute size={20} className="text-white" /> : 
                          <FaVolumeUp size={20} className="text-white" />
                        }
                      </div>
                    </button>

                    {/* লাইক - আপডেট করা হয়েছে */}
                    <button 
                      onClick={() => handleLike(short)} 
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <FaHeart 
                          size={22} 
                          className={isLiked(short.id) ? 'text-red-500' : 'text-white'} 
                        />
                      </div>
                      <span className="text-white text-xs font-semibold">{short.likes}</span>
                    </button>

                    {/* কমেন্ট */}
                    <button className="flex flex-col items-center gap-1 group">
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <FaComment size={20} className="text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">{short.comments}</span>
                    </button>

                    {/* শেয়ার */}
                    <button className="flex flex-col items-center gap-1 group">
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <FaShare size={18} className="text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">{short.shares}</span>
                    </button>

                    {/* সেভ */}
                    <button 
                      onClick={() => handleSave(short.id)} 
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-gray-800/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24"
                          fill={savedShorts[short.id] ? "white" : "none"} stroke="white" strokeWidth="2">
                          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                        </svg>
                      </div>
                    </button>

                    {/* YouTube লিংক */}
                    <a
                      href={`https://www.youtube.com/watch?v=${short.youtubeId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 group"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-600/80 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                        <FaExternalLinkAlt size={16} className="text-white" />
                      </div>
                      <span className="text-white text-xs font-semibold">YT</span>
                    </a>
                  </div>

                  {/* টপ বার - ব্যাক এবং ওয়াচ ফুল */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-20">
                    <Link to="/" className="bg-black/50 text-white px-4 py-2 rounded-full text-sm font-bold hover:bg-black/70 transition-colors backdrop-blur-sm border border-white/20">
                      ← Shorts
                    </Link>
                    <Link to={`/video/${short.youtubeId}`}
                      className="bg-red-600/80 text-white px-4 py-2 rounded-full text-xs font-semibold hover:bg-red-700 transition-colors backdrop-blur-sm border border-white/20">
                      Watch Full Video
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* নেভিগেশন বাটন */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-30">
          <button onClick={goToPrev} disabled={currentIndex === 0}
            className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ${currentIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/80'} transition-colors border border-white/20`}>
            <FaChevronUp className="text-white" size={18} />
          </button>
          <button onClick={goToNext} disabled={currentIndex === shortsData.length - 1}
            className={`w-10 h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center ${currentIndex === shortsData.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-black/80'} transition-colors border border-white/20`}>
            <FaChevronDown className="text-white" size={18} />
          </button>
        </div>

        {/* প্রোগ্রেস বার - বাম পাশে */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-30">
          {shortsData.map((_, i) => (
            <button key={i} onClick={() => setCurrentIndex(i)}
              className={`rounded-full transition-all duration-300 ${i === currentIndex ? 'w-1.5 h-12 bg-red-600' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>

        {/* ইন্ডিকেটর - কাউন্ট (ডান পাশে নিচে) */}
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded-full z-30 backdrop-blur-sm border border-white/20">
          {currentIndex + 1} / {shortsData.length}
        </div>

      </div>
    </div>
  );
};

export default Shorts;