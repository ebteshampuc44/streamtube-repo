// pages/Home.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import {
  FaHome, FaGlobe, FaVideo, FaStar, FaThumbsUp, FaUser, FaMapMarkerAlt,
  FaEdit, FaPlay, FaClock, FaEye, FaMusic, FaGamepad, FaPlane, FaFutbol,
  FaFire, FaNewspaper, FaHeart, FaComment, FaShare, FaChevronLeft,
  FaChevronRight, FaPlayCircle, FaPlus, FaCheck, FaVolumeUp, FaVolumeMute,
  FaBars, FaTimes, FaMoon, FaSun
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

// SVG আইকন কম্পোনেন্টসমূহ
const SVGIcons = {
  All: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Gaming: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 15H18M9 12H6M18 12H15M3 9.5L5 7H19L21 9.5M5 17L3 14.5V9.5M19 17L21 14.5V9.5M9 12V9M15 12V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M6 18C6 18.5523 6.44772 19 7 19H17C17.5523 19 18 18.5523 18 18V15H6V18Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Music: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 18V5L21 3V16M9 18C9 19.6569 7.65685 21 6 21C4.34315 21 3 19.6569 3 18C3 16.3431 4.34315 15 6 15C7.65685 15 9 16.3431 9 18ZM21 16C21 17.6569 19.6569 19 18 19C16.3431 19 15 17.6569 15 16C15 14.3431 16.3431 13 18 13C19.6569 13 21 14.3431 21 16Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Travel: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 21C12 21 20 16 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 16 12 21 12 21Z" stroke="currentColor" strokeWidth="2"/>
      <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Sports: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 3V21M3 12H21M18 12C18 16.9706 15 21 12 21C9 21 6 16.9706 6 12C6 7.02944 9 3 12 3C15 3 18 7.02944 18 12Z" stroke="currentColor" strokeWidth="2"/>
    </svg>
  ),
  Latest: ({ className }) => (
    <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2"/>
      <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  Fire: ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C12 2 8 6 8 10C8 13.3137 10.6863 16 14 16C17.3137 16 20 13.3137 20 10C20 6 16 2 12 2Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
      <path d="M8.5 14.5C7 16 7 18.5 8.5 20M15.5 14.5C17 16 17 18.5 15.5 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
      <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  PlayCircle: ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
      <path d="M10 8L16 12L10 16V8Z" stroke="currentColor" strokeWidth="2" fill="currentColor" fillOpacity="0.2"/>
    </svg>
  ),
  Newspaper: ({ className }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 5H20V19H4V5Z" stroke="currentColor" strokeWidth="2"/>
      <path d="M8 9H16M8 13H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
};

