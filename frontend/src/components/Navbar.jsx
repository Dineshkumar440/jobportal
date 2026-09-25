import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <Link to="/" className="navbar-brand">
          <span className="brand-icon">J</span>
          <span>JobPortal</span>
        </Link>

        <div className="navbar-links">

          <Link to="/" className="nav-link">
            Jobs
          </Link>

          {!access && (
            <>
              <Link to="/login" className="nav-link">
                Login
              </Link>

              <Link
                to="/register"
                className="nav-register"
              >
                Register
              </Link>
            </>
          )}

          {access && role === "student" && (
            <>
              <Link
                to="/student-dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>

              <Link
                to="/profile"
                className="nav-link"
              >
                Profile
              </Link>
            </>
          )}

          {access && role === "company" && (
            <>
              <Link
                to="/company-dashboard"
                className="nav-link"
              >
                Dashboard
              </Link>

              <Link
                to="/create-job"
                className="nav-link"
              >
                Post Job
              </Link>
            </>
          )}

          {access && role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="nav-link"
            >
              Admin Dashboard
            </Link>
          )}

          {access && (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}

        </div>

      </div>

    </nav>
  );
};

export default Navbar;