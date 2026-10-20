
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Profile.css";

const API_ORIGIN = "https://jobportal-backend-jncz.onrender.com";

const EMPTY_PROFILE = {
  first_name: "",
  last_name: "",
  phone: "",
  location: "",
  native_place: "",
  education: "",
  skills: "",
  summary: "",
  job_title: "",
  work_mode: "",
  preferred_location: "",
  experience_years: "",
  expected_salary: "",
  resume: "",
};

const profileHasContent = (data) => {
  return [
    data.first_name,
    data.last_name,
    data.phone,
    data.location,
    data.native_place,
    data.education,
    data.skills,
    data.summary,
    data.job_title,
    data.work_mode,
    data.preferred_location,
    data.experience_years,
    data.expected_salary,
    data.resume,
  ].some(
    (value) =>
      value !== null &&
      value !== undefined &&
      String(value).trim() !== ""
  );
};

const normalizeProfile = (data = {}) => ({
  ...EMPTY_PROFILE,
  ...data,
  first_name: data.first_name || "",
  last_name: data.last_name || "",
  phone: data.phone || "",
  location: data.location || "",
  native_place: data.native_place || "",
  education: data.education || "",
  skills: data.skills || "",
  summary: data.summary || "",
  job_title: data.job_title || "",
  work_mode: data.work_mode || "",
  preferred_location: data.preferred_location || "",
  experience_years: data.experience_years ?? "",
  expected_salary: data.expected_salary ?? "",
  resume: data.resume || "",
});

const getResumeUrl = (resume) => {
  if (!resume) return "";

  if (/^https?:\/\//i.test(resume)) {
    return resume;
  }

  return `${API_ORIGIN}${
    resume.startsWith("/") ? "" : "/"
  }${resume}`;
};

const formatWorkMode = (mode) => {
  const modes = {
    remote: "Work from Home",
    hybrid: "Hybrid",
    onsite: "On-site",
  };

  return modes[mode] || mode;
};

