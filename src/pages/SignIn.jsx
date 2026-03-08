import React, { useContext, useState } from "react";
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaGoogle, 
  FaFacebook, 
  FaGithub, 
  FaEye, 
  FaEyeSlash 
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const SignIn = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // ফিল্ড এডিট করার সাথে সাথে ঐ ফিল্ডের এরর ক্লিয়ার করুন
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (isSignUp) {
      if (!formData.name.trim()) {
        newErrors.name = "Name is required";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // এখানে লগইন/সাইনআপ API কল করুন
      // সফল হলে হোম পেজে রিডাইরেক্ট করুন
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      <div className={`max-w-md w-full space-y-8 p-8 md:p-10 rounded-2xl shadow-2xl ${
        isDarkMode ? 'bg-[#111] text-white' : 'bg-white text-gray-900'
      }`}>
        
        {/* Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <Link to="/">
              <svg
                width="180"
                height="52"
                viewBox="0 0 200 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: 'pointer' }}
              >
                <path
                  d="M25 15L45 30L25 45V15Z"
                  fill="#dc2626"
                />
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
                <text
                  x="145"
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
          </div>
          <h2 className="mt-6 text-3xl font-extrabold">
            {isSignUp ? "Create your account" : "Welcome back!"}
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => {
                setIsSignUp(!isSignUp);
                setErrors({});
                setFormData({
                  email: "",
                  password: "",
                  confirmPassword: "",
                  name: ""
                });
              }}
              className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200"
            >
              {isSignUp ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Name Field - শুধু সাইনআপে দেখাবে */}
            {isSignUp && (
              <div>
                <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required={isSignUp}
                    value={formData.name}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.name ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                    } ${
                      isDarkMode 
                        ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                )}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Email address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="you@example.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <FaEyeSlash className={`${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                  ) : (
                    <FaEye className={`${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password - শুধু সাইনআপে দেখাবে */}
            {isSignUp && (
              <div>
                <label htmlFor="confirmPassword" className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaLock className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    required={isSignUp}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                      errors.confirmPassword ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                    } ${
                      isDarkMode 
                        ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                        : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            )}
          </div>

          {/* Remember Me & Forgot Password - শুধু লগইনে দেখাবে */}
          {!isSignUp && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className={`ml-2 block text-sm ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-900'
                }`}>
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
                  Forgot password?
                </a>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              {isSignUp ? "Sign up" : "Sign in"}
            </button>
          </div>

          {/* Social Login/Signup */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-500'}`}>
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => console.log("Google sign in")}
                className={`w-full inline-flex justify-center py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-[#1e1e1e] text-gray-300 hover:bg-[#2e2e2e]' 
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaGoogle className="text-red-500 text-xl" />
              </button>

              <button
                type="button"
                onClick={() => console.log("Facebook sign in")}
                className={`w-full inline-flex justify-center py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-[#1e1e1e] text-gray-300 hover:bg-[#2e2e2e]' 
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaFacebook className="text-blue-600 text-xl" />
              </button>

              <button
                type="button"
                onClick={() => console.log("GitHub sign in")}
                className={`w-full inline-flex justify-center py-2 px-4 border rounded-lg text-sm font-medium transition-all duration-200 transform hover:scale-105 ${
                  isDarkMode 
                    ? 'border-gray-700 bg-[#1e1e1e] text-gray-300 hover:bg-[#2e2e2e]' 
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FaGithub className={`text-xl ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
            </div>
          </div>

          {/* Terms and Privacy - শুধু সাইনআপে দেখাবে */}
          {isSignUp && (
            <p className={`text-xs text-center ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              By signing up, you agree to our{" "}
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-red-600 hover:text-red-500">
                Privacy Policy
              </a>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignIn;