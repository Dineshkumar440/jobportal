
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useLanguage();

  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    alert(
      t("loggedOutSuccessfully") || "Logged Out Successfully"
    );

    navigate("/login");
  };

  const isActive = (path) => {
    return location.pathname === path ? "active" : "";
  };

  const renderLink = (path, label, className = "nav-link") => (
    <Link
      to={path}
      className={`${className} ${isActive(path)}`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* LOGO */}

        <Link to="/" className="navbar-brand">
          <span className="brand-icon">J</span>
          <span className="brand-name">JobPortal</span>
        </Link>

        {/* NAVIGATION */}

        <div className="navbar-links">

          {/* HOME AND JOBS */}

          {renderLink("/", t("home"))}
          {renderLink("/jobs", t("jobs"))}

          {/* GUEST */}

          {!access && (
            <>
              {renderLink("/settings", t("settings"))}
              {renderLink("/login", t("login"))}
              {renderLink(
                "/register",
                t("register"),
                "nav-register"
              )}
            </>
          )}

          {/* STUDENT */}

          {access && role === "student" && (
            <>
              {renderLink(
                "/student-dashboard",
                t("dashboard")
              )}

              {renderLink("/profile", t("profile"))}
              {renderLink("/settings", t("settings"))}
            </>
          )}

          {/* COMPANY */}

          {access && role === "company" && (
            <>
              {renderLink(
                "/company-dashboard",
                t("dashboard")
              )}

              {renderLink("/create-job", t("postJob"))}
              {renderLink("/settings", t("settings"))}
            </>
          )}

          {/* ADMIN */}

          {access && role === "admin" && (
            <>
              {renderLink(
                "/admin-dashboard",
                t("adminDashboard")
              )}

              {renderLink("/settings", t("settings"))}
            </>
          )}

          {/* LOGOUT */}

          {access && (
            <button
              type="button"
              className="logout-btn"
              onClick={handleLogout}
            >
              {t("logout")}
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;