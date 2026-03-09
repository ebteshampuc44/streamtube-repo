import React, { useContext, useState, useEffect, useRef, useCallback } from "react";
import {
  FaHome,
  FaGlobe,
  FaVideo,
  FaStar,
  FaThumbsUp,
  FaUser,
  FaMapMarkerAlt,
  FaEdit,
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

// লেজি লোডিং এর জন্য কম্পোনেন্ট
const LazyVideo = ({ src, poster, className, muted = true, loop = true, autoPlay = false, children }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={videoRef} className={className}>
      {isLoaded ? (
        <video
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          poster={poster}
          preload="metadata"
        >
          {children}
        </video>
      ) : (
        <div className="w-full h-full bg-gray-300 animate-pulse flex items-center justify-center">
          <span className="text-gray-600">Loading...</span>
        </div>
      )}
    </div>
  );
};

// ভিডিও ডাটা আলাদা করে নেওয়া
const videoData = {
  hero: {
    poster: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop",
    category: "GAMING",
    title: "New MMORPG coming this summer",
    author: "Audrey",
    views: "3.2K"
  },
  rightTop: {
    poster: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop",
    category: "MUSIC",
    title: "All Out of Love",
    author: "Alden",
    views: "1.2K"
  },
  // ... অন্যান্য ডাটা
};

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [isMobile, setIsMobile] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // পেজ লোড হওয়ার পর ভিডিও লোড করা শুরু হবে
    setIsPageLoaded(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // ভিডিও সোর্স - শুধুমাত্র একটি সোর্স ব্যবহার করা
  const videoSource = "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

  // কমন ভিডিও এলিমেন্ট
  const VideoThumbnail = ({ poster, category, title, author, views, isLive = false, className = "" }) => (
    <div className={`relative rounded-lg overflow-hidden group ${className}`}>
      <LazyVideo
        src={videoSource}
        poster={poster}
        className="w-full h-full"
      >
        <source src={videoSource} type="video/mp4" />
      </LazyVideo>
      
      <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4">
        {category && (
          <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-1.5 md:px-2 py-0.5 text-xs text-white inline-block mb-1`}>
            {category}
          </span>
        )}
        <h3 className="text-xs md:text-sm font-semibold text-white">{title}</h3>
        {author && views && (
          <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
            {author} • {views}
          </p>
        )}
      </div>
      
      {isLive && (
        <div className="absolute bottom-2 right-2 text-red-500 text-xs">
          ● Live
        </div>
      )}
    </div>
  );

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>

      {/* সাইডবার - অপরিবর্তিত */}
      {!isMobile && (
        <div className={`w-20 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-600 border-r border-gray-200'} flex flex-col items-center py-6 space-y-8 sticky top-0 h-screen transition-colors duration-300 z-10`}>
          <FaHome size={20} className="hover:text-red-500 cursor-pointer" />
          <FaGlobe size={20} className="hover:text-red-500 cursor-pointer" />
          <FaVideo size={20} className="hover:text-red-500 cursor-pointer" />
          <FaStar size={20} className="hover:text-red-500 cursor-pointer" />
          <FaThumbsUp size={20} className="hover:text-red-500 cursor-pointer" />
          <FaUser size={20} className="hover:text-red-500 cursor-pointer" />
          <FaMapMarkerAlt size={20} className="hover:text-red-500 cursor-pointer" />
          <FaEdit size={20} className="hover:text-red-500 cursor-pointer" />
        </div>
      )}

      {/* মূল কন্টেন্ট */}
      <div className={`${!isMobile ? 'flex-1' : 'w-full'} p-2 md:p-4 overflow-hidden`}>

        {/* হিরো সেকশন */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* বড় ভিডিও */}
          <div className="md:col-span-2 relative rounded-lg overflow-hidden group h-[200px] sm:h-[250px] md:h-[350px] lg:h-[400px]">
            <LazyVideo
              src={videoSource}
              poster="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop"
              autoPlay
              muted
              loop
              className="w-full h-full"
            >
              <source src={videoSource} type="video/mp4" />
            </LazyVideo>

            <div className="absolute bottom-2 md:bottom-4 left-2 md:left-4">
              <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-2 py-0.5 text-xs text-white`}>
                GAMING
              </span>
              <h1 className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold mt-1 text-white">
                New MMORPG coming this summer
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                Audrey • 3.2K views
              </p>
            </div>
            <div className="absolute bottom-2 right-2 text-red-500 text-xs">
              ● Live Chat
            </div>
          </div>

          {/* ডান পাশের ছোট ভিডিও */}
          <div className="grid grid-cols-2 md:grid-cols-1 gap-3">
            {/* টপ ভিডিও */}
            <div className="relative rounded-lg overflow-hidden group h-[120px] sm:h-[140px] md:h-[190px] lg:h-[220px]">
              <LazyVideo
                src={videoSource}
                poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&auto=format&fit=crop"
                muted
                loop
                className="w-full h-full"
              >
                <source src={videoSource} type="video/mp4" />
              </LazyVideo>
              <div className="absolute bottom-2 left-2">
                <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-1.5 py-0.5 text-xs text-white`}>
                  MUSIC
                </span>
                <h3 className="text-xs font-semibold mt-0.5 text-white">
                  All Out of Love
                </h3>
                <p className="text-xs text-gray-200">
                  Alden • 1.2K views
                </p>
              </div>
            </div>

            {/* নিচের দুটি ছোট ভিডিও */}
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((item) => (
                <div key={item} className="relative rounded-lg overflow-hidden group h-[100px] sm:h-[120px] md:h-[90px] lg:h-[100px]">
                  <LazyVideo
                    src={videoSource}
                    poster={item === 1 
                      ? "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop"
                      : "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=400&auto=format&fit=crop"
                    }
                    muted
                    loop
                    className="w-full h-full"
                  >
                    <source src={videoSource} type="video/mp4" />
                  </LazyVideo>
                  <div className="absolute bottom-1 left-1">
                    <span className="bg-black px-1 py-0.5 text-[10px] text-white">
                      {item === 1 ? "MUSIC" : "GAMING"}
                    </span>
                    <p className="text-[10px] font-semibold text-white mt-0.5">
                      {item === 1 ? "Sweet love" : "Star Wars"}
                    </p>
                  </div>
                  {item === 2 && (
                    <div className="absolute bottom-1 right-1 text-red-500 text-[10px]">
                      ● Live
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* শুধুমাত্র পৃষ্ঠা লোড হলে বাকি কন্টেন্ট দেখাও */}
        {isPageLoaded && (
          <>
            {/* টপ প্লেলিস্ট */}
            <Section title="TOP PLAYLISTS" isDarkMode={isDarkMode}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <PlaylistCard key={item} item={item} isDarkMode={isDarkMode} videoSource={videoSource} />
                ))}
              </div>
            </Section>

            {/* অন্যান্য সেকশন - একই প্যাটার্নে */}
            <Section title="REVIEW" isDarkMode={isDarkMode} showViewMore>
              <ReviewGrid isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="SHORTS" isDarkMode={isDarkMode}>
              <ShortsGrid isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="GAMING" isDarkMode={isDarkMode}>
              <CategoryGrid type="gaming" isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="MUSIC" isDarkMode={isDarkMode}>
              <CategoryGrid type="music" isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="TRAVEL" isDarkMode={isDarkMode}>
              <CategoryGrid type="travel" isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="SPORTS" isDarkMode={isDarkMode}>
              <CategoryGrid type="sports" isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>

            <Section title="LATEST VIDEOS" isDarkMode={isDarkMode}>
              <LatestGrid isDarkMode={isDarkMode} videoSource={videoSource} />
            </Section>
          </>
        )}
      </div>
    </div>
  );
};

