import { useEffect, useState } from "react";
import api from "../services/api";
import "./StudentDashboard.css";

const StudentDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get(
        "applications/my_applications/"
      );

      setApplications(response.data);
    } catch (error) {
      console.log("Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Accepted") {
      return "status accepted";
    }

    if (status === "Rejected") {
      return "status rejected";
    }

    return "status pending";
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        Loading applications...
      </div>
    );
  }

  return (
    <div className="student-dashboard">

      <div className="dashboard-header">
        <h1>My Applications</h1>

        <p>
          Track your job applications and their current status.
        </p>
      </div>

      <div className="application-summary">
        <div className="summary-card">
          <h3>Total Applications</h3>
          <strong>{applications.length}</strong>
        </div>

        <div className="summary-card">
          <h3>Accepted</h3>
          <strong>
            {
              applications.filter(
                (app) => app.status === "Accepted"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <h3>Pending</h3>
          <strong>
            {
              applications.filter(
                (app) => app.status === "Pending"
              ).length
            }
          </strong>
        </div>

        <div className="summary-card">
          <h3>Rejected</h3>
          <strong>
            {
              applications.filter(
                (app) => app.status === "Rejected"
              ).length
            }
          </strong>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="empty-applications">
          <h2>No Applications Found</h2>

          <p>
            You haven't applied for any jobs yet.
          </p>
        </div>
      ) : (
        <div className="applications-list">

          {applications.map((app, index) => (

            <div
              className="application-card"
              key={index}
            >

              <div className="application-info">

                <h2>{app.job}</h2>

                <p className="location">
                  📍 {app.location}
                </p>

                <p className="applied-date">
                  Applied:{" "}
                  {new Date(
                    app.applied_at
                  ).toLocaleDateString()}
                </p>

              </div>

              <div className="application-status">

                <span
                  className={getStatusClass(
                    app.status
                  )}
                >
                  {app.status || "Pending"}
                </span>

              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  );
};

export default StudentDashboard;