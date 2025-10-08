import { motion } from "framer-motion";
import {
  BadgeAlert,
  BookOpen,
  Bot,
  Globe,
  LogOut,
  Menu,
  PenTool,
  User,
  Verified,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  authApi,
  useGetUserQuery,
  useSignOutMutation,
} from "../features/auth/authAPI";
import { profileApi } from "../features/profile/profileAPI";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";
import Logo from "./Logo";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signOut] = useSignOutMutation();
  const { refetch } = useGetUserQuery();
  const { user, isLoading } = useAuth(true);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      await new Promise((resolve) => setTimeout(resolve, 100));
      dispatch(authApi.util.resetApiState());
      dispatch(profileApi.util.resetApiState());
      toast.success("Logged out successfully!");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout error:", error);
      dispatch(authApi.util.resetApiState());
      dispatch(profileApi.util.resetApiState());
      toast.error(error?.data?.message || "Logout failed");
      navigate("/login", { replace: true });
    }
  };

  const { theme, toggleTheme } = useDarkMode();

  const navigation = [
    { name: "Dashboard", href: "/home", icon: BookOpen },
    { name: "New Note", href: "/notes/new", icon: PenTool },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Public Notes", href: "/public-notes", icon: Globe },
    { name: "Smart Note", href: "/chat/maker", icon: Bot },
  ];

  if (isLoading) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl shadow-xl border-b border-slate-200/50 dark:border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Enhanced Logo */}
          <Link
            to="/home"
            className="relative flex items-center gap-3 group cursor-pointer px-3 py-2 rounded-2xl transition-all duration-500 hover:scale-105"
          >
            {/* Ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-700"></div>

            {/* Logo container */}
            <Logo />

            {/* Enhanced text */}
            <span className="relative hidden md:block text-3xl sm:text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 dark:from-white dark:via-slate-100 dark:to-white bg-clip-text text-transparent group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 dark:group-hover:from-blue-400 dark:group-hover:via-purple-400 dark:group-hover:to-pink-400 transition-all duration-500">
                NotesWise
              </span>
              {/* Animated underline */}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 group-hover:w-full transition-all duration-500 rounded-full shadow-lg shadow-purple-500/50"></span>
            </span>
          </Link>

          {/* Desktop Navigation - Enhanced */}
          <div className="hidden md:flex items-center gap-2">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 overflow-hidden group ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-500/30"
                      : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800/50"
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  )}
                  <Icon
                    className={`w-4 h-4 relative z-10 ${
                      isActive ? "animate-pulse" : "group-hover:scale-110"
                    } transition-transform duration-300`}
                  />
                  <span className="relative z-10">{item.name}</span>
                  {!isActive && (
                    <span className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Controls - Enhanced */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Redesigned */}
            <motion.button
              onClick={toggleTheme}
              className="relative p-3 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden group border border-slate-300/50 dark:border-slate-700/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div
                className="relative z-10"
                animate={{ rotate: theme === "light" ? 0 : 180 }}
                transition={{ duration: 0.5 }}
              >
                {theme === "light" ? (
                  <svg
                    className="w-5 h-5 text-yellow-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-slate-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </motion.div>
            </motion.button>

            {/* Avatar - Enhanced */}
            <div className="flex items-center gap-3">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full opacity-75 group-hover:opacity-100 blur group-hover:blur-md transition-all duration-300 animate-pulse"></div>
                <div className="relative w-12 h-12 p-[2px] rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <img
                    className="w-full h-full object-cover rounded-full cursor-pointer"
                    onClick={() => navigate("/profile")}
                    src={
                      user?.avatar ||
                      "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
                    }
                    alt="avatar"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white dark:bg-slate-900 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 shadow-lg">
                  {user?.verified ? (
                    <Verified className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
                  ) : (
                    <BadgeAlert className="w-3.5 h-3.5 text-red-500 animate-pulse" />
                  )}
                </div>
              </div>

              {/* Logout Button - Enhanced */}
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-slate-700 dark:text-slate-300 hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 transition-all duration-300 hover:shadow-lg hover:shadow-red-500/30 hover:scale-105 group"
              >
                <LogOut className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                <span>Logout</span>
              </button>
            </div>

            {/* Mobile Menu Button - Enhanced */}
            <button
              className="md:hidden p-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <motion.div
                initial={false}
                animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                )}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation - Enhanced */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
        >
          <div className="py-4 space-y-2 bg-gradient-to-b from-transparent to-slate-50/50 dark:to-slate-900/50">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:translate-x-1"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 ${isActive ? "animate-pulse" : ""}`}
                  />
                  <span>{item.name}</span>
                </Link>
              );
            })}
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-all duration-300 hover:translate-x-1"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
