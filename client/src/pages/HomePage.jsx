import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import {
  Archive,
  BookOpen,
  BookOpenCheck,
  Bot,
  CalendarDays,
  ChevronDown,
  Download,
  FileKey,
  Frown,
  Heart,
  Lock,
  Meh,
  Pencil,
  PenTool,
  Smile,
  Sparkles,
  Tag,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../components/Dialog";
import { useGetFilteredNotesQuery } from "../features/notes/notesAPI";
import { useArchive } from "../hooks/useArchive";

export default function HomePage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Notes");
  // const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("Created Date");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Created Date");
  const [page, setPage] = useState(1);
  const { searchQuery: searchParam } = useParams();
  const searchQuery = searchParam ? decodeURIComponent(searchParam) : "";

  const { data: filteredData } = useGetFilteredNotesQuery({
    title: searchQuery,
    tags: searchQuery, // whatever tags array you have
    page,
    limit: 6,
  });
  const { handleArchive } = useArchive();

  const handleSearchInput = (e) => {
    const value = e.target.value;

    // Encode spaces and special characters
    navigate(value ? `/home/${encodeURIComponent(value)}` : "/home");

    setPage(1); // reset to first page when searching
  };

  const options = ["Created Date", "Title", "Modified Date"];

  const getMoodIcon = (mood) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return <Smile className="w-4 h-4 text-amber-500" />;
      case "over the moon":
        return <Heart className="w-4 h-4 text-rose-500" />;
      case "sad":
        return <Frown className="w-4 h-4 text-blue-500" />;
      case "heartbreaking":
        return <Frown className="w-4 h-4 text-red-500" />;
      default:
        return <Meh className="w-4 h-4 text-slate-500" />;
    }
  };

  const getMoodColor = (mood) => {
    switch (mood.toLowerCase()) {
      case "happy":
        return "bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border-amber-200";
      case "over the moon":
        return "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-800 border-rose-200";
      case "sad":
        return "bg-gradient-to-r from-blue-100 to-sky-100 text-blue-800 border-blue-200";
      case "heartbreaking":
        return "bg-gradient-to-r from-red-100 to-rose-100 text-red-800 border-red-200";
      default:
        return "bg-gradient-to-r from-slate-100 to-gray-100 text-slate-800 border-slate-200";
    }
  };
  const handlePageChange = (selectedItem) => {
    setPage(selectedItem.selected + 1); // react-paginate is 0-based
  };

  const pageCount = filteredData?.totalPages || 0;

  const tabs = ["All Notes", "Public", "Private", "Archived"];

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

  // Then sort
  const sortedNotes = [...filteredNotes].sort((a, b) => {
    if (sortBy === "Created Date")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === "Modified Date")
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    if (sortBy === "Title") return a.title.localeCompare(b.title);
    return 0;
  });

  const formattedDate = (date) => {
    return format(new Date(date), "MMM dd, yyy");
  };

  return (
    <>
      {/* Header */}
      <div className="relative">
        <div className="max-w-6xl mx-auto mt-20 p-5">
          <div className="w-full h-auto mb-[21px] p-[20px] max-xs:mb-0 inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl -z-10">
            <div className="flex items-center justify-between mb-8 ">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl max-xs:text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  My Notes
                </h1>
                <div className="flex items-center space-x-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600" />
                  <p className="text-slate-600 dark:text-slate-300 text-lg max-xs:text-sm">
                    notes found
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
             text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl 
             transition-all duration-200 transform hover:scale-105 flex justify-center items-center gap-2.5 
             rounded-xl cursor-pointer max-xs:py-2 max-xs:px-4 max-xs:text-sm"
                  onClick={() => navigate("/notes/new")}
                >
                  <PenTool className="w-5 h-5 max-xs:w-3 max-xs:h-3" />
                  New Note
                  <Sparkles className="w-4 h-4 max-xs:w-3 max-xs:h-3" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="flex gap-4 mb-6 bg-white dark:bg-[#00000000] p-5 rounded-xl shadow-lg relative max-xs:flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Search input */}
            <div className="flex-1 relative ">
              <svg
                className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search notes by title, content, or tags..."
                className="dark:bg-[#00000000] w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg bg-white 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                value={searchQuery}
                onChange={handleSearchInput}
              />
            </div>

            {/* Dropdown */}
            <div className="max-xs:flex gap-2 flex">
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(!open)}
                  className="w-48 max-xs:w-[264px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 
                     rounded-lg px-4 py-3 flex items-center justify-between text-sm font-medium 
                     focus:outline-none focus:ring-2 focus:ring-purple-500 transition cursor-pointer"
                >
                  {selected}
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 w-48 bg-white dark:bg-slate-800 border border-gray-200 
                         dark:border-slate-700 rounded-lg shadow-lg z-50 overflow-hidden cursor-pointer"
                    >
                      {options.map((opt) => (
                        <motion.li
                          key={opt}
                          whileHover={{
                            backgroundColor: "rgba(139,92,246,0.1)",
                          }}
                          onClick={() => {
                            setSortBy(opt);
                            setSelected(opt);
                            setOpen(false);
                          }}
                          className="px-4 py-2 cursor-pointer text-sm text-slate-700 dark:text-slate-200"
                        >
                          {opt}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>

              {/* Action button */}
            </div>
          </motion.div>

          <motion.div
            className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1 mb-8 
             shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] 
             dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.1)] max-xs:flex-wrap max-xs:p-[10px] "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex-1 px-6 py-2 max-xs:px-3 max-xs:py-1 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
        ${
          activeTab === tab
            ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
            : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            {sortedNotes.length > 0 ? (
              <motion.div
                key={activeTab}
                className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 "
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {sortedNotes.map((note, index) => (
                  <motion.div
                    key={note._id}
                    className="group relative bg-white dark:bg-gray-800 rounded-lg p-6 border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300 cursor-pointer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    whileHover={{
                      y: -5,
                      transition: { duration: 0.2, ease: "easeOut" },
                    }}
                  >
                    {/* Title */}
                    <h3 className="font-medium text-gray-900 dark:text-gray-100 text-lg mb-3 truncate">
                      {note.title}
                    </h3>

                    {/* Mood & Privacy */}
                    <div className="flex items-center gap-2 mb-4">
                      <span
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium border ${getMoodColor(
                          note.mood
                        )}`}
                      >
                        {getMoodIcon(note.mood)}
                        {note.mood}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-600">
                        <span>
                          {!note.isPublic ? (
                            <Lock className="w-3.5 h-3.5" />
                          ) : (
                            <FileKey className="w-3.5 h-3.5" />
                          )}
                        </span>
                        {note.isPublic}
                      </span>
                    </div>

                    {/* Content */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">
                      {note.content}
                    </p>

                    {/* Tags */}
                    {note.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 border border-gray-200 dark:border-gray-600"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                      <CalendarDays className="w-4 h-4 mr-2" />
                      {formattedDate(note?.createdAt)}
                    </div>

                    {/* Action buttons with smooth slide/fade */}
                    {/* Action buttons with smooth slide/fade */}
                    <motion.div
                      className=" flex justify-between items-center px-2 py-1 mt-3  opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 ease-out pointer-events-none group-hover:pointer-events-auto z-20
    "
                    >
                      <div className="flex items-center">
                        <button
                          className="flex cursor-pointer   justify-center items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                          onClick={() => navigate(`/notes/${note._id}`)}
                        >
                          <div className="tooltip" data-tip="Edit">
                            <Pencil size={15} />
                          </div>
                        </button>
                        <button
                          className="flex justify-center cursor-pointer items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                          onClick={() => navigate(`/chat/${note._id}`)}
                        >
                          <div className="tooltip" data-tip="Chat">
                            <Bot size={15} />
                          </div>
                        </button>
                        <button
                          className="flex justify-center cursor-pointer items-center gap-1 px-3 py-1 text-sm font-medium text-gray-600 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
                          onClick={() => {
                            const noteText = `
                              Title: ${note.title}
                              Content: ${note.content}
                              Tags: ${note.tags.join(", ")}
                              Mood: ${note.mood}
                              Privacy: ${note.isPublic ? "Public" : "Private"}
                              Created At: ${new Date(
                                note.createdAt
                              ).toLocaleString()}
                              Updated At: ${new Date(
                                note.updatedAt
                              ).toLocaleString()}
                                  `;

                            const blob = new Blob([noteText], {
                              type: "text/plain",
                            });
                            const url = URL.createObjectURL(blob);

                            const link = document.createElement("a");
                            link.href = url;
                            link.download = `${note.title.replace(
                              /\s+/g,
                              "_"
                            )}.txt`; // plain text file
                            link.click();
                            URL.revokeObjectURL(url); // clean up
                          }}
                        >
                          <div className="tooltip" data-tip="download note">
                            <Download className="w-4 h-4" />
                          </div>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-2">
                        <span
                          className="tooltip p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                          onClick={() => navigate(`/read/${note._id}`)}
                          data-tip="Read"
                        >
                          <BookOpenCheck size={15} />
                        </span>
                        <span
                          className="tooltip p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-600 transition-all duration-200 cursor-pointer"
                          data-tip={note.isArchived ? "Unarchive" : "Archive"}
                          onClick={() => handleArchive(note._id, note)}
                        >
                          <Archive className="w-5 h-5" />
                        </span>
                        <span>
                          <Dialog deleteId={note._id} />
                        </span>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="shadow-2xl border-0 rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-8 text-center"
              >
                <div className="py-16">
                  <div className="relative mb-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center mx-auto">
                      <BookOpen className="w-12 h-12 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <Sparkles className="w-6 h-6 text-purple-500 absolute -top-2 -right-2" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
                    No notes found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-lg mb-8">
                    Start by creating your first AI-powered note
                  </p>
                  <button
                    className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white h-14 px-8 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 cursor-pointer"
                    onClick={() => navigate("/notes")}
                  >
                    <PenTool className="w-5 h-5 mr-2" />
                    Create Your First Note
                    <Sparkles className="w-4 h-4 ml-2" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          {pageCount > 1 && (
            <ReactPaginate
              breakLabel={
                <span className="px-3 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
                  ...
                </span>
              }
              nextLabel={
                <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-102 transition-all duration-200">
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
                <div className="flex items-center space-x-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-102 transition-all duration-200">
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
              containerClassName="flex flex-wrap items-center justify-center gap-2 mt-6"
              pageLinkClassName="flex items-center justify-center w-12 h-12 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md hover:scale-102 transition-all duration-200"
              activeLinkClassName="!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !border-transparent !shadow-lg !scale-105 hover:!shadow-xl"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakLinkClassName="flex items-center justify-center w-12 h-12 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200"
            />
          )}
        </div>
      </div>
    </>
  );
}
