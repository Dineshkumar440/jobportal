import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CompanyDashboard.css";

function CompanyDashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const response = await api.get(
        "accounts/companies/1/dashboard/"
      );

      setDashboard(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (jobId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await api.delete(`jobs/${jobId}/`);

      alert("Job Deleted Successfully");

      fetchDashboard();
    } catch (error) {
      console.log(
        error.response?.data
      );

      alert("Failed to delete job");
    }
  };

  if (!dashboard) {
    return (
      <div className="company-loading">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="company-dashboard">

      <div className="company-header">

        <div>
          <h1>{dashboard.company}</h1>

          <p>
            Manage your jobs and applicants.
          </p>
        </div>

        <button
          className="post-job-btn"
          onClick={() => navigate("/create-job")}
        >
          + Post New Job
        </button>

      </div>

      <div className="company-summary">

        <div className="company-summary-card">
          <span>Total Jobs: </span>
          <strong>
            {dashboard.total_jobs}
          </strong>
        </div>

        <div className="company-summary-card">
          <span>Total Applicants: </span>
          <strong>
            {dashboard.total_applicants}
          </strong>
        </div>

      </div>

      <div className="company-jobs">

        <h2>Your Jobs</h2>

        {dashboard.jobs.length === 0 ? (
          <div className="no-company-jobs">
            <h3>No Jobs Posted</h3>

            <p>
              Start by posting your first job.
            </p>

            <button
              onClick={() =>
                navigate("/create-job")
              }
            >
              Post a Job
            </button>
          </div>
        ) : (

          <div className="company-jobs-grid">

            {dashboard.jobs.map((job) => (

              <div
                className="company-job-card"
                key={job.job_id}
              >

                <div className="job-card-header">

                  <h3>{job.title}</h3>

                  <span className="applicant-count">
                    {job.applicants} Applicants
                  </span>

                </div>

                <p className="company-job-location">
                  📍 {job.location}
                </p>

                <p className="company-job-salary">
                  ₹{job.salary}
                </p>

                <div className="company-job-actions">

                  <button
                    className="edit-btn"
                    onClick={() =>
                      navigate(
                        `/edit-job/${job.job_id}`
                      )
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(job.job_id)
                    }
                  >
                    Delete
                  </button>

                  <button
                    className="applicants-btn"
                    onClick={() =>
                      navigate(
                        `/applicants/${job.job_id}`
                      )
                    }
                  >
                    View Applicants
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
}

export default CompanyDashboard;