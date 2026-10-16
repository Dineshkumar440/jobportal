
import { useEffect, useState } from "react";
import api from "../services/api";
import { useLanguage } from "../context/LanguageContext";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const { t } = useLanguage();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get("accounts/admin-dashboard/");
      setDashboard(response.data);
    } catch (error) {
      console.error(
        "Error fetching admin dashboard:",
        error.response?.data || error.message
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-state-page">
        <div className="admin-state-card">
          <span className="admin-spinner" />
          <h2>{t("adminLoading")}</h2>
          <p>{t("adminLoadingDescription")}</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="admin-state-page">
        <div className="admin-state-card admin-error">
          <div className="admin-state-icon">!</div>
          <h2>{t("adminLoadError")}</h2>
          <p>{t("adminLoadErrorDescription")}</p>

          <button
            type="button"
            className="admin-retry-button"
            onClick={() => {
              setLoading(true);
              fetchDashboard();
            }}
          >
            {t("adminTryAgain")}
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: t("adminTotalStudents"),
      value: dashboard.students,
      icon: "👨‍🎓",
      description: t("adminStudentsDescription"),
      type: "students",
    },
    {
      label: t("adminTotalCompanies"),
      value: dashboard.companies,
      icon: "🏢",
      description: t("adminCompaniesDescription"),
      type: "companies",
    },
    {
      label: t("adminTotalJobs"),
      value: dashboard.jobs,
      icon: "💼",
      description: t("adminJobsDescription"),
      type: "jobs",
    },
    {
      label: t("adminTotalApplications"),
      value: dashboard.applications,
      icon: "📄",
      description: t("adminApplicationsDescription"),
      type: "applications",
    },
  ];

  return (
    <main className="admin-dashboard">
      {/* Dashboard Header */}
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">
            {t("adminBrandLabel")}
          </span>

          <h1>{t("adminDashboardTitle")}</h1>

          <p>{t("adminDashboardDescription")}</p>
        </div>

        <div className="admin-header-badge">
          <span className="admin-status-dot" />
          {t("adminAdministrator")}
        </div>
      </header>

      {/* Welcome Banner */}
      <section className="admin-welcome">
        <div className="admin-welcome-content">
          <span>{t("adminPlatformOverview")}</span>

          <h2>{t("adminWelcomeTitle")}</h2>

          <p>{t("adminWelcomeDescription")}</p>
        </div>

        <div className="admin-welcome-art" aria-hidden="true">
          <span>J</span>
        </div>
      </section>

      {/* Statistics Cards */}
      <section
        className="admin-stats"
        aria-label={t("adminPlatformStatistics")}
      >
        {stats.map((stat) => (
          <article
            className={`admin-stat-card stat-${stat.type}`}
            key={stat.type}
          >
            <div className="admin-stat-top">
              <div className="stat-icon" aria-hidden="true">
                {stat.icon}
              </div>

              <span className="stat-indicator">
                {t("adminOverviewLabel")}
              </span>
            </div>

            <p className="admin-stat-label">{stat.label}</p>

            <strong className="admin-stat-value">
              {Number(stat.value ?? 0).toLocaleString()}
            </strong>

            <p className="admin-stat-description">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      {/* Platform Overview */}
      <section className="admin-overview-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">
              {t("adminSummaryLabel")}
            </span>

            <h2>{t("adminOverviewTitle")}</h2>
          </div>

          <p>{t("adminOverviewDescription")}</p>
        </div>

        <div className="admin-overview">
          {stats.map((stat, index) => (
            <article className="overview-card" key={stat.type}>
              <div className="overview-card-icon" aria-hidden="true">
                {stat.icon}
              </div>

              <div className="overview-card-content">
                <h3>{stat.label}</h3>
                <p>{stat.description}</p>
              </div>

              <strong className="overview-card-value">
                {Number(stat.value ?? 0).toLocaleString()}
              </strong>

              <span className="overview-card-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
