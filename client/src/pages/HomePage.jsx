import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, PenTool, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate, useParams } from "react-router-dom";
import Dialog from "../components/Dialog";
import NotesCard from "../components/NotesCard";
import { useGetFilteredNotesQuery } from "../features/notes/notesAPI";

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

  const handleSearchInput = (e) => {
    const value = e.target.value;

    // Encode spaces and special characters
    navigate(value ? `/home/${encodeURIComponent(value)}` : "/home");

    setPage(1); // reset to first page when searching
  };

  const options = ["Created Date", "Title", "Modified Date"];

  const handlePageChange = (selectedItem) => {
    setPage(selectedItem.selected + 1); // react-paginate is 0-based
  };

  const pageCount = filteredData?.totalPages || 0;

  const tabs = ["All Notes", "Public", "Private", "Archived"];

  // Then sort

  return (
    <>
      {/* Header */}
      <div className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mt-12 mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-12 lg:py-20">
          {/* Header Section */}
          <div className="w-full mb-6 sm:mt-0 mt-1 md:mb-8 p-4 md:p-6 lg:p-8 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 dark:from-indigo-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-2xl md:rounded-3xl backdrop-blur-sm border border-indigo-200/20 dark:border-indigo-800/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 ">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  My Notes
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <TrendingUp className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <p className="text-slate-600 dark:text-slate-400 text-sm md:text-base lg:text-lg">
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
                  className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 dark:from-indigo-500 dark:to-purple-600 dark:hover:from-indigo-600 dark:hover:to-purple-700 text-white px-4 md:px-6 lg:px-8 py-2 md:py-3 text-sm md:text-base lg:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 flex justify-center items-center gap-2 rounded-xl cursor-pointer"
                  onClick={() => navigate("/notes/new")}
                >
                  <PenTool className="w-4 h-4 md:w-5 md:h-5" />
                  New Note
                  <Sparkles className="w-3 h-3 md:w-4 md:h-4" />
                </button>
              </motion.div>
            </div>
          </div>

          {/* Search and Filters */}
          <motion.div
            className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-6 md:mb-8 bg-white dark:bg-gray-900 p-4 md:p-5 lg:p-6 rounded-xl md:rounded-2xl shadow-lg dark:shadow-2xl dark:shadow-purple-500/5 border border-gray-200 dark:border-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Search input */}
            <div className="flex-1 relative">
              <svg
                className="w-4 h-4 md:w-5 md:h-5 absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
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
                className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 border-2 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 focus:border-transparent transition-all text-sm md:text-base"
                value={searchQuery}
                onChange={handleSearchInput}
              />
            </div>

            {/* Dropdown and Actions */}
            <div className="flex gap-2 md:gap-3">
              <div className="relative flex-1 lg:flex-none">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setOpen(!open)}
                  className="w-full lg:w-48 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl px-3 md:px-4 py-2.5 md:py-3 flex items-center justify-between text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-600 transition cursor-pointer hover:border-purple-300 dark:hover:border-purple-700"
                >
                  <span className="truncate">{selected}</span>
                  <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-500 dark:text-gray-400 flex-shrink-0" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {open && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute mt-2 w-full bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg md:rounded-xl shadow-xl dark:shadow-2xl dark:shadow-purple-500/10 z-50 overflow-hidden"
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
                          className="px-3 md:px-4 py-2 md:py-2.5 cursor-pointer text-sm text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0"
                        >
                          {opt}
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
              <Dialog type="all" />
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex bg-gray-100 dark:bg-gray-800 rounded-xl md:rounded-2xl p-1 md:p-1.5 mb-6 md:mb-8 shadow-[inset_2px_2px_6px_rgba(0,0,0,0.05),inset_-2px_-2px_6px_rgba(255,255,255,0.8)] dark:shadow-[inset_2px_2px_6px_rgba(0,0,0,0.5),inset_-2px_-2px_6px_rgba(255,255,255,0.05)] overflow-x-auto"
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
                className={`flex-1 min-w-fit px-4 md:px-6 py-2 md:py-2.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-md"
                    : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                }`}
              >
                {tab}
              </motion.button>
            ))}
          </motion.div>

          {/* Notes Grid */}

          <NotesCard
            filteredData={filteredData}
            sortBy={sortBy}
            activeTab={activeTab}
            searchQuery={searchQuery}
          />
          {/* Pagination */}
          {pageCount > 1 && (
            <ReactPaginate
              breakLabel={
                <span className="px-2 md:px-3 py-2 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-200">
                  ...
                </span>
              }
              nextLabel={
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 text-sm">
                  <span className="hidden sm:inline">Next</span>
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
                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-2 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded-lg md:rounded-xl border-2 border-gray-200 dark:border-gray-800 shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 text-sm">
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
                  <span className="hidden sm:inline">Previous</span>
                </div>
              }
              onPageChange={handlePageChange}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              pageCount={pageCount}
              containerClassName="flex flex-wrap items-center justify-center gap-2 mt-6 md:mt-8"
              pageLinkClassName="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-800 rounded-lg md:rounded-xl shadow-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-700 hover:text-blue-600 dark:hover:text-blue-400 hover:shadow-md transition-all duration-200 text-sm"
              activeLinkClassName="!bg-gradient-to-r !from-blue-500 !to-purple-600 !text-white !border-transparent !shadow-lg hover:!shadow-xl"
              disabledClassName="opacity-50 cursor-not-allowed"
              breakLinkClassName="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-400 transition-colors duration-200"
            />
          )}
        </div>
      </div>
    </>
  );
}
