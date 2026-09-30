import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./JobDetails.css";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(`jobs/${id}/`);
      setJob(response.data);
    } catch (error) {
      console.log("Error:", error.response?.data);
      alert("Failed to load job details");
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async () => {
    try {
      setApplying(true);

      await api.post("applications/apply/", {
        job_id: job.id,
      });

      alert("Application Submitted Successfully");

    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.error ||
        "Application Failed"
      );

    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="job-details-loading">
        Loading job details...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="job-details-error">
        <h2>Job Not Found</h2>

        <button onClick={() => navigate("/")}>
          Back to Jobs
        </button>
      </div>
    );
  }

  return (
    <div className="job-details-page">

      <div className="job-details-card">

        <div className="job-details-header">

          <div>
            <h1>{job.title}</h1>

            <p className="details-location">
              📍 {job.location}
            </p>
          </div>

          <div className="details-salary">
            ₹{job.salary}
          </div>

        </div>

        <div className="job-details-section">

          <h2>Job Description</h2>

          <p className="full-description">
            {job.description}
          </p>

        </div>

        <div className="job-details-actions">

          <button
            className="back-btn"
            onClick={() => navigate("/")}
          >
            ← Back to Jobs
          </button>

          <button
            className="apply-btn"
            onClick={handleApply}
            disabled={applying}
          >
            {applying
              ? "Applying..."
              : "Apply Now"}
          </button>

        </div>

      </div>

    </div>
  );
};

export default JobDetails;