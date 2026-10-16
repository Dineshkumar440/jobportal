import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./EditJob.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchJob = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(`jobs/${id}/`);

        if (!cancelled) {
          setJob({
            title: response.data.title ?? "",
            description: response.data.description ?? "",
            location: response.data.location ?? "",
            salary: response.data.salary ?? "",
          });
        }
      } catch (err) {
        console.error("Error loading job:", err.response?.data);

        if (!cancelled) {
          setError(t("editJobLoadError"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchJob();

    return () => {
      cancelled = true;
    };
  }, [id, retryCount, t]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setJob((previousJob) => ({
      ...previousJob,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const updateJob = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !job.title.trim() ||
      !job.description.trim() ||
      !job.location.trim() ||
      job.salary === "" ||
      Number(job.salary) < 0 ||
      !Number.isFinite(Number(job.salary))
    ) {
      setError(t("editJobValidationError"));
      return;
    }

    try {
      setUpdating(true);

      await api.put(`jobs/${id}/`, {
        ...job,
        title: job.title.trim(),
        description: job.description.trim(),
        location: job.location.trim(),
        salary: Number(job.salary),
      });

      setSuccess(t("editJobSuccess"));

      setTimeout(() => {
        navigate("/company-dashboard");
      }, 700);
    } catch (err) {
      console.error("Error updating job:", err.response?.data);

      setError(
        err.response?.data?.detail ||
          t("editJobUpdateError")
      );
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job-loading" role="status">
        <span className="edit-job-spinner" />
        <p>{t("editJobLoading")}</p>
      </div>
    );
  }

  if (error && !job.title && !job.description) {
    return (
      <div className="edit-job-page">
        <div className="edit-job-card edit-job-error-card">
          <h2>{t("editJobLoadError")}</h2>
          <p>{error}</p>
          <button
            type="button"
            className="edit-update-btn"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            {t("editJobTryAgain")}
          </button>
          <button
            type="button"
            className="edit-cancel-btn"
            onClick={() => navigate("/company-dashboard")}
          >
            {t("editJobCancel")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-job-page">
      <section className="edit-job-card">
        <header className="edit-job-header">
          <span className="edit-job-eyebrow">
            {t("editJobEyebrow")}
          </span>

          <h1>{t("editJobTitle")}</h1>

          <p>{t("editJobDescription")}</p>
        </header>

        {error && (
          <div className="edit-job-message edit-job-message-error" role="alert">
            {error}
          </div>
        )}

        {success && (
          <div className="edit-job-message edit-job-message-success" role="status">
            {success}
          </div>
        )}

        <form onSubmit={updateJob} className="edit-job-form">
          <label htmlFor="edit-title">
            {t("editJobTitleLabel")} <span>*</span>
          </label>
          <input
            id="edit-title"
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder={t("editJobTitlePlaceholder")}
            required
            maxLength={200}
          />

          <label htmlFor="edit-description">
            {t("editJobDescriptionLabel")} <span>*</span>
          </label>
          <textarea
            id="edit-description"
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder={t("editJobDescriptionPlaceholder")}
            rows={6}
            required
          />

          <label htmlFor="edit-location">
            {t("editJobLocationLabel")} <span>*</span>
          </label>
          <input
            id="edit-location"
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder={t("editJobLocationPlaceholder")}
            required
          />

          <label htmlFor="edit-salary">
            {t("editJobSalaryLabel")} <span>*</span>
          </label>
          <input
            id="edit-salary"
            type="number"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder={t("editJobSalaryPlaceholder")}
            min="0"
            step="any"
            required
          />

          <p className="edit-job-hint">
            {t("editJobSalaryHint")}
          </p>

          <div className="edit-job-actions">
            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() => navigate("/company-dashboard")}
              disabled={updating}
            >
              {t("editJobCancel")}
            </button>

            <button
              type="submit"
              className="edit-update-btn"
              disabled={updating}
            >
              {updating ? (
                <>
                  <span className="edit-button-spinner" />
                  {t("editJobUpdating")}
                </>
              ) : (
                t("editJobSubmit")
              )}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default EditJob;