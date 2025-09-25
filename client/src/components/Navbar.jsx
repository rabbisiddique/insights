import { motion } from "framer-motion";
import {
  BookOpen,
  BookOpenCheck,
  Bot,
  LogOut,
  Menu,
  PenTool,
  Sparkles,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useGetUserQuery, useSignOutMutation } from "../features/auth/authAPI";
import { useAuth } from "../hooks/useAuth";
import { useDarkMode } from "../hooks/useDarkMode";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [signOut] = useSignOutMutation();
  const { refetch } = useGetUserQuery();
  const { user, isLoading } = useAuth(true);

  const handleLogout = async () => {
    try {
      await signOut().unwrap(); // unwrap to catch errors
      await refetch();
      navigate("/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error(error?.data?.errors || "Logout failed");
    }
  };

  const { theme, toggleTheme } = useDarkMode();

  const navigation = [
    { name: "Dashboard", href: "/home", icon: BookOpen },
    { name: "New Note", href: "/notes/new", icon: PenTool },
    { name: "Profile", href: "/profile", icon: User },
    { name: "Chat", href: "/chat", icon: Bot },
  ];

  if (isLoading) return null;

  return (
    <div className=" bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/30">
      {/* Navigation Header (fixed for robust behavior) */}
      <nav className="fixed top-0 left-0 right-0 z-60 w-full bg-white/80 dark:bg-slate-800/80 dark:shadow-2xl backdrop-blur-xl shadow-lg border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link
                to="/home"
                className="flex items-center space-x-3 group cursor-pointer"
              >
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-200">
                    <BookOpenCheck className="w-6 h-6 max-xs:w-4 max-xs:h-4 text-white" />
                  </div>
                  <Sparkles className="w-3 h-3 text-yellow-400 absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </div>
                <span className="text-2xl max-xs:text-lg font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  NotesWise
                </span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300 shadow-lg"
                        : "text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side controls */}
            <div className="flex items-center space-x-3">
              <motion.button
                onClick={toggleTheme}
                className="p-3 rounded-xl cursor-pointer dark:bg-gray-800 bg-gray-200  transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ rotate: theme === "light" ? 180 : 0 }}
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
                      className="w-5 h-5 text-gray-600"
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
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-11 w-11 rounded-full ring-2 object-cover ring-indigo-500/20 hover:ring-indigo-500/40  transition-all duration-200">
                    <img
                      className="w-full h-full object-cover rounded-full"
                      src={
                        user?.avatar ||
                        "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
                      }
                      alt="avatar"
                    />
                    {/* <div className="bg-gradient-to-br from-indigo-600 to-purple-700 text-white text-sm font-semibold">
                      {user?.username}
                    </div> */}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                </div>

                <button
                  onClick={handleLogout}
                  className="hidden md:flex items-center space-x-2 hover:bg-gray-50   hover:text-indigo-700  hover:shadow-lg w-full h-[40px] p-[16px] font-semibold cursor-pointer rounded-lg transition-all duration-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                variant="ghost"
                size="sm"
                className="md:hidden p-2 rounded-xl"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isMobileMenuOpen ? (
                    <X className="w-5 h-5" />
                  ) : (
                    <Menu className="w-5 h-5" />
                  )}
                </motion.div>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              height: isMobileMenuOpen ? "auto" : 0,
            }}
            transition={{ duration: 0.3 }}
            className="md:hidden border-t border-slate-200/50 dark:border-slate-700/50 overflow-hidden"
          >
            <div className="py-4 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 text-indigo-700 dark:text-indigo-300"
                        : "text-slate-600 dark:text-slate-300 hover:bg-slate-100/50 dark:hover:bg-slate-700/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left transition-all duration-200"
              >
                {/* <LogOut className="w-5 h-5" /> */}
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