// সেকশন কম্পোনেন্ট
const Section = ({ title, children, isDarkMode, showViewMore = false }) => (
  <div className="mt-6 md:mt-8">
    <div className="flex justify-between items-center mb-2 md:mb-3">
      <h2 className={`text-base md:text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
        {title}
      </h2>
      {showViewMore && (
        <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-2 md:px-3 py-1 text-xs rounded transition-colors duration-200`}>
          VIEW MORE
        </button>
      )}
    </div>
    {children}
  </div>
);

// প্লেলিস্ট কার্ড
const PlaylistCard = ({ item, isDarkMode, videoSource }) => {
  const posters = {
    1: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&auto=format&fit=crop",
    2: "https://images.unsplash.com/photo-1605902711622-cfb43c4437d1?w=400&auto=format&fit=crop",
    3: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&auto=format&fit=crop",
    4: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&auto=format&fit=crop"
  };
  
  const titles = {
    1: "● Travel",
    2: "● Gaming",
    3: "● Pop Music",
    4: "● Funny"
  };
  
  const counts = {
    1: "14",
    2: "11",
    3: "11",
    4: "9"
  };

  return (
    <div className="relative rounded-lg overflow-hidden group cursor-pointer">
      <LazyVideo
        src={videoSource}
        poster={posters[item]}
        muted
        loop
        className="h-20 sm:h-24 md:h-28 w-full"
      >
        <source src={videoSource} type="video/mp4" />
      </LazyVideo>
      <div className={`absolute bottom-1 left-1 md:bottom-2 md:left-2 text-xs font-semibold text-white`}>
        {titles[item]}
      </div>
      <div className={`absolute top-1 right-1 md:top-2 md:right-2 text-xs md:text-sm text-white`}>
        {counts[item]}
      </div>
    </div>
  );
};

