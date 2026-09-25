import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Jobs from "./pages/Jobs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import StudentDashboard from "./pages/StudentDashboard";
import Profile from "./pages/profile";
import CompanyDashboard from "./pages/CompanyDashboard";
import CreateJob from "./pages/CreateJob";
import Applicants from "./pages/Applicants";
import EditJob from "./pages/EditJob";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* Public Pages */}
        <Route
          path="/"
          element={<Jobs />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
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

      </Routes>

    </BrowserRouter>
  );
};

export default App;