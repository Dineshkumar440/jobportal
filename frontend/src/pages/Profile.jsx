import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [profile, setProfile] = useState({
    phone: "",
    education: "",
    skills: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const clearSession = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    navigate("/login");
  };

  // Fetch student profile
  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await api.get("accounts/profile/");

      setProfile({
        phone: response.data.phone || "",
        education: response.data.education || "",
        skills: response.data.skills || "",
      });
    } catch (err) {
      console.error("Profile fetch error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      if (err.response?.status === 401) {
        clearSession();
        return;
      }

      if (err.response?.status === 500) {
        setError(
          t("profileServerError") ||
            "Server error while loading your profile. Please try again later."
        );
      } else {
        const detail = err.response?.data?.detail;

        setError(
          typeof detail === "string"
            ? detail
            : t("profileUpdateError")
        );
      }
    } finally {
      // IMPORTANT: Stop loading after the request finishes
      setLoading(false);
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  // Update student profile
  const updateProfile = async (e) => {
    e.preventDefault();

    setError("");
    setMessage("");

    try {
      setSaving(true);

      const response = await api.put("accounts/profile/", {
        phone: profile.phone.trim(),
        education: profile.education.trim(),
        skills: profile.skills.trim(),
      });

      setProfile({
        phone: response.data.phone || "",
        education: response.data.education || "",
        skills: response.data.skills || "",
      });

      setMessage(t("profileUpdateSuccess"));
    } catch (err) {
      console.error("Profile update error:", {
        status: err.response?.status,
        data: err.response?.data,
        message: err.message,
      });

      if (err.response?.status === 401) {
        clearSession();
        return;
      }

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : t("profileUpdateError")
      );
    } finally {
      setSaving(false);
    }
  };

  // Show loading screen while fetching profile
  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading" role="status">
          <div className="profile-spinner" />
          <p>{t("profileLoading")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="profile-page">
      <div className="profile-container">
        <header className="profile-page-header">
          <div>
            <span className="profile-eyebrow">
              {t("profileEyebrow")}
            </span>

            <h1>{t("profileTitle")}</h1>

            <p>{t("profileDescription")}</p>
          </div>

          <button
            type="button"
            className="profile-back-button"
            onClick={() => navigate("/student-dashboard")}
          >
            ← {t("profileDashboard")}
          </button>
        </header>

        <div className="profile-layout">
          <section className="profile-main-card">
            <div className="profile-card-header">
              <div className="profile-avatar" aria-hidden="true">
                👤
              </div>

              <div>
                <h2>{t("profilePersonalInfo")}</h2>
                <p>{t("profilePersonalInfoDescription")}</p>
              </div>
            </div>

            <form
              className="profile-form"
              onSubmit={updateProfile}
            >
              <div className="profile-field">
                <label htmlFor="profile-phone">
                  {t("profilePhone")}
                </label>

                <input
                  id="profile-phone"
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder={t("profilePhonePlaceholder")}
                  autoComplete="tel"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-education">
                  {t("profileEducation")}
                </label>

                <input
                  id="profile-education"
                  type="text"
                  name="education"
                  value={profile.education}
                  onChange={handleChange}
                  placeholder={t("profileEducationPlaceholder")}
                  autoComplete="off"
                />
              </div>

              <div className="profile-field">
                <label htmlFor="profile-skills">
                  {t("profileSkills")}
                </label>

                <textarea
                  id="profile-skills"
                  name="skills"
                  value={profile.skills}
                  onChange={handleChange}
                  placeholder={t("profileSkillsPlaceholder")}
                  rows={6}
                />

                <span className="field-help">
                  {t("profileSkillsHint")}
                </span>
              </div>

              {message && (
                <div
                  className="profile-feedback profile-feedback-success"
                  role="status"
                >
                  {message}
                </div>
              )}

              {error && (
                <div
                  className="profile-feedback profile-feedback-error"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <div className="profile-form-footer">
                <button
                  type="button"
                  className="profile-cancel-button"
                  onClick={fetchProfile}
                  disabled={saving || loading}
                >
                  {t("profileReset")}
                </button>

                <button
                  type="submit"
                  className="profile-save-button"
                  disabled={saving}
                >
                  {saving
                    ? t("profileSaving")
                    : t("profileSaveChanges")}
                </button>
              </div>
            </form>
          </section>

          <aside className="profile-side-card">
            <div className="profile-side-icon" aria-hidden="true">
              ✨
            </div>

            <h3>{t("profileTipsTitle")}</h3>

            <p>{t("profileTipsDescription")}</p>

            <div className="profile-tips">
              <div className="profile-tip">
                <span aria-hidden="true">✓</span>
                <p>{t("profileTipEducation")}</p>
              </div>

              <div className="profile-tip">
                <span aria-hidden="true">✓</span>
                <p>{t("profileTipSkills")}</p>
              </div>

              <div className="profile-tip">
                <span aria-hidden="true">✓</span>
                <p>{t("profileTipAccuracy")}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default Profile;