// ইউটিউব ভিডিও ডেটাবেস — সব ভিডিও ওয়ার্কিং
const ALL_VIDEOS = [
  // Trending - সবচেয়ে জনপ্রিয় ভিডিও
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "trending" },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "Luis Fonsi", views: "8.2B", time: "7 years ago", duration: "4:41", category: "trending" },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "trending" },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars", channel: "Mark Ronson", views: "5.2B", time: "9 years ago", duration: "4:30", category: "trending" },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", views: "3.3B", time: "8 years ago", duration: "6:07", category: "trending" },
  { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", channel: "Queen Official", views: "2.1B", time: "13 years ago", duration: "5:55", category: "trending" },
  { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again ft. Charlie Puth", channel: "Wiz Khalifa", views: "6.1B", time: "8 years ago", duration: "3:58", category: "trending" },
  { id: "pRpeEdMmmQ0", title: "Shakira - Waka Waka", channel: "Shakira", views: "3.5B", time: "13 years ago", duration: "3:23", category: "trending" },
  { id: "YVkUvmDQ3HY", title: "Lady Gaga - Bad Romance", channel: "Lady Gaga", views: "2.1B", time: "14 years ago", duration: "5:08", category: "trending" },
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "trending" },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "trending" },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "trending" },

  // Music - মিউজিক ভিডিও
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "music" },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "music" },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "music" },
  { id: "RgKAFK5djSk", title: "Wiz Khalifa - See You Again ft. Charlie Puth", channel: "Wiz Khalifa", views: "6.1B", time: "8 years ago", duration: "3:58", category: "music" },
  { id: "pRpeEdMmmQ0", title: "Shakira - Waka Waka", channel: "Shakira", views: "3.5B", time: "13 years ago", duration: "3:23", category: "music" },
  { id: "YVkUvmDQ3HY", title: "Lady Gaga - Bad Romance", channel: "Lady Gaga", views: "2.1B", time: "14 years ago", duration: "5:08", category: "music" },
  { id: "fJ9rUzIMcZQ", title: "Queen - Bohemian Rhapsody", channel: "Queen Official", views: "2.1B", time: "13 years ago", duration: "5:55", category: "music" },
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "music" },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito", channel: "Luis Fonsi", views: "8.2B", time: "7 years ago", duration: "4:41", category: "music" },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "music" },
  { id: "OPf0YbXqDm0", title: "Bruno Mars - Uptown Funk", channel: "Bruno Mars", views: "5.2B", time: "9 years ago", duration: "4:30", category: "music" },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", views: "3.3B", time: "8 years ago", duration: "6:07", category: "music" },

  // Gaming - গেমিং ভিডিও
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", views: "200M", time: "1 year ago", duration: "1:31", category: "gaming" },
  { id: "FkklG9MA0vM", title: "Minecraft Movie Official Trailer", channel: "Warner Bros.", views: "50M", time: "6 months ago", duration: "2:30", category: "gaming" },
  { id: "2SKi-NK_TPA", title: "Cyberpunk 2077 Gameplay", channel: "CD PROJEKT RED", views: "13M", time: "4 years ago", duration: "5:37", category: "gaming" },
  { id: "1-vcErOPofQ", title: "Red Dead Redemption 2 Trailer", channel: "Rockstar Games", views: "45M", time: "5 years ago", duration: "1:30", category: "gaming" },
  { id: "c0i88t0Kacs", title: "The Last of Us Part II", channel: "PlayStation", views: "22M", time: "4 years ago", duration: "2:45", category: "gaming" },
  { id: "8X2kIfS6fb8", title: "Call of Duty Modern Warfare II", channel: "Call of Duty", views: "35M", time: "2 years ago", duration: "2:15", category: "gaming" },
  { id: "iITyfCkUyh0", title: "God of War Ragnarok Trailer", channel: "PlayStation", views: "18M", time: "2 years ago", duration: "3:10", category: "gaming" },
  { id: "wR6e8pWU_5Y", title: "Spider-Man 2 Gameplay", channel: "Insomniac Games", views: "12M", time: "1 year ago", duration: "4:20", category: "gaming" },
  { id: "9fVYKFQYFhc", title: "Elden Ring Shadow of Erdtree", channel: "Bandai Namco", views: "8M", time: "3 months ago", duration: "2:50", category: "gaming" },
  { id: "Ux2J6fVTP6g", title: "Fortnite Chapter 5 Trailer", channel: "Fortnite", views: "25M", time: "6 months ago", duration: "1:45", category: "gaming" },
  { id: "L5uKv2z-XLc", title: "Valorant New Agent Gameplay", channel: "Valorant", views: "5M", time: "2 months ago", duration: "3:15", category: "gaming" },
  { id: "r0RYgBv0_0U", title: "League of Legends New Season", channel: "Riot Games", views: "7M", time: "3 months ago", duration: "2:30", category: "gaming" },

  // Travel - ভ্রমণ ভিডিও
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", category: "travel" },
  { id: "X48VuDVv0do", title: "Bali Travel Guide", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", category: "travel" },
  { id: "l482T0yNkeo", title: "Swiss Alps 4K", channel: "Drone Adventures", views: "22M", time: "3 years ago", duration: "8:45", category: "travel" },
  { id: "2b9txcUW4xs", title: "Japan Travel Guide 4K", channel: "Travel Japan", views: "8M", time: "2 years ago", duration: "15:30", category: "travel" },
  { id: "3tR4v3x_TVM", title: "Iceland - Land of Fire and Ice", channel: "Nature Relaxation", views: "5M", time: "3 years ago", duration: "11:20", category: "travel" },
  { id: "p3l7fgvrEKM", title: "Maldives Paradise 4K", channel: "Travel Wild", views: "7M", time: "2 years ago", duration: "10:15", category: "travel" },
  { id: "V7CqHtdPw6A", title: "Thailand Travel Guide", channel: "Travel Thirsty", views: "6M", time: "3 years ago", duration: "25:30", category: "travel" },
  { id: "qeMFq3Dp-DE", title: "New York City 4K", channel: "Amazing Places", views: "15M", time: "4 years ago", duration: "12:45", category: "travel" },
  { id: "WlL8l3S_zUw", title: "Paris France 4K", channel: "Travel Europe", views: "9M", time: "3 years ago", duration: "14:20", category: "travel" },
  { id: "J_-5n1XbF2c", title: "Dubai 4K - City of Gold", channel: "Travel Middle East", views: "11M", time: "2 years ago", duration: "18:30", category: "travel" },
  { id: "T3AG4SYYF8c", title: "Australia Travel Guide", channel: "Down Under Travel", views: "7M", time: "3 years ago", duration: "22:15", category: "travel" },
  { id: "XaYsdJPRw0Y", title: "Norway - Land of Fjords", channel: "Scandinavia Travel", views: "8M", time: "2 years ago", duration: "16:40", category: "travel" },

  // Sports - খেলাধুলার ভিডিও
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", views: "55M", time: "1 year ago", duration: "6:23", category: "sports" },
  { id: "VDONxJNOzN0", title: "NBA Best Plays 2024", channel: "NBA", views: "30M", time: "8 months ago", duration: "8:15", category: "sports" },
  { id: "aLBjnrQhPW4", title: "Boxing Knockouts 2024", channel: "Boxing World", views: "15M", time: "5 months ago", duration: "10:22", category: "sports" },
  { id: "6cHp8_g6PQw", title: "Top 10 NFL Plays 2024", channel: "NFL", views: "12M", time: "6 months ago", duration: "7:45", category: "sports" },
  { id: "eOrN3pVfSsA", title: "Formula 1 2024 Highlights", channel: "Formula 1", views: "8M", time: "4 months ago", duration: "9:30", category: "sports" },
  { id: "kXYiU_JCYtU", title: "UFC Knockouts 2024", channel: "UFC", views: "20M", time: "3 months ago", duration: "12:15", category: "sports" },
  { id: "IkG3M2u1P-I", title: "Lionel Messi Best Goals", channel: "FC Barcelona", views: "45M", time: "2 years ago", duration: "7:30", category: "sports" },
  { id: "9XJ3T_c77mQ", title: "LeBron James Top 50 Plays", channel: "NBA", views: "25M", time: "1 year ago", duration: "11:20", category: "sports" },
  { id: "fndm54g7nT4", title: "Cricket World Cup 2023 Highlights", channel: "ICC", views: "18M", time: "1 year ago", duration: "14:45", category: "sports" },
  { id: "Rr1Q9C-NjS8", title: "Tennis Best Points 2024", channel: "Wimbledon", views: "9M", time: "5 months ago", duration: "8:30", category: "sports" },
  { id: "8Gq8v4E8P5Q", title: "Olympics 2024 Best Moments", channel: "Olympics", views: "22M", time: "3 months ago", duration: "13:15", category: "sports" },
  { id: "5tCk8XvWtF4", title: "NHL Best Goals 2024", channel: "NHL", views: "7M", time: "4 months ago", duration: "6:45", category: "sports" },

  // Latest - টেক এবং লেটেস্ট ভিডিও
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", views: "12M", time: "5 months ago", duration: "22:30", category: "latest" },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", views: "5M", time: "1 year ago", duration: "18:45", category: "latest" },
  { id: "aircAruvnKk", title: "Neural Networks Explained", channel: "3Blue1Brown", views: "18M", time: "5 years ago", duration: "19:13", category: "latest" },
  { id: "D7o7BrlbaDs", title: "Tesla Cybertruck Review", channel: "Tesla", views: "25M", time: "1 year ago", duration: "14:20", category: "latest" },
  { id: "X8db2p3BS2M", title: "OpenAI GPT-5 Explained", channel: "Tech World", views: "3M", time: "3 months ago", duration: "12:30", category: "latest" },
  { id: "f6zYyqKbF1M", title: "Google Pixel 9 Pro Review", channel: "Google", views: "4M", time: "2 months ago", duration: "16:45", category: "latest" },
  { id: "9Y8nl0aJrlI", title: "Apple Vision Pro Review", channel: "Apple", views: "15M", time: "6 months ago", duration: "20:15", category: "latest" },
  { id: "qy8P2iFkL6M", title: "AI Revolution 2024", channel: "Tech Insider", views: "6M", time: "4 months ago", duration: "25:30", category: "latest" },
  { id: "r3L5Yp3wW5Y", title: "Future of Gaming 2024", channel: "GameSpot", views: "4M", time: "3 months ago", duration: "18:20", category: "latest" },
  { id: "p7YXXieghto", title: "Electric Cars 2024", channel: "Auto Focus", views: "5M", time: "4 months ago", duration: "22:45", category: "latest" },
  { id: "n_7H7vLkR4Q", title: "SpaceX Starship Update", channel: "SpaceX", views: "8M", time: "2 months ago", duration: "15:30", category: "latest" },
  { id: "k5qZ5t5X5zQ", title: "Next Gen Smartphones 2024", channel: "Tech Radar", views: "3.5M", time: "3 months ago", duration: "14:15", category: "latest" },
];

