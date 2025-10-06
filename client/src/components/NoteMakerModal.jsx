import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import Loader from "./Loader";

const NoteMakerModal = ({
  showNoteMaker,
  aiNoteMaker,
  aiLoading,
  setShowNoteMaker,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mood, setIsMood] = useState("");
  const [aiLoadingSuggestions, setAiLoadingSuggestions] = useState(false);
  const [aiLoadingCreate, setAiLoadingCreate] = useState(false);
  const [noteMakerStep, setNoteMakerStep] = useState(1);
  const [noteTopic, setNoteTopic] = useState("");
  const [noteSuggestions, setNoteSuggestions] = useState(null);
  const [noteIsPublic, setNoteIsPublic] = useState(false);

  const moodOptions = [
    { value: "happy", emoji: "😊", color: "from-yellow-400 to-orange-400" },
    {
      value: "over the moon",
      emoji: "🌙",
      color: "from-blue-400 to-purple-400",
    },
    { value: "sad", emoji: "😢", color: "from-blue-500 to-indigo-500" },
    { value: "heartbreaking", emoji: "💔", color: "from-red-400 to-pink-500" },
    { value: "angry", emoji: "😡", color: "from-red-500 to-orange-600" },
  ];

  const resetNoteMaker = () => {
    setShowNoteMaker(false);
    setNoteMakerStep(1);
    setNoteTopic("");
    setNoteSuggestions(null);
    setNoteIsPublic(false);
  };

  const handleGetSuggestions = async () => {
    if (!noteTopic.trim()) return;
    setAiLoadingSuggestions(true);
    try {
      const response = await aiNoteMaker({
        topic: noteTopic.trim(),
        confirmed: false,
        mood: mood,
      }).unwrap();

      if (response.type === "suggestions") {
        setNoteSuggestions(response.suggestions);
        setNoteIsPublic(response.suggestions.isPublic || false);
        setNoteMakerStep(2);
      }
    } catch (error) {
      console.error("Error getting suggestions:", error);
      toast.error("Failed to get suggestions. Please try again.");
    } finally {
      setAiLoadingSuggestions(false);
    }
  };

  const handleCreateNote = async (quick = false) => {
    setAiLoadingCreate(true);
    try {
      const response = await aiNoteMaker({
        topic: noteTopic.trim(),
        confirmed: true,
        isPublic: noteIsPublic,
        mood,
        quick,
      }).unwrap();

      if (response.type === "note" && response.note) {
        window.location.href = "/home";
      }
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Failed to create note. Please try again.");
    } finally {
      setAiLoadingCreate(false);
    }
  };

  return (
    <>
      {" "}
      <AnimatePresence>
        {showNoteMaker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={resetNoteMaker}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl rounded-3xl shadow-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto border border-white/20"
              onClick={(e) => e.stopPropagation()}
            >
              {noteMakerStep === 1 && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-white" />
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Quick Create Note
                      </h2>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetNoteMaker}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
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
                    </motion.button>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      What's on your mind?
                    </label>
                    <textarea
                      value={noteTopic}
                      onChange={(e) => setNoteTopic(e.target.value)}
                      placeholder="E.g., 'Machine learning basics', 'Recipe for chocolate cake'..."
                      className="w-full px-5 py-4 border-2 border-gray-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 resize-none focus:outline-none transition-all"
                      rows="4"
                      disabled={aiLoading}
                    />
                  </div>

                  <div className="flex flex-col md:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={resetNoteMaker}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetSuggestions}
                      disabled={!noteTopic.trim() || aiLoadingSuggestions}
                      className={`flex-1 px-6 py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        noteTopic.trim() && !aiLoadingSuggestions
                          ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {aiLoadingSuggestions ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5" />
                          <span>Get Suggestions</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCreateNote(true)}
                      disabled={!noteTopic.trim() || aiLoadingCreate}
                      className={`px-6 py-3 rounded-2xl font-semibold transition-all flex justify-center items-center ${
                        noteTopic.trim() && !aiLoadingCreate
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {aiLoadingCreate ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Creating...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 ">
                          <Zap className="w-4 h-4" />
                          Quick Create
                        </div>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}

              {noteMakerStep === 2 && noteSuggestions && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Review & Create
                    </h2>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={resetNoteMaker}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
                    >
                      <svg
                        className="w-6 h-6"
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
                    </motion.button>
                  </div>

                  <div className="space-y-5">
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200 dark:border-purple-800">
                      <label className="block text-sm font-semibold text-purple-700 dark:text-purple-300 mb-2">
                        Your Topic
                      </label>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {noteTopic}
                      </p>
                    </div>

                    <div className="p-5 bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-indigo-900/20 dark:to-blue-900/20 rounded-2xl border border-indigo-200 dark:border-indigo-800">
                      <label className="block text-sm font-semibold text-indigo-700 dark:text-indigo-300 mb-2">
                        Suggested Title
                      </label>
                      <p className="text-gray-900 dark:text-white font-bold text-lg">
                        {noteSuggestions?.titles || "Untitled Note"}
                      </p>
                    </div>

                    {noteSuggestions.tags &&
                      noteSuggestions.tags.length > 0 && (
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                            Suggested Tags
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {noteSuggestions.tags.map((tag, index) => (
                              <motion.span
                                key={index}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.1 }}
                                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-medium shadow-md"
                              >
                                {tag}
                              </motion.span>
                            ))}
                          </div>
                        </div>
                      )}

                    {noteSuggestions?.summary && (
                      <div className="p-5 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                          Suggested Summary
                        </label>
                        <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          {noteSuggestions.summary}
                        </p>
                      </div>
                    )}

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="p-5 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700"
                    >
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                        Mood
                      </label>
                      <div className="relative">
                        <motion.button
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                          className="w-full px-5 py-4 border-2 border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-900 flex items-center justify-between text-left transition-all"
                        >
                          <div className="flex items-center gap-3">
                            {mood ? (
                              <>
                                <span className="text-2xl">
                                  {
                                    moodOptions.find((m) => m.value === mood)
                                      ?.emoji
                                  }
                                </span>
                                <span className="font-semibold capitalize">
                                  {mood}
                                </span>
                              </>
                            ) : (
                              <span className="font-medium text-gray-500">
                                Select Mood
                              </span>
                            )}
                          </div>
                          <motion.div
                            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown className="w-5 h-5 text-gray-400" />
                          </motion.div>
                        </motion.button>

                        <AnimatePresence>
                          {isDropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -10, scale: 0.95 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.95 }}
                              transition={{ duration: 0.2 }}
                              className="absolute z-20 w-full mt-2 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl overflow-hidden"
                            >
                              {moodOptions.map((option, index) => (
                                <motion.button
                                  key={option.value}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{
                                    backgroundColor: "rgba(168, 85, 247, 0.1)",
                                  }}
                                  onClick={() => {
                                    setIsMood(option.value);
                                    setIsDropdownOpen(false);
                                  }}
                                  className="w-full px-5 py-4 text-left flex items-center gap-3 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-0"
                                >
                                  <span className="text-2xl">
                                    {option.emoji}
                                  </span>
                                  <span className="font-semibold capitalize">
                                    {option.value}
                                  </span>
                                </motion.button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.div>

                    <label className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-800 cursor-pointer hover:from-blue-100 hover:to-indigo-100 dark:hover:from-blue-900/30 dark:hover:to-indigo-900/30 transition-all">
                      <span className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <svg
                          className="w-5 h-5 text-blue-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Make this note public
                      </span>
                      <input
                        type="checkbox"
                        checked={noteIsPublic}
                        onChange={(e) => setNoteIsPublic(e.target.checked)}
                        className="checkbox"
                      />
                    </label>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mt-8 w-full">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setNoteMakerStep(1)}
                      disabled={aiLoading}
                      className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-2xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all font-medium"
                    >
                      ← Back
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleCreateNote(false)}
                      disabled={aiLoadingCreate}
                      className={`flex-1 w-full sm:w-auto px-6 py-3 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 ${
                        !aiLoadingCreate
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg hover:shadow-xl"
                          : "bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {aiLoadingCreate ? (
                        <Loader text={"Creating..."} />
                      ) : (
                        <>
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
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>Create Note</span>
                        </>
                      )}
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NoteMakerModal;
