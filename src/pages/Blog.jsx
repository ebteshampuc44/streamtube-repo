// pages/Blog.jsx
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaHeart,
  FaComment,
  FaShare,
  FaClock,
  FaEye,
  FaUser,
  FaTag,
  FaCalendar,
  FaSearch,
  FaTimes,
  FaArrowRight,
  FaBookmark,
  FaRegBookmark
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

// ব্লগ পোস্ট ডেটা
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Video Streaming: What to Expect in 2025",
    excerpt: "As technology evolves, the way we consume video content is changing rapidly. Here's what experts predict for the future of streaming...",
    content: "Full content here...",
    author: "Sarah Johnson",
    authorAvatar: "S",
    authorRole: "Tech Editor",
    date: "2 days ago",
    readTime: "5 min read",
    views: "12K",
    likes: 342,
    comments: 56,
    category: "Technology",
    image: "tech",
    tags: ["Streaming", "Technology", "Future"],
    featured: true
  },
  {
    id: 2,
    title: "10 Must-Watch Documentaries on Streaming Platforms",
    excerpt: "Looking for something educational and entertaining? Check out these incredible documentaries available right now...",
    author: "Michael Chen",
    authorAvatar: "M",
    authorRole: "Content Curator",
    date: "5 days ago",
    readTime: "8 min read",
    views: "8K",
    likes: 215,
    comments: 32,
    category: "Entertainment",
    image: "documentary",
    tags: ["Documentaries", "Recommendations", "Must Watch"],
    featured: false
  },
  {
    id: 3,
    title: "How to Start Your Own Video Blog: A Beginner's Guide",
    excerpt: "Dreaming of becoming a content creator? This comprehensive guide will walk you through everything you need to know...",
    author: "Emily Rodriguez",
    authorAvatar: "E",
    authorRole: "Content Creator",
    date: "1 week ago",
    readTime: "10 min read",
    views: "15K",
    likes: 428,
    comments: 89,
    category: "Tutorial",
    image: "vlogging",
    tags: ["Vlogging", "Guide", "Content Creation"],
    featured: true
  },
  {
    id: 4,
    title: "The Rise of Short-Form Video Content",
    excerpt: "TikTok, Reels, Shorts - why short videos are taking over the internet and what it means for creators...",
    author: "David Kim",
    authorAvatar: "D",
    authorRole: "Social Media Expert",
    date: "2 weeks ago",
    readTime: "6 min read",
    views: "20K",
    likes: 567,
    comments: 102,
    category: "Trends",
    image: "shorts",
    tags: ["Shorts", "Trends", "Social Media"],
    featured: false
  },
  {
    id: 5,
    title: "Best Video Editing Software for Beginners in 2024",
    excerpt: "From free options to professional tools, here's our curated list of the best video editing software for newcomers...",
    author: "Alex Thompson",
    authorAvatar: "A",
    authorRole: "Video Editor",
    date: "3 weeks ago",
    readTime: "7 min read",
    views: "11K",
    likes: 289,
    comments: 45,
    category: "Technology",
    image: "editing",
    tags: ["Video Editing", "Software", "Tutorial"],
    featured: false
  },
  {
    id: 6,
    title: "How to Monetize Your YouTube Channel",
    excerpt: "Ready to turn your passion into profit? Learn the requirements and strategies for YouTube monetization...",
    author: "Lisa Wang",
    authorAvatar: "L",
    authorRole: "Monetization Expert",
    date: "1 month ago",
    readTime: "9 min read",
    views: "25K",
    likes: 712,
    comments: 156,
    category: "Business",
    image: "monetize",
    tags: ["Monetization", "YouTube", "Income"],
    featured: true
  },
];

