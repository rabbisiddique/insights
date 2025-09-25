import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../features/auth/authAPI";
import {
  useVerifyEmailMutation,
  useVerifySendEmailMutation,
} from "../features/verify/verifyAPI";
import { showApiErrors } from "../utils/ShowApiError";
const VerifyYourEmail = ({ user }) => {
  const { token } = useParams();
  const [verifySendEmail, { isLoading: verifyLoading }] =
    useVerifySendEmailMutation();
  const [verifyEmail] = useVerifyEmailMutation();
  const navigate = useNavigate();
  const { refetch: refetchUser } = useGetUserQuery();

  useEffect(() => {
    const verifyUserEmail = async () => {
      if (!token) return;
      try {
        await verifyEmail(token).unwrap();
        await refetchUser();
        toast.success("Email verified successfully!");
        navigate("/profile");
      } catch (error) {
        showApiErrors(error);
        navigate("/");
      }
    };
    verifyUserEmail();
  }, [token, verifyEmail, navigate, refetchUser]);

  const handleSendEmail = async () => {
    try {
      const res = await verifySendEmail().unwrap();
      toast.success(res?.message);
      console.log(res);
    } catch (error) {
      showApiErrors(error);
    }
  };
  return (
    <div>
      {!user?.verified && (
        <motion.div
          className={`mt-3  p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-white/50`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-black dark:text-gray-200" />
              <span className="text-sm text-black font-semibold dark:text-gray-200">
                Email not verified
              </span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center cursor-pointer space-x-2 px-[18px] py-[7px] text-sm disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 font-semibold text-white rounded-xl shadow-lg transition-all duration-300"
              onClick={handleSendEmail}
              disabled={verifyLoading}
            >
              {verifyLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  <span>Sending...</span>
                </>
              ) : (
                "Verify Now"
              )}{" "}
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default VerifyYourEmail;
