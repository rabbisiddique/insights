import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useGetNoteQuery } from "../features/notes/notesAPI";
import { useAuth } from "../hooks/useAuth";
import { useMood } from "../hooks/useMood";

const NoteReadPage = () => {
  const navigate = useNavigate();
  const { noteId } = useParams();

  const { data: noteData, isLoading, error } = useGetNoteQuery(noteId);
  console.log(noteData);
  const { getMoodIcon } = useMood();
  const { user } = useAuth(true);
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-indigo-950 dark:to-purple-950">
        <div className="text-center">
          <ClipLoader size={50} color="#6366f1" />
          <p className="mt-4 text-gray-600 dark:text-gray-300 font-medium">
            Loading your note...
          </p>
        </div>
      </div>
    );
  }

  if (error || !noteData?.getNote) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-red-50 to-pink-50 dark:from-gray-900 dark:to-red-950">
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600 dark:text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Note Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            We couldn't load this note. It may have been deleted or you don't
            have access.
          </p>
          <button
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-200"
            onClick={() => navigate("/home")}
          >
            Back to Notes
          </button>
        </div>
      </div>
    );
  }

  const note = noteData?.getNote;
  const currentUserId = user?._id; // Assuming user object has _id
  const isOwnNote = noteData?.getNote?.user?._id === currentUserId;
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-950 dark:via-indigo-950 dark:to-purple-950">
      {/* Floating Header */}
      <motion.div
        className="sticky top-0 z-30 backdrop-blur-xl bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <motion.button
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-all duration-200 font-medium"
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/home")}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span className="hidden sm:inline">All Notes</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Hero Section */}
          <div className="relative mb-8 overflow-hidden rounded-3xl bg-gradient-to-br from-white to-indigo-50/50 dark:from-gray-900 dark:to-indigo-950/50 border border-indigo-100 dark:border-indigo-900/30 shadow-2xl">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 dark:from-indigo-600/10 dark:to-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 sm:w-80 h-64 sm:h-80 bg-gradient-to-tr from-pink-400/20 to-orange-400/20 dark:from-pink-600/10 dark:to-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative p-6 sm:p-8 lg:p-12">
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 sm:mb-8 leading-tight">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {note?.title}
                </span>
              </h1>

              {/* Metadata Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
                {/* Created Card */}
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-indigo-100 dark:border-gray-700">
                  <div className="p-2 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                    <svg
                      className="w-4 h-4 text-indigo-600 dark:text-indigo-400"
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
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Created
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(note?.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Updated Card */}
                <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-emerald-100 dark:border-gray-700">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <svg
                      className="w-4 h-4 text-emerald-600 dark:text-emerald-400"
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
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      Updated
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatDate(note?.updatedAt)}
                    </span>
                  </div>
                </div>

                {/* Public/Private & Mood/Archived Cards */}

                <div className="flex flex-col sm:flex-row sm:justify-around gap-3">
                  <span
                    className={`px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 ${
                      note?.isPublic
                        ? "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
                        : "bg-gradient-to-r from-gray-700 to-gray-800 text-white"
                    }`}
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      {note?.isPublic ? (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      ) : (
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      )}
                    </svg>
                    {note?.isPublic ? "Public" : "Private"}
                  </span>
                  {note?.mood && (
                    <div className="flex items-center gap-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-3 border border-pink-100 dark:border-gray-700">
                      <div className="flex flex-col">
                        <span
                          className={`text-sm font-semibold text-gray-900 dark:text-white flex justify-center items-center gap-2 w-30`}
                        >
                          {getMoodIcon(note.mood)}
                          {note.mood}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Archived */}
                  <div className="flex items-center justify-center">
                    <span
                      className={`px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center gap-2 ${
                        note?.isArchived
                          ? "bg-gradient-to-r from-gray-500 to-gray-700 text-white"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 text-white"
                      }`}
                    >
                      {note?.isArchived ? "Archived" : "Active"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              {note?.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {note.tags.map((tag, index) => (
                    <motion.span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 dark:from-indigo-500/20 dark:to-purple-500/20 backdrop-blur-sm border border-indigo-200/50 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-semibold cursor-pointer hover:scale-105 hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      whileHover={{ y: -2 }}
                    >
                      #{tag}
                    </motion.span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content & Summary */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 lg:p-12 shadow-xl border border-gray-200 dark:border-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="prose prose-sm sm:prose-lg lg:prose-xl dark:prose-invert max-w-full">
              {/* Content */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full"></div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
                    Content
                  </h2>
                </div>
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-4 sm:p-6 border border-indigo-100 dark:border-indigo-900/30">
                  <p className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-wrap m-0">
                    {note?.content}
                  </p>
                </div>
              </div>

              {/* Summary */}
              {note?.summary && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full"></div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white m-0">
                      Summary
                    </h2>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 rounded-xl p-4 sm:p-6 border border-blue-100 dark:border-blue-900/30">
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed m-0">
                      {note.summary}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {isOwnNote ? (
              <button
                onClick={() => navigate(`/chat/${note._id}`)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Chat with AI
              </button>
            ) : (
              <div className="w-full max-w-md mx-auto p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700 text-center text-sm text-blue-700 dark:text-blue-300">
                This is a public note. You can only chat with AI about your own
                notes.
              </div>
            )}
          </motion.div>
        </motion.article>
      </div>
    </div>
  );
};

export default NoteReadPage;