const Blog = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [bookmarkedPosts, setBookmarkedPosts] = useState([]);

  // ক্যাটাগরি লিস্ট
  const categories = ["all", "Technology", "Entertainment", "Tutorial", "Trends", "Business"];

  // ফিল্টার করা পোস্ট
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // ফিচারড পোস্ট
  const featuredPosts = BLOG_POSTS.filter(post => post.featured);

  const toggleBookmark = (postId) => {
    setBookmarkedPosts(prev =>
      prev.includes(postId) ? prev.filter(id => id !== postId) : [...prev, postId]
    );
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'}`}>
      
      {/* হেডার */}
      <div className={`sticky top-0 z-20 ${isDarkMode ? 'bg-[#0f0f0f]/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'} border-b ${isDarkMode ? 'border-gray-800' : 'border-gray-200'} px-4 py-4`}>
        <div className="max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            <FaEdit className="text-red-600 text-2xl" />
            <h1 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Blog
            </h1>
          </div>
        </div>
      </div>

      {/* হিরো সেকশন */}
      <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-red-600'} text-white py-16`}>
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">StreamTube Blog</h1>
          <p className="text-xl mb-8 opacity-90">Insights, tutorials, and news from the world of video streaming</p>
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full overflow-hidden">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-6 py-3 text-gray-900 outline-none"
              />
              {searchTerm ? (
                <button onClick={() => setSearchTerm("")} className="px-4 text-gray-400">
                  <FaTimes />
                </button>
              ) : (
                <button className="px-6 py-3 bg-red-600 text-white hover:bg-red-700">
                  <FaSearch />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* মেইন কন্টেন্ট */}
      <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-6 py-8">
        
        {/* ফিচারড পোস্ট */}
        {searchTerm === "" && selectedCategory === "all" && (
          <>
            <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {featuredPosts.map(post => (
                <Link
                  key={post.id}
                  to={`/blog/${post.id}`}
                  className={`group relative overflow-hidden rounded-xl ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  } shadow-lg hover:shadow-xl transition-all`}
                >
                  <div className="relative h-48 bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center">
                    <FaEdit className="text-white text-5xl opacity-30" />
                    <div className="absolute top-4 left-4 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                      Featured
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {post.category}
                      </span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>•</span>
                      <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className={`text-xl font-bold mb-2 group-hover:text-red-600 transition-colors ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {post.title}
                    </h3>
                    <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold">
                          {post.authorAvatar}
                        </div>
                        <div>
                          <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                            {post.author}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            {post.authorRole}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleBookmark(post.id);
                        }}
                        className="text-red-600 hover:text-red-700"
                      >
                        {bookmarkedPosts.includes(post.id) ? <FaBookmark /> : <FaRegBookmark />}
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* ক্যাটাগরি ফিল্টার */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-red-600 text-white'
                  : isDarkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat === "all" ? "All Posts" : cat}
            </button>
          ))}
        </div>

        {/* ব্লগ পোস্ট গ্রিড */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <Link
              key={post.id}
              to={`/blog/${post.id}`}
              className={`group rounded-xl overflow-hidden ${
                isDarkMode ? 'bg-gray-900' : 'bg-white'
              } shadow-md hover:shadow-xl transition-all`}
            >
              <div className="relative h-40 bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center">
                <FaEdit className="text-white text-4xl opacity-30" />
                {post.featured && (
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-full">
                    Featured
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    isDarkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {post.category}
                  </span>
                  <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <FaClock size={10} />
                    {post.readTime}
                  </span>
                </div>
                
                <h3 className={`font-semibold mb-2 line-clamp-2 group-hover:text-red-600 transition-colors ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {post.title}
                </h3>
                
                <p className={`text-sm mb-3 line-clamp-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {post.excerpt}
                </p>
                
                <div className="flex items-center gap-3 text-xs mb-3">
                  <span className="flex items-center gap-1">
                    <FaEye className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.views}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.likes}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <FaComment className={isDarkMode ? 'text-gray-500' : 'text-gray-400'} />
                    <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>{post.comments}</span>
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-red-600 flex items-center justify-center text-white text-xs">
                      {post.authorAvatar}
                    </div>
                    <span className={`text-xs ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      {post.author}
                    </span>
                  </div>
                  <span className={`text-xs flex items-center gap-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    <FaCalendar size={10} />
                    {post.date}
                  </span>
                </div>
                
                {/* ট্যাগ */}
                <div className="flex flex-wrap gap-1 mt-3">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        isDarkMode ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* কোন ফল না পেলে */}
        {filteredPosts.length === 0 && (
          <div className={`text-center py-12 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            <FaEdit className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p className="text-lg">No articles found</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="mt-2 text-red-600 hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* নিউজলেটার */}
        <div className={`mt-12 p-8 rounded-xl ${isDarkMode ? 'bg-gray-900' : 'bg-white'} text-center`}>
          <h3 className={`text-2xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Subscribe to Our Newsletter
          </h3>
          <p className={`mb-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Get the latest articles and news delivered to your inbox
          </p>
          <div className="max-w-md mx-auto flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className={`flex-1 px-4 py-2 rounded-lg border ${
                isDarkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-300 text-gray-900'
              }`}
            />
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2">
              Subscribe <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;