import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import "./Applicants.css";

function Applicants() {
  const { id } = useParams();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, [id]);

  const fetchApplicants = async () => {
    try {
      const response = await api.get(
        `jobs/${id}/applicants/`
      );

      setApplicants(response.data);
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  const acceptApplication = async (applicationId) => {
    try {
      await api.post(
        `applications/${applicationId}/accept/`
      );

      alert("Application Accepted");

      fetchApplicants();
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );
    }
  };

  const rejectApplication = async (applicationId) => {
    try {
      await api.post(
        `applications/${applicationId}/reject/`
      );

      alert("Application Rejected");

      fetchApplicants();
    } catch (error) {
      console.log(
        "Error:",
        error.response?.data
      );
    }
  };

  const getStatusClass = (status) => {
    if (status === "Accepted") {
      return "applicant-status accepted";
    }

    if (status === "Rejected") {
      return "applicant-status rejected";
    }

    return "applicant-status pending";
  };

  if (loading) {
    return (
      <div className="applicants-loading">
        Loading applicants...
      </div>
    );
  }

  return (
    <div className="applicants-page">

      <div className="applicants-header">

        <h1>Applicants</h1>

        <p>
          Review and manage applications for this job.
        </p>

        <div className="applicant-total">
          Total Applicants: {applicants.length}
        </div>

      </div>

      {applicants.length === 0 ? (

        <div className="no-applicants">

          <h2>No Applicants Yet</h2>

          <p>
            No one has applied for this job yet.
          </p>

        </div>

      ) : (

        <div className="applicants-list">

          {applicants.map((app) => (

            <div
              className="applicant-card"
              key={app.application_id}
            >

              <div className="applicant-top">

                <div>
                  <h2>{app.student}</h2>

                  <p className="education">
                    🎓 {app.education}
                  </p>
                </div>

                <span
                  className={getStatusClass(
                    app.status
                  )}
                >
                  {app.status || "Pending"}
                </span>

              </div>

              <div className="applicant-details">

                <div className="detail-section">

                  <h4>Skills</h4>

                  <p>
                    {app.skills}
                  </p>

                </div>

                <div className="detail-section">

                  <h4>Applied At</h4>

                  <p>
                    {new Date(
                      app.applied_at
                    ).toLocaleString()}
                  </p>

                </div>

              </div>

              <div className="applicant-actions">

                {app.resume && (
                  <a
                    className="resume-btn"
                    href={`http://127.0.0.1:8000${app.resume}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    📄 View Resume
                  </a>
                )}

                {app.status !== "Accepted" &&
                  app.status !== "Rejected" && (
                    <>
                      <button
                        className="accept-btn"
                        onClick={() =>
                          acceptApplication(
                            app.application_id
                          )
                        }
                      >
                        ✓ Accept
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() =>
                          rejectApplication(
                            app.application_id
                          )
                        }
                      >
                        ✕ Reject
                      </button>
                    </>
                  )}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}

export default Applicants;