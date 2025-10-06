import { motion } from "framer-motion";
import { ArrowLeft, FileQuestion, Home, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 flex items-center justify-center px-4 py-8">
      <div className="max-w-4xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* 404 Illustration */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mb-8 md:mb-12"
          >
            {/* Background circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-64 h-64 md:w-96 md:h-96 rounded-full bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-900/30 dark:to-purple-900/30 blur-3xl"
              />
            </div>

            {/* 404 Number with creative design */}
            <div className="relative flex items-center justify-center gap-2 md:gap-4">
              <motion.div
                animate={{ rotate: [0, 5, 0, -5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="text-7xl md:text-9xl font-bold bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent"
              >
                4
              </motion.div>

              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <div className="w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-600 dark:to-purple-700 flex items-center justify-center shadow-2xl">
                  <FileQuestion className="w-10 h-10 md:w-16 md:h-16 text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{ rotate: [0, -5, 0, 5, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="text-7xl md:text-9xl font-bold bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-400 dark:to-purple-500 bg-clip-text text-transparent"
              >
                4
              </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/4 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 dark:from-pink-600 dark:to-rose-700 opacity-20 blur-xl"
            />
            <motion.div
              animate={{ y: [10, -10, 10], x: [5, -5, 5] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-0 right-1/4 w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-500 dark:from-blue-600 dark:to-cyan-700 opacity-20 blur-xl"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Oops! Page Not Found
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto px-4">
              The page you're looking for seems to have vanished into the
              digital void. Don't worry, even the best explorers get lost
              sometimes!
            </p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate("/")}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 dark:from-indigo-500 dark:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <Home className="w-4 h-4 md:w-5 md:h-5" />
              Back to Home
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-400 dark:hover:border-gray-600 px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
              Go Back
            </motion.button>
          </motion.div>

          {/* Additional Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-12 md:mt-16 p-4 md:p-6 bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl border-2 border-gray-200 dark:border-gray-800 max-w-2xl mx-auto"
          >
            <div className="flex items-start gap-3 md:gap-4 text-left">
              <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                <Search className="w-5 h-5 md:w-6 md:h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Looking for something specific?
                </h3>
                <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                  Try using the search feature or navigate back to the homepage
                  to find what you need.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Error Code */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-8 text-xs md:text-sm text-gray-400 dark:text-gray-600"
          >
            Error Code: 404 - Page Not Found
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}
