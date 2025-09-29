import toast from "react-hot-toast";
import { useArchiveNoteMutation } from "../features/notes/notesAPI";

export const useArchive = () => {
  const [archiveNote] = useArchiveNoteMutation();

  const handleArchive = async (id, note) => {
    try {
      await archiveNote(id).unwrap();
      toast.success(note.isArchived ? "Note unarchived" : "Note archived");
    } catch (err) {
      toast.error("Failed to update note");
      console.error(err);
    }
  };
  return { handleArchive };
};
