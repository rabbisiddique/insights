import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  BadgePlus,
  Brain,
  Edit3,
  MessageSquare,
  Wand2,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AiFeatures from "../components/AiFeatures";
import Loader from "../components/Loader";
import RightSideSettings from "../components/RightSideSettings";
import { useImproveWritingMutation } from "../features/ai/aiAPI";
import {
  useCreateNoteCardMutation,
  useGetNoteQuery,
  useUpdateNoteMutation,
} from "../features/notes/notesAPI";
import { showApiErrors } from "../utils/ShowApiError";

const CreateNote = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
    isPublic: false,
    isArchived: false,
    mood: "",
    summary: "",
  });
  const [isImprovedTitle, setIsImprovedTitle] = useState(false);
  const [isImprovedContent, setIsImprovedContent] = useState(false);
  const [isTitleDirty, setIsTitleDirty] = useState(false);
  const [isContentDirty, setIsContentDirty] = useState(false);
  const [isSummarizeDirty, setIsSummarizeDirty] = useState(false);
  const [isSuggestDirty, setIsSuggestDirty] = useState(false);

  const [createNoteCard, { isLoading: createIsLoading }] =
    useCreateNoteCardMutation();
  const [updateNote, { isLoading: updateIsLoading }] = useUpdateNoteMutation();

  const [improveWriting] = useImproveWritingMutation();
  const [improveTitleLoading, setImproveTitleLoading] = useState(false);
  const [improveContentLoading, setImproveContentLoading] = useState(false);
  const [summary, setSummary] = useState();
  const navigate = useNavigate();
  const { noteId } = useParams();
  const isEdit = noteId !== undefined && noteId !== "new";

  const { data: singleNoteData, isLoading: singleNoteLoading } =
    useGetNoteQuery(noteId, {
      skip: !isEdit || !noteId,
    });

  useEffect(() => {
    if (isEdit && singleNoteData?.getNote && !singleNoteLoading) {
      const note = singleNoteData.getNote;
      setFormData({
        title: note.title || "",
        content: note.content || "",
        mood: note.mood || "",
        tags: note.tags || [],
        isPublic: note.isPublic || false,
        isArchived: note.isArchived || false,
        summary: note.summary || "",
      });
    }
  }, [isEdit, singleNoteData, singleNoteLoading]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...formData };
      if (isEdit) {
        await updateNote({ noteId, formData: payload }).unwrap();
        toast.success("Note updated!");
      } else {
        await createNoteCard(payload).unwrap();
        toast.success("Note created!");
      }
      setFormData({
        title: "",
        content: "",
        tags: [],
        isPublic: false,
        isArchived: false,
        mood: "",
        summary: "",
      });
      navigate("/home");
    } catch (error) {
      showApiErrors(error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "title") setIsTitleDirty(true);
    if (name === "content") setIsContentDirty(true);
    if (isEdit && (name === "title" || name === "content")) {
      setIsSummarizeDirty(true);
      setIsSuggestDirty(true);
    }
  };

  const handleImproveTitle = async () => {
    setImproveTitleLoading(true);
    try {
      const res = await improveWriting({
        noteId,
        title: formData.title,
      }).unwrap();
      setFormData((prev) => ({ ...prev, title: res.note.title }));
      toast.success("Title improved successfully!");
      setIsImprovedTitle(true);
      setIsTitleDirty(false);
    } catch (error) {
      showApiErrors(error);
    } finally {
      setImproveTitleLoading(false);
    }
  };

  const handleImproveContent = async () => {
    setImproveContentLoading(true);
    try {
      const res = await improveWriting({
        noteId,
        content: formData.content,
      }).unwrap();
      setFormData((prev) => ({ ...prev, content: res.note.content }));
      toast.success("Content improved successfully!");
      setIsImprovedContent(true);
      setIsContentDirty(false);
    } catch (error) {
      showApiErrors(error);
    } finally {
      setImproveContentLoading(false);
    }
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
      className="relative min-h-screen"
    >
      <div className="max-w-6xl mx-auto mt-8 md:mt-20 p-3 sm:p-5">
        {/* Header */}
        <div className="w-full h-auto sm:mt-0 mt-15 mb-6 md:mb-[21px] p-4 sm:p-[20px] bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-2xl md:rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 md:mb-8"
          >
            <div className="flex flex-col sm:flex-row justify-start items-start sm:items-center gap-3 sm:gap-5 w-full md:w-auto">
              <button
                onClick={() => navigate("/home")}
                className="flex items-center space-x-2 text-gray-900 dark:text-gray-100 cursor-pointer hover:bg-white/30 dark:hover:bg-white/10 w-auto h-[34px] px-3 sm:px-5 rounded-xl transition-all duration-300"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="font-medium text-xs sm:text-sm">
                  Back to Dashboard
                </span>
              </button>
              <div className="text-left lg:block hidden">
                <h1 className="text-2xl lg:text-[46px] font-bold text-gray-900 dark:text-white mb-1">
                  {isEdit ? "Update Your Note" : "Create New Note"}
                </h1>
                <p className="text-sm lg:text-base text-gray-600 dark:text-gray-300">
                  Capture your thoughts with AI-powered enhancements
                </p>
              </div>
            </div>

            <div className="flex justify-start sm:justify-center items-center gap-2 w-full md:w-auto flex-wrap">
              <button
                className="flex gap-1 sm:gap-2 cursor-pointer rounded-lg font-bold text-xs sm:text-sm items-center justify-center outline-none border-2 border-gray-200 bg-white dark:border-purple-700/40 dark:bg-purple-900/30 hover:bg-purple-50 dark:hover:bg-purple-900/50 hover:border-purple-300 dark:hover:border-purple-600 py-2 px-2 sm:px-3.5 transition duration-300"
                onClick={() =>
                  navigate(isEdit ? `/chat/${noteId}` : "/chat/maker")
                }
              >
                <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 dark:text-purple-300" />
                <span className="hidden sm:inline dark:text-purple-100">
                  Chat with AI
                </span>
                <Brain className="w-3 h-3 sm:w-4 sm:h-4 dark:text-purple-300" />
              </button>
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
                  text-white px-4 sm:px-8 py-2 sm:py-3 text-xs sm:text-lg font-semibold shadow-lg hover:shadow-xl 
                  transition-all duration-200 transform hover:scale-105 flex justify-center items-center gap-2 
                  rounded-xl cursor-pointer disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed"
                disabled={createIsLoading || updateIsLoading}
                onClick={handleFormSubmit}
              >
                {createIsLoading ? (
                  <Loader text={"Creating..."} />
                ) : updateIsLoading ? (
                  <Loader text={"Updating..."} />
                ) : isEdit ? (
                  <>
                    <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base">Update Note</span>
                  </>
                ) : (
                  <>
                    <BadgePlus className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-xs sm:text-base">Create Note</span>
                  </>
                )}
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-8">
            {/* Left Side - Note Content */}
            <motion.div variants={itemVariants} className="lg:col-span-8">
              <form>
                <div className="bg-white dark:bg-gray-900/50 shadow-2xl rounded-xl border border-gray-200 dark:border-gray-700/50">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/30 dark:to-purple-900/30 p-4 sm:p-5 rounded-t-xl">
                    <div className="text-xl sm:text-2xl font-bold flex items-center text-gray-900 dark:text-white">
                      <Wand2 className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-indigo-600 dark:text-indigo-400" />
                      Note Content
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    {/* Title */}
                    <div className="mb-6 sm:mb-8">
                      <div className="flex items-center justify-between">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Title
                        </label>
                        <div className="h-10 flex items-center">
                          <AnimatePresence>
                            {formData.title && (
                              <motion.button
                                type="button"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                onClick={handleImproveTitle}
                                disabled={
                                  improveTitleLoading ||
                                  !isTitleDirty ||
                                  !formData?.title?.trim()
                                }
                                className={`mb-2 inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                                  !isTitleDirty
                                    ? "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400"
                                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:text-indigo-300"
                                } disabled:cursor-not-allowed cursor-pointer`}
                              >
                                {improveTitleLoading ? (
                                  <>
                                    <Loader
                                      text=" Improving..."
                                      color="text-blue-600 dark:text-blue-400"
                                    />
                                  </>
                                ) : !isTitleDirty ? (
                                  <>
                                    <span>Improved ✓</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Improve with AI</span>
                                  </>
                                )}
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter your note title..."
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-blue-300 dark:border-blue-600/50 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-500 dark:focus:border-blue-500 outline-none transition-all duration-200 text-base sm:text-lg placeholder:text-gray-400 dark:placeholder:text-gray-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center">
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                          Content
                        </label>
                        <div className="h-10 flex items-center">
                          <AnimatePresence>
                            {formData.content && (
                              <motion.button
                                type="button"
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                transition={{
                                  duration: 0.3,
                                  ease: "easeInOut",
                                }}
                                onClick={handleImproveContent}
                                disabled={
                                  improveContentLoading ||
                                  !isContentDirty ||
                                  !formData?.content?.trim()
                                }
                                className={`mb-2 inline-flex h-8 items-center justify-center gap-2 rounded-md px-3 text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 ${
                                  !isContentDirty
                                    ? "text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400"
                                    : "hover:bg-indigo-50 dark:hover:bg-indigo-900/30 dark:text-indigo-300"
                                } disabled:cursor-not-allowed cursor-pointer`}
                              >
                                {improveContentLoading ? (
                                  <>
                                    <Loader
                                      text=" Improving..."
                                      color="text-blue-600 dark:text-blue-400"
                                    />
                                  </>
                                ) : !isContentDirty ? (
                                  <>
                                    <span>Improved ✓</span>
                                  </>
                                ) : (
                                  <>
                                    <span>Improve with AI</span>
                                  </>
                                )}
                              </motion.button>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                      <div className="relative">
                        <textarea
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          placeholder="Write your note content here..."
                          rows={10}
                          className="w-full px-3 sm:px-4 py-3 sm:py-4 border border-gray-300 dark:border-gray-600/50 bg-white dark:bg-gray-800/50 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900/50 focus:border-blue-500 dark:focus:border-blue-500 outline-none resize-none transition-all duration-200 text-sm sm:text-base leading-relaxed placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 flex items-center space-x-2 sm:space-x-3">
                          <span className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 font-medium">
                            {formData.content?.length} characters
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              {/* AI Features */}
              <AiFeatures
                noteId={noteId}
                formData={formData}
                setFormData={setFormData}
                setSummary={setSummary}
                setIsSummarizeDirty={setIsSummarizeDirty}
                setIsSuggestDirty={setIsSuggestDirty}
                isEdit={isEdit}
                isSummarizeDirty={isSummarizeDirty}
                isSuggestDirty={isSuggestDirty}
                summary={summary}
              />
            </motion.div>

            {/* Right Side - Settings */}
            <RightSideSettings formData={formData} setFormData={setFormData} />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CreateNote;
