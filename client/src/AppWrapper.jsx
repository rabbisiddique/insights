import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";
import ChatWithAI from "./pages/ChatWithAI";
import CreateNote from "./pages/CreateNote";
import ForgotPassword from "./pages/ForgotPassword";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NoteReadPage from "./pages/NoteReadPage";
import NotesDashboard from "./pages/NotesDashboard";
import ProfilePage from "./pages/ProfilePage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SignUpPage from "./pages/SignUpPage";
import VerifyYourEmail from "./pages/VerifyYourEmail";
const AppWrapper = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { isAuthenticated, isLoading } = useAuth();
  const hideNavbarPaths = ["/", "/login", "/sign-up", "/forgot-password"];
  const showNavbar =
    !hideNavbarPaths.includes(location.pathname) &&
    !location.pathname.startsWith("/reset-password/");
  // For route changes
  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location.pathname]);

  // For API loading
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return (
    <>
      {showNavbar && <Navbar />}
      {/* {!isAuthenticated && <LoginPage />} */}
      <Toaster
        position="top-right"
        gutter={12}
        containerStyle={{
          top: 24,
          left: 24,
        }}
        toastOptions={{
          duration: 4000,
          style: {
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
            color: "#374151",
            padding: "16px 20px",
            borderRadius: "16px",
            border: "1px solid rgba(156, 163, 175, 0.3)",
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            backdropFilter: "blur(10px)",
            fontSize: "14px",
            fontWeight: "500",
            maxWidth: "400px",
          },
          success: {
            duration: 4000,
            style: {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
              color: "#065f46",
              border: "1px solid #a7f3d0",
              borderTop: "3px solid #10b981",
              boxShadow:
                "0 10px 25px -5px rgba(16, 185, 129, 0.1), 0 4px 6px -2px rgba(16, 185, 129, 0.05)",
            },
            iconTheme: {
              primary: "#10b981",
              secondary: "#ffffff",
            },
          },
          error: {
            duration: 4000,
            style: {
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)",
              color: "#7f1d1d",
              border: "1px solid #fecaca",
              borderTop: "3px solid #ef4444",
              boxShadow:
                "0 10px 25px -5px rgba(239, 68, 68, 0.1), 0 4px 6px -2px rgba(239, 68, 68, 0.05)",
            },
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />{" "}
      <div>
        {/* offset for fixed navbar (approx 80px) */}
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<NotesDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-email/:token" element={<VerifyYourEmail />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />

          {/* Protected routes */}
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/new"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/notes/:noteId"
            element={
              <ProtectedRoute>
                <CreateNote />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <ChatWithAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:noteId"
            element={
              <ProtectedRoute>
                <ChatWithAI />
              </ProtectedRoute>
            }
          />
          <Route
            path="/read/:noteId"
            element={
              <ProtectedRoute>
                <NoteReadPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="/*"
            element={
              <div className="bg-red-800 text-center">Not Found 404</div>
            }
          />
        </Routes>
      </div>
    </>
  );
};

export default AppWrapper;
