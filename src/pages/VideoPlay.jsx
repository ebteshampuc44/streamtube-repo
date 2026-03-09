// pages/VideoPlay.jsx
import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FaThumbsUp, FaThumbsDown, FaShare, FaDownload, FaSave, FaFlag,
  FaUser, FaClock, FaEye, FaCalendar, FaPlus, FaCheck, FaHeart,
  FaComment, FaPlayCircle, FaSearch, FaTimes, FaBars, FaMoon, FaSun,
  FaHome, FaGlobe, FaVideo, FaStar, FaMapMarkerAlt, FaEdit, FaPlay
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { useLikes } from "../context/LikeContext";

// ইউটিউব ভিডিও ডেটাবেস (Home.jsx এর মতই)
const ALL_VIDEOS = [
  { id: "dQw4w9WgXcQ", title: "Rick Astley - Never Gonna Give You Up", channel: "Rick Astley", subscribers: "1.2M", views: "1.5B", likes: "15M", time: "15 years ago", duration: "3:33", category: "trending", description: "The official music video for Rick Astley's classic hit 'Never Gonna Give You Up'.\n\n#RickAstley #NeverGonnaGiveYouUp #80s", tags: ["Music", "80s", "Pop", "Classic"] },
  { id: "kJQP7kiw5Fk", title: "Luis Fonsi - Despacito ft. Daddy Yankee", channel: "LuisFonsiVEVO", subscribers: "14M", views: "8.2B", likes: "52M", time: "7 years ago", duration: "4:41", category: "trending", description: "Official music video for Despacito by Luis Fonsi ft. Daddy Yankee.\n\n#Despacito #LuisFonsi #DaddyYankee #Latin", tags: ["Music", "Latin", "Pop"] },
  { id: "JGwWNGJdvx8", title: "Ed Sheeran - Shape of You", channel: "Ed Sheeran", subscribers: "55M", views: "6.1B", likes: "31M", time: "7 years ago", duration: "4:24", category: "trending", description: "Official music video by Ed Sheeran performing Shape Of You.\n\n#EdSheeran #ShapeOfYou #Pop", tags: ["Music", "Pop", "Ed Sheeran"] },
  { id: "09R8_2nJtjg", title: "Maroon 5 - Sugar", channel: "Maroon 5", subscribers: "28M", views: "3.9B", likes: "23M", time: "9 years ago", duration: "3:55", category: "trending", description: "Official music video for Sugar by Maroon 5.", tags: ["Music", "Pop", "Maroon 5"] },
  { id: "OPf0YbXqDm0", title: "Mark Ronson - Uptown Funk ft. Bruno Mars", channel: "MarkRonsonVEVO", subscribers: "10M", views: "5.2B", likes: "28M", time: "9 years ago", duration: "4:30", category: "trending", description: "Official music video by Mark Ronson featuring Bruno Mars.", tags: ["Music", "Funk", "Pop"] },
  { id: "YQHsXMglC9A", title: "Adele - Hello", channel: "Adele", subscribers: "34M", views: "3.3B", likes: "24M", time: "8 years ago", duration: "6:07", category: "trending", description: "Official music video for 'Hello' by Adele.", tags: ["Music", "Soul", "Adele"] },
  { id: "hT_nvWreIhg", title: "The Weeknd - Blinding Lights", channel: "The Weeknd", subscribers: "30M", views: "4.2B", likes: "26M", time: "4 years ago", duration: "4:20", category: "music", description: "Official music video for Blinding Lights by The Weeknd.", tags: ["Music", "Synth-pop", "80s"] },
  { id: "SlPhMPnQ58k", title: "Bad Bunny - Tití Me Preguntó", channel: "Bad Bunny", subscribers: "45M", views: "1.2B", likes: "8M", time: "2 years ago", duration: "4:03", category: "music", description: "Official music video by Bad Bunny.", tags: ["Music", "Latin", "Reggaeton"] },
  { id: "nfWlot6h_JM", title: "Taylor Swift - Shake It Off", channel: "Taylor Swift", subscribers: "60M", views: "3.8B", likes: "22M", time: "9 years ago", duration: "4:10", category: "music", description: "Official music video for Shake It Off by Taylor Swift.", tags: ["Music", "Pop", "Taylor Swift"] },
  { id: "CevxZvSJLk8", title: "Katy Perry - Roar", channel: "Katy Perry", subscribers: "44M", views: "2.9B", likes: "18M", time: "10 years ago", duration: "4:33", category: "music", description: "Official music video for Roar by Katy Perry.", tags: ["Music", "Pop", "Katy Perry"] },
  { id: "EHXhcD6Pkgs", title: "GTA 6 - Official Trailer", channel: "Rockstar Games", subscribers: "9M", views: "200M", likes: "5M", time: "1 year ago", duration: "1:31", category: "gaming", description: "The official reveal trailer for Grand Theft Auto VI.\n\n#GTA6 #RockstarGames", tags: ["Gaming", "GTA", "Trailer"] },
  { id: "FkklG9MA0vM", title: "Minecraft - The Movie Official Trailer", channel: "Warner Bros.", subscribers: "22M", views: "50M", likes: "1.2M", time: "6 months ago", duration: "2:30", category: "gaming", description: "Official trailer for the Minecraft movie.", tags: ["Gaming", "Minecraft", "Movie"] },
  { id: "2SKi-NK_TPA", title: "Cyberpunk 2077 – Official Gameplay Trailer", channel: "CD PROJEKT RED", subscribers: "5M", views: "13M", likes: "420K", time: "4 years ago", duration: "5:37", category: "gaming", description: "Official gameplay trailer for Cyberpunk 2077.", tags: ["Gaming", "Cyberpunk", "RPG"] },
  { id: "iqysmS4lxwQ", title: "Elden Ring - Official Reveal Trailer", channel: "Bandai Namco", subscribers: "4M", views: "9M", likes: "300K", time: "3 years ago", duration: "3:18", category: "gaming", description: "Official reveal trailer for Elden Ring.", tags: ["Gaming", "Elden Ring", "FromSoftware"] },
  { id: "M68BuiStGKQ", title: "Most Beautiful Places in the World 4K", channel: "Discover Earth", subscribers: "3M", views: "45M", likes: "800K", time: "2 years ago", duration: "4:58", category: "travel", description: "A stunning 4K tour of the world's most beautiful places.", tags: ["Travel", "Nature", "4K"] },
  { id: "X48VuDVv0do", title: "Bali, Indonesia Travel Guide", channel: "Mark Wiens", subscribers: "10M", views: "12M", likes: "200K", time: "3 years ago", duration: "20:04", category: "travel", description: "Complete travel guide to Bali, Indonesia.", tags: ["Travel", "Bali", "Indonesia"] },
  { id: "K4TOrB7at0Y", title: "Tokyo Japan Travel Guide 4K", channel: "Travel Japan", subscribers: "2M", views: "8M", likes: "120K", time: "2 years ago", duration: "15:30", category: "travel", description: "Explore Tokyo Japan in stunning 4K.", tags: ["Travel", "Tokyo", "Japan"] },
  { id: "l482T0yNkeo", title: "Switzerland Travel - Swiss Alps 4K", channel: "Drone Adventures", subscribers: "5M", views: "22M", likes: "400K", time: "3 years ago", duration: "8:45", category: "travel", description: "Breathtaking aerial footage of the Swiss Alps.", tags: ["Travel", "Switzerland", "Alps"] },
  { id: "FZGMYJdaZMg", title: "Cristiano Ronaldo Top 10 Goals", channel: "FIFA", subscribers: "15M", views: "55M", likes: "1.2M", time: "1 year ago", duration: "6:23", category: "sports", description: "Top 10 greatest goals by Cristiano Ronaldo.", tags: ["Sports", "Football", "Ronaldo"] },
  { id: "VDONxJNOzN0", title: "NBA Best Plays of 2024", channel: "NBA", subscribers: "20M", views: "30M", likes: "600K", time: "8 months ago", duration: "8:15", category: "sports", description: "The best plays from the 2024 NBA season.", tags: ["Sports", "Basketball", "NBA"] },
  { id: "TLDRW2_stOE", title: "Lionel Messi World Cup Goals", channel: "FIFA World Cup", subscribers: "18M", views: "40M", likes: "900K", time: "2 years ago", duration: "5:10", category: "sports", description: "All of Messi's World Cup goals compiled.", tags: ["Sports", "Football", "Messi"] },
  { id: "aLBjnrQhPW4", title: "Boxing Knockouts 2024 Compilation", channel: "Boxing World", subscribers: "3M", views: "15M", likes: "250K", time: "5 months ago", duration: "10:22", category: "sports", description: "The best boxing knockouts of 2024.", tags: ["Sports", "Boxing", "2024"] },
  { id: "2Bkd0VoFBkM", title: "iPhone 16 Pro Review", channel: "MKBHD", subscribers: "18M", views: "12M", likes: "300K", time: "5 months ago", duration: "22:30", category: "latest", description: "Full review of the iPhone 16 Pro by Marques Brownlee.", tags: ["Tech", "iPhone", "Apple"] },
  { id: "0rd_PR66cCM", title: "Samsung Galaxy S24 Ultra Review", channel: "Linus Tech Tips", subscribers: "15M", views: "5M", likes: "150K", time: "1 year ago", duration: "18:45", category: "latest", description: "Detailed review of Samsung Galaxy S24 Ultra.", tags: ["Tech", "Samsung", "Android"] },
  { id: "4NRXx6U8BYE", title: "AI in 2024 - What's Next?", channel: "Two Minute Papers", subscribers: "2M", views: "3M", likes: "80K", time: "8 months ago", duration: "12:15", category: "latest", description: "What does AI have in store for us in 2024 and beyond?", tags: ["Tech", "AI", "Machine Learning"] },
  { id: "aircAruvnKk", title: "Neural Networks Explained", channel: "3Blue1Brown", subscribers: "5M", views: "18M", likes: "500K", time: "5 years ago", duration: "19:13", category: "latest", description: "A visual and intuitive explanation of how neural networks work.", tags: ["Tech", "AI", "Education"] },
];

