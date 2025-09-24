// utils/showApiErrors.js
import toast from "react-hot-toast";

export const showApiErrors = (error, defaultId = "error-toast", setStep) => {
  if (!error) return;

  if (error?.data?.errors && Array.isArray(error.data.errors)) {
    error.data.errors.forEach((err) => {
      toast.error(`${err.msg}`, { id: `error-${err.path}` });
      if (err.path === "email" && setStep) {
        setStep(1);
      } else if (err.path === "password" && setStep) {
        setStep(2);
      } else if (err.path === "username" && setStep) {
        setStep(1);
      }
    });
  } else {
    // general message or network error
    const msg = error?.data?.message || error?.error || "Something went wrong";
    toast.error(msg, { id: defaultId });
  }

  console.log(error);
};
