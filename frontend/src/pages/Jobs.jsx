import { useEffect, useState } from "react";
import api from "../services/api";
import "./Jobs.css";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get("jobs/");
      setJobs(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleApply = async (jobId) => {
    try {
      await api.post("applications/apply/", {
        job_id: jobId,
      });

      alert("Application Submitted Successfully");

    } catch (error) {
      console.log("Error:", error.response?.data);

      alert(
        error.response?.data?.error ||
        "Application Failed"
      );
    }
  };

  const filteredJobs = jobs.filter((job) =>
    `${job.title} ${job.location} ${job.description}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="jobs-page">

      <section className="jobs-hero">

        <h1>Find Your Next Opportunity</h1>

        <p>
          Discover jobs and take the next step in your career.
        </p>

        <input
          type="text"
          placeholder="Search jobs, location or skills..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </section>

      <section className="jobs-container">

        <h2>Available Jobs</h2>

        {filteredJobs.length === 0 ? (
          <p className="no-jobs">
            No jobs found.
          </p>
        ) : (

          <div className="jobs-grid">

            {filteredJobs.map((job) => (

              <div
                className="job-card"
                key={job.id}
              >

                <h3>{job.title}</h3>

                <p className="job-location">
                  📍 {job.location}
                </p>

                <p className="job-description">
                  {job.description}
                </p>

                <div className="job-bottom">

                  <span>
                    ₹{job.salary}
                  </span>

                  <button
                    onClick={() =>
                      handleApply(job.id)
                    }
                  >
                    Apply
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>

    </div>
  );
};

export default Jobs;