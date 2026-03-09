// context/LikeContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const LikeContext = createContext();

export const useLikes = () => {
  const context = useContext(LikeContext);
  if (!context) {
    throw new Error('useLikes must be used within a LikeProvider');
  }
  return context;
};

export const LikeProvider = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState([]);

  // লোকাল স্টোরেজ থেকে লোড করা
  useEffect(() => {
    const savedLikes = localStorage.getItem('likedVideos');
    if (savedLikes) {
      try {
        setLikedVideos(JSON.parse(savedLikes));
      } catch (error) {
        console.error('Error loading liked videos:', error);
      }
    }
  }, []);

  // লোকাল স্টোরেজে সেভ করা
  useEffect(() => {
    localStorage.setItem('likedVideos', JSON.stringify(likedVideos));
  }, [likedVideos]);

  const addLike = (video) => {
    setLikedVideos(prev => {
      // চেক করা যে ভিডিওটি আগে থেকে লাইক করা আছে কিনা
      const exists = prev.some(v => v.id === video.id);
      if (exists) {
        return prev; // আগে থেকে থাকলে কিছু করবেন না
      }
      return [video, ...prev]; // নতুন ভিডিও যোগ করুন
    });
  };

  const removeLike = (videoId) => {
    setLikedVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const toggleLike = (video) => {
    setLikedVideos(prev => {
      const exists = prev.some(v => v.id === video.id);
      if (exists) {
        return prev.filter(v => v.id !== video.id);
      } else {
        return [video, ...prev];
      }
    });
  };

  const isLiked = (videoId) => {
    return likedVideos.some(v => v.id === videoId);
  };

  return (
    <LikeContext.Provider value={{
      likedVideos,
      addLike,
      removeLike,
      toggleLike,
      isLiked
    }}>
      {children}
    </LikeContext.Provider>
  );
};