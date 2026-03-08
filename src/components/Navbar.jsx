import React, { useContext, useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { 
  FaSearch, 
  FaShoppingCart, 
  FaMoon, 
  FaUser, 
  FaSlidersH, 
  FaSun,
  FaBars,
  FaTimes,
  FaHome,
  FaGlobe,
  FaVideo,
  FaStar,
  FaThumbsUp,
  FaMapMarkerAlt,
  FaEdit
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

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
        setIsSearchOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  // ইনলাইন স্টাইল - ডার্ক/লাইট মোড অনুযায়ী
  const navbarStyle = {
    width: '100%',
    backgroundColor: isDarkMode ? '#111' : '#ffffff',
    padding: '12px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: isDarkMode ? '#ffffff' : '#333333',
    borderBottom: isDarkMode ? 'none' : '1px solid #e5e7eb',
    transition: 'all 0.3s ease',
    position: 'relative',
    zIndex: 50,
    boxSizing: 'border-box'
  };

  const searchBarStyle = {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1e1e1e' : '#f3f4f6',
    borderRadius: '9999px',
    padding: '4px 16px',
    width: '300px',
    transition: 'all 0.3s ease'
  };

  const mobileSearchStyle = {
    width: '100%',
    backgroundColor: isDarkMode ? '#111' : '#ffffff',
    padding: '12px 16px',
    borderBottom: isDarkMode ? 'none' : '1px solid #e5e7eb',
    transition: 'all 0.3s ease'
  };

  // মেনু প্যানেলের জন্য অ্যানিমেশন স্টাইল
  const menuPanelStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100%',
    width: '280px',
    backgroundColor: isDarkMode ? '#111' : '#ffffff',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    zIndex: 100,
    transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    overflowY: 'auto'
  };

  const backdropStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 90,
    opacity: isMobileMenuOpen ? 1 : 0,
    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.3s ease, visibility 0.3s ease'
  };

  // বড় লোগোর জন্য SVG (ডার্ক/লাইট মোড অনুযায়ী) - stream এবং tube এর মাঝে স্পেস যোগ করা হয়েছে
  const Logo = () => (
    <Link to="/">
      <svg
        width={windowWidth <= 768 ? "180" : "220"}
        height={windowWidth <= 768 ? "42" : "52"}
        viewBox="0 0 240 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ cursor: 'pointer' }}
      >
        {/* বড় প্লে বাটন আইকন */}
        <path
          d="M25 15L45 30L25 45V15Z"
          fill="#dc2626"
        />
        {/* stream টেক্সট - বড় */}
        <text
          x="60"
          y="38"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill={isDarkMode ? "#ffffff" : "#111111"}
        >
          stream
        </text>
        {/* tube টেক্সট - বড় (এখন স্পেস সহ) */}
        <text
          x="170" // আগে 145 ছিল, এখন 170 করা হয়েছে স্পেসের জন্য
          y="38"
          fontFamily="Arial, sans-serif"
          fontSize="28"
          fontWeight="bold"
          fill="#dc2626"
        >
          tube
        </text>
      </svg>
    </Link>
  );

  return (
    <>
      {/* Navbar */}
      <div style={navbarStyle}>

        {/* Left side - Logo and Hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth <= 768 ? '12px' : '20px' }}>
          {/* Hamburger Menu - Mobile Only */}
          {windowWidth <= 768 && (
            <button 
              ref={menuButtonRef}
              onClick={toggleMobileMenu}
              style={{
                padding: '8px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <FaTimes style={{ fontSize: '24px', color: isDarkMode ? '#fff' : '#333' }} />
              ) : (
                <FaBars style={{ fontSize: '24px', color: isDarkMode ? '#fff' : '#333' }} />
              )}
            </button>
          )}

          {/* Logo - SVG (ডার্ক/লাইট মোড অনুযায়ী রং পরিবর্তন) - বড় */}
          <Logo />
        </div>

        {/* Search Bar - Desktop */}
        {windowWidth > 768 && (
          <div style={searchBarStyle}>
            <FaSlidersH style={{ color: isDarkMode ? '#9ca3af' : '#4b5563', marginRight: '12px', fontSize: '16px' }} />
            <input
              type="text"
              placeholder="Search here..."
              style={{
                background: 'transparent',
                outline: 'none',
                border: 'none',
                flex: 1,
                fontSize: '15px',
                color: isDarkMode ? '#ffffff' : '#1f2937',
                placeholder: isDarkMode ? '#6b7280' : '#9ca3af'
              }}
            />
            <button style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '8px 24px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background-color 0.2s, transform 0.2s',
              fontSize: '15px',
              fontWeight: '500'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              <FaSearch style={{ marginRight: '8px' }} /> Search
            </button>
          </div>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: windowWidth <= 768 ? '12px' : windowWidth <= 1024 ? '16px' : '28px' }}>

          {/* Search Icon - Mobile */}
          {windowWidth <= 768 && (
            <button 
              onClick={toggleSearch}
              style={{
                padding: '8px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaSearch style={{ fontSize: '20px', color: isDarkMode ? '#fff' : '#4b5563' }} />
            </button>
          )}

          {/* Cart */}
          {windowWidth > 480 && (
            <div style={{
              cursor: 'pointer',
              transition: 'transform 0.2s ease',
              position: 'relative'
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaShoppingCart style={{ 
                fontSize: windowWidth <= 768 ? '20px' : '24px', 
                color: isDarkMode ? '#fff' : '#4b5563'
              }} />
              {windowWidth > 768 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  backgroundColor: '#dc2626',
                  color: 'white',
                  borderRadius: '50%',
                  padding: '2px 6px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>3</span>
              )}
            </div>
          )}

          {/* Sign In - লিংক যোগ করা হয়েছে */}
          {windowWidth > 640 ? (
            <Link to="/signin">
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#dc2626',
                color: '#ffffff',
                padding: windowWidth <= 768 ? '8px 16px' : '10px 20px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontSize: windowWidth <= 768 ? '15px' : '16px',
                fontWeight: '500',
                transition: 'background-color 0.2s, transform 0.2s'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#b91c1c';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = '#dc2626';
                e.currentTarget.style.transform = 'scale(1)';
              }}
              >
                <FaUser style={{ fontSize: '16px' }} />
                {windowWidth > 1024 && <span>Sign In</span>}
              </button>
            </Link>
          ) : (
            <Link to="/signin">
              <button style={{
                padding: '10px',
                borderRadius: '50%',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <FaUser style={{ fontSize: '20px', color: isDarkMode ? '#fff' : '#4b5563' }} />
              </button>
            </Link>
          )}

          {/* Dark/Light mode toggle */}
          <button 
            onClick={toggleTheme}
            style={{
              padding: windowWidth <= 768 ? '8px' : '10px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
              color: isDarkMode ? '#fbbf24' : '#4b5563',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.backgroundColor = isDarkMode ? '#4b5563' : '#d1d5db';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#e5e7eb';
            }}
            aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDarkMode ? <FaSun style={{ fontSize: windowWidth <= 768 ? '18px' : '20px' }} /> : <FaMoon style={{ fontSize: windowWidth <= 768 ? '18px' : '20px' }} />}
          </button>

        </div>
      </div>

      {/* Mobile Search Bar - Conditional */}
      {isSearchOpen && windowWidth <= 768 && (
        <div style={mobileSearchStyle}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#f3f4f6',
            borderRadius: '9999px',
            padding: '12px 16px',
            transition: 'all 0.3s ease',
            animation: 'slideDown 0.3s ease'
          }}>
            <FaSlidersH style={{ color: isDarkMode ? '#9ca3af' : '#4b5563', marginRight: '12px', fontSize: '16px' }} />
            <input
              type="text"
              placeholder="Search here..."
              style={{
                background: 'transparent',
                outline: 'none',
                border: 'none',
                flex: 1,
                fontSize: '15px',
                color: isDarkMode ? '#ffffff' : '#1f2937'
              }}
              autoFocus
            />
            <button style={{
              backgroundColor: '#dc2626',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '9999px',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s, transform 0.2s',
              fontSize: '14px',
              fontWeight: '500'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.backgroundColor = '#b91c1c';
              e.currentTarget.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.backgroundColor = '#dc2626';
              e.currentTarget.style.transform = 'scale(1)';
            }}
            >
              <FaSearch />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu with Animation */}
      {windowWidth <= 768 && (
        <>
          {/* Backdrop */}
          <div style={backdropStyle} onClick={() => setIsMobileMenuOpen(false)} />
          
          {/* Menu Panel */}
          <div ref={menuRef} style={menuPanelStyle}>
            <div style={{ padding: '28px' }}>
              {/* Close Button Inside Menu */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = isDarkMode ? '#374151' : '#f3f4f6';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <FaTimes style={{ fontSize: '22px', color: isDarkMode ? '#fff' : '#333' }} />
              </button>

              {/* User Info */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '15px',
                paddingBottom: '28px',
                borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                marginTop: '20px'
              }}>
                <div style={{
                  width: '55px',
                  height: '55px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? '#1f2937' : '#e5e7eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FaUser style={{ fontSize: '24px', color: isDarkMode ? '#9ca3af' : '#6b7280' }} />
                </div>
                <div>
                  <p style={{ fontWeight: '600', margin: 0, fontSize: '16px', color: isDarkMode ? '#fff' : '#1f2937' }}>Guest User</p>
                  <Link to="/signin">
                    <button 
                      style={{ 
                        color: '#dc2626', 
                        fontSize: '15px', 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '5px 0',
                        transition: 'color 0.2s'
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#b91c1c'}
                      onMouseLeave={e => e.currentTarget.style.color = '#dc2626'}
                    >
                      Sign In
                    </button>
                  </Link>
                </div>
              </div>

              {/* Menu Items */}
              <div style={{ marginTop: '28px' }}>
                {[
                  { icon: <FaHome />, label: 'Home', path: '/' },
                  { icon: <FaGlobe />, label: 'Explore', path: '/explore' },
                  { icon: <FaVideo />, label: 'Videos', path: '/videos' },
                  { icon: <FaStar />, label: 'Trending', path: '/trending' },
                  { icon: <FaThumbsUp />, label: 'Liked', path: '/liked' },
                  { icon: <FaMapMarkerAlt />, label: 'Travel', path: '/travel' },
                  { icon: <FaEdit />, label: 'Blog', path: '/blog' }
                ].map((item, index) => (
                  <Link to={item.path} key={index} style={{ textDecoration: 'none' }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '18px',
                        padding: '15px 0',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        color: isDarkMode ? '#9ca3af' : '#6b7280',
                        transform: 'translateX(0)',
                        animation: `slideIn 0.3s ease ${index * 0.05}s both`,
                        fontSize: '16px'
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.color = '#dc2626';
                        e.currentTarget.style.transform = 'translateX(8px)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.color = isDarkMode ? '#9ca3af' : '#6b7280';
                        e.currentTarget.style.transform = 'translateX(0)';
                      }}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <span style={{ fontSize: '20px' }}>{item.icon}</span>
                      <span style={{ fontSize: '17px', fontWeight: '500' }}>{item.label}</span>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Cart Info */}
              <div style={{
                position: 'absolute',
                bottom: '28px',
                left: '28px',
                right: '28px',
                paddingTop: '28px',
                borderTop: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`,
                animation: 'fadeIn 0.5s ease 0.4s both'
              }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '16px'
                }}>
                  <span style={{ color: isDarkMode ? '#9ca3af' : '#6b7280', fontWeight: '500' }}>Cart (3 items)</span>
                  <FaShoppingCart style={{ 
                    color: isDarkMode ? '#fff' : '#1f2937',
                    fontSize: '22px',
                    transition: 'transform 0.2s'
                  }} />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* অ্যানিমেশনের জন্য CSS স্টাইল */}
      <style>
        {`
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

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

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;