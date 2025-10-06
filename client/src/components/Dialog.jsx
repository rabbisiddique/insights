// Dialog.js
import { AnimatePresence, motion } from "framer-motion";
import { Trash } from "lucide-react";
import { useState } from "react";
import { createPortal } from "react-dom";
import toast from "react-hot-toast";
import {
  useDeleteAllNoteMutation,
  useDeleteNoteMutation,
} from "../features/notes/notesAPI";
import { useAuth } from "../hooks/useAuth";
import { showApiErrors } from "../utils/ShowApiError";
import Loader from "./Loader";

const Dialog = ({ deleteId, type = "single" }) => {
  const { user } = useAuth(true);
  const [showModal, setShowModal] = useState(false);

  const [deleteNote, { isLoading: deleteIsLoading }] = useDeleteNoteMutation();
  const [deleteAllNote, { isLoading: deleteAllLoading }] =
    useDeleteAllNoteMutation();

  const handleDelete = async () => {
    try {
      if (type === "single") {
        await deleteNote(deleteId).unwrap();
        toast.success("Note deleted successfully!");
      } else if (type === "all") {
        const res = await deleteAllNote().unwrap();
        toast.success(res?.message || "All notes deleted successfully!");
      }
      setShowModal(false);
    } catch (error) {
      showApiErrors(error);
    }
  };

  return (
    <>
      {/* Trigger Buttons */}
      {type === "single" ? (
        <span
          onClick={() => setShowModal(true)}
          className="tooltip  p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-600 transition-all duration-200 cursor-pointer"
          data-tip="Delete Note"
        >
          <Trash className="w-5 h-5" />
        </span>
      ) : (
        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500 to-red-600 px-5 py-2.5 
                     text-sm font-semibold text-white shadow-md transition-all duration-300 
                     hover:from-red-600 hover:to-rose-700 hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <Trash className="w-4 h-4" />
          Delete All
        </button>
      )}

      {/* Modal Portal */}
      {typeof document !== "undefined" &&
        createPortal(
          <AnimatePresence>
            {showModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                onClick={() => setShowModal(false)}
              >
                <motion.div
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 className="text-lg font-bold mb-4">
                    {type === "single" ? "Delete Note" : "Delete All Notes"}
                  </h3>
                  <p className="mb-6">
                    {type === "single"
                      ? `Hey ${user?.username}, are you sure you want to delete this note? This action cannot be undone.`
                      : `Hey ${user?.username}, are you sure you want to delete all notes? This action cannot be undone.`}
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 rounded-xl bg-gray-200 cursor-pointer dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 cursor-pointer disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                      onClick={handleDelete}
                      disabled={deleteIsLoading || deleteAllLoading}
                    >
                      {deleteIsLoading || deleteAllLoading ? (
                        <Loader text="Deleting..." />
                      ) : type === "single" ? (
                        "Delete Note"
                      ) : (
                        "Delete All"
                      )}
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Dialog;
