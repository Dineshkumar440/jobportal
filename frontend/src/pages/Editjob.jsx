import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "./EditJob.css";

function EditJob() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const response = await api.get(
        `jobs/${id}/`
      );

      setJob({
        title: response.data.title || "",
        description: response.data.description || "",
        location: response.data.location || "",
        salary: response.data.salary || "",
      });

    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );

      alert("Failed to load job");

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const updateJob = async (e) => {
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
      setUpdating(true);

      await api.put(
        `jobs/${id}/`,
        job
      );

      alert("Job Updated Successfully");

      navigate("/company-dashboard");

    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.detail ||
        "Failed to update job"
      );

    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="edit-job-loading">
        Loading job...
      </div>
    );
  }

  return (
    <div className="edit-job-page">

      <div className="edit-job-card">

        <div className="edit-job-header">

          <h1>Edit Job</h1>

          <p>
            Update the details of your job posting.
          </p>

        </div>

        <form
          onSubmit={updateJob}
          className="edit-job-form"
        >

          <label>Job Title</label>

          <input
            type="text"
            name="title"
            value={job.title}
            onChange={handleChange}
            placeholder="Job Title"
          />

          <label>Description</label>

          <textarea
            name="description"
            value={job.description}
            onChange={handleChange}
            placeholder="Job Description"
            rows="6"
          />

          <label>Location</label>

          <input
            type="text"
            name="location"
            value={job.location}
            onChange={handleChange}
            placeholder="Location"
          />

          <label>Salary</label>

          <input
            type="number"
            name="salary"
            value={job.salary}
            onChange={handleChange}
            placeholder="Salary"
            min="0"
          />

          <div className="edit-job-actions">

            <button
              type="button"
              className="edit-cancel-btn"
              onClick={() =>
                navigate("/company-dashboard")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              className="edit-update-btn"
              disabled={updating}
            >
              {updating
                ? "Updating..."
                : "Update Job"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditJob;