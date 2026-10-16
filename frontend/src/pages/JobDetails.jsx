import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const fetchJob = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(`jobs/${id}/`);
      setJob(response.data);
    } catch (err) {
      console.error("Error loading job:", err.response?.data);
      setJob(null);
      setError(t("jobDetailsLoadError"));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  const handleApply = async () => {
    if (!job || applying) return;

    setApplying(true);
    setError("");
    setMessage("");

    try {
      await api.post("applications/apply/", {
        job_id: job.id,
      });

      setMessage(t("jobDetailsApplySuccess"));
    } catch (err) {
      console.error("Application error:", err.response?.data);

      const responseError =
        err.response?.data?.error ||
        err.response?.data?.detail;

      setError(responseError || t("jobDetailsApplyError"));
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-loading" role="status">
        <span className="job-details-spinner" />
        <p>{t("jobDetailsLoading")}</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-page">
        <section className="job-details-card job-details-error">
          <div className="job-details-error-icon">!</div>
          <h2>{t("jobDetailsNotFound")}</h2>
          <p>{error || t("jobDetailsLoadError")}</p>

          <div className="job-details-error-actions">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate("/")}
            >
              {t("jobDetailsBack")}
            </button>

            <button
              type="button"
              className="apply-btn"
              onClick={fetchJob}
            >
              {t("jobDetailsTryAgain")}
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <main className="job-details-page">
      <article className="job-details-card">
        <header className="job-details-header">
          <div className="job-details-heading">
            <span className="job-details-eyebrow">
              {t("jobDetailsEyebrow")}
            </span>

            <h1>{job.title}</h1>

            <p className="details-location">
              <span aria-hidden="true">📍</span>{" "}
              {job.location || t("jobDetailsLocationMissing")}
            </p>
          </div>

          <div className="details-salary">
            <span className="salary-label">
              {t("jobDetailsSalaryLabel")}
            </span>
            <strong>
              {job.salary !== null && job.salary !== undefined &&
              job.salary !== ""
                ? `₹${Number(job.salary).toLocaleString("en-IN")}`
                : t("jobDetailsSalaryMissing")}
            </strong>
          </div>
        </header>

        <section className="job-details-section">
          <h2>{t("jobDetailsDescriptionTitle")}</h2>

          <p className="full-description">
            {job.description || t("jobDetailsDescriptionMissing")}
          </p>
        </section>

        {error && (
          <div className="job-details-feedback error" role="alert">
            {error}
          </div>
        )}

        {message && (
          <div className="job-details-feedback success" role="status">
            {message}
          </div>
        )}

        <footer className="job-details-actions">
          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/")}
            disabled={applying}
          >
            {t("jobDetailsBack")}
          </button>

          <button
            type="button"
            className="apply-btn"
            onClick={handleApply}
            disabled={applying || Boolean(message)}
          >
            {applying
              ? t("jobDetailsApplying")
              : message
                ? t("jobDetailsApplied")
                : t("jobDetailsApply")}
          </button>
        </footer>
      </article>
    </main>
  );
};

export default JobDetails;
