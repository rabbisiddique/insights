import { motion } from "framer-motion";
import { Brain, Lightbulb, Loader2, TagIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import {
  useSuggestTagsMutation,
  useSummarizeNoteContentMutation,
} from "../features/ai/aiAPI";
import { showApiErrors } from "../utils/ShowApiError";

const AiFeatures = ({
  noteId,
  formData,
  setFormData,
  setSummary,
  setIsSuggestDirty,
  setIsSummarizeDirty,
  isEdit,
  isSummarizeDirty,
  isSuggestDirty,
  summary,
}) => {
  const [summarizeNoteContent, { isLoading: summarizeIsLoading }] =
    useSummarizeNoteContentMutation();
  const [suggestTags, { isLoading: suggestTagsIsLoading }] =
    useSuggestTagsMutation();
  const [suggestedTags, setSuggestedTags] = useState([]);

  const handleSummarize = async () => {
    try {
      const res = await summarizeNoteContent({
        noteId: noteId || undefined,
        title: formData.title,
        content: formData.content,
      }).unwrap();
      const generatedSummary = res?.summary || "";
      setSummary(generatedSummary);
      setFormData((prev) => ({ ...prev, summary: generatedSummary }));
      toast.success("Summary generated!");
      if (isEdit) {
        setIsSummarizeDirty(false);
      }
    } catch (error) {
      showApiErrors(error);
    }
  };

  const handleSuggestionTags = async () => {
    try {
      const res = await suggestTags({
        noteId,
        title: formData.title,
        content: formData.content,
      }).unwrap();
      setSuggestedTags(res.suggestedTags || []);
      toast.success("Suggested tags are ready!");
      if (isEdit) {
        setIsSuggestDirty(false);
      }
    } catch (error) {
      showApiErrors(error);
    }
  };

  const handleAddSuggestedTag = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: Array.from(new Set([...prev.tags, tag])),
    }));
    setSuggestedTags((prev) => prev.filter((t) => t !== tag));
  };
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="mt-6 md:mt-10"
      >
        <div className="rounded-lg shadow-2xl border-0 p-4 sm:p-5 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 backdrop-blur-xl">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold flex items-center mb-4 sm:mb-6 text-gray-900 dark:text-white">
              <Brain className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-purple-600 dark:text-purple-400" />
              AI-Powered Features
            </h2>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <button
                className="h-12 sm:h-14 border-2 border-gray-200 dark:border-blue-600/40 rounded-lg hover:bg-blue-50 dark:hover:border-blue-500 dark:hover:bg-blue-900/30 hover:border-blue-300 transition-all duration-500 flex gap-2 cursor-pointer font-bold text-xs sm:text-sm items-center justify-center outline-none py-2 px-3 sm:px-3.5 disabled:bg-blue-100 dark:disabled:bg-blue-900/40 dark:text-white disabled:border-blue-200 dark:disabled:border-blue-700 disabled:text-blue-400 dark:disabled:text-blue-300 disabled:cursor-not-allowed"
                onClick={handleSummarize}
                disabled={
                  summarizeIsLoading ||
                  !formData.title?.trim() ||
                  !formData.content?.trim() ||
                  (isEdit && !isSummarizeDirty)
                }
              >
                {summarizeIsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    <span className="text-xs sm:text-sm">Summarizing...</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs sm:text-sm">Summarize Note</span>
                  </>
                )}
              </button>

              <button
                className="h-12 sm:h-14 border-2 border-gray-200 dark:border-green-600/40 rounded-lg transition-all duration-500 flex gap-2 cursor-pointer font-bold text-xs sm:text-sm items-center justify-center outline-none py-2 px-3 sm:px-3.5 hover:bg-green-50 dark:hover:bg-green-900/30 hover:border-green-300 dark:hover:border-green-500 dark:text-white disabled:bg-green-200 dark:disabled:bg-green-700/40 disabled:text-green-900 dark:disabled:text-green-300 disabled:cursor-not-allowed"
                onClick={handleSuggestionTags}
                disabled={
                  suggestTagsIsLoading ||
                  !formData.title?.trim() ||
                  !formData.content?.trim() ||
                  (isEdit && !isSuggestDirty)
                }
              >
                {suggestTagsIsLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2 animate-spin" />
                    <span className="text-xs sm:text-sm">Suggesting...</span>
                  </>
                ) : (
                  <>
                    <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-green-600 dark:text-green-400" />
                    <span className="text-xs sm:text-sm">Suggest Tags</span>
                  </>
                )}
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-xl sm:rounded-2xl border-2 border-blue-200 dark:border-blue-700/50"
            >
              <h4 className="font-bold mb-3 text-blue-800 dark:text-blue-300 flex items-center text-sm sm:text-base">
                <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Summary:
              </h4>
              <p className="text-sm sm:text-base text-blue-700 dark:text-blue-200 leading-relaxed">
                {summary || formData.summary || "No summary yet..."}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 sm:p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 rounded-xl sm:rounded-2xl border-2 border-green-200 dark:border-green-700/50"
            >
              <h4 className="font-bold mb-3 text-green-800 dark:text-green-300 flex items-center text-sm sm:text-base">
                <TagIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Suggested Tags:
              </h4>
              <div className="flex flex-wrap gap-2">
                {Array.isArray(suggestedTags) && suggestedTags.length > 0 ? (
                  suggestedTags.map((tag, idx) => (
                    <div
                      key={idx}
                      className="cursor-pointer rounded-lg hover:bg-green-200 dark:hover:bg-green-700/50 border-2 border-green-300 dark:border-green-600 px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium transition-all duration-200 transform hover:scale-105 text-green-800 dark:text-green-200"
                      onClick={() => handleAddSuggestedTag(tag)}
                    >
                      + {tag}
                    </div>
                  ))
                ) : (
                  <p className="text-sm sm:text-base text-green-700 dark:text-green-300 leading-relaxed">
                    No tags yet...
                  </p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AiFeatures;
