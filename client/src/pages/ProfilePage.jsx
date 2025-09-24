"use client";

import { motion } from "framer-motion";
import {
  Award,
  Calendar,
  Camera,
  Edit3,
  Eye,
  EyeOff,
  FileText,
  Globe,
  Lock,
  Mail,
  Save,
  Shield,
  TrendingUp,
  User,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage({ darkMode, setDarkMode, onLogout }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [userStats] = useState({
    totalNotes: 24,
    publicNotes: 8,
    privateNotes: 16,
    joinedDate: "January 2024",
    streak: 12,
    achievements: 5,
    totalViews: 1247,
  });

  const [profileData, setProfileData] = useState({
    username: "john_doe",
    email: "john.doe@example.com",
    avatar: null,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    // Mock save functionality
    console.log("Saving profile:", profileData);
    setIsEditing(false);
    // Reset password fields
    setProfileData((prev) => ({
      ...prev,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-indigo-900"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Summary Card */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-xl p-6 max-xs:p-5 text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>

                <div className="relative z-10">
                  <div className="flex items-center space-x-4 ">
                    <div className="w-16 h-16 max-xs:w-12 max-xs:h-12 max-xs:rounded-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden border border-white/30">
                      {profileData.avatar ? (
                        <img
                          src={profileData.avatar || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white max-xs:w-6 max-xs:h-6" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold max-xs:text-sm">
                        {profileData.username}
                      </h3>
                      <p className="text-blue-100 max-xs:text-sm">
                        Content Creator
                      </p>
                    </div>
                  </div>

                  {/* <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-300" />
                      <span>{userStats.achievements} Achievements</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Zap className="w-4 h-4 text-orange-300" />
                      <span>{userStats.streak} Day Streak</span>
                    </div>
                  </div> */}
                </div>
              </motion.div>

              {/* Enhanced Stats Cards */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-6"
              >
                <h3 className="text-lg max:xs:text-sm font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                  Your Statistics
                </h3>
                <div className="space-y-4">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-100 dark:border-blue-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium max-xs:text-md">
                          Total Notes
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400 max-xs:text-md">
                          All your creations
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400 max-xs:text-lg">
                      {userStats.totalNotes}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-100 dark:border-green-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-lg">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Public Notes
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Shared with world
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {userStats.publicNotes}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700/50 dark:to-slate-700/50 rounded-xl border border-gray-100 dark:border-gray-600/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-gray-500 to-gray-600 rounded-xl shadow-lg">
                        <Lock className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Private Notes
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Personal collection
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                      {userStats.privateNotes}
                    </span>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-100 dark:border-purple-800/30"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-lg">
                        <Eye className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Total Views
                        </span>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Content engagement
                        </p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                      {userStats.totalViews}
                    </span>
                  </motion.div>

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg shadow-lg">
                          <Calendar className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-gray-700 dark:text-gray-300 font-medium">
                          Member Since
                        </span>
                      </div>
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">
                        {userStats.joinedDate}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-2xl shadow-xl border border-white/20 dark:border-gray-700/50 p-8"
              >
                <div className="flex items-center justify-between mb-8 ">
                  <div>
                    <h3 className="text-2xl max-xs:text-sm font-bold text-gray-900 dark:text-white">
                      Profile Information
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-1 hidden md:block">
                      Update your personal details and security settings
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex items-center cursor-pointer space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl shadow-lg transition-all duration-300"
                  >
                    <Edit3 className="w-4 h-4 max-xs:w-3 max-xs:h-3" />
                    <span className="font-medium max-xs:text-sm">
                      {isEditing ? "Cancel" : "Edit Profile"}
                    </span>
                  </motion.button>
                </div>

                <div className="space-y-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center space-x-8 max-xs:space-x-4 p-6 max-xs:p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl border border-blue-100 dark:border-blue-800/30 "
                  >
                    <div className="relative">
                      <div className="w-24 h-24 max-xs:w-15 max-xs:h-15 max-xs:rounded-full max-xs:border-2 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border-4 border-white dark:border-gray-700">
                        {profileData.avatar ? (
                          <img
                            src={profileData.avatar || "/placeholder.svg"}
                            alt="Avatar"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <User className="w-10 h-10 max-xs:w-6 max-xs:h-6 text-white" />
                        )}
                      </div>
                      {isEditing && (
                        <motion.label className="absolute -bottom-2 -right-2 p-3 max-xs:p-[6px] bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl cursor-pointer shadow-lg transition-all duration-300">
                          <Camera className="w-4 h-4 " />
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="hidden"
                          />
                        </motion.label>
                      )}
                    </div>
                    <div>
                      <h4 className="text-2xl max-xs:text-sm font-bold text-gray-900 dark:text-white">
                        {profileData.username}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-lg max-xs:text-sm">
                        {profileData.email}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 max-xs:text-sm">
                          <Award className="w-4 h-4 max-xs:w-3 max-xs:h-3" />
                          <span className="">Pro Member</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                          <Zap className="w-4 h-4 max-xs:w-3 max-xs:h-3" />
                          <span>Active</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Username
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          value={profileData.username}
                          onChange={(e) =>
                            handleInputChange("username", e.target.value)
                          }
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-300 shadow-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          disabled={!isEditing}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-50 dark:disabled:bg-gray-800 disabled:text-gray-500 transition-all duration-300 shadow-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Section */}
                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t-2 border-gray-200 dark:border-gray-700 pt-8"
                    >
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                        <div className="p-2 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg mr-3">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        Change Password
                      </h4>
                      <div className="space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showCurrentPassword ? "text" : "password"}
                              value={profileData.currentPassword}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentPassword",
                                  e.target.value
                                )
                              }
                              placeholder="Enter current password"
                              className="w-full pr-12 pl-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showCurrentPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </motion.button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={profileData.newPassword}
                              onChange={(e) =>
                                handleInputChange("newPassword", e.target.value)
                              }
                              placeholder="Enter new password"
                              className="w-full pr-12 pl-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() =>
                                setShowNewPassword(!showNewPassword)
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showNewPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </motion.button>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            Confirm New Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={profileData.confirmPassword}
                              onChange={(e) =>
                                handleInputChange(
                                  "confirmPassword",
                                  e.target.value
                                )
                              }
                              placeholder="Confirm new password"
                              className="w-full pr-12 pl-4 py-4 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              type="button"
                              onClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                              }
                              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              {showConfirmPassword ? (
                                <EyeOff className="w-5 h-5" />
                              ) : (
                                <Eye className="w-5 h-5" />
                              )}
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {isEditing && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-end pt-8 border-t-2 border-gray-200 dark:border-gray-700"
                    >
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveProfile}
                        className="cursor-pointer flex items-center space-x-3 px-8 py-4 max-xs:px-6 max-xs:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-xl transition-all duration-300 font-bold"
                      >
                        <Save className="w-5 h-5" />
                        <span>Save Changes</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}

// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import { useNavigate } from "react-router-dom"
// import {
//   ArrowLeft,
//   User,
//   Camera,
//   Save,
//   Eye,
//   EyeOff,
//   FileText,
//   Globe,
//   Lock,
//   LogOut,
//   Shield,
//   Mail,
//   Calendar,
//   Award,
//   Settings,
//   Crown,
//   Sparkles,
//   Activity,
//   Target,
//   Flame,
//   Zap,
//   TrendingUp,
//   Heart,
//   MessageCircle,
// } from "lucide-react"

// export default function ProfilePage({ darkMode, setDarkMode, onLogout }) {
//   const navigate = useNavigate()
//   const [isEditing, setIsEditing] = useState(false)
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false)
//   const [showNewPassword, setShowNewPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
//   const [isHovering, setIsHovering] = useState(false)

//   const [userStats] = useState({
//     totalNotes: 24,
//     publicNotes: 8,
//     privateNotes: 16,
//     joinedDate: "January 2024",
//     streak: 12,
//     achievements: 5,
//     totalViews: 1247,
//     totalLikes: 892,
//     totalComments: 156,
//     totalShares: 234,
//     weeklyGrowth: 15.8,
//   })

//   const [profileData, setProfileData] = useState({
//     username: "john_doe",
//     email: "john.doe@example.com",
//     avatar: null,
//     currentPassword: "",
//     newPassword: "",
//     confirmPassword: "",
//   })

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY })
//     }
//     window.addEventListener("mousemove", handleMouseMove)
//     return () => window.removeEventListener("mousemove", handleMouseMove)
//   }, [])

//   const handleInputChange = (field, value) => {
//     setProfileData((prev) => ({
//       ...prev,
//       [field]: value,
//     }))
//   }

//   const handleSaveProfile = () => {
//     // Mock save functionality
//     console.log("Saving profile:", profileData)
//     setIsEditing(false)
//     // Reset password fields
//     setProfileData((prev) => ({
//       ...prev,
//       currentPassword: "",
//       newPassword: "",
//       confirmPassword: "",
//     }))
//   }

//   const handleAvatarChange = (event) => {
//     const file = event.target.files[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileData((prev) => ({
//           ...prev,
//           avatar: e.target.result,
//         }))
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleLogout = () => {
//     onLogout()
//     navigate("/login")
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 dark:from-gray-900 dark:via-slate-900 dark:to-black relative overflow-hidden"
//       onMouseEnter={() => setIsHovering(true)}
//       onMouseLeave={() => setIsHovering(false)}
//     >
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           animate={{
//             x: [0, 200, -100, 0],
//             y: [0, -150, 100, 0],
//             rotate: [0, 180, 360],
//           }}
//           transition={{
//             duration: 30,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-600/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             x: [0, -150, 200, 0],
//             y: [0, 100, -80, 0],
//             rotate: [360, 180, 0],
//           }}
//           transition={{
//             duration: 25,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-gradient-to-r from-pink-400/20 via-rose-500/20 to-orange-500/20 rounded-full blur-3xl"
//         />
//         <motion.div
//           animate={{
//             x: [0, 100, -50, 0],
//             y: [0, -80, 120, 0],
//             scale: [1, 1.2, 0.8, 1],
//           }}
//           transition={{
//             duration: 20,
//             repeat: Number.POSITIVE_INFINITY,
//             ease: "linear",
//           }}
//           className="absolute top-1/2 right-1/4 w-64 h-64 bg-gradient-to-r from-emerald-400/15 via-teal-500/15 to-cyan-500/15 rounded-full blur-2xl"
//         />

//         <motion.div
//           animate={{
//             x: mousePosition.x - 100,
//             y: mousePosition.y - 100,
//             scale: isHovering ? 1.5 : 1,
//           }}
//           transition={{ type: "spring", stiffness: 100, damping: 30 }}
//           className="absolute w-48 h-48 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-2xl"
//         />

//         {[...Array(30)].map((_, i) => (
//           <motion.div
//             key={i}
//             animate={{
//               y: [0, -150, 0],
//               x: [0, Math.sin(i) * 50, 0],
//               opacity: [0, 1, 0],
//               scale: [0.5, 1.2, 0.5],
//             }}
//             transition={{
//               duration: 4 + Math.random() * 3,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: Math.random() * 8,
//               ease: "easeInOut",
//             }}
//             className={`absolute rounded-full ${i % 3 === 0
//               ? "w-3 h-3 bg-cyan-400/30"
//               : i % 3 === 1
//                 ? "w-2 h-2 bg-purple-400/40"
//                 : "w-1 h-1 bg-pink-400/50"
//               }`}
//             style={{
//               left: `${Math.random() * 100}%`,
//               top: `${Math.random() * 100}%`,
//             }}
//           />
//         ))}

//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={`star-${i}`}
//             animate={{
//               x: [-100, window.innerWidth + 100],
//               y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
//               opacity: [0, 1, 0],
//             }}
//             transition={{
//               duration: 3,
//               repeat: Number.POSITIVE_INFINITY,
//               delay: i * 4,
//               ease: "linear",
//             }}
//             className="absolute w-1 h-1 bg-white rounded-full"
//             style={{
//               boxShadow: "0 0 10px 2px rgba(255,255,255,0.5), 0 0 20px 4px rgba(59,130,246,0.3)",
//             }}
//           />
//         ))}
//       </div>

//       <motion.div
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         className="bg-white/5 dark:bg-black/20 backdrop-blur-3xl shadow-2xl border-b border-white/10 dark:border-gray-700/20 relative z-10"
//       >
//         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-purple-500/5 to-pink-500/5 animate-pulse"></div>
//         <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
//           <div className="flex items-center justify-between h-24">
//             <div className="flex items-center space-x-8">
//               <motion.button
//                 whileHover={{ scale: 1.1, rotate: -10 }}
//                 whileTap={{ scale: 0.9 }}
//                 onClick={() => navigate("/dashboard")}
//                 className="relative group"
//               >
//                 <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                 <div className="relative p-4 rounded-3xl bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-sm">
//                   <ArrowLeft className="w-6 h-6" />
//                 </div>
//               </motion.button>
//               <div>
//                 <motion.h1
//                   initial={{ x: -20 }}
//                   animate={{ x: 0 }}
//                   className="text-4xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
//                 >
//                   Profile Hub
//                 </motion.h1>
//                 <motion.p
//                   initial={{ x: -20, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   transition={{ delay: 0.1 }}
//                   className="text-white/70 font-semibold text-lg mt-1"
//                 >
//                   Your digital identity center
//                 </motion.p>
//               </div>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.05, y: -3 }}
//               whileTap={{ scale: 0.95 }}
//               onClick={handleLogout}
//               className="relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-rose-600 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//               <div className="relative flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 hover:from-red-400 hover:via-pink-400 hover:to-rose-500 text-white rounded-3xl shadow-2xl transition-all duration-500 border border-white/20 backdrop-blur-sm">
//                 <LogOut className="w-5 h-5" />
//                 <span className="font-bold text-lg">Logout</span>
//               </div>
//             </motion.button>
//           </div>
//         </div>
//       </motion.div>

//       <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 relative z-10">
//         <div className="grid grid-cols-1 xl:grid-cols-4 gap-10">
//           <div className="xl:col-span-1 space-y-8">
//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.1 }}
//               whileHover={{ y: -8, scale: 1.02 }}
//               className="relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 rounded-3xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
//               <div className="relative bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-700 rounded-3xl shadow-2xl p-8 text-white overflow-hidden border border-white/20">
//                 <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 blur-2xl"></div>
//                 <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16 blur-2xl"></div>

//                 <div className="relative z-10">
//                   <div className="flex items-center space-x-6 mb-8">
//                     <motion.div whileHover={{ scale: 1.15, rotate: 10 }} className="relative">
//                       <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center overflow-hidden border-3 border-white/40 shadow-2xl">
//                         {profileData.avatar ? (
//                           <img
//                             src={profileData.avatar || "/placeholder.svg"}
//                             alt="Avatar"
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <User className="w-12 h-12 text-white" />
//                         )}
//                       </div>
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         className="absolute -inset-2 border-2 border-dashed border-white/30 rounded-3xl"
//                       />
//                       <motion.div
//                         animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
//                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                         className="absolute -inset-4 border border-cyan-400/50 rounded-3xl"
//                       />
//                       <motion.div
//                         animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
//                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: 0.5 }}
//                         className="absolute -inset-6 border border-purple-400/30 rounded-3xl"
//                       />
//                     </motion.div>
//                     <div>
//                       <h3 className="text-2xl font-black mb-2">{profileData.username}</h3>
//                       <div className="flex items-center space-x-2 mb-3">
//                         <motion.div
//                           animate={{ rotate: [0, 15, -15, 0] }}
//                           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                         >
//                           <Crown className="w-4 h-4 text-yellow-300" />
//                         </motion.div>
//                         <span className="text-cyan-100 font-bold">Pro Creator</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <motion.div
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center relative overflow-hidden"
//                     >
//                       <motion.div
//                         animate={{ x: [-100, 100] }}
//                         transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-400 to-transparent"
//                       />
//                       <div className="flex items-center justify-center mb-2">
//                         <motion.div
//                           animate={{ scale: [1, 1.2, 1] }}
//                           transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//                         >
//                           <Flame className="w-5 h-5 text-orange-300 mr-2" />
//                         </motion.div>
//                         <span className="font-bold text-2xl">{userStats.streak}</span>
//                       </div>
//                       <span className="text-xs text-cyan-100 font-semibold">Day Streak</span>
//                     </motion.div>
//                     <motion.div
//                       whileHover={{ scale: 1.05, y: -2 }}
//                       className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20 text-center relative overflow-hidden"
//                     >
//                       <motion.div
//                         animate={{ rotate: 360 }}
//                         transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         className="absolute top-1 right-1 w-2 h-2 bg-yellow-400 rounded-full"
//                       />
//                       <div className="flex items-center justify-center mb-2">
//                         <motion.div
//                           animate={{ y: [0, -3, 0] }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                         >
//                           <Award className="w-5 h-5 text-yellow-300 mr-2" />
//                         </motion.div>
//                         <span className="font-bold text-2xl">{userStats.achievements}</span>
//                       </div>
//                       <span className="text-xs text-cyan-100 font-semibold">Achievements</span>
//                     </motion.div>
//                   </div>
//                 </div>
//               </div>
//             </motion.div>

//             <motion.div
//               initial={{ x: -50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.2 }}
//               whileHover={{ y: -5 }}
//               className="relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
//               <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
//                 <div className="flex items-center mb-8">
//                   <motion.div
//                     whileHover={{ rotate: 360 }}
//                     transition={{ duration: 0.5 }}
//                     className="p-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl mr-4 shadow-xl relative"
//                   >
//                     <Activity className="w-6 h-6 text-white" />
//                     <motion.div
//                       animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
//                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                       className="absolute inset-0 bg-emerald-400 rounded-2xl"
//                     />
//                   </motion.div>
//                   <h3 className="text-2xl font-black text-white">Analytics Hub</h3>
//                 </div>

//                 <div className="space-y-6">
//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-xl"
//                         >
//                           <FileText className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Total Notes</span>
//                           <p className="text-cyan-200 text-sm">Your creations</p>
//                         </div>
//                       </div>
//                       <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-cyan-400">
//                         {userStats.totalNotes}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           className="p-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl"
//                         >
//                           <Globe className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Public Notes</span>
//                           <p className="text-emerald-200 text-sm">Shared globally</p>
//                         </div>
//                       </div>
//                       <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-emerald-400">
//                         {userStats.publicNotes}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl"
//                         >
//                           <Lock className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Private Notes</span>
//                           <p className="text-purple-200 text-sm">Personal vault</p>
//                         </div>
//                       </div>
//                       <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-purple-400">
//                         {userStats.privateNotes}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-xl"
//                         >
//                           <Target className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Total Views</span>
//                           <p className="text-orange-200 text-sm">Engagement</p>
//                         </div>
//                       </div>
//                       <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-orange-400">
//                         {userStats.totalViews}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <div className="pt-6 border-t border-white/10">
//                     <motion.div
//                       whileHover={{ scale: 1.02 }}
//                       className="flex items-center justify-between p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10"
//                     >
//                       <div className="flex items-center space-x-3">
//                         <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
//                           <Calendar className="w-5 h-5 text-white" />
//                         </div>
//                         <span className="text-white font-bold">Member Since</span>
//                       </div>
//                       <span className="text-xl font-black text-indigo-400">{userStats.joinedDate}</span>
//                     </motion.div>
//                   </div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           animate={{ scale: [1, 1.1, 1] }}
//                           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                           className="p-3 bg-gradient-to-r from-rose-500 to-pink-600 rounded-2xl shadow-xl"
//                         >
//                           <Heart className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Total Likes</span>
//                           <p className="text-rose-200 text-sm">Community love</p>
//                         </div>
//                       </div>
//                       <motion.span
//                         whileHover={{ scale: 1.1 }}
//                         animate={{ color: ["#fb7185", "#f43f5e", "#fb7185"] }}
//                         transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                         className="text-4xl font-black"
//                       >
//                         {userStats.totalLikes}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           animate={{ y: [0, -2, 0] }}
//                           transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
//                           className="p-3 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-2xl shadow-xl"
//                         >
//                           <MessageCircle className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Comments</span>
//                           <p className="text-indigo-200 text-sm">Conversations</p>
//                         </div>
//                       </div>
//                       <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-indigo-400">
//                         {userStats.totalComments}
//                       </motion.span>
//                     </div>
//                   </motion.div>

//                   <motion.div whileHover={{ scale: 1.03, x: 8 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center justify-between p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 shadow-xl">
//                       <div className="flex items-center space-x-4">
//                         <motion.div
//                           whileHover={{ rotate: 15, scale: 1.1 }}
//                           animate={{ rotate: [0, 10, -10, 0] }}
//                           transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                           className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl"
//                         >
//                           <TrendingUp className="w-6 h-6 text-white" />
//                         </motion.div>
//                         <div>
//                           <span className="text-white font-bold text-lg">Weekly Growth</span>
//                           <p className="text-green-200 text-sm">Trending up</p>
//                         </div>
//                       </div>
//                       <div className="flex items-center space-x-2">
//                         <motion.span whileHover={{ scale: 1.1 }} className="text-4xl font-black text-green-400">
//                           +{userStats.weeklyGrowth}%
//                         </motion.span>
//                         <motion.div
//                           animate={{ y: [0, -3, 0] }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                         >
//                           <Zap className="w-6 h-6 text-yellow-400" />
//                         </motion.div>
//                       </div>
//                     </div>
//                   </motion.div>
//                 </div>
//               </div>
//             </motion.div>
//           </div>

//           <div className="xl:col-span-3">
//             <motion.div
//               initial={{ x: 50, opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               transition={{ delay: 0.3 }}
//               whileHover={{ y: -5 }}
//               className="relative group"
//             >
//               <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
//               <div className="relative bg-white/10 dark:bg-black/20 backdrop-blur-3xl rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-12">
//                 <div className="flex items-center justify-between mb-12">
//                   <div>
//                     <motion.h3
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       className="text-4xl font-black text-white mb-3"
//                     >
//                       Profile Settings
//                     </motion.h3>
//                     <motion.p
//                       initial={{ y: 20, opacity: 0 }}
//                       animate={{ y: 0, opacity: 1 }}
//                       transition={{ delay: 0.1 }}
//                       className="text-white/70 text-xl font-semibold"
//                     >
//                       Customize your digital presence
//                     </motion.p>
//                   </div>
//                   <motion.button
//                     whileHover={{ scale: 1.05, y: -3 }}
//                     whileTap={{ scale: 0.95 }}
//                     onClick={() => setIsEditing(!isEditing)}
//                     className="relative group"
//                   >
//                     <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                     <div className="relative flex items-center space-x-3 px-10 py-5 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 hover:from-cyan-400 hover:via-blue-400 hover:to-purple-500 text-white rounded-3xl shadow-2xl transition-all duration-500 border border-white/20">
//                       <Settings className="w-6 h-6" />
//                       <span className="font-black text-lg">{isEditing ? "Cancel" : "Edit Profile"}</span>
//                     </div>
//                   </motion.button>
//                 </div>

//                 <div className="space-y-12">
//                   <motion.div whileHover={{ scale: 1.01 }} className="relative group">
//                     <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//                     <div className="relative flex items-center space-x-12 p-10 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
//                       <div className="relative">
//                         <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="relative">
//                           <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white/20">
//                             {profileData.avatar ? (
//                               <img
//                                 src={profileData.avatar || "/placeholder.svg"}
//                                 alt="Avatar"
//                                 className="w-full h-full object-cover"
//                               />
//                             ) : (
//                               <User className="w-16 h-16 text-white" />
//                             )}
//                           </div>
//                           <motion.div
//                             animate={{ rotate: 360 }}
//                             transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                             className="absolute -inset-3 border-2 border-dashed border-cyan-400/30 rounded-3xl"
//                           />
//                         </motion.div>
//                         {isEditing && (
//                           <motion.label
//                             whileHover={{ scale: 1.15, rotate: 10 }}
//                             whileTap={{ scale: 0.9 }}
//                             initial={{ scale: 0 }}
//                             animate={{ scale: 1 }}
//                             className="absolute -bottom-3 -right-3 p-5 bg-gradient-to-r from-pink-500 via-rose-500 to-red-600 hover:from-pink-400 hover:via-rose-400 hover:to-red-500 text-white rounded-3xl cursor-pointer shadow-2xl transition-all duration-500 border-3 border-white/20"
//                           >
//                             <Camera className="w-6 h-6" />
//                             <input type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
//                           </motion.label>
//                         )}
//                       </div>
//                       <div className="flex-1">
//                         <h4 className="text-4xl font-black text-white mb-3">{profileData.username}</h4>
//                         <p className="text-white/70 text-xl mb-6">{profileData.email}</p>
//                         <div className="flex items-center space-x-6">
//                           <motion.div
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             className="flex items-center space-x-3 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-yellow-400/20"
//                           >
//                             <Crown className="w-5 h-5 text-yellow-400" />
//                             <span className="font-black text-yellow-400">Pro Member</span>
//                           </motion.div>
//                           <motion.div
//                             whileHover={{ scale: 1.05, y: -2 }}
//                             className="flex items-center space-x-3 bg-gradient-to-r from-emerald-500/20 to-green-500/20 backdrop-blur-sm px-6 py-3 rounded-2xl border border-emerald-400/20"
//                           >
//                             <Sparkles className="w-5 h-5 text-emerald-400" />
//                             <span className="font-black text-emerald-400">Active</span>
//                           </motion.div>
//                         </div>
//                       </div>
//                     </div>
//                   </motion.div>

//                   <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     <motion.div whileHover={{ scale: 1.02, y: -2 }}>
//                       <label className="block text-lg font-black text-white mb-4">Username</label>
//                       <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                         <User className="absolute left-6 top-1/2 transform -translate-y-1/2 text-cyan-400 w-6 h-6 z-10" />
//                         <input
//                           type="text"
//                           value={profileData.username}
//                           onChange={(e) => handleInputChange("username", e.target.value)}
//                           disabled={!isEditing}
//                           className="relative w-full pl-16 pr-6 py-6 border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-cyan-500/30 focus:border-cyan-400 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 disabled:bg-white/5 disabled:text-white/70 transition-all duration-500 shadow-2xl text-lg font-semibold"
//                         />
//                       </div>
//                     </motion.div>

//                     <motion.div whileHover={{ scale: 1.02, y: -2 }}>
//                       <label className="block text-lg font-black text-white mb-4">Email</label>
//                       <div className="relative group">
//                         <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                         <Mail className="absolute left-6 top-1/2 transform -translate-y-1/2 text-purple-400 w-6 h-6 z-10" />
//                         <input
//                           type="email"
//                           value={profileData.email}
//                           onChange={(e) => handleInputChange("email", e.target.value)}
//                           disabled={!isEditing}
//                           className="relative w-full pl-16 pr-6 py-6 border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-purple-500/30 focus:border-purple-400 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 disabled:bg-white/5 disabled:text-white/70 transition-all duration-500 shadow-2xl text-lg font-semibold"
//                         />
//                       </div>
//                     </motion.div>
//                   </div>

//                   {/* Password Section */}
//                   {isEditing && (
//                     <motion.div
//                       initial={{ opacity: 0, height: 0 }}
//                       animate={{ opacity: 1, height: "auto" }}
//                       exit={{ opacity: 0, height: 0 }}
//                       className="border-t-2 border-white/10 pt-12"
//                     >
//                       <div className="flex items-center mb-10">
//                         <motion.div
//                           whileHover={{ rotate: 360 }}
//                           transition={{ duration: 0.5 }}
//                           className="p-4 bg-gradient-to-r from-red-500 via-pink-500 to-rose-600 rounded-3xl mr-6 shadow-2xl"
//                         >
//                           <Shield className="w-8 h-8 text-white" />
//                         </motion.div>
//                         <h4 className="text-3xl font-black text-white">Security Settings</h4>
//                       </div>

//                       <div className="space-y-8">
//                         <motion.div whileHover={{ scale: 1.02, y: -2 }}>
//                           <label className="block text-lg font-black text-white mb-4">Current Password</label>
//                           <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                             <input
//                               type={showCurrentPassword ? "text" : "password"}
//                               value={profileData.currentPassword}
//                               onChange={(e) => handleInputChange("currentPassword", e.target.value)}
//                               placeholder="Enter current password"
//                               className="relative w-full pr-16 pl-6 py-6 border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-red-500/30 focus:border-red-400 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-500 shadow-2xl text-lg font-semibold"
//                             />
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               type="button"
//                               onClick={() => setShowCurrentPassword(!showCurrentPassword)}
//                               className="absolute right-6 top-1/2 transform -translate-y-1/2 text-red-400 hover:text-red-300 transition-colors"
//                             >
//                               {showCurrentPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
//                             </motion.button>
//                           </div>
//                         </motion.div>

//                         <motion.div whileHover={{ scale: 1.02, y: -2 }}>
//                           <label className="block text-lg font-black text-white mb-4">New Password</label>
//                           <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-green-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                             <input
//                               type={showNewPassword ? "text" : "password"}
//                               value={profileData.newPassword}
//                               onChange={(e) => handleInputChange("newPassword", e.target.value)}
//                               placeholder="Enter new password"
//                               className="relative w-full pr-16 pl-6 py-6 border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-emerald-500/30 focus:border-emerald-400 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-500 shadow-2xl text-lg font-semibold"
//                             />
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               type="button"
//                               onClick={() => setShowNewPassword(!showNewPassword)}
//                               className="absolute right-6 top-1/2 transform -translate-y-1/2 text-emerald-400 hover:text-emerald-300 transition-colors"
//                             >
//                               {showNewPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
//                             </motion.button>
//                           </div>
//                         </motion.div>

//                         <motion.div whileHover={{ scale: 1.02, y: -2 }}>
//                           <label className="block text-lg font-black text-white mb-4">Confirm New Password</label>
//                           <div className="relative group">
//                             <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
//                             <input
//                               type={showConfirmPassword ? "text" : "password"}
//                               value={profileData.confirmPassword}
//                               onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//                               placeholder="Confirm new password"
//                               className="relative w-full pr-16 pl-6 py-6 border-2 border-white/10 rounded-2xl focus:ring-4 focus:ring-blue-500/30 focus:border-blue-400 bg-white/5 backdrop-blur-sm text-white placeholder-white/50 transition-all duration-500 shadow-2xl text-lg font-semibold"
//                             />
//                             <motion.button
//                               whileHover={{ scale: 1.1 }}
//                               whileTap={{ scale: 0.9 }}
//                               type="button"
//                               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                               className="absolute right-6 top-1/2 transform -translate-y-1/2 text-blue-400 hover:text-blue-300 transition-colors"
//                             >
//                               {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
//                             </motion.button>
//                           </div>
//                         </motion.div>
//                       </div>
//                     </motion.div>
//                   )}

//                   {isEditing && (
//                     <motion.div
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="flex justify-end pt-12 border-t-2 border-white/10"
//                     >
//                       <motion.button
//                         whileHover={{ scale: 1.05, y: -5 }}
//                         whileTap={{ scale: 0.95 }}
//                         onClick={handleSaveProfile}
//                         className="relative group"
//                       >
//                         <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500"></div>
//                         <div className="relative flex items-center space-x-4 px-12 py-6 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:via-green-400 hover:to-emerald-500 text-white rounded-3xl shadow-2xl transition-all duration-500 font-black text-xl border-2 border-white/20">
//                           <Save className="w-7 h-7" />
//                           <span>Save Changes</span>
//                         </div>
//                       </motion.button>
//                     </motion.div>
//                   )}
//                 </div>
//               </div>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.div>
//   )
// }
