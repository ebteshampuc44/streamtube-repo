import React from "react";
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

const Home = () => {
  return (
    <div className="flex bg-[#0f0f0f] text-white min-h-screen">

      {/* SIDEBAR */}
      <div className="w-20 bg-[#111] flex flex-col items-center py-6 space-y-8 text-gray-400">
        <FaHome size={20} />
        <FaGlobe size={20} />
        <FaVideo size={20} />
        <FaStar size={20} />
        <FaThumbsUp size={20} />
        <FaUser size={20} />
        <FaMapMarkerAlt size={20} />
        <FaEdit size={20} />
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        {/* HERO SECTION */}
        <div className="grid grid-cols-3 gap-4">

          {/* BIG VIDEO */}
          <div className="col-span-2 relative rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
              className="w-full h-[420px] object-cover"
            />

            <div className="absolute bottom-6 left-6">
              <span className="bg-black px-3 py-1 text-sm">GAMING</span>

              <h1 className="text-3xl font-bold mt-3">
                New MMORPG coming this summer
              </h1>

              <p className="text-gray-300 text-sm mt-1">
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
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511379938547-c1f69419868d"
                className="w-full h-full object-cover"
              />

              <div className="absolute bottom-4 left-4">
                <span className="bg-black px-2 py-1 text-xs">MUSIC</span>

                <h3 className="font-semibold mt-1">
                  All Out of Love
                </h3>

                <p className="text-xs text-gray-300">
                  Alden • 1.2K views
                </p>
              </div>
            </div>

            {/* BOTTOM SMALL VIDEOS */}
            <div className="grid grid-cols-2 gap-4">

              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-3 left-3">
                  <span className="bg-black px-2 py-1 text-xs">
                    MUSIC
                  </span>

                  <p className="text-sm font-semibold">
                    Sweet love
                  </p>
                </div>
              </div>

              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1606112219348-204d7d8b94ee"
                  className="w-full h-full object-cover"
                />

                <div className="absolute bottom-3 left-3">
                  <span className="bg-black px-2 py-1 text-xs">
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
          <h2 className="text-xl font-bold mb-6">TOP PLAYLISTS</h2>

          <div className="grid grid-cols-4 gap-6">

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                className="h-40 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 font-semibold">
                ● Travel Playlist
              </div>
              <div className="absolute top-4 right-4 text-xl">14</div>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1605902711622-cfb43c4437d1"
                className="h-40 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 font-semibold">
                ● Gaming Playlist
              </div>
              <div className="absolute top-4 right-4 text-xl">11</div>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
                className="h-40 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 font-semibold">
                ● Pop Music Playlist
              </div>
              <div className="absolute top-4 right-4 text-xl">11</div>
            </div>

            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517649763962-0c623066013b"
                className="h-40 w-full object-cover"
              />
              <div className="absolute bottom-4 left-4 font-semibold">
                ● Funny Moments Playlist
              </div>
              <div className="absolute top-4 right-4 text-xl">9</div>
            </div>

          </div>
        </div>

        {/* REVIEW SECTION */}
        <div className="mt-16">

          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold">REVIEW</h2>

            <button className="bg-gray-700 px-4 py-2 rounded">
              VIEW MORE
            </button>
          </div>

          <div className="grid grid-cols-4 gap-6">

            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1614850715776-a749a85b4144"
                  className="rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-black px-2 py-1 text-sm">
                  00:15
                </span>
              </div>
              <h3 className="mt-3 font-semibold">
                Star Wars Visions
              </h3>
            </div>

            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e"
                  className="rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-black px-2 py-1 text-sm">
                  00:15
                </span>
              </div>
              <h3 className="mt-3 font-semibold">
                Star Wars Battlefront Reveal Trailer
              </h3>
            </div>

            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                  className="rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-black px-2 py-1 text-sm">
                  00:15
                </span>
              </div>
              <h3 className="mt-3 font-semibold">
                Horizon Zero Dawn
              </h3>
            </div>

            <div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
                  className="rounded-lg"
                />
                <span className="absolute top-2 right-2 bg-black px-2 py-1 text-sm">
                  00:15
                </span>
              </div>
              <h3 className="mt-3 font-semibold">
                Imagine Dragons
              </h3>
            </div>

          </div>

        </div>

        {/* SHORTS SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">SHORTS</h2>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative rounded-lg overflow-hidden">
                <img
                  src={`https://images.unsplash.com/photo-${
                    item === 1 ? "1516280440614-37939baac9e1" :
                    item === 2 ? "1534528741775-53994a69daeb" :
                    item === 3 ? "1506794778200-c1d2c5dabc8" : "1534528741775-53994a69daeb"
                  }`}
                  className="h-80 w-full object-cover"
                />
                <div className="absolute bottom-4 left-4">
                  <p className="font-semibold">Short Video {item}</p>
                  <p className="text-xs text-gray-300">1.2M views</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* GAMING SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">GAMING</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1542751371-adc38448a05e" :
                      item === 2 ? "1605902711622-cfb43c4437d1" :
                      item === 3 ? "1511512222254" : "1538488887510"
                    }`}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                </div>
                <h3 className="mt-2 font-semibold">Gaming Video {item}</h3>
                <p className="text-sm text-gray-400">Gaming Channel • 50K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* MUSIC SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">MUSIC</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1511379938547-c1f69419868d" :
                      item === 2 ? "1493225457124-a3eb161ffa5f" :
                      item === 3 ? "1505740420928-5e560c06d30e" : "1511671782779"
                    }`}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                </div>
                <h3 className="mt-2 font-semibold">Music Video {item}</h3>
                <p className="text-sm text-gray-400">Music Channel • 100K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* TRAVEL SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">TRAVEL</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1507525428034-b723cf961d3e" :
                      item === 2 ? "1488645552072-1f0fe6e9c4c3" :
                      item === 3 ? "1500530855697-b586d89ba3ee" : "1469470160168"
                    }`}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                </div>
                <h3 className="mt-2 font-semibold">Travel Video {item}</h3>
                <p className="text-sm text-gray-400">Travel Channel • 30K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* SPORTS SECTION */}
        <div className="mt-16">
          <h2 className="text-xl font-bold mb-6">SPORTS</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1517649763962-0c623066013b" :
                      item === 2 ? "1461891447649" :
                      item === 3 ? "1579952365527-9f2c2f8b9b7e" : "1517466781591"
                    }`}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                </div>
                <h3 className="mt-2 font-semibold">Sports Video {item}</h3>
                <p className="text-sm text-gray-400">Sports Channel • 75K views</p>
              </div>
            ))}
          </div>
        </div>

        {/* LATEST VIDEOS SECTION */}
        <div className="mt-16 mb-8">
          <h2 className="text-xl font-bold mb-6">LATEST VIDEOS</h2>
          <div className="grid grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item}>
                <div className="relative">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      item === 1 ? "1614850715776-a749a85b4144" :
                      item === 2 ? "1497032205916-ac775f0649ae" :
                      item === 3 ? "1511671782779" : "1500530855697-b586d89ba3ee"
                    }`}
                    className="rounded-lg h-40 w-full object-cover"
                  />
                  <span className="absolute top-2 right-2 bg-black px-2 py-1 text-xs">
                    NEW
                  </span>
                </div>
                <h3 className="mt-2 font-semibold">Latest Video {item}</h3>
                <p className="text-sm text-gray-400">Channel Name • 2 hours ago</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;