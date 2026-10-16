
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Applicants.css";

function Applicants() {
  const { id } = useParams();
  const { t } = useLanguage();

  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const fetchApplicants = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get(`jobs/${id}/applicants/`);
      setApplicants(
        Array.isArray(response.data) ? response.data : []
      );
    } catch (err) {
      console.error("Error fetching applicants:", err.response?.data);
      setError(t("applicantsLoadError"));
    } finally {
      setLoading(false);
    }
  }, [id, t]);

  useEffect(() => {
    fetchApplicants();
  }, [fetchApplicants]);

  const updateApplication = async (applicationId, decision) => {
    setActionLoading(applicationId);
    setError("");

    try {
      await api.post(
        `applications/${applicationId}/${decision}/`
      );

      window.alert(
        decision === "accept"
          ? t("applicationAccepted")
          : t("applicationRejected")
      );

      await fetchApplicants();
    } catch (err) {
      console.error("Error updating application:", err.response?.data);
      setError(t("applicationUpdateError"));
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusClass = (status) => {
    const normalizedStatus = (status || "Pending").toLowerCase();

    if (normalizedStatus === "accepted") {
      return "applicant-status accepted";
    }

    if (normalizedStatus === "rejected") {
      return "applicant-status rejected";
    }

    return "applicant-status pending";
  };

  if (loading) {
    return (
      <main className="applicants-page">
        <div className="applicants-state" role="status">
          <span className="applicants-spinner" />
          <h2>{t("applicantsLoading")}</h2>
          <p>{t("applicantsLoadingDescription")}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="applicants-page">
      <header className="applicants-header">
        <div className="applicants-heading">
          <span className="applicants-eyebrow">
            {t("applicantsManagement")}
          </span>

          <h1>{t("applicantsTitle")}</h1>

          <p>{t("applicantsDescription")}</p>
        </div>

        <div className="applicant-total">
          <span className="applicant-total-icon">👥</span>
          <span>
            <strong>{applicants.length.toLocaleString()}</strong>
            <small>{t("applicantsTotal")}</small>
          </span>
        </div>
      </header>

      {error && (
        <div className="applicants-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={fetchApplicants}>
            {t("applicantsTryAgain")}
          </button>
        </div>
      )}

      {applicants.length === 0 ? (
        <section className="no-applicants">
          <div className="empty-applicants-icon">📄</div>
          <h2>{t("noApplicantsTitle")}</h2>
          <p>{t("noApplicantsDescription")}</p>
        </section>
      ) : (
        <section className="applicants-list" aria-label={t("applicantsTitle")}>
          {applicants.map((app) => {
            const status = app.status || "Pending";
            const isProcessing =
              actionLoading === app.application_id;

            return (
              <article
                className="applicant-card"
                key={app.application_id}
              >
                <div className="applicant-top">
                  <div className="applicant-identity">
                    <div className="applicant-avatar" aria-hidden="true">
                      {(app.student || "?").trim().charAt(0).toUpperCase()}
                    </div>

                    <div className="applicant-name">
                      <h2>{app.student || t("applicantUnknown")}</h2>
                      <p className="education">
                        <span aria-hidden="true">🎓</span>{" "}
                        {app.education || t("applicantNotProvided")}
                      </p>
                    </div>
                  </div>

                  <span className={getStatusClass(status)}>
                    {status.toLowerCase() === "accepted"
                      ? t("applicationStatusAccepted")
                      : status.toLowerCase() === "rejected"
                        ? t("applicationStatusRejected")
                        : t("applicationStatusPending")}
                  </span>
                </div>

                <div className="applicant-details">
                  <div className="detail-section">
                    <h4>{t("applicantSkills")}</h4>
                    <p>{app.skills || t("applicantNotProvided")}</p>
                  </div>

                  <div className="detail-section">
                    <h4>{t("applicantAppliedAt")}</h4>
                    <p>
                      {app.applied_at
                        ? new Date(app.applied_at).toLocaleString()
                        : t("applicantNotProvided")}
                    </p>
                  </div>
                </div>

                <div className="applicant-actions">
                  {app.resume && (
                    <a
                      className="resume-btn"
                      href={
                        app.resume.startsWith("http")
                          ? app.resume
                          : `http://127.0.0.1:8000${app.resume}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      📄 {t("applicantViewResume")}
                    </a>
                  )}

                  {status.toLowerCase() !== "accepted" &&
                    status.toLowerCase() !== "rejected" && (
                      <>
                        <button
                          type="button"
                          className="accept-btn"
                          disabled={isProcessing}
                          onClick={() =>
                            updateApplication(
                              app.application_id,
                              "accept"
                            )
                          }
                        >
                          {isProcessing
                            ? t("applicantProcessing")
                            : `✓ ${t("applicantAccept")}`}
                        </button>

                        <button
                          type="button"
                          className="reject-btn"
                          disabled={isProcessing}
                          onClick={() =>
                            updateApplication(
                              app.application_id,
                              "reject"
                            )
                          }
                        >
                          {isProcessing
                            ? t("applicantProcessing")
                            : `✕ ${t("applicantReject")}`}
                        </button>
                      </>
                    )}
                </div>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}

export default Applicants;
