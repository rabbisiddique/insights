import { AnimatePresence, motion } from "framer-motion";
import { Archive, ChevronDown, Link, Tags } from "lucide-react";
import { useState } from "react";

const RightSideSettings = ({ formData, setFormData }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [tagInput, setTagInput] = useState("");

  const handleAddTag = () => {
    const tag = tagInput?.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
      }));
      setTagInput("");
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTag();
    }
  };

  const removeTag = (indexToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, index) => index !== indexToRemove),
    }));
  };

  const moodOptions = [
    { value: "happy", emoji: "😊" },
    { value: "over the moon", emoji: "🌙" },
    { value: "sad", emoji: "😢" },
    { value: "heartbreaking", emoji: "💔" },
    { value: "angry", emoji: "😡" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="lg:col-span-4 w-full space-y-4 sm:space-y-6"
      >
        {/* Settings Header */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 p-4 sm:p-5 rounded-xl">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
            Settings
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 shadow-2xl bg-white dark:bg-gray-900/50 p-3 sm:p-4 rounded-xl w-full border border-gray-200 dark:border-gray-700/50">
          {/* Mood Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700/50 p-4 sm:p-6"
          >
            <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Mood
            </label>
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full cursor-pointer px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 bg-white dark:bg-gray-800/80 focus:ring-blue-500 focus:border-blue-500 outline-none flex items-center justify-between text-left transition-all duration-200 text-gray-900 dark:text-gray-100"
              >
                <div className="flex items-center space-x-2">
                  {formData.mood ? (
                    <>
                      <span className="text-base sm:text-lg">
                        {
                          moodOptions.find((m) => m.value === formData.mood)
                            ?.emoji
                        }
                      </span>
                      <span className="font-medium text-sm sm:text-base">
                        {formData.mood}
                      </span>
                    </>
                  ) : (
                    <span className="font-medium text-sm sm:text-base text-gray-500 dark:text-gray-400">
                      Select Mood
                    </span>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-hidden"
                  >
                    {moodOptions.map((option, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            mood: option.value,
                          }));
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 text-left flex items-center space-x-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 first:rounded-t-lg last:rounded-b-lg transition-colors cursor-pointer text-gray-900 dark:text-gray-100"
                      >
                        <span className="text-base sm:text-lg">
                          {option.emoji}
                        </span>
                        <span className="font-medium text-sm sm:text-base">
                          {option.value}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Public Note Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border-2 p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
              formData.isPublic
                ? "border-green-300 dark:border-green-600/50 bg-green-50 dark:bg-green-900/20 shadow-green-100"
                : "border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isPublic: !prev.isPublic,
              }))
            }
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                animate={{
                  backgroundColor: formData.isPublic ? "#10b981" : "#9ca3af",
                  scale: formData.isPublic ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="p-2 sm:p-3 rounded-lg flex-shrink-0"
              >
                <Link className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm sm:text-base transition-colors ${
                    formData.isPublic
                      ? "text-green-900 dark:text-green-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Public Note
                </div>
                <div
                  className={`text-xs sm:text-sm transition-colors ${
                    formData.isPublic
                      ? "text-green-600 dark:text-green-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Make this note visible to others
                </div>
              </div>
            </div>
          </motion.div>

          {/* Archive Note Toggle */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className={`bg-white dark:bg-gray-800/50 rounded-xl shadow-sm border-2 p-4 sm:p-6 cursor-pointer transition-all duration-300 ${
              formData.isArchived
                ? "border-orange-300 dark:border-orange-600/50 bg-orange-50 dark:bg-orange-900/20 shadow-orange-100"
                : "border-gray-200 dark:border-gray-700/50 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                isArchived: !prev.isArchived,
              }))
            }
          >
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                animate={{
                  backgroundColor: formData.isArchived ? "#f97316" : "#9ca3af",
                  scale: formData.isArchived ? 1.1 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="p-2 sm:p-3 rounded-lg flex-shrink-0"
              >
                <Archive className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </motion.div>
              <div className="flex-1">
                <div
                  className={`font-semibold text-sm sm:text-base transition-colors ${
                    formData.isArchived
                      ? "text-orange-900 dark:text-orange-300"
                      : "text-gray-700 dark:text-gray-300"
                  }`}
                >
                  Archive Note
                </div>
                <div
                  className={`text-xs sm:text-sm transition-colors ${
                    formData.isArchived
                      ? "text-orange-600 dark:text-orange-400"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  Move to archived notes
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tags Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-900/50 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700/50"
        >
          <div className="flex items-center space-x-3 mb-0">
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 sm:p-5 w-full rounded-t-xl">
              <div className="text-lg sm:text-2xl font-bold flex items-center text-gray-900 dark:text-white">
                <Tags className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                Tags
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mb-0 p-3 sm:p-4">
            <motion.input
              whileFocus={{ scale: 1.01 }}
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800/80 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all duration-200 placeholder:text-gray-400 dark:placeholder:text-gray-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddTag}
              className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white cursor-pointer px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-md w-full sm:w-auto"
            >
              Add
            </motion.button>
          </div>

          <AnimatePresence>
            {formData.tags?.length === 0 ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-400 dark:text-gray-500 text-sm italic py-6"
              >
                No tags added yet
              </motion.p>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-wrap gap-2 p-3 sm:p-4"
              >
                {formData.tags.map((tag, index) => (
                  <motion.span
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    className="inline-flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 text-xs sm:text-sm rounded-lg font-medium shadow-sm border border-blue-200 dark:border-blue-700/50"
                  >
                    #{tag}
                    <motion.button
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeTag(index)}
                      className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 font-bold cursor-pointer text-base sm:text-lg"
                    >
                      ×
                    </motion.button>
                  </motion.span>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </>
  );
};

export default RightSideSettings;
