import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  BookOpen,
  BookOpenCheck,
  Calendar,
  ChevronDown,
  Globe,
  Search,
  Tag,
} from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPublicNotesQuery } from "../features/notes/notesAPI";
import { useMood } from "../hooks/useMood";

export default function PublicNotes() {
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("Created Date");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Created Date");
  const [page, setPage] = useState(1);
  const { searchQuery: searchParam } = useParams();
  const searchQuery = searchParam ? decodeURIComponent(searchParam) : "";
  const { getMoodIcon } = useMood();
  const { data: filteredData, isLoading } = useGetPublicNotesQuery({
    title: searchQuery,
    tags: searchQuery,
    page,
    limit: 6,
  });

  const options = ["Created Date", "Title", "Modified Date"];

  const handleSearchInput = (e) => {
    const value = e.target.value;
    navigate(
      value ? `/public-notes/${encodeURIComponent(value)}` : "/public-notes"
    );
    setPage(1);
  };

  const getMoodColor = (mood) => {
    switch (mood?.toLowerCase()) {
      case "happy":
        return "bg-gradient-to-r from-yellow-50 to-amber-100 text-amber-800 border border-amber-200 dark:from-yellow-950 dark:to-amber-900 dark:text-amber-100";
      case "over the moon":
        return "bg-gradient-to-r from-pink-50 to-rose-100 text-rose-800 border border-rose-200 dark:from-pink-950 dark:to-rose-900 dark:text-rose-100";
      case "sad":
        return "bg-gradient-to-r from-blue-50 to-sky-100 text-sky-800 border border-sky-200 dark:from-blue-950 dark:to-sky-900 dark:text-sky-100";
      case "heartbreaking":
        return "bg-gradient-to-r from-red-50 to-rose-100 text-red-800 border border-red-200 dark:from-red-950 dark:to-rose-900 dark:text-red-100";
      case "angry":
        return "bg-gradient-to-r from-orange-50 to-red-100 text-orange-800 border border-orange-200 dark:from-orange-950 dark:to-red-900 dark:text-orange-100";
      default:
        return "bg-gradient-to-r from-gray-50 to-slate-100 text-slate-800 border border-slate-200 dark:from-gray-950 dark:to-slate-900 dark:text-slate-100";
    }
  };

  const filteredNotes = (filteredData?.notes || []).filter((note) => {
    const search = searchQuery.toLowerCase();
    const matchesTitle = note.title.toLowerCase().includes(search);
    const matchesContent = note.content.toLowerCase().includes(search);
    const matchesTags = note.tags?.some((tag) =>
      tag.toLowerCase().includes(search)
    );
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

  const handlePageChange = (selectedItem) => {
    setPage(selectedItem.selected + 1);
  };

  const pageCount = filteredData?.totalPages || 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-950">
      <div className="max-w-6xl mx-auto mt-20 p-5">
        {/* Header */}
        <div className="w-full h-auto mb-10 p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Globe className="w-10 h-10 text-white" />
            </div>

            <h1 className="text-5xl max-xs:text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Discover Public Notes
            </h1>

            <p className="text-slate-600 dark:text-slate-300 text-lg max-w-2xl mx-auto mb-6">
              Explore thoughts, ideas, and stories shared by our community
            </p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/70 dark:bg-white/5 backdrop-blur-md rounded-full border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <Globe className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span className="text-base font-semibold text-slate-700 dark:text-slate-200">
                Total Public Notes:
              </span>
              <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                {filteredData?.count || 0}
              </span>
            </motion.div>
          </motion.div>
        </div>

        {/* Search and Filter */}
        <motion.div
          className="flex gap-4 mb-6 bg-white dark:bg-gray-800 p-5 rounded-xl shadow-lg max-xs:flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search public notes..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={handleSearchInput}
            />
          </div>

          <div className="relative">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setOpen(!open)}
              className="w-48 max-xs:w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 flex items-center justify-between text-sm font-medium dark:text-white cursor-pointer"
            >
              {selected}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  open ? "rotate-180" : ""
                }`}
              />
            </motion.button>

            <AnimatePresence>
              {open && (
                <motion.ul
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                >
                  {options.map((opt) => (
                    <li
                      key={opt}
                      onClick={() => {
                        setSortBy(opt);
                        setSelected(opt);
                        setOpen(false);
                      }}
                      className="px-4 py-2 cursor-pointer text-sm hover:bg-purple-50 dark:hover:bg-purple-900/20 dark:text-white"
                    >
                      {opt}
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Notes Grid */}
        <AnimatePresence mode="wait">
          {sortedNotes.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {sortedNotes.map((note, index) => (
                <motion.div
                  key={note._id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700">
                      <Globe className="w-3 h-3" />
                      Public
                    </span>
                  </div>

                  <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3 line-clamp-2">
                    {note.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                    {note.content}
                  </p>

                  <span
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium mb-4 ${getMoodColor(
                      note.mood
                    )}`}
                  >
                    {getMoodIcon(note.mood)}
                    {note.mood}
                  </span>

                  {note.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {note.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="border-t border-gray-100 dark:border-gray-700 pt-4 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="relative w-7 h-7 rounded-full overflow-hidden ring-2 ring-blue-500/20 hover:ring-blue-500/40 shadow-md transition-all duration-300"
                      >
                        <img
                          src={
                            note?.user?.avatar && note.user.avatar.trim() !== ""
                              ? note.user.avatar
                              : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80"
                          }
                          alt="avatar"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src =
                              "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_incoming&w=740&q=80";
                          }}
                        />
                      </motion.div>

                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {note?.user?.username || "Anonymous"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4" />
                      {format(new Date(note.createdAt), "MMM dd, yyyy")}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate(`/read/${note._id}`)}
                    className="w-full mt-4 flex items-center cursor-pointer justify-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2.5 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-200"
                  >
                    <BookOpenCheck className="w-4 h-4" />
                    Read Full Note
                  </motion.button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-16 text-center"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                No public notes found
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-lg">
                Try adjusting your search or check back later
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {pageCount > 1 && (
          <ReactPaginate
            breakLabel={
              <span className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                ...
              </span>
            }
            nextLabel={
              <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200">
                <span>Next</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            }
            previousLabel={
              <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200">
                <svg
                  className="w-4 h-4"
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
                <span>Previous</span>
              </div>
            }
            onPageChange={handlePageChange}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            containerClassName="flex flex-wrap items-center justify-center gap-2 mt-8"
            pageLinkClassName="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200"
            activeLinkClassName="!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !border-transparent !shadow-lg !scale-105"
            disabledClassName="opacity-50 cursor-not-allowed"
            breakLinkClassName="flex items-center justify-center w-12 h-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
          />
        )}
      </div>
    </div>
  );
}
