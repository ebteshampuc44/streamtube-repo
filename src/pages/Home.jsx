import React, { useContext } from "react";
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

const Home = () => {
  const { isDarkMode } = useContext(ThemeContext);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f] text-white' : 'bg-gray-50 text-gray-900'
    }`}>

      {/* SIDEBAR - Sticky */}
      <div className={`w-20 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-600 border-r border-gray-200'} flex flex-col items-center py-6 space-y-8 sticky top-0 h-screen transition-colors duration-300`}>
        <FaHome size={20} className="hover:text-red-500 cursor-pointer" />
        <FaGlobe size={20} className="hover:text-red-500 cursor-pointer" />
        <FaVideo size={20} className="hover:text-red-500 cursor-pointer" />
        <FaStar size={20} className="hover:text-red-500 cursor-pointer" />
        <FaThumbsUp size={20} className="hover:text-red-500 cursor-pointer" />
        <FaUser size={20} className="hover:text-red-500 cursor-pointer" />
        <FaMapMarkerAlt size={20} className="hover:text-red-500 cursor-pointer" />
        <FaEdit size={20} className="hover:text-red-500 cursor-pointer" />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HERO SECTION */}
        <div className="grid grid-cols-3 gap-4">

          {/* BIG VIDEO */}
          <div className="col-span-2 relative rounded-lg overflow-hidden group">
            <video
              className="w-full h-[420px] object-cover transition-transform duration-300 group-hover:scale-105"
              autoPlay
              muted
              loop
              poster="https://images.unsplash.com/photo-1542751371-adc38448a05e"
            >
              <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
            </video>

            <div className="absolute bottom-6 left-6">
              <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-3 py-1 text-sm text-white`}>GAMING</span>

              <h1 className="text-3xl font-bold mt-3">
                New MMORPG coming this summer
              </h1>

              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-200'} text-sm mt-1`}>
                Audrey • 3.2K views
              </p>
            </div>

            <div className="absolute bottom-4 right-6 text-red-500">
              ● Live Chat
            </div>
          </div>

          {/* RIGHT SIDE VIDEOS */}
          <div className="grid grid-rows-2 gap-4">

            {/* TOP VIDEO */}
            <div className="relative rounded-lg overflow-hidden group">
              <video
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                muted
                loop
                poster="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
              >
                <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
              </video>

              <div className="absolute bottom-4 left-4">
                <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-2 py-1 text-xs text-white`}>MUSIC</span>

                <h3 className="font-semibold mt-1">
                  All Out of Love
                </h3>

                <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>
                  Alden • 1.2K views
                </p>
              </div>
            </div>

            {/* BOTTOM SMALL VIDEOS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="relative rounded-lg overflow-hidden group">
                <video
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>

                <div className="absolute bottom-3 left-3">
                  <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-2 py-1 text-xs text-white`}>
                    MUSIC
                  </span>

                  <p className="text-sm font-semibold">
                    Sweet love
                  </p>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden group">
                <video
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  muted
                  loop
                  poster="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
                >
                  <source src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" type="video/mp4" />
                </video>

                <div className="absolute bottom-3 left-3">
                  <span className={`${isDarkMode ? 'bg-black' : 'bg-gray-800'} px-2 py-1 text-xs text-white`}>
                    GAMING
                  </span>

                  <p className="text-sm font-semibold">
                    Star Wars Battlefront
                  </p>
                </div>

                <div className="absolute bottom-3 right-3 text-red-500 text-xs">
                  ● Live Chat
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* TOP PLAYLISTS */}
        <div className="mt-14">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TOP PLAYLISTS</h2>

          <div className="grid grid-cols-4 gap-6">

            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative rounded-lg overflow-hidden group cursor-pointer">
                <video
                  className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                <div className={`absolute bottom-4 left-4 font-semibold ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  {item === 1 ? "● Travel Playlist" : 
                   item === 2 ? "● Gaming Playlist" :
                   item === 3 ? "● Pop Music Playlist" : "● Funny Moments Playlist"}
                </div>
                <div className={`absolute top-4 right-4 text-xl ${isDarkMode ? 'text-white' : 'text-white'}`}>
                  {item === 1 ? "14" : item === 2 ? "11" : item === 3 ? "11" : "9"}
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-16">
          <div className="flex justify-between mb-6">
            <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>REVIEW</h2>
            <button className={`${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'} px-4 py-2 rounded transition-colors duration-200`}>
              VIEW MORE
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex flex-col group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
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
                  <span className="absolute top-2 right-2 bg-black text-white px-2 py-1 text-sm">
                    00:15
                  </span>
                </div>
                <h3 className={`mt-3 font-semibold line-clamp-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  {item === 1 ? "Star Wars Visions" :
                   item === 2 ? "Star Wars Battlefront Reveal Trailer" :
                   item === 3 ? "Horizon Zero Dawn" : "Imagine Dragons - New Album Review"}
                </h3>
                <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item === 1 ? "2.5K views • 2 days ago" :
                   item === 2 ? "3.2K views • 3 days ago" :
                   item === 3 ? "4.1K views • 5 days ago" : "1.8K views • 1 week ago"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* SHORTS SECTION */}
        <div className="mt-16">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SHORTS</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative rounded-lg overflow-hidden group cursor-pointer">
                <video
                  className="h-80 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                <div className="absolute bottom-4 left-4">
                  <p className={`font-semibold ${isDarkMode ? 'text-white' : 'text-white'}`}>Short Video {item}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-200'}`}>1.2M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GAMING SECTION */}
        <div className="mt-16">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>GAMING</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
                <h3 className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Gaming Video {item}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gaming Channel • 50K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* MUSIC SECTION */}
        <div className="mt-16">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>MUSIC</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
                <h3 className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Music Video {item}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Music Channel • 100K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* TRAVEL SECTION */}
        <div className="mt-16">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>TRAVEL</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
                <h3 className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Travel Video {item}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Travel Channel • 30K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPORTS SECTION */}
        <div className="mt-16">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>SPORTS</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                </div>
                <h3 className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Sports Video {item}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Sports Channel • 75K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST VIDEOS SECTION */}
        <div className="mt-16 mb-8">
          <h2 className={`text-xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>LATEST VIDEOS</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-lg">
                  <video
                    className="rounded-lg h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
                  <span className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 text-xs rounded">
                    NEW
                  </span>
                </div>
                <h3 className={`mt-2 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Latest Video {item}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Channel Name • 2 hours ago</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;