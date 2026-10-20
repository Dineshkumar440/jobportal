import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Settings from "./pages/Settings";
import JobDetails from "./pages/JobDetails";
import Landing from "./pages/Landing";
import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/Profile";
import CompanyDashboard from "./pages/CompanyDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import AdminDashboard from "./pages/AdminDashboard";
import Forgot from "./pages/Forgot";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  useEffect(() => {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("theme") || "light";

  const applyTheme = (theme) => {
    const actualTheme =
      theme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : theme;

    root.setAttribute("data-theme", actualTheme);
  };

  applyTheme(savedTheme);

  if (savedTheme !== "system") return;

  const mediaQuery = window.matchMedia(
    "(prefers-color-scheme: dark)"
  );

  const handleChange = () => applyTheme("system");

  mediaQuery.addEventListener("change", handleChange);

  return () => {
    mediaQuery.removeEventListener("change", handleChange);
  };
}, []);
  return (
  <LanguageProvider>
    <BrowserRouter>
      <Navbar />

      <Routes>

        {/* Public Pages */}

        <Route
          path="/"
          element={<Landing />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/job/:id"
          element={<JobDetails />}
        />
         
         <Route
          path="/jobs"
          element={<Jobs />}
        />

        {/* Student Pages */}

        <Route
          path="/student-dashboard"
          element={
            <ProtectedRoute role="student">
              <StudentDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute role="student">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Company Pages */}

        <Route
          path="/company-dashboard"
          element={
            <ProtectedRoute role="company">
              <CompanyDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/create-job"
          element={
            <ProtectedRoute role="company">
              <CreateJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/applicants/:id"
          element={
            <ProtectedRoute role="company">
              <Applicants />
            </ProtectedRoute>
          }
        />

        <Route
          path="/edit-job/:id"
          element={
            <ProtectedRoute role="company">
              <EditJob />
            </ProtectedRoute>
          }
        />

        {/* Admin Page */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Settings */}

      <Route
      path="/settings"
      element={<Settings />}
      />

    <Route path="/forgot-password" element={<Forgot />} />
    <Route
     path="/reset-password/:uid/:token"
     element={<ResetPassword />}
    />

      </Routes>

      <Footer/>

    </BrowserRouter>
  </LanguageProvider>
  );
};

export default App;