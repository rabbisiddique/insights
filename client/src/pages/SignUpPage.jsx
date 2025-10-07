import { motion } from "framer-motion";
import "ldrs/react/Ring2.css";
import { ArrowRight, Eye, EyeOff, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useGetUserQuery, useSignUpMutation } from "../features/auth/authAPI";
import { useDarkMode } from "../hooks/useDarkMode";
import { useGoogle } from "../hooks/useGoogle";
import { showApiErrors } from "../utils/ShowApiError";
export default function SignUpPage() {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { theme, toggleTheme } = useDarkMode();
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [signUp, { isLoading, isError }] = useSignUpMutation();
  const { refetch } = useGetUserQuery();
  const { handleGoogleSubmit, isLoading: googleIsLoading } = useGoogle();
  const navigate = useNavigate();

  const handleNext = () => {
    if (email) {
      setStep(2);
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = { username, email, password };
      await signUp(payload).unwrap();
      await refetch();

      setTimeout(() => {
        navigate("/home");
        toast.success("Welcome to Note Wise!");
      }, 100);
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.log(error);

      showApiErrors(error, undefined, setStep);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-indigo-400/30 to-pink-400/30 rounded-full blur-3xl"
        />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-8"
        >
          <div className="flex justify-between items-center mb-6">
            <motion.h1
              whileHover={{ scale: 1.05 }}
              className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent"
            >
              NotesAI
            </motion.h1>
            <motion.button
              onClick={toggleTheme}
              className="p-3 rounded-xl bg-gray-100 cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
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
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Your intelligent note-taking companion
          </p>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-full mt-2 mx-auto max-w-32"
          />
        </motion.div>
        {/* Login Form */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-200/50 dark:border-gray-700/50"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-center space-x-2 mb-8">
              <motion.div
                className={`w-4 h-4 rounded-full ${
                  step >= 1
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-300"
                } transition-all shadow-lg`}
              />
              <motion.div
                className={`w-12 h-1 rounded-full ${
                  step >= 2
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-300"
                } transition-all origin-left`}
              />
              <motion.div
                className={`w-4 h-4 rounded-full ${
                  step >= 2
                    ? "bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-300"
                } transition-all shadow-lg`}
              />
            </div>

            {step === 1 && (
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="space-y-3 mb-6"
              >
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleGoogleSubmit}
                  className="w-full cursor-pointer bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-400 text-gray-700 dark:text-gray-300 py-3 rounded-xl font-medium flex items-center justify-center space-x-3 transition-all shadow-lg hover:shadow-xl"
                >
                  {googleIsLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-[#ff7373] border-t-transparent rounded-full animate-spin"></span>
                      <span>Continue with Google</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      <span>Continue with Google</span>
                    </>
                  )}
                </motion.button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium">
                      or continue with email
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Step */}
            <motion.div
              key="email-step"
              initial={{
                x: step === 1 ? 0 : -100,
                opacity: step === 1 ? 1 : 0,
              }}
              animate={{
                x: step === 1 ? 0 : -100,
                opacity: step === 1 ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              className={step === 1 ? "block" : "hidden"}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Username
                  </label>
                  <div className="relative mt-5">
                    <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <motion.input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                      placeholder="Enter your username"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />

                    <motion.input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600
                       rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white
                       dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!email || !username}
                  className="w-full cursor-pointer bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all shadow-lg hover:shadow-xl"
                >
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>

            {/* Password Step */}
            <motion.div
              key="password-step"
              initial={{ x: step === 2 ? 0 : 100, opacity: step === 2 ? 1 : 0 }}
              animate={{ x: step === 2 ? 0 : 100, opacity: step === 2 ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className={step === 2 ? "block" : "hidden"}
            >
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter current password"
                      className="w-full pr-12 pl-4 py-4 border-2 outline-none border-gray-200 dark:border-gray-600 rounded-xl focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white transition-all duration-300 shadow-sm"
                    />
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
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
                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep(1)}
                    className="flex-1 cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 py-4 rounded-xl font-semibold transition-all shadow-lg"
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={!password || isLoading}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl cursor-pointer"
                    onClick={handleSubmit}
                  >
                    <span className="flex justify-center items-center gap-2">
                      {isLoading ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                          signing...
                        </>
                      ) : (
                        "Sign Up"
                      )}
                    </span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
          <p className="relative z-10 mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-red-500 transition-colors duration-300 hover:text-red-600 hover:underline"
            >
              Sign In
            </Link>
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
