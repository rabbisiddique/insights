import { Trash } from "lucide-react";
import toast from "react-hot-toast";
import { useDeleteNoteMutation } from "../features/notes/notesAPI";
import { useAuth } from "../hooks/useAuth";
import { showApiErrors } from "../utils/ShowApiError";
import Loader from "./Loader";

const Dialog = ({ deleteId }) => {
  const { user } = useAuth(true);
  const [deleteNote, { isLoading: deleteIsLoading }] = useDeleteNoteMutation();
  const handleDelete = async (deleteId) => {
    try {
      const res = await deleteNote(deleteId).unwrap();
      toast.success("succeed");
      console.log("deleted", res);
    } catch (error) {
      showApiErrors(error);
    }
  };
  return (
    <>
      <div
        onClick={() => document.getElementById("my_modal_1").showModal()}
        data-tip="Delete"
        className="tooltip p-2 rounded-md text-gray-500 dark:text-gray-300 hover:text-red-500  dark:hover:text-red-600 transition-all duration-200 cursor-pointer"
      >
        <Trash className="w-5 h-5 " />
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello! {user?.username}</h3>
          <p className="py-4">
            Are you sure you would like to delete this note?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex justify-center items-center gap-2">
                <button
                  className="bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 
             text-white px-8 py-2 text-sm font-semibold shadow-lg hover:shadow-xl 
             transition-all duration-200  flex justify-center items-center gap-2.5 
             rounded-xl cursor-pointer "
                >
                  close
                </button>{" "}
                <button
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 
             text-white px-8 py-2 text-sm font-semibold shadow-lg hover:shadow-xl 
             transition-all duration-200  flex justify-center items-center gap-2.5 
             rounded-xl cursor-pointer disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                  onClick={() => handleDelete(deleteId)}
                  disabled={deleteIsLoading}
                >
                  {deleteIsLoading ? <Loader text={"Deleting..."} /> : "Delete"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Dialog;