const VideoPlay = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { toggleLike, isLiked } = useLikes(); // লাইক ফাংশন যোগ করা হয়েছে
  const { videoId } = useParams();
  const navigate = useNavigate();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "TechFan", avatar: "T", text: "Amazing video! Thanks for sharing 🔥", time: "2 hours ago", likes: 245 },
    { id: 2, user: "GamingPro", avatar: "G", text: "This is exactly what I was looking for!", time: "5 hours ago", likes: 89 },
    { id: 3, user: "MusicLover", avatar: "M", text: "Incredible content, keep it up! 👏", time: "1 day ago", likes: 156 },
  ]);
  const [isMobile, setIsMobile] = useState(false);

  // বর্তমান ভিডিও খোঁজা
  const videoData = ALL_VIDEOS.find(v => v.id === videoId) || ALL_VIDEOS[0];

  // রিলেটেড ভিডিও (একই ক্যাটাগরি থেকে)
  const relatedVideos = ALL_VIDEOS.filter(v => v.id !== videoData.id && v.category === videoData.category)
    .concat(ALL_VIDEOS.filter(v => v.id !== videoData.id && v.category !== videoData.category))
    .slice(0, 8);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    // পেজে আসলে উপরে যাবে
    window.scrollTo(0, 0);
    return () => window.removeEventListener('resize', checkMobile);
  }, [videoId]);

  // ভিডিও লোড হওয়ার সময় লাইক স্টেট চেক করা
  useEffect(() => {
    setIsLikedLocal(isLiked(videoData.id));
  }, [videoData.id, isLiked]);

  const handleLikeClick = () => {
    toggleLike(videoData);
    setIsLikedLocal(!isLikedLocal);
    if (isDisliked) setIsDisliked(false);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      setComments([{
        id: Date.now(), user: "You", avatar: "U",
        text: comment, time: "Just now", likes: 0
      }, ...comments]);
      setComment("");
    }
  };

  const youtubeUrl = `https://www.youtube.com/embed/${videoData.id}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* শুধু একটি ছোট ব্যাক বাটন - সম্পূর্ণ Navbar সরানো হয়েছে */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-2`}>
        <div className="max-w-[1600px] mx-auto flex items-center">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
            </svg>
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-4 md:py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">

          {/* বাম — ভিডিও প্লেয়ার */}
          <div className="lg:col-span-2">

            {/* YouTube Embed Player */}
            <div className="relative bg-black rounded-xl overflow-hidden aspect-video">
              <iframe
                src={youtubeUrl}
                title={videoData.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* ভিডিও তথ্য */}
            <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <h1 className={`text-lg md:text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                {videoData.title}
              </h1>

              <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold">
                    {videoData.channel[0]}
                  </div>
                  <div>
                    <p className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {videoData.channel}
                    </p>
                    <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {videoData.subscribers} subscribers
                    </p>
                  </div>
                  <button
                    onClick={() => setIsSubscribed(!isSubscribed)}
                    className={`ml-3 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                      isSubscribed
                        ? isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-900'
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}>
                    {isSubscribed ? '✓ Subscribed' : 'Subscribe'}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className={`flex rounded-full overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <button 
                      onClick={handleLikeClick}
                      className={`flex items-center gap-2 px-3 md:px-4 py-2 transition-colors ${
                        isLikedLocal ? 'text-red-600' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'
                      }`}>
                      <FaThumbsUp size={16} />
                      <span className="text-sm">{videoData.likes}</span>
                    </button>
                    <div className={`w-px h-6 my-auto ${isDarkMode ? 'bg-gray-700' : 'bg-gray-300'}`}></div>
                    <button onClick={() => { setIsDisliked(!isDisliked); if (isLikedLocal) setIsLikedLocal(false); }}
                      className={`px-3 md:px-4 py-2 transition-colors ${isDisliked ? 'text-red-600' : isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'}`}>
                      <FaThumbsDown size={16} />
                    </button>
                  </div>
                  <button onClick={() => setShowShareModal(!showShareModal)}
                    className={`flex items-center gap-2 px-3 md:px-4 py-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                    <FaShare size={14} />
                    <span className="text-sm hidden sm:inline">Share</span>
                  </button>
                  <button className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} transition-colors`}>
                    <FaSave size={14} />
                  </button>
                </div>
              </div>

              {/* Share Modal */}
              {showShareModal && (
                <div className={`mt-3 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                  <p className={`text-sm font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Share this video</p>
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                    <input readOnly value={`https://www.youtube.com/watch?v=${videoData.id}`}
                      className="bg-transparent flex-1 text-xs outline-none" />
                    <button onClick={() => { navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${videoData.id}`); setShowShareModal(false); }}
                      className="text-xs bg-red-600 text-white px-2 py-1 rounded">Copy</button>
                  </div>
                  <a href={`https://www.youtube.com/watch?v=${videoData.id}`} target="_blank" rel="noreferrer"
                    className="mt-2 flex items-center gap-1 text-xs text-red-500 hover:underline">
                    ▶ Watch on YouTube
                  </a>
                </div>
              )}

              {/* ডেসক্রিপশন */}
              <div className={`mt-4 p-3 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <div className="flex flex-wrap gap-3 text-sm mb-2">
                  <span className="flex items-center gap-1">
                    <FaEye className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{videoData.views} views</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaCalendar className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                    <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>{videoData.time}</span>
                  </span>
                </div>
                <p className={`text-sm whitespace-pre-line ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {videoData.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {videoData.tags.map((tag, idx) => (
                    <span key={idx} className={`text-xs px-2 py-1 rounded-full ${isDarkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'}`}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* কমেন্ট সেকশন */}
            <div className={`mt-4 p-4 rounded-xl ${isDarkMode ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
              <h3 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                Comments ({comments.length})
              </h3>
              <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-6">
                <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">U</div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className={`w-full px-3 py-2 rounded-lg border ${isDarkMode ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-500' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'} focus:outline-none focus:border-red-600`}
                  />
                  <div className="flex justify-end gap-2 mt-2">
                    <button type="button" onClick={() => setComment("")}
                      className={`px-3 py-1 text-sm rounded ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                      Cancel
                    </button>
                    <button type="submit" disabled={!comment.trim()}
                      className={`px-3 py-1 text-sm rounded ${comment.trim() ? 'bg-red-600 text-white hover:bg-red-700' : isDarkMode ? 'bg-gray-700 text-gray-500' : 'bg-gray-200 text-gray-500'}`}>
                      Comment
                    </button>
                  </div>
                </div>
              </form>
              <div className="space-y-4">
                {comments.map(cmt => (
                  <div key={cmt.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {cmt.avatar}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{cmt.user}</span>
                        <span className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>{cmt.time}</span>
                      </div>
                      <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{cmt.text}</p>
                      <button className={`text-xs mt-1 flex items-center gap-1 ${isDarkMode ? 'text-gray-500 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}>
                        <FaThumbsUp size={10} /> {cmt.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ডান — রিলেটেড ভিডিও */}
          <div className="lg:col-span-1">
            <h3 className={`font-semibold mb-3 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Related Videos
            </h3>
            <div className="space-y-3">
              {relatedVideos.map(video => (
                <Link key={video.id} to={`/video/${video.id}`}
                  className={`flex gap-2 p-2 rounded-lg transition-colors ${isDarkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-100'}`}>
                  <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                      alt={video.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <FaPlay className="text-white text-lg" />
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                      {video.duration}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      {video.title}
                    </h4>
                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {video.channel}
                    </p>
                    <div className="flex items-center gap-1 text-xs mt-1">
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.views} views</span>
                      <span className={isDarkMode ? 'text-gray-600' : 'text-gray-400'}>•</span>
                      <span className={isDarkMode ? 'text-gray-500' : 'text-gray-500'}>{video.time}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default VideoPlay;