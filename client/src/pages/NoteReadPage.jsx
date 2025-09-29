import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetNoteQuery } from "../features/notes/notesAPI";

const NoteReadPage = () => {
  const [showAIPanel, setShowAIPanel] = useState(false);
  const navigate = useNavigate();
  const { noteId } = useParams();

  const { data: noteData, isLoading, error } = useGetNoteQuery(noteId);
  console.log("noteId:", noteId);
  console.log("note:", noteData);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={30} color="#4f46e5" />
      </div>
    );
  }

  if (error || !noteData?.getNote) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 text-lg mb-4">Failed to load note.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => navigate("/home")}
        >
          Back to Notes
        </button>
      </div>
    );
  }

  const note = noteData?.getNote;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const aiSuggestions = [
    { icon: "✨", text: "Improve writing" },
    { icon: "📝", text: "Summarize" },
    { icon: "🏷️", text: "Generate tags" },
    { icon: "🔍", text: "Find insights" },
  ];

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
        {/* Sticky Actions Bar */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 mt-20">
          <div className="bg-gradient-to-r mb-8 from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl  dark:bg-gray-900/80  border-gray-200/50 dark:border-gray-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              {note && (
                <div key={note?._id}>
                  <div className="flex flex-col gap-6">
                    {/* Buttons Section */}
                    <div className="flex items-center justify-between">
                      <motion.button
                        className="flex items-center px-3 py-2 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200"
                        whileHover={{ x: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate("/home")}
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                        <span className="hidden sm:inline">Back to Notes</span>
                        <span className="sm:hidden">Back</span>
                      </motion.button>

                      <div className="flex items-center space-x-2 sm:space-x-3">
                        {/* Ask AI Button */}
                        <motion.button
                          className="flex items-center px-4 cursor-pointer py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                          whileHover={{ scale: 1.02, y: -1 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => navigate(`/chat/${note?._id}`)}
                        >
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                          <span className="hidden sm:inline">Ask AI</span>
                          <span className="sm:hidden">AI</span>
                        </motion.button>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1">
                          <motion.button
                            className="p-2 text-gray-600 cursor-pointer dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </motion.button>

                          <motion.button
                            className="p-2 text-gray-600 cursor-pointer dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-200"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </motion.button>

                          <motion.button
                            onClick={() => setShowAIPanel(!showAIPanel)}
                            className={`p-2 rounded-xl transition-all cursor-pointer duration-200 ${
                              showAIPanel
                                ? "text-purple-600 bg-purple-50 dark:text-purple-400 dark:bg-purple-900/20"
                                : "text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="flex-1 min-w-0">
                        {/* Title Section */}
                        <motion.div
                          className="relative mb-8 p-8 lg:p-12 rounded-3xl bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-800 dark:via-gray-800 dark:to-gray-900 border border-blue-100/50 dark:border-gray-700/50"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="absolute inset-0 overflow-hidden rounded-3xl">
                            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200 to-purple-200 dark:from-blue-800 dark:to-purple-800 rounded-full opacity-20"></div>
                            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-tr from-indigo-200 to-pink-200 dark:from-indigo-800 dark:to-pink-800 rounded-full opacity-20"></div>
                          </div>

                          <div className="relative z-10">
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                              {note?.title}
                            </h1>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm">
                                <svg
                                  className="w-4 h-4 mr-2 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                  />
                                </svg>
                                <span>{formatDate(note?.createdAt)}</span>
                              </div>

                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm">
                                <svg
                                  className="w-4 h-4 mr-2 text-green-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                  />
                                </svg>
                                <span>{formatDate(note?.updatedAt)}</span>
                              </div>

                              <div className="flex items-center text-sm bg-white/50 dark:bg-gray-800/50 rounded-xl p-3 backdrop-blur-sm">
                                <svg
                                  className="w-4 h-4 mr-2 text-purple-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                  />
                                </svg>
                                <span className="text-gray-600 dark:text-gray-300">
                                  {note?.readingTime} min read
                                </span>
                              </div>

                              <div className="flex items-center">
                                <span
                                  className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center ${
                                    note?.isPublic
                                      ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-white"
                                  }`}
                                >
                                  {note?.isPublic ? "Public" : "Private"}
                                </span>
                              </div>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2">
                              {note?.tags?.map((tag, index) => (
                                <motion.span
                                  key={index}
                                  className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-sm font-medium border border-blue-200/50 dark:border-blue-700/50 hover:scale-105 transition-all duration-200 cursor-pointer backdrop-blur-sm"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{
                                    delay: index * 0.1,
                                    duration: 0.3,
                                  }}
                                  whileHover={{
                                    y: -2,
                                    boxShadow:
                                      "0 8px 25px rgba(59, 130, 246, 0.15)",
                                  }}
                                >
                                  #{tag}
                                </motion.span>
                              ))}
                            </div>

                            {/* Content */}
                            <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mt-6">
                              <p className="bg-[#ff202017] dark:bg-transparent rounded-lg font-medium p-5">
                                {note?.content}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* AI Helper Panel - Fixed Overlay */}
              <AnimatePresence mode="wait">
                {showAIPanel && (
                  <>
                    {/* Backdrop */}
                    <motion.div
                      className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                      initial={{ opacity: 0 }}
                      exit={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      onClick={() => setShowAIPanel(false)}
                    />

                    {/* AI Panel */}
                    <motion.div
                      className="fixed top-16 right-0 h-full w-full max-w-sm bg-white dark:bg-gray-800 shadow-2xl z-50 overflow-y-auto"
                      initial={{ x: "100%" }}
                      animate={{
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 30,
                        },
                      }}
                      exit={{
                        x: "100%",
                        transition: {
                          duration: 0.2,
                          ease: "easeIn",
                        },
                      }}
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                            <svg
                              className="w-5 h-5 mr-2 text-purple-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            AI Assistant
                          </h3>
                          <button
                            onClick={() => setShowAIPanel(false)}
                            className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </div>

                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                          Get AI-powered help with your note
                        </p>

                        <div className="space-y-3 mb-6">
                          {aiSuggestions.map((suggestion, index) => (
                            <button
                              key={index}
                              className="w-full flex items-center p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors duration-150 text-left"
                            >
                              <span className="text-lg mr-3">
                                {suggestion.icon}
                              </span>
                              <span className="text-sm font-medium text-gray-900 dark:text-white">
                                {suggestion.text}
                              </span>
                            </button>
                          ))}
                        </div>

                        <div className="border-t border-gray-200 dark:border-gray-600 pt-6">
                          <button
                            className="w-full flex items-center cursor-pointer justify-center px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors duration-150 "
                            onClick={() => navigate(`/chat/${note._id}`)}
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                              />
                            </svg>
                            Open Chat
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteReadPage;