// শর্টস ভিডিও
const SHORTS_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Never Gonna Give You Up", user: "Rick Astley", views: "15M" },
  { id: "kJQP7kiw5Fk", title: "Despacito Challenge", user: "LuisFonsi", views: "52M" },
  { id: "hT_nvWreIhg", title: "Blinding Lights Dance", user: "The Weeknd", views: "26M" },
  { id: "EHXhcD6Pkgs", title: "GTA 6 First Look", user: "Rockstar Games", views: "5M" },
  { id: "M68BuiStGKQ", title: "Beautiful Places 4K", user: "Discover Earth", views: "800K" },
  { id: "nfWlot6h_JM", title: "Shake It Off Dance", user: "Taylor Swift", views: "22M" },
  { id: "FZGMYJdaZMg", title: "Ronaldo Skills", user: "FIFA", views: "12M" },
  { id: "2Bkd0VoFBkM", title: "iPhone 16 First Look", user: "MKBHD", views: "8M" },
  { id: "pRpeEdMmmQ0", title: "Waka Waka Dance", user: "Shakira", views: "18M" },
  { id: "YVkUvmDQ3HY", title: "Bad Romance", user: "Lady Gaga", views: "14M" },
  { id: "fJ9rUzIMcZQ", title: "Bohemian Rhapsody", user: "Queen", views: "20M" },
  { id: "1-vcErOPofQ", title: "RDR2 Best Moments", user: "Rockstar", views: "6M" },
];

