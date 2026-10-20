
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const access = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  const { language, setLanguage, t } = useLanguage();

  const [activeSection, setActiveSection] = useState("appearance");

  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light"
  );

  const [notifications, setNotifications] = useState(
    () => localStorage.getItem("notifications") !== "false"
  );

  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  /* ================= FIXED FONT SIZE ================= */

  useEffect(() => {
    const root = document.documentElement;

    // Keep the entire application on a fixed 115% font scale.
    root.setAttribute("data-font-size", "large");
    root.style.setProperty("--font-scale", "1.15");

    // Remove the old zoom behaviour from previous settings.
    root.style.removeProperty("zoom");

    // Remove the old user-selected font preference.
    localStorage.removeItem("fontSize");
  }, []);

  /* ================= THEME ================= */

  const applyTheme = (selectedTheme) => {
    const actualTheme =
      selectedTheme === "system"
        ? window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
        : selectedTheme;

    document.documentElement.setAttribute("data-theme", actualTheme);
  };

  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ================= SYSTEM THEME ================= */

  useEffect(() => {
    if (theme !== "system") return;

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    const handleThemeChange = () => applyTheme("system");

    mediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, [theme]);

  /* ================= NOTIFICATIONS ================= */

  const handleNotificationChange = (value) => {
    setNotifications(value);
    localStorage.setItem("notifications", String(value));
  };

  /* ================= RESET DEFAULTS ================= */

  const resetPreferences = () => {
    setTheme("light");
    setLanguage("english");
    setNotifications(true);

    localStorage.setItem("theme", "light");
    localStorage.setItem("language", "english");
    localStorage.setItem("notifications", "true");

    // Font size is fixed and is not a user preference.
    document.documentElement.setAttribute("data-font-size", "large");
    document.documentElement.style.setProperty("--font-scale", "1.15");
    document.documentElement.style.removeProperty("zoom");
    localStorage.removeItem("fontSize");
  };

  /* ================= LOGOUT ================= */

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    navigate("/login");
  };

  /* ================= DELETE ACCOUNT ================= */

  const handleDeleteAccount = async () => {
    if (!password.trim()) {
      alert(t("enterPassword"));
      return;
    }

    const confirmDelete = window.confirm(t("confirmDelete"));

    if (!confirmDelete) return;

    try {
      setLoading(true);

      await api.delete("accounts/delete-account/", {
        data: { password },
      });

      alert(t("accountDeleted"));

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");

      navigate("/login");
    } catch (error) {
      console.error("Delete Account Error:", error.response?.data);

      alert(
        error.response?.data?.error || t("deleteFailed")
      );
    } finally {
      setLoading(false);
    }
  };

  /* ================= SIDEBAR BUTTON ================= */

  const renderNavButton = (section, icon, label) => (
    <button
      key={section}
      type="button"
      className={`settings-nav ${
        activeSection === section ? "active" : ""
      }`}
      onClick={() => setActiveSection(section)}
    >
      <span className="settings-nav-icon">{icon}</span>
      <span className="settings-nav-label">{label}</span>
    </button>
  );

  return (
    <div className="settings-page">
      <div className="settings-container">

        {/* HEADER */}

        <div className="settings-header">
          <div>
            <span className="settings-label">
              {t("preferences")}
            </span>

            <h1>{t("settings")}</h1>

            <p>{t("managePreferences")}</p>
          </div>

          <button
            type="button"
            className="reset-settings-button"
            onClick={resetPreferences}
          >
            {t("resetDefaults")}
          </button>
        </div>

        {/* SETTINGS LAYOUT */}

        <div className="settings-layout">

          {/* SIDEBAR */}

          <aside className="settings-sidebar">
            {renderNavButton("appearance", "🎨", t("appearance"))}
            {renderNavButton("language", "🌐", t("language"))}
            {renderNavButton("notifications", "🔔", t("notifications"))}
            {renderNavButton("account", "👤", t("account"))}

            {access &&
              renderNavButton("security", "🔐", t("security"))}
          </aside>

          {/* CONTENT */}

          <main className="settings-content">

            {/* APPEARANCE */}

            {activeSection === "appearance" && (
              <section className="settings-panel">
                <div className="panel-heading">
                  <h2>{t("appearance")}</h2>
                  <p>{t("customizeAppearance")}</p>
                </div>

                <div className="preference-group">
                  <h3>{t("theme")}</h3>

                  <p className="preference-description">
                    {t("chooseTheme")}
                  </p>

                  <div className="theme-options">
                    {[
                      {
                        value: "light",
                        icon: "☀️",
                        label: t("light"),
                        description: t("lightDescription"),
                      },
                      {
                        value: "dark",
                        icon: "🌙",
                        label: t("dark"),
                        description: t("darkDescription"),
                      },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={`theme-option ${
                          theme === option.value ? "selected" : ""
                        }`}
                        onClick={() => setTheme(option.value)}
                      >
                        <span className="theme-icon">
                          {option.icon}
                        </span>

                        <strong>{option.label}</strong>

                        <small>{option.description}</small>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* LANGUAGE */}

            {activeSection === "language" && (
              <section className="settings-panel">
                <div className="panel-heading">
                  <h2>{t("languagePreference")}</h2>
                  <p>{t("chooseLanguage")}</p>
                </div>

                <div className="language-list">
                  {[
                    {
                      value: "english",
                      icon: "🇬🇧",
                      label: "English",
                      description: t("english"),
                    },
                    {
                      value: "tamil",
                      icon: "🇮🇳",
                      label: "தமிழ்",
                      description: t("tamil"),
                    },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      className={`language-option ${
                        language === option.value ? "selected" : ""
                      }`}
                      onClick={() => setLanguage(option.value)}
                    >
                      <div className="language-left">
                        <span className="language-icon">
                          {option.icon}
                        </span>

                        <div>
                          <strong>{option.label}</strong>
                          <small>{option.description}</small>
                        </div>
                      </div>

                      {language === option.value && (
                        <span className="selected-check">✓</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="language-note">
                  <span>ℹ️</span>
                  <p>{t("languageSaved")}</p>
                </div>
              </section>
            )}

            {/* NOTIFICATIONS */}

            {activeSection === "notifications" && (
              <section className="settings-panel">
                <div className="panel-heading">
                  <h2>{t("notifications")}</h2>
                  <p>{t("notificationDescription")}</p>
                </div>

                <div className="setting-row">
                  <div>
                    <h3>{t("applicationNotifications")}</h3>
                    <p>{t("applicationNotificationsDescription")}</p>
                  </div>

                  <label className="switch">
                    <input
                      type="checkbox"
                      checked={notifications}
                      onChange={(event) =>
                        handleNotificationChange(event.target.checked)
                      }
                    />

                    <span className="slider"></span>
                  </label>
                </div>
              </section>
            )}

            {/* ACCOUNT */}

            {activeSection === "account" && (
              <section className="settings-panel">
                <div className="panel-heading">
                  <h2>{t("account")}</h2>
                  <p>{t("manageAccount")}</p>
                </div>

                {!access && (
                  <div className="guest-account">
                    <div className="guest-icon">👋</div>
                    <h3>{t("guest")}</h3>
                    <p>{t("guestDescription")}</p>

                    <div className="guest-actions">
                      <button
                        type="button"
                        onClick={() => navigate("/login")}
                      >
                        {t("login")}
                      </button>

                      <button
                        type="button"
                        className="secondary"
                        onClick={() => navigate("/register")}
                      >
                        {t("createAccount")}
                      </button>
                    </div>
                  </div>
                )}

                {access && role === "student" && (
                  <div className="account-card">
                    <div className="account-icon">👨‍🎓</div>

                    <div className="account-info">
                      <span>{t("studentAccount")}</span>
                      <h3>{t("studentProfile")}</h3>
                      <p>{t("studentProfileDescription")}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/profile")}
                    >
                      {t("viewProfile")} →
                    </button>
                  </div>
                )}

                {access && role === "company" && (
                  <div className="account-card">
                    <div className="account-icon">🏢</div>

                    <div className="account-info">
                      <span>{t("companyAccount")}</span>
                      <h3>{t("companyDashboard")}</h3>
                      <p>{t("companyDescription")}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/company-dashboard")}
                    >
                      {t("openDashboard")} →
                    </button>
                  </div>
                )}

                {access && role === "admin" && (
                  <div className="account-card">
                    <div className="account-icon">🛡️</div>

                    <div className="account-info">
                      <span>{t("adminAccount")}</span>
                      <h3>{t("adminDashboard")}</h3>
                      <p>{t("adminDescription")}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate("/admin-dashboard")}
                    >
                      {t("openDashboard")} →
                    </button>
                  </div>
                )}
              </section>
            )}

            {/* SECURITY */}

            {activeSection === "security" && access && (
              <section className="settings-panel">
                <div className="panel-heading">
                  <h2>{t("security")}</h2>
                  <p>{t("securityDescription")}</p>
                </div>

                <div className="setting-row">
                  <div>
                    <h3>{t("logout")}</h3>
                    <p>{t("logoutDescription")}</p>
                  </div>

                  <button
                    type="button"
                    className="logout-button"
                    onClick={handleLogout}
                  >
                    {t("logout")}
                  </button>
                </div>

                {role !== "admin" && (
                  <div className="danger-zone">
                    <div>
                      <span className="danger-label">
                        {t("dangerZone")}
                      </span>

                      <h3>{t("deleteAccount")}</h3>
                      <p>{t("deleteAccountDescription")}</p>
                    </div>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => {
                        setShowDelete(true);
                        setPassword("");
                      }}
                    >
                      {t("deleteAccount")}
                    </button>
                  </div>
                )}
              </section>
            )}

          </main>
        </div>
      </div>

      {/* DELETE ACCOUNT MODAL */}

      {showDelete && (
        <div className="delete-overlay">
          <div className="delete-modal">
            <div className="delete-modal-icon">⚠️</div>

            <h2>{t("deleteAccount")}</h2>

            <p>{t("deleteAccountWarning")}</p>

            <input
              type="password"
              placeholder={t("enterPassword")}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <div className="modal-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => {
                  setShowDelete(false);
                  setPassword("");
                }}
                disabled={loading}
              >
                {t("cancel")}
              </button>

              <button
                type="button"
                className="confirm-delete-button"
                onClick={handleDeleteAccount}
                disabled={loading}
              >
                {loading
                  ? t("deleting")
                  : t("confirmDeleteButton")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
