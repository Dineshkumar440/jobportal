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
      const response = await api.get(
        "accounts/admin-dashboard/"
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        Loading dashboard...
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="admin-error">
        <h2>Unable to load dashboard</h2>
        <p>Please login as Admin and try again.</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>Admin Dashboard</h1>

        <p>
          Overview of the Job Portal platform.
        </p>
      </div>

      <div className="admin-stats">

        <div className="admin-stat-card">
          <div className="stat-icon">
            👨‍🎓
          </div>

          <div>
            <span>Total Students</span>
            <strong>{dashboard.students}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">
            🏢
          </div>

          <div>
            <span>Total Companies</span>
            <strong>{dashboard.companies}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">
            💼
          </div>

          <div>
            <span>Total Jobs</span>
            <strong>{dashboard.jobs}</strong>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-icon">
            📄
          </div>

          <div>
            <span>Total Applications</span>
            <strong>{dashboard.applications}</strong>
          </div>
        </div>

      </div>

      <div className="admin-overview">

        <h2>Platform Overview</h2>

        <div className="overview-card">

          <div>
            <h3>Students</h3>
            <p>
              Registered job seekers
            </p>
          </div>

          <strong>
            {dashboard.students}
          </strong>

        </div>

        <div className="overview-card">

          <div>
            <h3>Companies</h3>
            <p>
              Registered employers
            </p>
          </div>

          <strong>
            {dashboard.companies}
          </strong>

        </div>

        <div className="overview-card">

          <div>
            <h3>Job Opportunities</h3>
            <p>
              Jobs currently posted
            </p>
          </div>

          <strong>
            {dashboard.jobs}
          </strong>

        </div>

        <div className="overview-card">

          <div>
            <h3>Applications</h3>
            <p>
              Total applications submitted
            </p>
          </div>

          <strong>
            {dashboard.applications}
          </strong>

        </div>

      </div>

    </div>
  );
};

export default AdminDashboard;