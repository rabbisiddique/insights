import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  ArrowLeft,
  Brain,
  ChevronDown,
  Edit3,
  Lightbulb,
  Link,
  MessageSquare,
  Smile,
  TagIcon,
  Tags,
  Wand2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    selectMood: "Happy",
    isPublic: false,
    isArchived: false,
    tags: [],
    tagInput: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // useEffect(() => {
  //   if (isEdit) {
  //     setFormData({
  //       title: data.title || "",
  //       content: data.content || "",
  //       selectMood: data.selectMood || "Happy",
  //       isPublic: data.isPublic || false,
  //       isArchived: data.isArchived || false,
  //       tags: data.tags || [],
  //     });
  //   }
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const navigate = useNavigate();
  const { noteId } = useParams();
  console.log(noteId);
  const isEdit = !!noteId;

  const moodOptions = [
    { value: "Happy", emoji: "😊" },
    { value: "Over the Moon", emoji: "🌙" },
    { value: "Sad", emoji: "😢" },
    { value: "Heartbreaking", emoji: "💔" },
  ];

  const handleAddTag = () => {
    const tag = formData.tagInput?.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: "",
      }));
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative"
    >
      <div className="max-w-6xl mx-auto mt-20 p-5 ">
        {/* Header */}
        <div className="w-full h-auto mb-[21px]  p-[20px] inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl -z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 "
          >
            <div className="flex justify-center items-center gap-5 max-xs:gap-2">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center space-x-2 text-black cursor-pointer hover:bg-[#ffffff47] dark:hover:bg-black w-auto h-[34px] p-[20px] rounded-2xl transition-all duration-500"
              >
                <ArrowLeft className="w-5 h-5 dark:text-[#eeeeeec2] max-xs:w-3 max-xs:h-3" />
                <span className="font-medium dark:text-[#eeeeeec2] max-xs:text-sm max-extra-xs:text-[10px]">
                  Back to Dashboard
                </span>
              </button>
              <div className="text-center lg:block hidden ">
                <h1 className="text-[46px] font-bold text-gray-900 mb-1 dark:text-white">
                  {isEdit ? "Update Your Note" : "Create New Note"}
                </h1>
                <p className="text-gray-500 dark:text-[#eeeeeec2]">
                  Capture your thoughts with AI-powered enhancements
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-2">
              <button
                className="flex gap-2 cursor-pointer rounded-sm font-bold text-sm items-center justify-center outline-none border-2 border-[#eee] bg-white dark:border-purple-900/20 dark:hover:border-[#eee] dark:bg-purple-900/20 hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:border-purple-300 py-2 px-3.5 transition duration-500 hover:rounded-sm"
                onClick={() => navigate(`/chat/${noteId}`)}
              >
                <MessageSquare className="w-5 h-5 mr-2 font-bold" />
                Chat with AI
                <Brain className="w-4 h-4 ml-2 font-bold" />
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
             text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl 
             transition-all duration-200 transform hover:scale-105 flex justify-center items-center gap-2.5 
             rounded-xl cursor-pointer max-xs:py-2 max-xs:px-4 max-xs:text-sm max-extra-xs:py-2 max-extra-xs:px-3 max-extra-xs:text-xs"
                onClick={handleSubmit}
              >
                <Edit3 className="w-4 h-4 max-xs:w-3 max-xs:h-3" />
                <span className="">
                  {isEdit ? "Update Note" : "Create Note"}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 ">
            {/* Left Side - Note Content */}

            <motion.div variants={itemVariants} className="lg:col-span-8">
              <form>
                <div className="bg-white  shadow-2xl rounded-xl border border-gray-200 dark:bg-[#00000000] dark:border-[#00000000]">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-5">
                    <div className="text-2xl font-bold flex items-center dark:text-white max-xs:text-lg">
                      <Wand2 className="w-6 h-6 mr-2 text-indigo-600 max-xs:w-3 max-xs:h-3" />
                      Note Content
                    </div>
                  </div>
                  <div className="p-4">
                    {/* Title */}

                    <div className="mb-8 ">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Title
                        </label>
                        <button
                          className={`${
                            !formData.title
                              ? "hidden"
                              : "cursor-pointer mb-2 inline-flex items-center h-8 justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground rounded-md px-3 text-sm transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 "
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sparkles w-4 h-4 mr-2 text-indigo-600"
                            aria-hidden="true"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                            <path d="M20 3v4"></path>
                            <path d="M22 5h-4"></path>
                            <path d="M4 17v2"></path>
                            <path d="M5 18H3"></path>
                          </svg>
                          Improve with AI
                        </button>
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter your note title..."
                        className="w-full px-2 py-2 border-2 border-blue-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all duration-200 text-lg"
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Content
                        </label>
                        <button
                          className={`${
                            !formData.content
                              ? "hidden"
                              : "cursor-pointer mb-2 inline-flex items-center justify-center gap-2 h-8 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:text-accent-foreground rounded-md px-3 text-sm transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 "
                          }`}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-sparkles w-4 h-4 mr-2 text-indigo-600"
                            aria-hidden="true"
                          >
                            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                            <path d="M20 3v4"></path>
                            <path d="M22 5h-4"></path>
                            <path d="M4 17v2"></path>
                            <path d="M5 18H3"></path>
                          </svg>
                          Improve with AI
                        </button>
                        {/* <button
                        className="inline-flex mb-2 items-center justify-center gap-2 whitespace-nowrap font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground h-8 rounded-md px-3 text-sm transition-all duration-200 text-green-600 bg-green-50 dark:bg-green-900/20"
                        disabled=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-zap w-4 h-4 mr-2 text-green-600"
                          aria-hidden="true"
                        >
                          <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                        </svg>
                        Improved ✓
                      </button> */}
                      </div>
                      <div className="relative">
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Write your note content here..."
                          rows={14}
                          className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-100 focus:border-blue-500 outline-none resize-none transition-all duration-200 text-base leading-relaxed"
                        />

                        {/* Bottom right icons */}
                        <div className="absolute bottom-4 right-4 flex items-center space-x-3">
                          <span className="text-sm text-gray-400 font-medium">
                            {formData.content?.length} characters
                          </span>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center cursor-pointer shadow-lg"
                          >
                            <div className="w-4 h-4 rounded-full bg-white"></div>
                          </motion.div>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center cursor-pointer shadow-lg"
                          >
                            <Smile className="w-4 h-4 text-white" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
              {/* AI Features */}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className=" mt-10"
              >
                <div className="rounded-lg shadow-2xl border-0 p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 backdrop-blur-xl">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center mb-6">
                      <Brain className="w-6 h-6 mr-2 text-purple-600" />
                      AI-Powered Features
                    </h2>
                  </div>
                  {formData.content ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button className="h-14 border-3 border-[#eee] rounded-lg dark:border-1 hover:bg-blue-50 dark:hover:border-blue-400 dark:border-blue-300 dark:hover:bg-blue-900/20 hover:border-blue-300 transition-all duration-500 flex gap-2 cursor-pointer font-bold text-sm items-center justify-center outline-none py-2 px-3.5 ">
                          {/* {aiLoading.summarize ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      )} */}
                          <Lightbulb className="w-5 h-5 mr-2 text-blue-600" />
                          Summarize Note
                        </button>
                        <button className="h-14 border-3 border-[#eee] dark:border-1 dark:border-green-300 rounded-lg transition-all duration-500 flex gap-2 cursor-pointer font-bold text-sm items-center justify-center outline-none py-2 px-3.5 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300">
                          {/* {aiLoading.suggestTags ? (
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    ) : (
                      )} */}
                          <TagIcon className="w-5 h-5 mr-2 text-green-600" />
                          Suggest Tags
                        </button>
                      </div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border-2 border-blue-200 dark:border-blue-700"
                      >
                        <h4 className="font-bold mb-3 text-blue-800 dark:text-blue-300 flex items-center">
                          <Lightbulb className="w-5 h-5 mr-2" />
                          {/* AI Summary: */}
                        </h4>
                        <p className="text-blue-700 dark:text-blue-200 leading-relaxed">
                          {/* {aiSummary} */}
                        </p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border-2 border-green-200 dark:border-green-700"
                      >
                        <h4 className="font-bold mb-3 text-green-800 dark:text-green-300 flex items-center">
                          <TagIcon className="w-5 h-5 mr-2" />
                          Suggested Tags:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {/* {suggestedTags.map((tag, index) => ( */}
                          <div
                            className="cursor-pointer hover:bg-green-200 dark:hover:bg-green-700 border-2 border-green-300 dark:border-green-600 px-3 py-1 text-sm font-medium transition-all duration-200 transform hover:scale-105"
                            // onClick={() => handleAddSuggestedTag(tag)}
                          >
                            + tags
                          </div>
                          {/* ))} */}
                        </div>
                      </motion.div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Settings */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-4 w-full space-y-6 dark:bg-[#00000000] "
            >
              {/* Settings Header */}
              <div className="bg-gradient-to-r   from-slate-50 to-gray-50 dark:from-slate-800/50 dark:to-gray-800/50 p-5">
                <h2 className="text-xl font-bold max-xs:text-lg">Settings</h2>
              </div>{" "}
              <div className="flex flex-col gap-5 shadow-2xl bg-white p-4 rounded-xl  w-full dark:bg-[#00000000]">
                {/* Mood Selection */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className=" bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-[#00000000]"
                >
                  <label className="block text-sm font-semibold text-gray-700 mb-4 dark:text-[#eee]">
                    Mood
                  </label>
                  <div className="relative">
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="w-full cursor-pointer px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 dark:bg-[#00000000] focus:ring-blue-500 focus:border-blue-500 outline-none bg-white flex items-center justify-between text-left transition-all duration-200 "
                    >
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {
                            moodOptions.find(
                              (mood) => mood.value === formData.selectMood
                            )?.emoji
                          }
                        </span>
                        <span className="font-medium">
                          {formData.selectMood}
                        </span>
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
                          className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-black"
                        >
                          {moodOptions.map((mood) => (
                            <motion.button
                              key={mood.value}
                              // whileHover={{ backgroundColor: "#f3f4f6" }}
                              onClick={() => {
                                setFormData((prev) => ({
                                  ...prev,
                                  selectMood: mood.value,
                                }));
                                setIsDropdownOpen(false);
                              }}
                              className="w-full px-4 py-3 text-left flex items-center space-x-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors dark:hover:bg-[#0a0a0a] cursor-pointer"
                            >
                              <span className="text-lg">{mood.emoji}</span>
                              <span className="font-medium">{mood.value}</span>
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
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-300 dark:bg-[#00000000] dark:border-[#00000000] ${
                    formData.isPublic
                      ? "border-green-300 bg-green-50 shadow-green-100"
                      : "border-gray-200 hover:border-gray-300 dark:border-[#333]"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isPublic: !prev.isPublic,
                    }))
                  }
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{
                        backgroundColor: formData.isPublic
                          ? "#10b981"
                          : "#9ca3af",
                        scale: formData.isPublic ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="p-3 rounded-lg"
                    >
                      <Link className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold transition-colors ${
                          formData.isPublic ? "text-green-900" : "text-gray-700"
                        }`}
                      >
                        Public Note
                      </div>
                      <div
                        className={`text-sm transition-colors ${
                          formData.isPublic ? "text-green-600" : "text-gray-500"
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
                  className={`bg-white rounded-xl shadow-sm border-2 p-6 cursor-pointer transition-all duration-300 dark:bg-[#00000000] dark:border-[#00000000] ${
                    formData.isArchived
                      ? "border-orange-300 bg-orange-50 shadow-orange-100"
                      : "border-gray-200 hover:border-gray-300 dark:border-[#333]"
                  }`}
                  onClick={() =>
                    setFormData((prev) => ({
                      ...prev,
                      isArchived: !prev.isArchived,
                    }))
                  }
                >
                  <div className="flex items-center space-x-4">
                    <motion.div
                      animate={{
                        backgroundColor: formData.isArchived
                          ? "#f97316"
                          : "#9ca3af",
                        scale: formData.isArchived ? 1.1 : 1,
                      }}
                      transition={{ duration: 0.2 }}
                      className="p-3 rounded-lg"
                    >
                      <Archive className="w-5 h-5 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <div
                        className={`font-semibold transition-colors ${
                          formData.isArchived
                            ? "text-orange-900"
                            : "text-gray-700"
                        }`}
                      >
                        Archive Note
                      </div>
                      <div
                        className={`text-sm transition-colors ${
                          formData.isArchived
                            ? "text-orange-600"
                            : "text-gray-500"
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
                className="bg-white rounded-xl shadow-2xl  border border-gray-200 dark:bg-[#00000000] dark:border-[#00000000]"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-r from-indigo-50  to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-5 w-full">
                    <div className="text-2xl font-bold flex items-center max-xs:text-lg">
                      <Tags className="w-6 h-6 mr-2 max-xs:w-3 max-xs:h-3 text-indigo-600" />
                      Tags
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 mb-0 p-4">
                  <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type="text"
                    name="tagInput"
                    value={formData.tagInput}
                    onChange={handleChange}
                    onKeyPress={handleKeyPress}
                    placeholder="Add a tag..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm transition-all duration-200"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAddTag}
                    className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white cursor-pointer px-4 py-2 rounded-lg  text-sm font-semibold transition-colors shadow-md"
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
                      className="text-center text-gray-400 text-sm italic py-6"
                    >
                      No tags added yet
                    </motion.p>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex flex-wrap gap-2 p-4"
                    >
                      {formData.tags.map((tag, index) => (
                        <motion.span
                          key={index}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ scale: 1.05 }}
                          className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-800 text-sm rounded-lg font-medium shadow-sm "
                        >
                          #{tag}
                          <motion.button
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeTag(index)}
                            className="ml-2 text-blue-600 hover:text-blue-800 font-bold cursor-pointer"
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateNote;