const Profile = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [profile, setProfile] = useState(EMPTY_PROFILE);
  const [savedProfile, setSavedProfile] = useState(EMPTY_PROFILE);
  const [resumeFile, setResumeFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const hasSavedProfile = profileHasContent(savedProfile);

  const clearSession = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");
    navigate("/login");
  };

  // Load the saved profile from the backend.
  const fetchProfile = async () => {
    setLoading(true);
    setError("");
    setMessage("");
    setResumeFile(null);

    try {
      const response = await api.get("accounts/profile/");
      const data = normalizeProfile(response.data);

      setProfile(data);
      setSavedProfile(data);
      setIsEditing(!profileHasContent(data));
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

      const detail = err.response?.data?.detail;

      setError(
        typeof detail === "string"
          ? detail
          : err.response?.status === 500
            ? "Server error while loading your profile."
            : "Unable to load your profile. Please try again."
      );

      // Allow the user to try the form if loading the profile fails.
      setIsEditing(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
    // Load profile once when this page opens.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setMessage("");
  };

  const handleResumeChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      setResumeFile(null);
      return;
    }

    const allowedExtensions = /\.(pdf|doc|docx)$/i;

    if (!allowedExtensions.test(file.name)) {
      setError("Please upload a PDF, DOC, or DOCX resume.");
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setError("Resume must be 5 MB or smaller.");
      e.target.value = "";
      setResumeFile(null);
      return;
    }

    setResumeFile(file);
    setError("");
    setMessage("");
  };

  // Enter edit mode.
  const startEditing = () => {
    setProfile(savedProfile);
    setResumeFile(null);
    setError("");
    setMessage("");
    setIsEditing(true);
  };

  // Discard unsaved changes and restore the saved profile.
  const cancelEditing = () => {
    setProfile(savedProfile);
    setResumeFile(null);
    setError("");
    setMessage("");
    setIsEditing(false);
  };

  // Save changes to the backend.
  const updateProfile = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();

      Object.entries(profile).forEach(([key, value]) => {
        // Send the new file only; never send the existing resume URL
        // as though it were a file.
        if (key === "resume") return;

        if (value !== null && value !== undefined) {
          formData.append(key, String(value));
        }
      });

      if (resumeFile) {
        formData.append("resume", resumeFile);
      }

      const response = await api.put(
        "accounts/profile/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedProfile = normalizeProfile(response.data);

      setProfile(updatedProfile);
      setSavedProfile(updatedProfile);
      setResumeFile(null);
      setMessage("Your profile has been saved successfully.");

      // After a successful save, return to read-only view mode.
      setIsEditing(false);
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

      const data = err.response?.data;
      let detail = data?.detail;

      if (!detail && data && typeof data === "object") {
        const firstError = Object.values(data).flat()[0];

        if (typeof firstError === "string") {
          detail = firstError;
        }
      }

      setError(
        typeof detail === "string"
          ? detail
          : "Unable to save your profile. Please check the fields and try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="profile-page">
        <div className="profile-loading" role="status">
          <div className="profile-spinner" />
          <p>Loading your profile...</p>
        </div>
      </main>
    );
  }

  const details = [
    ["First Name", savedProfile.first_name],
    ["Last Name", savedProfile.last_name],
    ["Phone Number", savedProfile.phone],
    ["Current Location", savedProfile.location],
    ["Native Place", savedProfile.native_place],
    ["Desired Job Profile", savedProfile.job_title],
    ["Education", savedProfile.education],
    ["Experience (Years)", savedProfile.experience_years],
    ["Preferred Work Mode", formatWorkMode(savedProfile.work_mode)],
    ["Preferred Job Location", savedProfile.preferred_location],
    ["Expected Annual Salary", savedProfile.expected_salary],
    ["Skills", savedProfile.skills],
    ["About Me", savedProfile.summary],
  ];

  return (
    <main className="profile-page">
      <div className="profile-container">
        {/* Page header */}
        <header className="profile-page-header">
          <div>
            <span className="profile-eyebrow">
              MY CAREER PROFILE
            </span>

            <h1>My Profile</h1>

            <p>
              Build your professional profile and let employers
              discover your skills.
            </p>
          </div>

          <button
            type="button"
            className="profile-back-button"
            onClick={() => navigate("/student-dashboard")}
          >
            ← Dashboard
          </button>
        </header>

        <div className="profile-layout">
          <section className="profile-main-card">
            {/* Feedback messages remain visible in both modes */}
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

            {/* EDIT MODE */}
            {isEditing || !hasSavedProfile ? (
              <form
                className="profile-form"
                onSubmit={updateProfile}
                encType="multipart/form-data"
              >
                {/* Personal Information */}
                <section className="profile-section">
                  <div className="profile-card-header">
                    <div className="profile-avatar" aria-hidden="true">
                      👤
                    </div>

                    <div>
                      <h2>Personal Information</h2>
                      <p>Your basic contact details</p>
                    </div>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="profile-field">
                      <label htmlFor="first_name">First Name</label>
                      <input
                        id="first_name"
                        name="first_name"
                        value={profile.first_name}
                        onChange={handleChange}
                        placeholder="Enter first name"
                        autoComplete="given-name"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="last_name">Last Name</label>
                      <input
                        id="last_name"
                        name="last_name"
                        value={profile.last_name}
                        onChange={handleChange}
                        placeholder="Enter last name"
                        autoComplete="family-name"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="phone">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        name="phone"
                        value={profile.phone}
                        onChange={handleChange}
                        placeholder="Enter phone number"
                        autoComplete="tel"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="location">Current Location</label>
                      <input
                        id="location"
                        name="location"
                        value={profile.location}
                        onChange={handleChange}
                        placeholder="e.g. Chennai"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field profile-field-full">
                      <label htmlFor="native_place">Native Place</label>
                      <input
                        id="native_place"
                        name="native_place"
                        value={profile.native_place}
                        onChange={handleChange}
                        placeholder="Your hometown or native place"
                        disabled={saving}
                      />
                    </div>
                  </div>
                </section>

                {/* Professional Information */}
                <section className="profile-section">
                  <div className="profile-section-heading">
                    <h2>Professional Information</h2>
                    <p>Tell employers about your background</p>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="profile-field profile-field-full">
                      <label htmlFor="job_title">
                        Desired Job Profile
                      </label>

                      <input
                        id="job_title"
                        name="job_title"
                        value={profile.job_title}
                        onChange={handleChange}
                        placeholder="e.g. Software Engineer"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="education">Education</label>
                      <input
                        id="education"
                        name="education"
                        value={profile.education}
                        onChange={handleChange}
                        placeholder="e.g. B.Tech Information Technology"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="experience_years">
                        Experience (Years)
                      </label>
                      <input
                        id="experience_years"
                        type="number"
                        name="experience_years"
                        min="0"
                        max="100"
                        step="0.5"
                        value={profile.experience_years}
                        onChange={handleChange}
                        placeholder="e.g. 0 for fresher"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field">
                      <label htmlFor="work_mode">
                        Preferred Work Mode
                      </label>

                      <select
                        id="work_mode"
                        name="work_mode"
                        value={profile.work_mode}
                        onChange={handleChange}
                        disabled={saving}
                      >
                        <option value="">Select work mode</option>
                        <option value="remote">Work from Home</option>
                        <option value="hybrid">Hybrid</option>
                        <option value="onsite">On-site</option>
                      </select>
                    </div>

                    <div className="profile-field">
                      <label htmlFor="preferred_location">
                        Preferred Job Location
                      </label>

                      <input
                        id="preferred_location"
                        name="preferred_location"
                        value={profile.preferred_location}
                        onChange={handleChange}
                        placeholder="e.g. Chennai, Bengaluru"
                        disabled={saving}
                      />
                    </div>

                    <div className="profile-field profile-field-full">
                      <label htmlFor="expected_salary">
                        Expected Annual Salary
                      </label>

                      <input
                        id="expected_salary"
                        type="number"
                        name="expected_salary"
                        min="0"
                        step="1000"
                        value={profile.expected_salary}
                        onChange={handleChange}
                        placeholder="Enter expected annual salary"
                        disabled={saving}
                      />

                      <span className="field-help">
                        Enter your expected annual salary in your local
                        currency.
                      </span>
                    </div>

                    <div className="profile-field profile-field-full">
                      <label htmlFor="skills">Skills</label>

                      <textarea
                        id="skills"
                        name="skills"
                        value={profile.skills}
                        onChange={handleChange}
                        placeholder="e.g. Python, Java, SQL, Git"
                        rows={4}
                        disabled={saving}
                      />

                      <span className="field-help">
                        Separate your skills with commas.
                      </span>
                    </div>

                    <div className="profile-field profile-field-full">
                      <label htmlFor="summary">About Me</label>

                      <textarea
                        id="summary"
                        name="summary"
                        value={profile.summary}
                        onChange={handleChange}
                        placeholder="Write a short professional introduction..."
                        rows={5}
                        disabled={saving}
                      />
                    </div>
                  </div>
                </section>

                {/* Resume */}
                <section className="profile-section">
                  <div className="profile-section-heading">
                    <h2>Resume</h2>
                    <p>Upload your latest resume for employers</p>
                  </div>

                  {profile.resume && (
                    <div className="profile-resume-current">
                      <span aria-hidden="true">📄</span>

                      <div>
                        <strong>Current resume</strong>
                        <a
                          href={getResumeUrl(profile.resume)}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View or download resume
                        </a>
                      </div>
                    </div>
                  )}

                  <div className="profile-field profile-field-full">
                    <label htmlFor="resume">Upload Resume</label>

                    <input
                      id="resume"
                      name="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeChange}
                      disabled={saving}
                    />

                    <span className="field-help">
                      PDF, DOC, or DOCX. Maximum file size: 5 MB.
                    </span>

                    {resumeFile && (
                      <p className="profile-selected-file">
                        Selected: {resumeFile.name}
                      </p>
                    )}
                  </div>
                </section>

                {/* Save / Cancel buttons */}
                <div className="profile-form-footer">
                  {hasSavedProfile && (
                    <button
                      type="button"
                      className="profile-cancel-button"
                      onClick={cancelEditing}
                      disabled={saving}
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    type="submit"
                    className="profile-save-button"
                    disabled={saving}
                  >
                    {saving ? "Saving..." : "Save Profile"}
                  </button>
                </div>
              </form>
            ) : (
              /* READ-ONLY MODE — show saved profile */
              <div className="profile-readonly">
                <div className="profile-view-header">
                  <div>
                    <span className="profile-eyebrow">
                      SAVED PROFILE
                    </span>

                    <h2>
                      {[savedProfile.first_name, savedProfile.last_name]
                        .filter(Boolean)
                        .join(" ") || "Your Profile"}
                    </h2>

                    <p>Your saved professional information</p>
                  </div>

                  <button
                    type="button"
                    className="profile-save-button"
                    onClick={startEditing}
                  >
                    Edit Profile
                  </button>
                </div>

                <div className="profile-details-grid">
                  {details.map(([label, value]) => (
                    <div className="profile-detail-item" key={label}>
                      <span>{label}</span>
                      <p>
                        {value !== "" && value !== null && value !== undefined
                          ? value
                          : "Not added"}
                      </p>
                    </div>
                  ))}

                  <div className="profile-detail-item">
                    <span>Resume</span>

                    {savedProfile.resume ? (
                      <a
                        href={getResumeUrl(savedProfile.resume)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View or download resume
                      </a>
                    ) : (
                      <p>Not uploaded</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Profile;
