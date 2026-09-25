import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./CreateJob.css";

function CreateJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const createJob = async (e) => {
    e.preventDefault();

    if (
      !job.title ||
      !job.description ||
      !job.location ||
      !job.salary
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post(
        "jobs/",
        job
      );

      console.log(response.data);

      alert("Job Created Successfully");

      setJob({
        title: "",
        description: "",
        location: "",
        salary: "",
      });

      navigate("/company-dashboard");

    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.detail ||
        "Failed to create job"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-job-page">

      <div className="create-job-card">

        <div className="create-job-header">

          <h1>Create Job</h1>

          <p>
            Post a new job opportunity for candidates.
          </p>

        </div>

        <form
          onSubmit={createJob}
          className="create-job-form"
        >

          <label>Job Title</label>

          <input
            type="text"
            name="title"
            placeholder="e.g. Python Developer"
            value={job.title}
            onChange={handleChange}
          />

          <label>Description</label>

          <textarea
            name="description"
            placeholder="Describe the job requirements..."
            value={job.description}
            onChange={handleChange}
            rows="6"
          />

          <label>Location</label>

          <input
            type="text"
            name="location"
            placeholder="e.g. Chennai"
            value={job.location}
            onChange={handleChange}
          />

          <label>Salary</label>

          <input
            type="number"
            name="salary"
            placeholder="e.g. 25000"
            value={job.salary}
            onChange={handleChange}
            min="0"
          />

          <div className="create-job-actions">

            <button
              type="button"
              className="cancel-btn"
              onClick={() =>
                navigate("/company-dashboard")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="create-btn"
              disabled={loading}
            >
              {loading
                ? "Creating..."
                : "Create Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default CreateJob;