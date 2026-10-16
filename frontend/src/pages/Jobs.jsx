import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Jobs.css";

const Jobs = () => {
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);

      const response = await api.get("jobs/");

      setJobs(response.data);
    } catch (error) {
      console.log("Jobs Error:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

return (
  <main className="jobs-page">
    <section className="jobs-section" id="jobs-section">
      <div className="section-heading">
        <div>
          <span>OPPORTUNITIES</span>
          <h1>Find Your Next Job</h1>
        </div>

        <p>
          Explore opportunities that match your skills
          and career goals.
        </p>
      </div>

      <div className="jobs-search">
        <span>🔎</span>

        <input
          type="search"
          placeholder="Search by job title, skill or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search jobs"
        />

        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
          >
            Clear
          </button>
        )}
      </div>

      {loading ? (
        <div className="jobs-loading">
          Loading opportunities...
        </div>
      ) : filteredJobs.length === 0 ? (
        <div className="empty-jobs">
          <div>🔍</div>
          <h3>No jobs found</h3>
          <p>Try searching with a different keyword.</p>
        </div>
      ) : (
        <div className="jobs-grid">
          {filteredJobs.map((job) => (
            <article className="job-card" key={job.id}>
              <div className="job-card-header">
                <div className="company-placeholder">
                  {job.title?.charAt(0)?.toUpperCase()}
                </div>

                <span className="job-type">Full-time</span>
              </div>

              <h3>{job.title}</h3>

              <p className="job-location">
                📍 {job.location}
              </p>

              <p className="job-description">
                {job.description
                  ? job.description.length > 100
                    ? `${job.description.substring(0, 100)}...`
                    : job.description
                  : "Explore this opportunity and take the next step in your career."}
              </p>

              <div className="job-card-meta">
                <strong>₹{job.salary}</strong>
                <span>Salary</span>
              </div>

              <button
                className="job-details-button"
                onClick={() => navigate(`/job/${job.id}`)}
              >
                View Job Details <span>→</span>
              </button>
            </article>
          ))}
        </div>
      )}
    </section>
  </main>
);
}

export default Jobs