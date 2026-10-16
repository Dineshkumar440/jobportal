
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import "./Footer.css";

const Footer = () => {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleHomeSection = (sectionId) => {
    if (window.location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="footer-container">

          {/* BRAND */}
          <div className="footer-brand">
            <Link
              to="/"
              className="footer-logo"
              onClick={scrollToTop}
            >
              <span className="footer-logo-icon">J</span>
              <span>JobPortal</span>
            </Link>

            <p>
              {t("footerDescription")}
            </p>

            <span className="footer-tagline">
              {t("find")} {t("apply")} {t("grow")}
            </span>
          </div>

          {/* PLATFORM */}
          <div className="footer-column">
            <h3>{t("platform")}</h3>

            <Link to="/jobs">
              {t("findJobs")}
            </Link>

            <Link to="/register">
              {t("createAccount")}
            </Link>

            <Link to="/login">
              {t("login")}
            </Link>
          </div>

          {/* USERS */}
          <div className="footer-column">
            <h3>{t("forUsers")}</h3>

            <Link to="/student-dashboard">
              {t("student")}
            </Link>

            <Link to="/company-dashboard">
              {t("companies")}
            </Link>

            <Link to="/settings">
              {t("settings")}
            </Link>
          </div>

          {/* ABOUT */}
          <div className="footer-column">
            <h3>{t("about")}</h3>

            <button
              type="button"
              onClick={() => handleHomeSection("about")}
            >
              {t("aboutJobPortal")}
            </button>

            <button
              type="button"
              onClick={() => handleHomeSection("why-jobportal")}
            >
              {t("whyJobPortal")}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER BOTTOM */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>
            © 2026 JobPortal. {t("allRightsReserved")}
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="back-to-top"
          >
            {t("backToTop")} ↑
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;