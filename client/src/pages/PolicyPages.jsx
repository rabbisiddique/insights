import { useState } from "react";
import Privacy from "./PrivacyPage";
import Terms from "./TermsPage";

export default function PolicyPages() {
  const [currentPage, setCurrentPage] = useState("privacy");

  return (
    <div>
      {/* Page Toggle */}
      <div className="fixed top-32 right-4 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-2 border border-slate-200 dark:border-slate-700">
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentPage("privacy")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === "privacy"
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Privacy
          </button>
          <button
            onClick={() => setCurrentPage("terms")}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentPage === "terms"
                ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
            }`}
          >
            Terms
          </button>
        </div>
      </div>

      {/* Render Current Page */}
      {currentPage === "privacy" ? <Privacy /> : <Terms />}
    </div>
  );
}
