import React, { useContext, useState } from "react";
import { 
  FaUser, 
  FaLock, 
  FaEnvelope, 
  FaGoogle, 
  FaFacebook, 
  FaGithub, 
  FaEye, 
  FaEyeSlash,
  FaPhone,
  FaCalendarAlt,
  FaVenusMars
} from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dateOfBirth: "",
    username: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // ফিল্ড এডিট করার সাথে সাথে ঐ ফিল্ডের এরর ক্লিয়ার করুন
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{11}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be 11 digits";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 4) {
      newErrors.username = "Username must be at least 4 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/.test(formData.password)) {
      newErrors.password = "Password must contain uppercase, lowercase and number";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    }

    if (!agreeTerms) {
      newErrors.terms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Sign up data:", formData);
      // এখানে সাইনআপ API কল করুন
      // সফল হলে লগইন পেজে রিডাইরেক্ট করুন
      navigate('/signin');
    }
  };

  // পাসওয়ার্ড স্ট্রেংথ চেক করার ফাংশন
  const getPasswordStrength = () => {
    const password = formData.password;
    if (!password) return 0;
    
    let strength = 0;
    if (password.length >= 8) strength += 25;
    if (password.match(/[A-Z]/)) strength += 25;
    if (password.match(/[a-z]/)) strength += 25;
    if (password.match(/[0-9]/)) strength += 25;
    if (password.match(/[^A-Za-z0-9]/)) strength += 25;
    
    return Math.min(strength, 100);
  };

  const passwordStrength = getPasswordStrength();

  const getStrengthColor = () => {
    if (passwordStrength < 50) return '#ef4444';
    if (passwordStrength < 75) return '#f59e0b';
    return '#10b981';
  };

  const getStrengthText = () => {
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Medium';
    return 'Strong';
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
      isDarkMode ? 'bg-[#0f0f0f]' : 'bg-gray-50'
    }`}>
      <div className={`max-w-2xl w-full space-y-8 p-8 md:p-10 rounded-2xl shadow-2xl ${
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
            Create your account
          </h2>
          <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Already have an account?{" "}
            <Link to="/signin" className="font-medium text-red-600 hover:text-red-500 transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Full Name */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="fullName" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaUser className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.fullName ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="John Doe"
                />
              </div>
              {errors.fullName && (
                <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>
              )}
            </div>

            {/* Username */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="username" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Username <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>@</span>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.username ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="johndoe123"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">{errors.username}</p>
              )}
            </div>

            {/* Email */}
            <div className="col-span-2 md:col-span-1">
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

            {/* Phone */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="phone" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaPhone className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="01712345678"
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
              )}
            </div>

            {/* Gender */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="gender" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaVenusMars className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.gender ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              {errors.gender && (
                <p className="mt-1 text-xs text-red-500">{errors.gender}</p>
              )}
            </div>

            {/* Date of Birth */}
            <div className="col-span-2 md:col-span-1">
              <label htmlFor="dateOfBirth" className={`block text-sm font-medium mb-2 ${
                isDarkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaCalendarAlt className={`${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                </div>
                <input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  required
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.dateOfBirth ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white' 
                      : 'bg-white text-gray-900'
                  }`}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-1 text-xs text-red-500">{errors.dateOfBirth}</p>
              )}
            </div>

            {/* Password */}
            <div className="col-span-2 md:col-span-1">
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
              
              {/* Password Strength Meter */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex justify-between items-center mb-1">
                    <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        style={{ 
                          width: `${passwordStrength}%`, 
                          backgroundColor: getStrengthColor(),
                          transition: 'width 0.3s ease'
                        }} 
                        className="h-full"
                      />
                    </div>
                    <span className="ml-2 text-xs" style={{ color: getStrengthColor() }}>
                      {getStrengthText()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Use 8+ chars with uppercase, lowercase & numbers
                  </p>
                </div>
              )}
              
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="col-span-2 md:col-span-1">
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
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`appearance-none relative block w-full pl-10 pr-10 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-200 ${
                    errors.confirmPassword ? 'border-red-500' : isDarkMode ? 'border-gray-700' : 'border-gray-300'
                  } ${
                    isDarkMode 
                      ? 'bg-[#1e1e1e] text-white placeholder-gray-500' 
                      : 'bg-white text-gray-900 placeholder-gray-400'
                  }`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash className={`${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                  ) : (
                    <FaEye className={`${isDarkMode ? 'text-gray-500 hover:text-gray-400' : 'text-gray-400 hover:text-gray-600'}`} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                I agree to the{" "}
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Privacy Policy
                </a>
              </label>
              {errors.terms && (
                <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </div>

          {/* Social Sign Up */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className={`w-full border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-300'}`}></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-2 ${isDarkMode ? 'bg-[#111] text-gray-400' : 'bg-white text-gray-500'}`}>
                  Or sign up with
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-3 gap-3">
              <button
                type="button"
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
        </form>
      </div>
    </div>
  );
};

export default SignUp;