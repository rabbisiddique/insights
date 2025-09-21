import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import ChatWithAI from "./pages/ChatWithAI";
import CreateNote from "./pages/CreateNote";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NoteReadPage from "./pages/NoteReadPage";
import NotesDashboard from "./pages/NotesDashboard";
import ProfilePage from "./pages/ProfilePage";
import SignUpPage from "./pages/SignUpPage";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/login", "/sign-up"];
  const showNavbar = !hideNavbarPaths.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      <div className="pt-20">
        {/* offset for fixed navbar (approx 80px) */}
        <Routes>
          <Route path="/" element={<NotesDashboard />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/notes/new" element={<CreateNote />} /> // for creating
          new note
          <Route path="/notes/:noteId" element={<CreateNote />} /> // for
          editing existing note
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/chat" element={<ChatWithAI />} />
          {/* <Route path="/chat" element={<ChatWithAI />} /> */}
          <Route path="/chat/:noteId" element={<ChatWithAI />} />
          <Route path="/read/:noteId" element={<NoteReadPage />} />
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
