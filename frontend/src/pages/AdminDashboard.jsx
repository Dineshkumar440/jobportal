import { useEffect, useState } from "react";
import api from "../services/api";
import "./AdminDashboard.css";

const AdminDashboard = () => {
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
      console.log("Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-state-page">
        <div className="admin-state-card">
          <span className="admin-spinner"></span>
          <h2>Loading dashboard</h2>
          <p>Please wait while we prepare your overview.</p>
        </div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="admin-state-page">
        <div className="admin-state-card admin-error">
          <div className="admin-state-icon">!</div>
          <h2>Unable to load dashboard</h2>
          <p>Please login as Admin and try again.</p>
          <button
            type="button"
            className="admin-retry-button"
            onClick={() => {
              setLoading(true);
              fetchDashboard();
            }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const stats = [
    {
      label: "Total Students",
      value: dashboard.students,
      icon: "👨‍🎓",
      description: "Registered job seekers",
      type: "students",
    },
    {
      label: "Total Companies",
      value: dashboard.companies,
      icon: "🏢",
      description: "Registered employers",
      type: "companies",
    },
    {
      label: "Total Jobs",
      value: dashboard.jobs,
      icon: "💼",
      description: "Published opportunities",
      type: "jobs",
    },
    {
      label: "Total Applications",
      value: dashboard.applications,
      icon: "📄",
      description: "Applications submitted",
      type: "applications",
    },
  ];

  return (
    <main className="admin-dashboard">
      <header className="admin-header">
        <div>
          <span className="admin-eyebrow">
            JOBPORTAL MANAGEMENT
          </span>

          <h1>Admin Dashboard</h1>

          <p>
            Monitor platform activity and get an overview
            of your recruitment community.
          </p>
        </div>

        <div className="admin-header-badge">
          <span className="admin-status-dot"></span>
          Administrator
        </div>
      </header>

      <section className="admin-welcome">
        <div className="admin-welcome-content">
          <span>PLATFORM OVERVIEW</span>
          <h2>Everything at a glance.</h2>
          <p>
            Track students, companies, job opportunities,
            and applications from one place.
          </p>
        </div>

        <div className="admin-welcome-art" aria-hidden="true">
          <span>J</span>
        </div>
      </section>

      <section
        className="admin-stats"
        aria-label="Platform statistics"
      >
        {stats.map((stat) => (
          <article
            className={`admin-stat-card stat-${stat.type}`}
            key={stat.type}
          >
            <div className="admin-stat-top">
              <div className="stat-icon">
                {stat.icon}
              </div>

              <span className="stat-indicator">
                Overview
              </span>
            </div>

            <p className="admin-stat-label">
              {stat.label}
            </p>

            <strong className="admin-stat-value">
              {stat.value ?? 0}
            </strong>

            <p className="admin-stat-description">
              {stat.description}
            </p>
          </article>
        ))}
      </section>

      <section className="admin-overview-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-eyebrow">
              PLATFORM SUMMARY
            </span>
            <h2>Platform Overview</h2>
          </div>

          <p>
            A quick summary of the current platform totals.
          </p>
        </div>

        <div className="admin-overview">
          {stats.map((stat, index) => (
            <article
              className="overview-card"
              key={stat.type}
            >
              <div className="overview-card-icon">
                {stat.icon}
              </div>

              <div className="overview-card-content">
                <h3>{stat.label}</h3>
                <p>{stat.description}</p>
              </div>

              <strong className="overview-card-value">
                {stat.value ?? 0}
              </strong>

              <span className="overview-card-number">
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

