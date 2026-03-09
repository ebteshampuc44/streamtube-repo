// Navbar.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaSearch, 
  FaMoon, 
  FaUser, 
  FaSun,
  FaBars,
  FaTimes,
  FaHome,
  FaGlobe,
  FaVideo,
  FaStar,
  FaThumbsUp,
  FaMapMarkerAlt,
  FaEdit,
  FaPlayCircle
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

// ইউটিউব ভিডিও ডেটাবেস — Navbar এ সার্চ করার জন্য
const ALL_VIDEOS = [
  // Trending
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", views: "1.5B", time: "15 years ago", duration: "3:33", category: "trending", poster: `https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg` },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "LuisFonsiVEVO", views: "8.2B", time: "7 years ago", duration: "4:41", category: "trending", poster: `https://img.youtube.com/vi/kJQP7kiw5Fk/hqdefault.jpg` },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", views: "6.1B", time: "7 years ago", duration: "4:24", category: "trending", poster: `https://img.youtube.com/vi/JGwWNGJdvx8/hqdefault.jpg` },
  { id: "09R8_2nJtjg", title: "Maroon 5 - Sugar", channel: "Maroon 5", views: "3.9B", time: "9 years ago", duration: "3:55", category: "trending", poster: `https://img.youtube.com/vi/09R8_2nJtjg/hqdefault.jpg` },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars", channel: "MarkRonsonVEVO", views: "5.2B", time: "9 years ago", duration: "4:30", category: "trending", poster: `https://img.youtube.com/vi/OPf0YbXqDm0/hqdefault.jpg` },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", views: "3.3B", time: "8 years ago", duration: "6:07", category: "trending", poster: `https://img.youtube.com/vi/YQHsXMglC9A/hqdefault.jpg` },

  // Music
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", views: "4.2B", time: "4 years ago", duration: "4:20", category: "music", poster: `https://img.youtube.com/vi/hT_nvWreIhg/hqdefault.jpg` },
  { id: "SlPhMPnQ58k", title: "Bad Bunny - Tití Me Preguntó", channel: "Bad Bunny", views: "1.2B", time: "2 years ago", duration: "4:03", category: "music", poster: `https://img.youtube.com/vi/SlPhMPnQ58k/hqdefault.jpg` },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", views: "3.8B", time: "9 years ago", duration: "4:10", category: "music", poster: `https://img.youtube.com/vi/nfWlot6h_JM/hqdefault.jpg` },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", views: "2.9B", time: "10 years ago", duration: "4:33", category: "music", poster: `https://img.youtube.com/vi/CevxZvSJLk8/hqdefault.jpg` },

  // Gaming
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", views: "200M", time: "1 year ago", duration: "1:31", category: "gaming", poster: `https://img.youtube.com/vi/EHXhcD6Pkgs/hqdefault.jpg` },
  { id: "FkklG9MA0vM", title: "Minecraft - The Movie Official Trailer", channel: "Warner Bros. Pictures", views: "50M", time: "6 months ago", duration: "2:30", category: "gaming", poster: `https://img.youtube.com/vi/FkklG9MA0vM/hqdefault.jpg` },
  { id: "2SKi-NK_TPA", title: "Cyberpunk 2077 – Official Gameplay Trailer", channel: "CD PROJEKT RED", views: "13M", time: "4 years ago", duration: "5:37", category: "gaming", poster: `https://img.youtube.com/vi/2SKi-NK_TPA/hqdefault.jpg` },
  { id: "iqysmS4lxwQ", title: "Elden Ring - Official Reveal Trailer", channel: "Bandai Namco", views: "9M", time: "3 years ago", duration: "3:18", category: "gaming", poster: `https://img.youtube.com/vi/iqysmS4lxwQ/hqdefault.jpg` },

  // Travel
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", views: "45M", time: "2 years ago", duration: "4:58", category: "travel", poster: `https://img.youtube.com/vi/M68BuiStGKQ/hqdefault.jpg` },
  { id: "X48VuDVv0do", title: "Bali, Indonesia Travel Guide", channel: "Mark Wiens", views: "12M", time: "3 years ago", duration: "20:04", category: "travel", poster: `https://img.youtube.com/vi/X48VuDVv0do/hqdefault.jpg` },
  { id: "K4TOrB7at0Y", title: "Tokyo Japan Travel Guide 4K", channel: "Travel Japan", views: "8M", time: "2 years ago", duration: "15:30", category: "travel", poster: `https://img.youtube.com/vi/K4TOrB7at0Y/hqdefault.jpg` },
  { id: "l482T0yNkeo", title: "Switzerland Travel - Swiss Alps 4K", channel: "Drone Adventures", views: "22M", time: "3 years ago", duration: "8:45", category: "travel", poster: `https://img.youtube.com/vi/l482T0yNkeo/hqdefault.jpg` },

  // Sports
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", views: "55M", time: "1 year ago", duration: "6:23", category: "sports", poster: `https://img.youtube.com/vi/FZGMYJdaZMg/hqdefault.jpg` },
  { id: "VDONxJNOzN0", title: "NBA Best Plays of 2024", channel: "NBA", views: "30M", time: "8 months ago", duration: "8:15", category: "sports", poster: `https://img.youtube.com/vi/VDONxJNOzN0/hqdefault.jpg` },
  { id: "TLDRW2_stOE", title: "Lionel Messi World Cup Goals", channel: "FIFA World Cup", views: "40M", time: "2 years ago", duration: "5:10", category: "sports", poster: `https://img.youtube.com/vi/TLDRW2_stOE/hqdefault.jpg` },
  { id: "aLBjnrQhPW4", title: "Boxing Knockouts 2024 Compilation", channel: "Boxing World", views: "15M", time: "5 months ago", duration: "10:22", category: "sports", poster: `https://img.youtube.com/vi/aLBjnrQhPW4/hqdefault.jpg` },

  // Latest/Tech
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", views: "12M", time: "5 months ago", duration: "22:30", category: "latest", poster: `https://img.youtube.com/vi/2Bkd0VoFBkM/hqdefault.jpg` },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", views: "5M", time: "1 year ago", duration: "18:45", category: "latest", poster: `https://img.youtube.com/vi/0rd_PR66cCM/hqdefault.jpg` },
  { id: "4NRXx6U8BYE", title: "AI in 2024 - What's Next?", channel: "Two Minute Papers", views: "3M", time: "8 months ago", duration: "12:15", category: "latest", poster: `https://img.youtube.com/vi/4NRXx6U8BYE/hqdefault.jpg` },
  { id: "aircAruvnKk", title: "Neural Networks Explained", channel: "3Blue1Brown", views: "18M", time: "5 years ago", duration: "19:13", category: "latest", poster: `https://img.youtube.com/vi/aircAruvnKk/hqdefault.jpg` },
];

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  // স্ক্রল ইফেক্ট
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // মেনু বাইরে ক্লিক হ্যান্ডলার
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target) &&
        menuButtonRef.current && 
        !menuButtonRef.current.contains(event.target)
      ) {
        setIsMobileMenuOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // রিসাইজ হ্যান্ডলার
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // সার্চ ফাংশন
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      setShowSearchDropdown(false);
      return;
    }
    setIsSearching(true);
    setShowSearchDropdown(true);
    const q = query.toLowerCase();
    const results = ALL_VIDEOS.filter(v =>
      v.title.toLowerCase().includes(q) ||
      v.channel.toLowerCase().includes(q) ||
      v.category.toLowerCase().includes(q)
    );
    setSearchResults(results);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleVideoClick = (videoId) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    setSearchResults([]);
    setIsSearching(false);
    navigate(`/video/${videoId}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  };

  // **ছোট করা স্টাইল**
  const navbarStyle = {
    width: '100%',
    backgroundColor: isDarkMode 
      ? (isScrolled ? 'rgba(17, 17, 17, 0.95)' : '#111') 
      : (isScrolled ? 'rgba(255, 255, 255, 0.95)' : '#ffffff'),
    padding: '8px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: isDarkMode ? '#ffffff' : '#333333',
    borderBottom: isDarkMode 
      ? (isScrolled ? '1px solid rgba(255,255,255,0.1)' : 'none')
      : (isScrolled ? '1px solid rgba(0,0,0,0.1)' : '1px solid #e5e7eb'),
    transition: 'all 0.3s ease',
    position: 'sticky',
    top: 0,
    zIndex: 50,
    boxSizing: 'border-box',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.1)' : 'none'
  };

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f3f4f6',
    borderRadius: '50px',
    padding: '2px 2px 2px 16px',
    width: '450px',
    transition: 'all 0.3s ease',
    position: 'relative',
    border: isDarkMode ? '1px solid #333' : '1px solid #e5e7eb',
    boxShadow: isSearchOpen ? '0 4px 15px rgba(220, 38, 38, 0.2)' : 'none'
  };

  const mobileSearchStyle = {
    width: '100%',
    backgroundColor: isDarkMode ? '#111' : '#ffffff',
    padding: '12px 16px',
    borderBottom: isDarkMode ? '1px solid #333' : '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    position: 'sticky',
    top: '62px',
    zIndex: 45
  };

  const Logo = () => (
    <Link to="/" style={{ textDecoration: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        <div style={{
          width: '32px',
          height: '32px',
          backgroundColor: '#dc2626',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: 'rotate(-5deg)',
          transition: 'transform 0.3s ease'
        }}>
          <FaPlayCircle style={{ color: 'white', fontSize: '18px' }} /> 
        </div>
        <span style={{
          fontSize: '20px',
          fontWeight: '700',
          color: isDarkMode ? '#fff' : '#111',
          letterSpacing: '-0.5px'
        }}>
          Stream<span style={{ color: '#dc2626' }}>Tube</span>
        </span>
      </div>
    </Link>
  );

  // হোম পেইজের মেনু আইটেম - আপডেটেড
  const menuItems = [
    { icon: <FaHome />, label: 'Home', path: '/', color: '#3b82f6' },
    { icon: <FaGlobe />, label: 'Explore', path: '/explore', color: '#10b981' },
    { icon: <FaVideo />, label: 'Videos', path: '/videos', color: '#8b5cf6' },
    { icon: <FaStar />, label: 'Trending', path: '/trending', color: '#ef4444' },
    { icon: <FaThumbsUp />, label: 'Liked', path: '/liked', color: '#ec4899' },
    { icon: <FaUser />, label: 'Profile', path: '/profile', color: '#f59e0b' },
    { icon: <FaMapMarkerAlt />, label: 'Travel', path: '/travel', color: '#14b8a6' },
    { icon: <FaEdit />, label: 'Blog', path: '/blog', color: '#8b5cf6' }
  ];

  return (
    <>
      <div style={navbarStyle}>
        {/* Left Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth <= 768 ? '8px' : '16px' }}>
          {windowWidth <= 768 && (
            <button 
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: isDarkMode ? '#1e1e1e' : '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: isDarkMode ? '#fff' : '#333'
              }}
            >
              {isMobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
            </button>
          )}
          <Logo />
        </div>

        {/* Search Section - Desktop */}
        {windowWidth > 768 && (
          <div style={searchBarStyle} ref={searchRef}>
            <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery.trim() && setShowSearchDropdown(true)}
                style={{
                  background: 'transparent',
                  outline: 'none',
                  border: 'none',
                  flex: 1,
                  fontSize: '14px',
                  padding: '8px 0',
                  color: isDarkMode ? '#ffffff' : '#1f2937',
                  placeholder: isDarkMode ? '#6b7280' : '#9ca3af'
                }}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                    setShowSearchDropdown(false);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '6px',
                    color: isDarkMode ? '#9ca3af' : '#6b7280',
                    borderRadius: '50%',
                    transition: 'all 0.2s'
                  }}
                >
                  <FaTimes size={12} />
                </button>
              )}
            </form>
            <button 
              type="submit"
              onClick={handleSearchSubmit}
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '6px 20px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                fontSize: '14px',
                fontWeight: '500',
                gap: '6px'
              }}
            >
              <FaSearch size={14} />
              <span>Search</span>
            </button>

            {/* Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: 'calc(100% + 8px)',
                left: 0,
                right: 0,
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
                borderRadius: '12px',
                maxHeight: '350px',
                overflowY: 'auto',
                boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
                zIndex: 1000
              }}>
                {searchResults.slice(0, 5).map(video => (
                  <div
                    key={video.id}
                    onClick={() => handleVideoClick(video.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
                      transition: 'all 0.2s'
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                      alt={video.title}
                      style={{
                        width: '50px',
                        height: '35px',
                        borderRadius: '6px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: '500',
                        color: isDarkMode ? '#fff' : '#1f2937',
                        marginBottom: '2px'
                      }}>
                        {video.title.length > 40 ? video.title.substring(0, 40) + '...' : video.title}
                      </div>
                      <div style={{ 
                        fontSize: '11px',
                        color: isDarkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {video.channel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth <= 768 ? '6px' : '12px' }}>

          {/* Mobile Search Icon */}
          {windowWidth <= 768 && (
            <button 
              onClick={toggleSearch}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: isDarkMode ? '#1e1e1e' : '#f3f4f6',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                color: isDarkMode ? '#fff' : '#333'
              }}
            >
              <FaSearch size={16} />
            </button>
          )}

          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#1e1e1e' : '#f3f4f6',
              color: isDarkMode ? '#fbbf24' : '#4b5563',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {isDarkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
          </button>

          {/* Sign In Button */}
          <Link to="/signin">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
              color: '#ffffff',
              padding: windowWidth <= 768 ? '8px' : '6px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)'
            }}
            >
              <FaUser size={14} />
              {windowWidth > 640 && <span>Sign In</span>}
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isSearchOpen && windowWidth <= 768 && (
        <div style={mobileSearchStyle} ref={searchRef}>
          <form onSubmit={handleSearchSubmit} style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#f3f4f6',
            borderRadius: '50px',
            padding: '2px 2px 2px 16px',
            transition: 'all 0.3s ease',
            border: isDarkMode ? '1px solid #333' : '1px solid #e5e7eb',
            animation: 'slideDown 0.3s ease'
          }}>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              style={{
                background: 'transparent',
                outline: 'none',
                border: 'none',
                flex: 1,
                fontSize: '14px',
                padding: '8px 0',
                color: isDarkMode ? '#ffffff' : '#1f2937'
              }}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchDropdown(false);
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '6px',
                  color: isDarkMode ? '#9ca3af' : '#6b7280',
                  borderRadius: '50%',
                  transition: 'all 0.2s'
                }}
              >
                <FaTimes size={12} />
              </button>
            )}
            <button 
              type="submit"
              style={{
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: '6px 16px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontSize: '13px',
                fontWeight: '500'
              }}
            >
              <FaSearch size={14} />
            </button>

            {/* Mobile Search Dropdown */}
            {showSearchDropdown && searchResults.length > 0 && (
              <div style={{
                position: 'fixed',
                top: '115px',
                left: '16px',
                right: '16px',
                backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
                border: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`,
                borderRadius: '12px',
                maxHeight: '300px',
                overflowY: 'auto',
                boxShadow: '0 20px 35px rgba(0,0,0,0.2)',
                zIndex: 1000
              }}>
                {searchResults.slice(0, 5).map(video => (
                  <div
                    key={video.id}
                    onClick={() => {
                      handleVideoClick(video.id);
                      setIsSearchOpen(false);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 12px',
                      cursor: 'pointer',
                      borderBottom: `1px solid ${isDarkMode ? '#333' : '#f0f0f0'}`,
                      transition: 'all 0.2s'
                    }}
                  >
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/default.jpg`}
                      alt={video.title}
                      style={{
                        width: '50px',
                        height: '35px',
                        borderRadius: '6px',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ 
                        fontSize: '13px', 
                        fontWeight: '500',
                        color: isDarkMode ? '#fff' : '#1f2937',
                        marginBottom: '2px'
                      }}>
                        {video.title.length > 40 ? video.title.substring(0, 40) + '...' : video.title}
                      </div>
                      <div style={{ 
                        fontSize: '11px',
                        color: isDarkMode ? '#9ca3af' : '#6b7280'
                      }}>
                        {video.channel}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>
      )}

      {/* Mobile Menu - আপডেটেড */}
      {windowWidth <= 768 && (
        <>
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 90,
            opacity: isMobileMenuOpen ? 1 : 0,
            visibility: isMobileMenuOpen ? 'visible' : 'hidden',
            transition: 'all 0.3s ease',
            backdropFilter: 'blur(4px)'
          }} onClick={() => setIsMobileMenuOpen(false)} />
          
          <div ref={menuRef} style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '280px',
            backgroundColor: isDarkMode ? '#111' : '#ffffff',
            boxShadow: '0 0 40px rgba(0,0,0,0.3)',
            zIndex: 100,
            transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
            transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            overflowY: 'auto'
          }}>
            <div style={{ padding: '20px' }}>
              {/* Menu Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: `1px solid ${isDarkMode ? '#333' : '#e5e7eb'}`
              }}>
                <Logo />
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    background: isDarkMode ? '#1e1e1e' : '#f3f4f6',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isDarkMode ? '#fff' : '#333'
                  }}
                >
                  <FaTimes size={16} />
                </button>
              </div>

              {/* Menu Items - সোজা লিস্ট আকারে */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}>
                {menuItems.map((item, index) => (
                  <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 16px',
                        background: isDarkMode ? '#1a1a1a' : '#f8f8f8',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        animation: `fadeInUp 0.3s ease ${index * 0.03}s both`
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span style={{ fontSize: '18px', color: item.color }}>{item.icon}</span>
                      <span style={{ 
                        fontSize: '14px', 
                        fontWeight: '500',
                        color: isDarkMode ? '#e5e7eb' : '#1f2937'
                      }}>
                        {item.label}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;