import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  BookOpen,
  BookOpenCheck,
  Bot,
  CalendarDays,
  Download,
  Globe,
  Lock,
  Pencil,
  PenTool,
  Sparkles,
  Tag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useArchive } from "../hooks/useArchive";
import { useMood } from "../hooks/useMood";
import Dialog from "./Dialog";

const NotesCard = ({ filteredData, sortBy, activeTab, searchQuery }) => {
  const { handleArchive } = useArchive();
  const navigate = useNavigate();
  const { getMoodIcon } = useMood();

  const getMoodColor = (mood) => {
    switch (mood?.toLowerCase()) {
      case "happy":
        return "bg-gradient-to-r from-yellow-50 to-amber-100 text-amber-800 border border-amber-200 dark:from-yellow-950 dark:to-amber-900 dark:text-amber-100 dark:border-amber-800";
      case "over the moon":
        return "bg-gradient-to-r from-pink-50 to-rose-100 text-rose-800 border border-rose-200 dark:from-pink-950 dark:to-rose-900 dark:text-rose-100 dark:border-rose-800";
      case "sad":
        return "bg-gradient-to-r from-blue-50 to-sky-100 text-sky-800 border border-sky-200 dark:from-blue-950 dark:to-sky-900 dark:text-sky-100 dark:border-sky-800";
      case "heartbreaking":
        return "bg-gradient-to-r from-red-50 to-rose-100 text-red-800 border border-red-200 dark:from-red-950 dark:to-rose-900 dark:text-red-100 dark:border-red-800";
      case "angry":
        return "bg-gradient-to-r from-orange-50 to-red-100 text-orange-800 border border-orange-200 dark:from-orange-950 dark:to-red-900 dark:text-orange-100 dark:border-orange-800";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-100 text-slate-800 border border-slate-200 dark:from-gray-950 dark:to-slate-900 dark:text-slate-100 dark:border-slate-800";
    }
  };

  const formattedDate = (date) => {
    return format(new Date(date), "MMM dd, yyy");
  };

  const filteredNotes = (filteredData?.docs || []).filter((note) => {
    const search = searchQuery.toLowerCase();
    const matchesTitle = note.title.toLowerCase().includes(search);
    const matchesContent = note.content.toLowerCase().includes(search);
    const matchesTags = note.tags.some((tag) =>
      tag.toLowerCase().includes(search)
    );

    if (activeTab === "All Notes")
      return (
        (matchesTitle || matchesContent || matchesTags) && !note.isArchived
      );
    if (activeTab === "Private")
      return (
        (matchesTitle || matchesContent || matchesTags) &&
        !note.isPublic &&
        !note.isArchived
      );
    if (activeTab === "Public")
      return (
        (matchesTitle || matchesContent || matchesTags) &&
        note.isPublic &&
        !note.isArchived
      );
    if (activeTab === "Archived") return note.isArchived;

    return matchesTitle || matchesContent || matchesTags;
  });

  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "Created Date")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "Modified Date")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sortBy === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  return (
    <>
      <AnimatePresence mode="wait">
        {sortedNotes.length > 0 ? (
          <motion.div
            key={activeTab}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {sortedNotes.map((note, index) => (
              <motion.div
                key={note._id}
                className="group relative bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl p-4 md:p-6 border-2 border-gray-200 dark:border-gray-800 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
              >
                {/* Title */}
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-base md:text-lg mb-3 truncate">
                  {note.title}
                </h3>

                {/* Mood & Privacy */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${getMoodColor(
                      note.mood
                    )}`}
                  >
                    {getMoodIcon(note.mood)}
                    <span className="hidden sm:inline">{note.mood}</span>
                  </span>
                  <span
                    className={`inline-flex items-center gap-1 md:gap-1.5 px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium border ${
                      note.isPublic
                        ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800"
                        : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {note.isPublic ? (
                      <>
                        <Globe className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Public</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-3 h-3 md:w-3.5 md:h-3.5" />
                        <span className="hidden sm:inline">Private</span>
                      </>
                    )}
                  </span>
                </div>

                {/* Content */}
                <p className="text-gray-600 dark:text-gray-400 text-xs md:text-sm mb-4 line-clamp-3 leading-relaxed">
                  {note.content}
                </p>

                {/* Tags */}
                {note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4">
                    {note.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700"
                      >
                        <Tag className="w-2.5 h-2.5 md:w-3 md:h-3" />
                        {tag}
                      </span>
                    ))}
                    {note.tags.length > 3 && (
                      <span className="inline-flex items-center px-2 md:px-2.5 py-0.5 md:py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                        +{note.tags.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Date */}
                <div className="flex items-center text-xs md:text-sm text-gray-500 dark:text-gray-500 mb-3">
                  <CalendarDays className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1.5 md:mr-2" />
                  {formattedDate(note?.createdAt)}
                </div>

                {/* Action buttons */}
                <motion.div className="flex justify-between items-center pt-3 border-t border-gray-200 dark:border-gray-800 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-all duration-200">
                  <div className="flex items-center gap-1">
                    <button
                      className="flex justify-center items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                      onClick={() => navigate(`/notes/${note._id}`)}
                    >
                      <div className="tooltip" data-tip="Edit">
                        <Pencil size={14} />
                      </div>
                    </button>
                    <button
                      className="flex justify-center items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                      onClick={() => navigate(`/chat/${note._id}`)}
                    >
                      <div className="tooltip" data-tip="Chat">
                        <Bot size={14} />
                      </div>
                    </button>
                    <button
                      className="flex justify-center items-center p-2 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200 transition-all duration-200"
                      onClick={() => {
                        const noteText = `Title: ${note.title}\nContent: ${
                          note.content
                        }\nTags: ${note.tags.join(", ")}\nMood: ${
                          note.mood
                        }\nPrivacy: ${
                          note.isPublic ? "Public" : "Private"
                        }\nCreated At: ${new Date(
                          note.createdAt
                        ).toLocaleString()}\nUpdated At: ${new Date(
                          note.updatedAt
                        ).toLocaleString()}`;
                        const blob = new Blob([noteText], {
                          type: "text/plain",
                        });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = `${note.title.replace(
                          /\s+/g,
                          "_"
                        )}.txt`;
                        link.click();
                        URL.revokeObjectURL(url);
                      }}
                    >
                      <div className="tooltip" data-tip="Download">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                    </button>
                  </div>

                  <div className="flex items-center gap-1">
                    <span
                      className="tooltip p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-200 cursor-pointer"
                      onClick={() => navigate(`/read/${note._id}`)}
                      data-tip="Read"
                    >
                      <BookOpenCheck size={14} />
                    </span>
                    <span
                      className="tooltip p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-all duration-200 cursor-pointer"
                      data-tip={note.isArchived ? "Unarchive" : "Archive"}
                      onClick={() => handleArchive(note._id, note)}
                    >
                      <Archive className="w-4 h-4" />
                    </span>
                    <Dialog deleteId={note._id} type="single" />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="shadow-2xl dark:shadow-2xl dark:shadow-purple-500/5 border-2 border-gray-200 dark:border-gray-800 rounded-2xl md:rounded-3xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-gray-950 p-6 md:p-12 text-center"
          >
            <div className="py-8 md:py-16">
              <div className="relative mb-6 md:mb-8 inline-block">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                  <BookOpen className="w-10 h-10 md:w-12 md:h-12 text-indigo-600 dark:text-indigo-400" />
                </div>
                <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-purple-500 dark:text-purple-400 absolute -top-1 -right-1 md:-top-2 md:-right-2" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3">
                No notes found
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base lg:text-lg mb-6 md:mb-8">
                Start by creating your first AI-powered note
              </p>
              <button
                className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 dark:from-indigo-500 dark:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 text-white px-6 md:px-8 py-3 md:py-3.5 text-sm md:text-base lg:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
                onClick={() => navigate("/notes/new")}
              >
                <PenTool className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Create Your First Note
                <Sparkles className="w-3 h-3 md:w-4 md:h-4 ml-2" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NotesCard;