// YouTube Thumbnail Component with error handling
const YTThumbnail = ({ videoId, title, duration, badge }) => {
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
      {badge && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded animate-pulse">
          {badge}
        </span>
      )}
      <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
        {duration}
      </span>
    </div>
  );
};

const Home = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("all");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [trendingIndex, setTrendingIndex] = useState(0);
  const [isHoveringHero, setIsHoveringHero] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const scrollContainerRef = useRef(null);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // মেনু বাইরে ক্লিক
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) &&
        menuButtonRef.current && !menuButtonRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const categories = [
    { id: "all", label: "All", icon: <SVGIcons.All className="w-5 h-5" /> },
    { id: "gaming", label: "Gaming", icon: <SVGIcons.Gaming className="w-5 h-5" /> },
    { id: "music", label: "Music", icon: <SVGIcons.Music className="w-5 h-5" /> },
    { id: "travel", label: "Travel", icon: <SVGIcons.Travel className="w-5 h-5" /> },
    { id: "sports", label: "Sports", icon: <SVGIcons.Sports className="w-5 h-5" /> },
    { id: "latest", label: "Latest", icon: <SVGIcons.Latest className="w-5 h-5" /> },
  ];

  const sidebarItems = [
    { icon: <FaHome size={20} />, label: "Home", path: "/", active: true },
    { icon: <FaGlobe size={20} />, label: "Explore", path: "/explore" },
    { icon: <FaVideo size={20} />, label: "Videos", path: "/videos" },
    { icon: <FaStar size={20} />, label: "Trending", path: "/trending" },
    { icon: <FaThumbsUp size={20} />, label: "Liked", path: "/liked" },
    { icon: <FaUser size={20} />, label: "Profile", path: "/profile" },
    { icon: <FaMapMarkerAlt size={20} />, label: "Travel", path: "/travel" },
    { icon: <FaEdit size={20} />, label: "Blog", path: "/blog" }
  ];

  // সেকশন ডেটা
  const heroVideos = ALL_VIDEOS.filter(v => v.category === "trending").slice(0, 6);
  const trendingVideos = ALL_VIDEOS.filter(v => v.category === "trending");
  const musicVideos = ALL_VIDEOS.filter(v => v.category === "music");
  const gamingVideos = ALL_VIDEOS.filter(v => v.category === "gaming");
  const travelVideos = ALL_VIDEOS.filter(v => v.category === "travel");
  const sportsVideos = ALL_VIDEOS.filter(v => v.category === "sports");
  const latestVideos = ALL_VIDEOS.filter(v => v.category === "latest");

  // ক্যাটাগরি ফিল্টার
  const filteredVideos = activeCategory === "all" ? ALL_VIDEOS : ALL_VIDEOS.filter(v => v.category === activeCategory);

  useEffect(() => {
    setIsPageLoaded(true);
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    let interval;
    if (!isHoveringHero) {
      interval = setInterval(() => {
        setTrendingIndex(prev => (prev + 1) % heroVideos.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isHoveringHero, heroVideos.length]);

  const menuPanelStyle = {
    position: 'fixed', top: 0, left: 0, height: '100%', width: '280px',
    backgroundColor: isDarkMode ? '#111' : '#ffffff',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)', zIndex: 100,
    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)', overflowY: 'auto'
  };

  const backdropStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 90,
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease'
  };

  const currentHero = heroVideos[trendingIndex];

  // ভিডিও কার্ড কম্পোনেন্ট
  const VideoCard = ({ video, badge }) => (
    <Link to={`/video/${video.id}`} key={video.id} className="group cursor-pointer">
      <YTThumbnail videoId={video.id} title={video.title} duration={video.duration} badge={badge} />
      <h3 className={`text-sm font-semibold line-clamp-2 mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {video.title}
      </h3>
      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-1`}>
        {video.channel}
      </p>
      <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
        {video.views} views • {video.time}
      </p>
    </Link>
  );

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'}`}>

      {/* সাইডবার - ডেস্কটপ */}
      {!isMobile && (
        <div className={`w-20 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-600 border-r border-gray-200'} flex flex-col items-center py-6 space-y-8 sticky top-0 h-screen z-10`}>
          {sidebarItems.map((item, index) => (
            <Link to={item.path} key={index}
              className={`hover:text-red-500 cursor-pointer transition-colors ${item.path === '/' ? 'text-red-500' : ''}`}
              title={item.label}>
              {item.icon}
            </Link>
          ))}
        </div>
      )}

      {/* মূল কন্টেন্ট */}
      <div className={`${!isMobile ? 'flex-1' : 'w-full'} overflow-hidden`}>
        
        {/* হোম হেডার - ডেস্কটপ ও মোবাইলের জন্য */}
        <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-3`}>
          <div className="max-w-[1600px] mx-auto flex items-center justify-between">
            {/* মোবাইল মেনু বাটন */}
            {isMobile && (
              <button
                ref={menuButtonRef}
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                <FaBars size={20} />
              </button>
            )}

            {/* লোগো - মোবাইলে সেন্টার
            <div className={`flex items-center ${isMobile ? 'flex-1 justify-center' : ''}`}>
              <Link to="/" className="flex items-center">
                <span className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>stream</span>
                <span className="text-xl font-bold text-red-600">tube</span>
              </Link>
            </div> */}



            {/* ডান পাশের বাটন */}
            <div className="flex items-center gap-2">

              
              {/* থিম টগল */}
              {/* <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}
              >
                {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
              </button> */}
            </div>
          </div>


        </div>
        
        {/* মেইন কন্টেন্ট - মোবাইলের জন্য হেডার ছাড়া */}
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">

          {/* ───── নরমাল কন্টেন্ট ───── */}
          {(
            <>
              {/* ক্যাটাগরি ফিল্টার */}
              <div ref={scrollContainerRef} className="flex gap-2 mb-6 overflow-x-auto scrollbar-hide pb-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-red-600 text-white'
                        : isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}>
                    <span className="w-5 h-5">{cat.icon}</span>
                    <span>{cat.label}</span>
                  </button>
                ))}
              </div>

              {/* ───── হিরো সেকশন ───── */}
              {activeCategory === "all" && currentHero && (
                <section className="mb-8">
                  <div
                    className="relative rounded-2xl overflow-hidden"
                    onMouseEnter={() => setIsHoveringHero(true)}
                    onMouseLeave={() => setIsHoveringHero(false)}
                  >
                    <Link to={`/video/${currentHero.id}`}>
                      <div className="relative aspect-video md:aspect-[21/9] bg-black">
                        <img
                          src={`https://img.youtube.com/vi/${currentHero.id}/maxresdefault.jpg`}
                          alt={currentHero.title}
                          className="w-full h-full object-cover opacity-80"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://img.youtube.com/vi/${currentHero.id}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-red-600/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                            <FaPlay className="text-white text-xl md:text-2xl ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 right-4">
                          <span className="bg-red-600 text-white text-xs px-2 py-1 rounded mb-2 inline-block">
                            {currentHero.channel.toUpperCase()}
                          </span>
                          <h2 className="text-white text-xl md:text-3xl font-bold line-clamp-2">{currentHero.title}</h2>
                          <p className="text-white/80 text-sm mt-1">{currentHero.views} views • {currentHero.time}</p>
                        </div>
                      </div>
                    </Link>
                    {/* স্লাইডার ডট */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {heroVideos.map((_, i) => (
                        <button key={i} onClick={() => setTrendingIndex(i)}
                          className={`w-2 h-2 rounded-full transition-all ${i === trendingIndex ? 'bg-red-600 w-6' : 'bg-white/50'}`} />
                      ))}
                    </div>
                    {/* prev/next */}
                    <button onClick={() => setTrendingIndex(p => (p - 1 + heroVideos.length) % heroVideos.length)}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
                      <FaChevronLeft />
                    </button>
                    <button onClick={() => setTrendingIndex(p => (p + 1) % heroVideos.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70">
                      <FaChevronRight />
                    </button>
                  </div>
                </section>
              )}

              {/* ───── ক্যাটাগরি ফিল্টার ভিউ ───── */}
              {activeCategory !== "all" && (
                <section className="mb-8">
                  <h2 className={`text-lg md:text-xl font-bold mb-4 flex items-center gap-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    <span className="w-6 h-6">{categories.find(c => c.id === activeCategory)?.icon}</span>
                    <span>{categories.find(c => c.id === activeCategory)?.label} Videos</span>
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {filteredVideos.slice(0, 12).map(video => <VideoCard key={video.id} video={video} />)}
                  </div>
                </section>
              )}

              {/* ───── Trending সেকশন ───── */}
              {activeCategory === "all" && (
                <>
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Fire className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Trending</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                      {trendingVideos.slice(0, 12).map(video => <VideoCard key={video.id} video={video} />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/trending" className="text-sm text-red-600 hover:underline font-medium">
                        See all trending videos →
                      </Link>
                    </div>
                  </section>

                  {/* ───── Shorts সেকশন ───── */}
                  <section className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <SVGIcons.PlayCircle className="w-6 h-6 text-red-600" />
                        <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Shorts</h2>
                      </div>
                      <Link to="/shorts" className="text-sm text-red-600 hover:underline font-medium">See all →</Link>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {SHORTS_VIDEOS.map(short => (
                        <Link
                          to={`/shorts`}
                          key={short.id}
                          className="group cursor-pointer"
                        >
                          {/* ভার্টিকাল থাম্বনেইল */}
                          <div className="relative rounded-xl overflow-hidden bg-black" style={{ aspectRatio: '9/16' }}>
                            <img
                              src={`https://img.youtube.com/vi/${short.id}/hqdefault.jpg`}
                              alt={short.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                              loading="lazy"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/300x533?text=Video';
                              }}
                            />
                            {/* গ্র্যাডিয়েন্ট */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                            {/* প্লে বাটন */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="w-10 h-10 bg-red-600/90 rounded-full flex items-center justify-center">
                                <FaPlay className="text-white text-sm ml-0.5" />
                              </div>
                            </div>
                            {/* Shorts আইকন */}
                            <div className="absolute top-2 left-2">
                              <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                                <FaPlay className="text-white text-xs ml-0.5" />
                              </div>
                            </div>
                            {/* ভিউ কাউন্ট */}
                            <div className="absolute bottom-2 left-2 right-2">
                              <p className="text-white text-xs font-semibold line-clamp-2">{short.title}</p>
                              <p className="text-white/70 text-xs mt-0.5">{short.views} views</p>
                            </div>
                          </div>
                          <p className={`text-xs mt-1.5 truncate ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            @{short.user}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </section>

                  {/* Music সেকশন */}
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Music className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Music</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {musicVideos.slice(0, 8).map(video => <VideoCard key={video.id} video={video} />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/videos?category=music" className="text-sm text-red-600 hover:underline font-medium">
                        See all music videos →
                      </Link>
                    </div>
                  </section>

                  {/* Gaming সেকশন */}
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Gaming className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gaming</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {gamingVideos.slice(0, 8).map(video => <VideoCard key={video.id} video={video} />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/videos?category=gaming" className="text-sm text-red-600 hover:underline font-medium">
                        See all gaming videos →
                      </Link>
                    </div>
                  </section>

                  {/* Travel সেকশন */}
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Travel className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Travel</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {travelVideos.slice(0, 8).map(video => <VideoCard key={video.id} video={video} />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/travel" className="text-sm text-red-600 hover:underline font-medium">
                        See all travel videos →
                      </Link>
                    </div>
                  </section>

                  {/* Sports সেকশন */}
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Sports className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sports</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {sportsVideos.slice(0, 8).map(video => <VideoCard key={video.id} video={video} />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/videos?category=sports" className="text-sm text-red-600 hover:underline font-medium">
                        See all sports videos →
                      </Link>
                    </div>
                  </section>

                  {/* Latest সেকশন */}
                  <section className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <SVGIcons.Newspaper className="w-6 h-6 text-red-600" />
                      <h2 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest Videos</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {latestVideos.slice(0, 8).map(video => <VideoCard key={video.id} video={video} badge="NEW" />)}
                    </div>
                    <div className="mt-3 text-right">
                      <Link to="/videos?category=latest" className="text-sm text-red-600 hover:underline font-medium">
                        See all latest videos →
                      </Link>
                    </div>
                  </section>
                </>
              )}
            </>
          )}

        </div>
      </div>

      {/* মোবাইল সাইড মেনু */}
      {isMobile && (
        <>
          <div style={backdropStyle} onClick={() => setIsMobileMenuOpen(false)} />
          <div ref={menuRef} style={menuPanelStyle}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <Link to="/" className="flex items-center">
                  <span className="text-xl font-bold">
                    <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>stream</span>
                    <span className="text-red-600">tube</span>
                  </span>
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`p-2 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}
                >
                  <FaTimes size={18} />
                </button>
              </div>
              <div className="space-y-4">
                {sidebarItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                      item.path === '/'
                        ? 'bg-red-600 text-white'
                        : isDarkMode
                          ? 'text-gray-300 hover:bg-gray-800'
                          : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>
              
              {/* মোবাইলে থিম টগল */}
              {/* <div className="mt-8 pt-6 border-t border-gray-700">
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center gap-4 p-3 rounded-lg ${
                    isDarkMode ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{isDarkMode ? <FaSun /> : <FaMoon />}</span>
                  <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
              </div> */}
            </div>
          </div>
        </>
      )}

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        
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

export default Home;