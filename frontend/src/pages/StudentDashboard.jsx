import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./StudentDashboard.css";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { t } = useLanguage();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const fetchApplications = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await api.get(
          "applications/my_applications/"
        );

        const data = response.data;
        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        if (!cancelled) {
          setApplications(list);
        }
      } catch (err) {
        console.error(
          "Error loading applications:",
          err.response?.data
        );

        if (!cancelled) {
          setError(t("studentDashboardLoadError"));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchApplications();

    return () => {
      cancelled = true;
    };
  }, [retryCount, t]);

  const getStatusClass = (status) => {
    const normalized = String(status || "Pending").toLowerCase();

    if (normalized === "accepted") return "status accepted";
    if (normalized === "rejected") return "status rejected";

    return "status pending";
  };

  const getStatusLabel = (status) => {
    const normalized = String(status || "Pending").toLowerCase();

    if (normalized === "accepted") {
      return t("studentStatusAccepted");
    }

    if (normalized === "rejected") {
      return t("studentStatusRejected");
    }

    return t("studentStatusPending");
  };

  const countStatus = (status) =>
    applications.filter(
      (app) =>
        String(app.status || "Pending").toLowerCase() ===
        status.toLowerCase()
    ).length;

  if (loading) {
    return (
      <div className="dashboard-loading" role="status">
        <span className="student-dashboard-spinner" />
        <p>{t("studentDashboardLoading")}</p>
      </div>
    );
  }

  if (error && applications.length === 0) {
    return (
      <main className="student-dashboard">
        <section className="student-dashboard-state">
          <h2>{t("studentDashboardErrorTitle")}</h2>
          <p>{error}</p>
          <button
            type="button"
            className="student-retry-btn"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            {t("studentDashboardTryAgain")}
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="student-dashboard">
      <header className="dashboard-header">
        <div>
          <span className="student-dashboard-eyebrow">
            {t("studentDashboardEyebrow")}
          </span>
          <h1>{t("studentDashboardTitle")}</h1>
          <p>{t("studentDashboardDescription")}</p>
        </div>
      </header>

      {error && (
        <div className="student-dashboard-error" role="alert">
          {error}
          <button
            type="button"
            onClick={() => setRetryCount((count) => count + 1)}
          >
            {t("studentDashboardTryAgain")}
          </button>
        </div>
      )}

      <section
        className="application-summary"
        aria-label={t("studentDashboardSummary")}
      >
        <div className="summary-card">
          <span className="summary-icon total-icon">▤</span>
          <h3>{t("studentTotalApplications")}</h3>
          <strong>{applications.length}</strong>
        </div>

        <div className="summary-card">
          <span className="summary-icon accepted-icon">✓</span>
          <h3>{t("studentAccepted")}</h3>
          <strong>{countStatus("Accepted")}</strong>
        </div>

        <div className="summary-card">
          <span className="summary-icon pending-icon">◷</span>
          <h3>{t("studentPending")}</h3>
          <strong>{countStatus("Pending")}</strong>
        </div>

        <div className="summary-card">
          <span className="summary-icon rejected-icon">×</span>
          <h3>{t("studentRejected")}</h3>
          <strong>{countStatus("Rejected")}</strong>
        </div>
      </section>

      {applications.length === 0 ? (
        <section className="empty-applications">
          <div className="empty-applications-icon">▤</div>
          <h2>{t("studentNoApplicationsTitle")}</h2>
          <p>{t("studentNoApplicationsDescription")}</p>

          <Link to="/" className="student-retry-btn">
            {t("studentBrowseJobs")}
          </Link>
        </section>
      ) : (
        <section className="applications-section">
          <div className="applications-section-header">
            <div>
              <h2>{t("studentRecentApplications")}</h2>
              <p>{t("studentApplicationsSubtitle")}</p>
            </div>
            <span className="applications-count">
              {applications.length} {t("studentApplicationsLabel")}
            </span>
          </div>

          <div className="applications-list">
            {applications.map((app, index) => (
              <article
                className="application-card"
                key={app.id ?? app.application_id ?? `${app.job}-${index}`}
              >
                <div className="application-job-icon" aria-hidden="true">
                  {String(app.job || "J").charAt(0).toUpperCase()}
                </div>

                <div className="application-info">
                  <h3>{app.job || t("studentUnknownJob")}</h3>

                  <p className="location">
                    <span aria-hidden="true">📍</span>{" "}
                    {app.location || t("studentLocationMissing")}
                  </p>

                  <p className="applied-date">
                    {t("studentAppliedDate")}:{" "}
                    {app.applied_at &&
                      !Number.isNaN(new Date(app.applied_at).getTime())
                      ? new Date(app.applied_at).toLocaleDateString()
                      : t("studentDateMissing")}
                  </p>
                </div>

                <div className="application-status">
                  <span className={getStatusClass(app.status)}>
                    {getStatusLabel(app.status)}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default StudentDashboard;