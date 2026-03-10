// Navbar.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
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

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

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
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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

  // হোম পেইজের মেনু আইটেম
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

        {/* Desktop Menu Items - কেন্দ্রে */}
        {windowWidth > 768 && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            flex: 1,
            justifyContent: 'center'
          }}>
            {menuItems.slice(0, 5).map((item, index) => (
              <Link 
                key={index} 
                to={item.path} 
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: isDarkMode ? '#9ca3af' : '#4b5563',
                  transition: 'all 0.2s ease',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#1e1e1e' : '#f3f4f6';
                  e.currentTarget.style.color = item.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#4b5563';
                }}
                >
                  <span style={{ fontSize: '14px' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Right Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth <= 768 ? '6px' : '12px' }}>

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

      {/* Mobile Menu */}
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

              {/* Menu Items */}
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