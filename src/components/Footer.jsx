import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const Footer = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <footer style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif" }}>
      {/* Main Footer */}
      <div style={{
        backgroundColor: isDarkMode ? '#1a1a1a' : '#ffffff',
        color: isDarkMode ? '#fff' : '#333333',
        padding: '50px 60px 40px 60px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr 1fr 1.3fr',
        gap: '40px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        borderTop: isDarkMode ? 'none' : '1px solid #e0e0e0',
      }}>

        {/* Column 1: About Us */}
        <div>
          <h3 style={{
            color: isDarkMode ? '#fff' : '#222',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '2px solid #e53935',
            display: 'inline-block',
          }}>About Us</h3>

          {/* Logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '20px 0 16px 0' }}>
            <span style={{ color: '#e53935', fontSize: '22px' }}>▶</span>
            <span style={{ 
              fontSize: '22px', 
              fontWeight: '700', 
              color: isDarkMode ? '#fff' : '#222', 
              letterSpacing: '-0.5px' 
            }}>streamtube</span>
          </div>

          <p style={{
            color: isDarkMode ? '#aaa' : '#666',
            fontSize: '14px',
            lineHeight: '1.8',
            margin: 0,
          }}>
            Pellentesque suscipit pellentesque luctus. Nulla vel tellus nec risus tempus feugiat. Donec nibh orci, sollicitudin sit amet gravida at, varius sit amet sem.
          </p>
        </div>

        {/* Column 2: Information */}
        <div>
          <h3 style={{
            color: isDarkMode ? '#fff' : '#222',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '2px solid #e53935',
            display: 'inline-block',
          }}>Information</h3>

          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0' }}>
            {['About us', 'Contact us', 'Press', 'Terms Of Service', 'Privacy Policy'].map((item) => (
              <li key={item} style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  border: `2px solid ${isDarkMode ? '#555' : '#ccc'}`,
                  display: 'inline-block',
                  flexShrink: 0,
                  backgroundColor: isDarkMode ? 'transparent' : '#ccc',
                }}></span>
                <a 
                  href="#" 
                  style={{
                    color: isDarkMode ? '#bbb' : '#555',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#e53935'}
                  onMouseLeave={e => e.target.style.color = isDarkMode ? '#bbb' : '#555'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Category */}
        <div>
          <h3 style={{
            color: isDarkMode ? '#fff' : '#222',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '2px solid #e53935',
            display: 'inline-block',
          }}>Category</h3>

          <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0 0 0' }}>
            {['Video Archives', 'Gaming', 'Travel', 'Music', 'Sports'].map((item) => (
              <li key={item} style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{
                  width: '7px',
                  height: '7px',
                  borderRadius: '50%',
                  border: `2px solid ${isDarkMode ? '#555' : '#ccc'}`,
                  display: 'inline-block',
                  flexShrink: 0,
                  backgroundColor: isDarkMode ? 'transparent' : '#ccc',
                }}></span>
                <a 
                  href="#" 
                  style={{
                    color: isDarkMode ? '#bbb' : '#555',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.target.style.color = '#e53935'}
                  onMouseLeave={e => e.target.style.color = isDarkMode ? '#bbb' : '#555'}
                >{item}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Latest Posts */}
        <div>
          <h3 style={{
            color: isDarkMode ? '#fff' : '#222',
            fontSize: '14px',
            fontWeight: '700',
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '14px',
            paddingBottom: '12px',
            borderBottom: '2px solid #e53935',
            display: 'inline-block',
          }}>Latest Posts</h3>

          <div style={{ marginTop: '20px' }}>
            {/* Post 1 */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
              <div style={{
                width: '75px',
                height: '55px',
                borderRadius: '4px',
                overflow: 'hidden',
                flexShrink: 0,
                background: isDarkMode ? 'linear-gradient(135deg, #c0392b, #e74c3c)' : 'linear-gradient(135deg, #e74c3c, #c0392b)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
              }}>🎉</div>
              <div>
                <a 
                  href="#" 
                  style={{
                    color: isDarkMode ? '#ddd' : '#333',
                    textDecoration: 'none',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                  onMouseEnter={e => e.target.style.color = '#e53935'}
                  onMouseLeave={e => e.target.style.color = isDarkMode ? '#ddd' : '#333'}
                >Most funny sports moments you ha...</a>
                <span style={{ 
                  color: isDarkMode ? '#777' : '#888', 
                  fontSize: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px' 
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={isDarkMode ? "#777" : "#888"}>
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  162 views
                </span>
              </div>
            </div>

            {/* Post 2 */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '75px',
                height: '55px',
                borderRadius: '4px',
                overflow: 'hidden',
                flexShrink: 0,
                background: isDarkMode ? 'linear-gradient(135deg, #1a237e, #3949ab)' : 'linear-gradient(135deg, #3949ab, #1a237e)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
              }}>🎵</div>
              <div>
                <a 
                  href="#" 
                  style={{
                    color: isDarkMode ? '#ddd' : '#333',
                    textDecoration: 'none',
                    fontSize: '13px',
                    lineHeight: '1.5',
                    display: 'block',
                    marginBottom: '6px',
                    fontWeight: '500',
                  }}
                  onMouseEnter={e => e.target.style.color = '#e53935'}
                  onMouseLeave={e => e.target.style.color = isDarkMode ? '#ddd' : '#333'}
                >How to Create Simple and...</a>
                <span style={{ 
                  color: isDarkMode ? '#777' : '#888', 
                  fontSize: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '4px' 
                }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill={isDarkMode ? "#777" : "#888"}>
                    <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                  </svg>
                  93 views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect With Us */}
      <div style={{
        backgroundColor: isDarkMode ? '#111' : '#f5f5f5',
        padding: '28px 60px',
        textAlign: 'center',
        borderTop: `1px solid ${isDarkMode ? '#2a2a2a' : '#e0e0e0'}`,
        transition: 'background-color 0.3s ease',
      }}>
        <h4 style={{
          color: isDarkMode ? '#fff' : '#333',
          fontSize: '14px',
          fontWeight: '700',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: '20px',
        }}>Connect With Us</h4>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {/* Social Icons - colors remain same for both themes */}
          <a href="#" style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#e53935', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
          </a>

          <a href="#" style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#1ab7ea', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M22 7.42c-.09 2.01-1.49 4.76-4.22 8.26C15 19.3 12.68 21 10.76 21c-1.17 0-2.16-1.08-2.96-3.24l-1.62-5.95C5.56 9.65 4.9 8.57 4.2 8.57c-.16 0-.7.33-1.63.98L1.5 8.4c1.03-.9 2.04-1.81 3.03-2.71 1.37-1.18 2.4-1.8 3.08-1.86 1.62-.15 2.62.95 3 3.3.4 2.53.68 4.11.83 4.73.46 2.1.97 3.14 1.52 3.14.43 0 1.07-.68 1.93-2.03.86-1.36 1.32-2.39 1.38-3.1.12-1.17-.34-1.76-1.38-1.76-.49 0-1 .11-1.51.34.99-3.23 2.88-4.8 5.69-4.72C21.2 3.86 22.1 5.14 22 7.42z"/>
            </svg>
          </a>

          <a href="#" style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#e53935', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
            </svg>
          </a>

          <a href="#" style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
            </svg>
          </a>

          <a href="#" style={{
            width: '46px', height: '46px', borderRadius: '50%',
            backgroundColor: '#1877f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
            textDecoration: 'none', transition: 'opacity 0.2s, transform 0.2s',
            boxShadow: isDarkMode ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
          }}
            onMouseEnter={e => {
              e.currentTarget.style.opacity = '0.8';
              e.currentTarget.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
            </svg>
          </a>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{
        backgroundColor: isDarkMode ? '#0d0d0d' : '#e8e8e8',
        padding: '16px 60px',
        textAlign: 'center',
        borderTop: `1px solid ${isDarkMode ? '#222' : '#d0d0d0'}`,
        transition: 'background-color 0.3s ease',
      }}>
        <p style={{ 
          color: isDarkMode ? '#777' : '#666', 
          fontSize: '13px', 
          margin: 0 
        }}>
          Copyright © 2026 StreamTube. Powered by{' '}
          <a 
            href="#" 
            style={{ 
              color: isDarkMode ? '#aaa' : '#555', 
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#e53935'}
            onMouseLeave={e => e.target.style.color = isDarkMode ? '#aaa' : '#555'}
          >WordPress</a>,{' '}
          Hosted by{' '}
          <a 
            href="#" 
            style={{ 
              color: isDarkMode ? '#aaa' : '#555', 
              textDecoration: 'underline',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.target.style.color = '#e53935'}
            onMouseLeave={e => e.target.style.color = isDarkMode ? '#aaa' : '#555'}
          >SiteGround</a>.
        </p>
      </div>
    </footer>
  );
};

export default Footer;