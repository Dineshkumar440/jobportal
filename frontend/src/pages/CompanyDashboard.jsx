
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./CompanyDashboard.css";

function CompanyDashboard() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingJobId, setDeletingJobId] = useState(null);

  const fetchDashboard = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(
        "accounts/companies/1/dashboard/"
      );

      setDashboard(response.data);
    } catch (err) {
      console.error("Error fetching company dashboard:", err);
      setError(t("companyDashboardLoadError"));
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleDelete = async (jobId) => {
    const confirmed = window.confirm(
      t("companyConfirmDelete")
    );

    if (!confirmed) return;

    setDeletingJobId(jobId);
    setError("");

    try {
      await api.delete(`jobs/${jobId}/`);

      window.alert(t("companyJobDeleted"));
      await fetchDashboard();
    } catch (err) {
      console.error("Error deleting job:", err.response?.data);
      window.alert(t("companyDeleteError"));
    } finally {
      setDeletingJobId(null);
    }
  };

  if (loading) {
    return (
      <main className="company-dashboard">
        <div className="company-state" role="status">
          <span className="company-spinner" />
          <h2>{t("companyLoadingTitle")}</h2>
          <p>{t("companyLoadingDescription")}</p>
        </div>
      </main>
    );
  }

  if (error && !dashboard) {
    return (
      <main className="company-dashboard">
        <div className="company-state company-error-state">
          <div className="company-state-icon">!</div>
          <h2>{t("companyDashboardErrorTitle")}</h2>
          <p>{error}</p>
          <button
            className="post-job-btn"
            type="button"
            onClick={fetchDashboard}
          >
            {t("companyTryAgain")}
          </button>
        </div>
      </main>
    );
  }

  if (!dashboard) return null;

  const jobs = Array.isArray(dashboard.jobs)
    ? dashboard.jobs
    : [];

  return (
    <main className="company-dashboard">
      <header className="company-header">
        <div className="company-heading">
          <span className="company-eyebrow">
            {t("companyDashboardLabel")}
          </span>

          <h1>{dashboard.company || t("companyDefaultName")}</h1>

          <p>{t("companyDashboardDescription")}</p>
        </div>

        <button
          className="post-job-btn"
          type="button"
          onClick={() => navigate("/create-job")}
        >
          <span aria-hidden="true">+</span>
          {t("companyPostNewJob")}
        </button>
      </header>

      {error && (
        <div className="company-inline-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={fetchDashboard}>
            {t("companyTryAgain")}
          </button>
        </div>
      )}

      <section
        className="company-summary"
        aria-label={t("companySummaryLabel")}
      >
        <article className="company-summary-card jobs-summary">
          <div className="company-summary-icon" aria-hidden="true">
            💼
          </div>
          <div className="company-summary-info">
            <span>{t("companyTotalJobs")}</span>
            <strong>
              {Number(dashboard.total_jobs ?? jobs.length).toLocaleString()}
            </strong>
            <small>{t("companyJobsSummary")}</small>
          </div>
        </article>

        <article className="company-summary-card applicants-summary">
          <div className="company-summary-icon" aria-hidden="true">
            👥
          </div>
          <div className="company-summary-info">
            <span>{t("companyTotalApplicants")}</span>
            <strong>
              {Number(dashboard.total_applicants ?? 0).toLocaleString()}
            </strong>
            <small>{t("companyApplicantsSummary")}</small>
          </div>
        </article>
      </section>

      <section className="company-jobs">
        <div className="company-jobs-heading">
          <div>
            <span className="company-eyebrow">
              {t("companyYourListings")}
            </span>
            <h2>{t("companyYourJobs")}</h2>
            <p>{t("companyJobsDescription")}</p>
          </div>

          <span className="company-jobs-count">
            {jobs.length} {t("companyJobsCountLabel")}
          </span>
        </div>

        {jobs.length === 0 ? (
          <div className="no-company-jobs">
            <div className="company-empty-icon" aria-hidden="true">
              💼
            </div>
            <h3>{t("companyNoJobsTitle")}</h3>
            <p>{t("companyNoJobsDescription")}</p>

            <button
              type="button"
              className="post-job-btn"
              onClick={() => navigate("/create-job")}
            >
              + {t("companyPostFirstJob")}
            </button>
          </div>
        ) : (
          <div className="company-jobs-grid">
            {jobs.map((job) => {
              const isDeleting = deletingJobId === job.job_id;

              return (
                <article
                  className="company-job-card"
                  key={job.job_id}
                >
                  <div className="job-card-header">
                    <div className="company-job-title-wrap">
                      <span className="company-job-label">
                        {t("companyJobListing")}
                      </span>
                      <h3>{job.title}</h3>
                    </div>

                    <span className="applicant-count">
                      {Number(job.applicants ?? 0).toLocaleString()}
                      <span> {t("companyApplicantsLabel")}</span>
                    </span>
                  </div>

                  <div className="company-job-meta">
                    <p className="company-job-location">
                      <span aria-hidden="true">📍</span>
                      {job.location || t("companyLocationNotProvided")}
                    </p>

                    <p className="company-job-salary">
                      <span aria-hidden="true">₹</span>
                      {job.salary ?? t("companySalaryNotProvided")}
                    </p>
                  </div>

                  <div className="company-job-actions">
                    <button
                      type="button"
                      className="edit-btn"
                      onClick={() =>
                        navigate(`/edit-job/${job.job_id}`)
                      }
                    >
                      ✎ {t("companyEdit")}
                    </button>

                    <button
                      type="button"
                      className="delete-btn"
                      disabled={isDeleting}
                      onClick={() => handleDelete(job.job_id)}
                    >
                      {isDeleting
                        ? t("companyDeleting")
                        : `× ${t("companyDelete")}`}
                    </button>

                    <button
                      type="button"
                      className="applicants-btn"
                      onClick={() =>
                        navigate(`/applicants/${job.job_id}`)
                      }
                    >
                      {t("companyViewApplicants")}
                      <span aria-hidden="true"> →</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}

export default CompanyDashboard;
