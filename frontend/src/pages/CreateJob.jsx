
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./CreateJob.css";

const initialJob = {
  title: "",
  description: "",
  location: "",
  salary: "",
};

function CreateJob() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [job, setJob] = useState(initialJob);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((previousJob) => ({
      ...previousJob,
      [name]: value,
    }));

    if (error) setError("");
  };

  const createJob = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !job.title.trim() ||
      !job.description.trim() ||
      !job.location.trim() ||
      job.salary === ""
    ) {
      setError(t("createJobRequiredError"));
      return;
    }

    if (Number(job.salary) < 0 || !Number.isFinite(Number(job.salary))) {
      setError(t("createJobSalaryError"));
      return;
    }

    try {
      setLoading(true);

      const payload = {
        title: job.title.trim(),
        description: job.description.trim(),
        location: job.location.trim(),
        salary: Number(job.salary),
      };

      const response = await api.post("jobs/", payload);

      console.log("Job created:", response.data);

      window.alert(t("createJobSuccess"));
      setJob(initialJob);
      navigate("/company-dashboard");
    } catch (err) {
      console.error("Error creating job:", err.response?.data);

      const serverError =
        err.response?.data?.detail ||
        err.response?.data?.message;

      setError(serverError || t("createJobFailure"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="create-job-page">
      <section className="create-job-card">
        <header className="create-job-header">
          <div className="create-job-heading-icon" aria-hidden="true">
            💼
          </div>

          <span className="create-job-eyebrow">
            {t("createJobEyebrow")}
          </span>

          <h1>{t("createJobTitle")}</h1>

          <p>{t("createJobDescription")}</p>
        </header>

        {error && (
          <div className="create-job-error" role="alert">
            <span aria-hidden="true">!</span>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={createJob} className="create-job-form">
          <div className="create-job-field">
            <label htmlFor="job-title">
              {t("createJobTitleLabel")}
              <span aria-hidden="true"> *</span>
            </label>

            <input
              id="job-title"
              type="text"
              name="title"
              placeholder={t("createJobTitlePlaceholder")}
              value={job.title}
              onChange={handleChange}
              maxLength={150}
              required
              disabled={loading}
            />
          </div>

          <div className="create-job-field">
            <label htmlFor="job-description">
              {t("createJobDescriptionLabel")}
              <span aria-hidden="true"> *</span>
            </label>

            <textarea
              id="job-description"
              name="description"
              placeholder={t("createJobDescriptionPlaceholder")}
              value={job.description}
              onChange={handleChange}
              rows={6}
              required
              disabled={loading}
            />

            <small className="create-job-hint">
              {t("createJobDescriptionHint")}
            </small>
          </div>

          <div className="create-job-field">
            <label htmlFor="job-location">
              {t("createJobLocationLabel")}
              <span aria-hidden="true"> *</span>
            </label>

            <input
              id="job-location"
              type="text"
              name="location"
              placeholder={t("createJobLocationPlaceholder")}
              value={job.location}
              onChange={handleChange}
              maxLength={150}
              required
              disabled={loading}
            />
          </div>

          <div className="create-job-field">
            <label htmlFor="job-salary">
              {t("createJobSalaryLabel")}
              <span aria-hidden="true"> *</span>
            </label>

            <div className="create-job-salary-input">
              <span aria-hidden="true">₹</span>
              <input
                id="job-salary"
                type="number"
                name="salary"
                placeholder={t("createJobSalaryPlaceholder")}
                value={job.salary}
                onChange={handleChange}
                min="0"
                step="any"
                required
                disabled={loading}
              />
            </div>

            <small className="create-job-hint">
              {t("createJobSalaryHint")}
            </small>
          </div>

          <div className="create-job-actions">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/company-dashboard")}
              disabled={loading}
            >
              {t("createJobCancel")}
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="create-job-button-spinner" />
                  {t("createJobCreating")}
                </>
              ) : (
                <>
                  <span aria-hidden="true">+</span>
                  {t("createJobSubmit")}
                </>
              )}
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default CreateJob;
