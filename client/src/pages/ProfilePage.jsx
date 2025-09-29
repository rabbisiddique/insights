import { format } from "date-fns";
import { motion } from "framer-motion";
import {
  BadgeAlert,
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
  Verified,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetUserQuery } from "../features/auth/authAPI";
import { useUpdateProfileMutation } from "../features/profile/profileAPI";
import { useAuth } from "../hooks/useAuth";
import { showApiErrors } from "../utils/ShowApiError";
import VerifyYourEmail from "./VerifyYourEmail";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user } = useAuth(true);
  const { refetch } = useGetUserQuery();

  const [updateProfile, { isLoading: updateLoading, isError }] =
    useUpdateProfileMutation();

  const [profileData, setProfileData] = useState({
    username: "",
    avatar: null,
    currentPassword: "",
    newPassword: "",
  });
  const [userStats] = useState({
    totalNotes: 24,
    publicNotes: 8,
    privateNotes: 16,
    joinedDate: "January 2024",
    streak: 12,
    achievements: 5,
    totalViews: 1247,
  });
  console.log(user);

  useEffect(() => {
    if (user) {
      setProfileData({
        username: user.username || "",
        avatar: user.avatar || null,
        currentPassword: "",
        newPassword: "",
      });
    } else {
      // clear everything if no user
      setProfileData({
        username: "",
        avatar: null,
        currentPassword: "",
        newPassword: "",
      });
    }
  }, [user?._id, user, user?.avatar, user?.username]);

  const handleInputChange = (field, value) => {
    setProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (e.g., 5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size should be less than 5MB");
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData((prev) => ({
          ...prev,
          avatar: e.target.result, // This is the base64 preview
        }));
      };
      reader.onerror = () => {
        toast.error("Error reading file");
      };
      reader.readAsDataURL(file);
    }
  };

  const getAvatarSrc = () => {
    if (profileData.avatar) return profileData.avatar;
    if (user?.avatar && user.avatar.trim() !== "") return user.avatar;
    return "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80";
  };

  const clearAvatarPreview = () => {
    setProfileData((prev) => ({
      ...prev,
      avatar: null,
    }));
  };

  const handleSaveProfile = async () => {
    const payload = {};
    if (profileData.username) payload.username = profileData.username;
    if (profileData.currentPassword)
      payload.currentPassword = profileData.currentPassword;
    if (profileData.newPassword) payload.newPassword = profileData.newPassword;
    if (profileData.avatar) payload.avatar = profileData.avatar;
    try {
      await updateProfile(payload).unwrap();
      toast.success("Profile updated, Please take a refresh");
      await refetch();
      setProfileData({
        username: "",
        avatar: "",
        currentPassword: "",
        newPassword: "",
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);

      showApiErrors(error);
    }
  };

  const date = new Date(user?.createdAt);
  const formattedDate = format(date, "MMM dd, yyy");

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
                  <div className="flex  items-center space-x-4 ">
                    <div className="w-16 h-16 max-xs:w-12 max-xs:h-12 max-xs:rounded-full bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden border border-white/30">
                      {user ? (
                        <img
                          src={getAvatarSrc()}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-8 h-8 text-white max-xs:w-6 max-xs:h-6" />
                      )}
                    </div>
                    <div className="">
                      <h3 className="text-xl font-bold max-xs:text-sm">
                        {user?.username}
                      </h3>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-gray-200 dark:text-blue-400 max-xs:text-sm">
                          {!user?.verified ? (
                            <div className="font-bold flex justify-center items-center gap-1">
                              <BadgeAlert className="w-4 h-4 max-xs:w-3 max-xs:h-3 font-bold" />
                              <span>Unverified</span>
                            </div>
                          ) : (
                            <div className="font-bold flex justify-center items-center gap-1">
                              <Verified className="w-4 h-4 max-xs:w-3 max-xs:h-3 " />
                              <span className="">Verified</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
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
                        {formattedDate}
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
                        {getAvatarSrc() !==
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80" ? (
                          <div className="relative w-full h-full">
                            <img
                              src={getAvatarSrc()}
                              alt="Avatar"
                              className="w-full h-full object-cover"
                            />
                            {/* Show clear button if there's a preview */}
                            {profileData.avatar && isEditing && (
                              <button
                                onClick={clearAvatarPreview}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                              >
                                ×
                              </button>
                            )}
                          </div>
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
                        {user?.username}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-400 text-lg max-xs:text-sm">
                        {user?.email}
                      </p>
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm text-blue-600 dark:text-blue-400 max-xs:text-sm">
                          {!user?.verified ? (
                            <div className="font-bold flex justify-center items-center gap-1">
                              <BadgeAlert className="w-4 h-4 max-xs:w-3 max-xs:h-3 font-bold" />
                              <span>Unverified</span>
                            </div>
                          ) : (
                            <div className="font-bold flex justify-center items-center gap-1">
                              <Verified className="w-4 h-4 max-xs:w-3 max-xs:h-3 " />
                              <span className="">Verified</span>
                            </div>
                          )}
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
                          disabled={true}
                          className="w-full pl-12 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                          placeholder={user?.username}
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
                          disabled={true}
                          className="w-full pl-12 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                          placeholder={user?.email}
                        />
                      </div>
                    </div>
                    <VerifyYourEmail user={user} />
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
                            Username
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              value={profileData.username}
                              onChange={(e) =>
                                handleInputChange("username", e.target.value)
                              }
                              placeholder="Enter your username"
                              className="w-full pl-6 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                            Current Password
                          </label>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={profileData.currentPassword}
                              onChange={(e) =>
                                handleInputChange(
                                  "currentPassword",
                                  e.target.value
                                )
                              }
                              placeholder="Current password"
                              className="w-full pl-6 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
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
                              className="w-full pl-6 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
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
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSaveProfile}
                        disabled={updateLoading}
                        className=" disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed cursor-pointer flex items-center space-x-3 px-8 py-4 max-xs:px-6 max-xs:py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-xl transition-all duration-300 font-bold"
                      >
                        {updateLoading ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                            <span> save changing...</span>
                          </>
                        ) : (
                          <>
                            <Save className="w-5 h-5" />
                            <span>Save Changes</span>{" "}
                          </>
                        )}
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