// রিভিউ গ্রিড
const ReviewGrid = ({ isDarkMode, videoSource }) => {
  const reviews = [
    { poster: "1614850715776-a749a85b4144", title: "Star Wars Visions", views: "2.5K" },
    { poster: "1542751371-adc38448a05e", title: "Star Wars Battlefront", views: "3.2K" },
    { poster: "1500530855697-b586d89ba3ee", title: "Horizon Zero Dawn", views: "4.1K" },
    { poster: "1497032205916-ac775f0649ae", title: "Imagine Dragons", views: "1.8K" }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {reviews.map((review, idx) => (
        <div key={idx} className="flex flex-col group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg">
            <LazyVideo
              src={videoSource}
              poster={`https://images.unsplash.com/photo-${review.poster}?w=400&auto=format&fit=crop`}
              muted
              loop
              className="rounded-lg h-20 sm:h-24 md:h-28 w-full"
            >
              <source src={videoSource} type="video/mp4" />
            </LazyVideo>
            <span className="absolute top-1 right-1 bg-black text-white px-1 py-0.5 text-[10px]">
              00:15
            </span>
          </div>
          <h3 className={`mt-1 text-xs font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {review.title}
          </h3>
          <p className={`text-[10px] mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {review.views} views
          </p>
        </div>
      ))}
    </div>
  );
};

// শর্টস গ্রিড
const ShortsGrid = ({ isDarkMode, videoSource }) => {
  const shorts = [
    "1516280440614-37939baac9e1",
    "1534528741775-53994a69daeb",
    "1506794778200-c1d2c5dabc8",
    "1534528741775-53994a69daeb"
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
      {shorts.map((poster, idx) => (
        <div key={idx} className="relative rounded-lg overflow-hidden group cursor-pointer h-36 sm:h-40 md:h-48">
          <LazyVideo
            src={videoSource}
            poster={`https://images.unsplash.com/photo-${poster}?w=400&auto=format&fit=crop`}
            muted
            loop
            className="w-full h-full"
          >
            <source src={videoSource} type="video/mp4" />
          </LazyVideo>
          <div className="absolute bottom-1 left-1">
            <p className="text-xs font-semibold text-white">Short Video {idx + 1}</p>
            <p className="text-[10px] text-gray-200">1.2M views</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ক্যাটাগরি গ্রিড (Gaming, Music, Travel, Sports)
const CategoryGrid = ({ type, isDarkMode, videoSource }) => {
  const posters = {
    gaming: ["1542751371-adc38448a05e", "1605902711622-cfb43c4437d1", "1511512222254", "1538488887510"],
    music: ["1511379938547-c1f69419868d", "1493225457124-a3eb161ffa5f", "1505740420928-5e560c06d30e", "1511671782779"],
    travel: ["1507525428034-b723cf961d3e", "1488645552072-1f0fe6e9c4c3", "1500530855697-b586d89ba3ee", "1469470160168"],
    sports: ["1517649763962-0c623066013b", "1461891447649", "1579952365527-9f2c2f8b9b7e", "1517466781591"]
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {posters[type].map((poster, idx) => (
        <div key={idx} className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg">
            <LazyVideo
              src={videoSource}
              poster={`https://images.unsplash.com/photo-${poster}?w=400&auto=format&fit=crop`}
              muted
              loop
              className="rounded-lg h-20 sm:h-24 md:h-28 w-full"
            >
              <source src={videoSource} type="video/mp4" />
            </LazyVideo>
          </div>
          <h3 className={`mt-1 text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Video {idx + 1}
          </h3>
          <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {type.charAt(0).toUpperCase() + type.slice(1)} Channel
          </p>
        </div>
      ))}
    </div>
  );
};

// লেটেস্ট গ্রিড
const LatestGrid = ({ isDarkMode, videoSource }) => {
  const posters = [
    "1614850715776-a749a85b4144",
    "1497032205916-ac775f0649ae",
    "1511671782779",
    "1500530855697-b586d89ba3ee"
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
      {posters.map((poster, idx) => (
        <div key={idx} className="group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg">
            <LazyVideo
              src={videoSource}
              poster={`https://images.unsplash.com/photo-${poster}?w=400&auto=format&fit=crop`}
              muted
              loop
              className="rounded-lg h-20 sm:h-24 md:h-28 w-full"
            >
              <source src={videoSource} type="video/mp4" />
            </LazyVideo>
            <span className="absolute top-1 right-1 bg-red-600 text-white px-1 py-0.5 text-[10px] rounded">
              NEW
            </span>
          </div>
          <h3 className={`mt-1 text-xs font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Latest Video {idx + 1}
          </h3>
          <p className={`text-[10px] ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Channel Name
          </p>
        </div>
      ))}
    </div>
  );
};

export default Home;