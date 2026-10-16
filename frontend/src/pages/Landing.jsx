
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Landing.css";

const Landing = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchJobs = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get("jobs/");
        const data = response.data;

        const jobList = Array.isArray(data)
          ? data
          : Array.isArray(data?.results)
            ? data.results
            : [];

        if (isMounted) {
          setJobs(jobList);
        }
      } catch (err) {
        console.error("Jobs Error:", err.response?.data || err.message);

        if (isMounted) {
          setError(t("jobsLoadError"));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchJobs();

    return () => {
      isMounted = false;
    };
  }, [t]);

  const filteredJobs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) return jobs;

    return jobs.filter((job) => {
      const searchableText = [
        job.title,
        job.location,
        job.description,
        job.company_name,
        job.company?.name,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(keyword);
    });
  }, [jobs, search]);

  const scrollToJobs = () => {
    document.getElementById("jobs-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const formatSalary = (salary) => {
    if (salary === null || salary === undefined || salary === "") {
      return t("notSpecified");
    }

    const numericSalary = Number(salary);

    if (Number.isFinite(numericSalary)) {
      return `₹${numericSalary.toLocaleString("en-IN")}`;
    }

    return salary;
  };

  const getJobDescription = (description) => {
    if (!description) return t("jobDescriptionFallback");

    if (description.length > 115) {
      return `${description.substring(0, 115).trim()}...`;
    }

    return description;
  };

  const resultCountText = () => {
    if (loading) return t("loadingJobOpportunities");

    return filteredJobs.length === 1
      ? `1 ${t("jobFound")}`
      : `${filteredJobs.length} ${t("jobsFound")}`;
  };

  return (
    <main className="jobs-page">
      {/* HERO SECTION */}
      <section className="home-hero">
        <div className="hero-background-shape hero-shape-one" />
        <div className="hero-background-shape hero-shape-two" />

        <div className="home-hero-inner">
          <div className="home-hero-content">
            <span className="home-badge">
              <span className="badge-dot" />
              {t("heroBadge")}
            </span>

            <h1>
              {t("heroTitleFirst")}
              <span>{t("heroTitleSecond")}</span>
            </h1>

            <p className="hero-description">
              {t("heroDescription")}
            </p>

            <form
              className="home-search"
              onSubmit={(event) => {
                event.preventDefault();
                scrollToJobs();
              }}
            >
              <span className="search-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path d="m16 16 4 4" />
                </svg>
              </span>

              <input
                type="search"
                aria-label={t("searchJobs")}
                placeholder={t("jobSearchPlaceholder")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <button type="submit" className="search-button">
                {t("searchJobsButton")}
                <span aria-hidden="true">→</span>
              </button>
            </form>

            <div className="hero-trust">
              <span>
                <span className="trust-check">✓</span>
                {t("exploreAvailableJobs")}
              </span>

              <span>
                <span className="trust-check">✓</span>
                {t("buildYourProfile")}
              </span>

              <span>
                <span className="trust-check">✓</span>
                {t("trackApplications")}
              </span>
            </div>
          </div>

          {/* HERO JOB PREVIEW */}
          <div className="hero-visual" aria-label={t("jobPreview")}>
            <div className="hero-orbit orbit-one" />
            <div className="hero-orbit orbit-two" />

            <article className="hero-preview-card">
              <div className="preview-top">
                <div className="preview-icon">💼</div>

                <span className="preview-status">
                  <span />
                  {t("jobPreview")}
                </span>
              </div>

              <span className="preview-eyebrow">
                {t("nextOpportunity")}
              </span>

              <h2>Python Developer</h2>

              <p className="preview-company">
                {t("softwareDevelopment")}
              </p>

              <div className="preview-details">
                <span>
                  <span aria-hidden="true">📍</span>
                  Chennai
                </span>

                <span>
                  <span aria-hidden="true">⌘</span>
                  Python
                </span>
              </div>

              <div className="preview-divider" />

              <div className="preview-footer">
                <div>
                  <strong>{t("findYourFit")}</strong>
                  <span>{t("exploreAvailableJobs")}</span>
                </div>

                <span className="preview-arrow" aria-hidden="true">
                  ↗
                </span>
              </div>
            </article>

            <div className="floating-card floating-card-jobs">
              <span className="floating-card-icon">▤</span>

              <div>
                <strong>{jobs.length}</strong>
                <span>{t("listedJobs")}</span>
              </div>
            </div>

            <div className="floating-card floating-card-apply">
              <span className="apply-check">✓</span>

              <div>
                <strong>{t("onePlatform")}</strong>
                <span>{t("jobsAndApplications")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="home-stats" aria-label={t("platformOverview")}>
        <div className="home-stat">
          <span className="stat-icon">▤</span>
          <div>
            <strong>{jobs.length}</strong>
            <span>{t("listedJobs")}</span>
          </div>
        </div>

        <div className="home-stat">
          <span className="stat-icon">⌕</span>
          <div>
            <strong>{filteredJobs.length}</strong>
            <span>{t("matchingJobs")}</span>
          </div>
        </div>

        <div className="home-stat">
          <span className="stat-icon">♙</span>
          <div>
            <strong>3</strong>
            <span>{t("userRoles")}</span>
          </div>
        </div>

        <div className="home-stat">
          <span className="stat-icon">↗</span>
          <div>
            <strong>{t("one")}</strong>
            <span>{t("careerPlatform")}</span>
          </div>
        </div>
      </section>

      {/* JOB LISTINGS */}
      <section className="jobs-section" id="jobs-section">
        <div className="section-heading">
          <div>
            <span className="section-eyebrow">
              {t("exploreOpportunities")}
            </span>

            <h2>{t("latestJobOpenings")}</h2>

            <p className="section-description">
              {t("latestJobsDescription")}
            </p>
          </div>

          <button
            type="button"
            className="view-all-button"
            onClick={() => navigate("/jobs")}
          >
            {t("exploreAllJobs")}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="jobs-toolbar">
          <div className="jobs-result-count" aria-live="polite">
            {resultCountText()}
          </div>

          <label className="jobs-inline-search">
            <span aria-hidden="true">⌕</span>

            <input
              type="search"
              aria-label={t("filterJobListings")}
              placeholder={t("filterOpportunities")}
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                aria-label={t("clearSearch")}
                onClick={() => setSearch("")}
              >
                ×
              </button>
            )}
          </label>
        </div>

        {loading ? (
          <div className="jobs-state">
            <div className="loading-spinner" />
            <h3>{t("findingOpportunities")}</h3>
            <p>{t("pleaseWaitJobs")}</p>
          </div>
        ) : error ? (
          <div className="jobs-state jobs-error">
            <div className="state-icon">!</div>
            <h3>{t("couldNotLoadJobs")}</h3>
            <p>{error}</p>

            <button
              type="button"
              className="state-button"
              onClick={() => window.location.reload()}
            >
              {t("tryAgain")}
            </button>
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="jobs-state">
            <div className="state-icon">⌕</div>

            <h3>
              {search.trim()
                ? t("noMatchingJobs")
                : t("noJobsAvailable")}
            </h3>

            <p>
              {search.trim()
                ? t("tryAnotherSearch")
                : t("newJobsWillAppear")}
            </p>

            {search.trim() && (
              <button
                type="button"
                className="state-button"
                onClick={() => setSearch("")}
              >
                {t("clearSearch")}
              </button>
            )}
          </div>
        ) : (
          <div className="jobs-grid">
            {filteredJobs.map((job) => (
              <article className="job-card" key={job.id}>
                <div className="job-card-header">
                  <div className="company-placeholder">
                    {job.title?.charAt(0)?.toUpperCase() || "J"}
                  </div>

                  <span className="job-type">
                    {t("jobOpening")}
                  </span>
                </div>

                <h3>{job.title || t("untitledPosition")}</h3>

                <p className="job-location">
                  <span aria-hidden="true">📍</span>
                  {job.location || t("locationNotSpecified")}
                </p>

                <p className="job-description">
                  {getJobDescription(job.description)}
                </p>

                <div className="job-card-meta">
                  <span className="salary-label">
                    {t("salary")}
                  </span>
                  <strong>{formatSalary(job.salary)}</strong>
                </div>

                <button
                  type="button"
                  className="job-details-button"
                  onClick={() => navigate(`/job/${job.id}`)}
                  disabled={!job.id}
                >
                  {t("viewJobDetails")}
                  <span aria-hidden="true">↗</span>
                </button>
              </article>
            ))}
          </div>
        )}

        {!loading && !error && jobs.length > 0 && (
          <p className="jobs-bottom-note">
            {t("showing")} {filteredJobs.length} {t("of")} {jobs.length}{" "}
            {t("availableJobs")}.
          </p>
        )}
      </section>

      {/* WHY JOBPORTAL */}
      <section className="why-section" id="why-jobportal">
        <div className="why-inner">
          <div className="section-heading centered">
            <span className="section-eyebrow">
              {t("whyJobPortal")}
            </span>

            <h2>{t("simplerCareerTitle")}</h2>

            <p className="section-description">
              {t("simplerCareerDescription")}
            </p>
          </div>

          <div className="why-grid">
            <article className="why-card">
              <div className="why-icon why-icon-purple">⌕</div>
              <h3>{t("discoverOpportunities")}</h3>
              <p>{t("discoverDescription")}</p>
              <span className="why-card-number">01</span>
            </article>

            <article className="why-card">
              <div className="why-icon why-icon-blue">♙</div>
              <h3>{t("buildYourProfile")}</h3>
              <p>{t("profileDescription")}</p>
              <span className="why-card-number">02</span>
            </article>

            <article className="why-card">
              <div className="why-icon why-icon-green">↗</div>
              <h3>{t("manageApplications")}</h3>
              <p>{t("applicationsDescription")}</p>
              <span className="why-card-number">03</span>
            </article>
          </div>
        </div>
      </section>

      {/* ABOUT JOBPORTAL */}
      <section className="home-about" id="about">
        <div className="about-content">
          <span className="section-eyebrow">
            {t("aboutJobPortal")}
          </span>

          <h2>
            {t("bringingJobSeekers")}
            <span> {t("closerTogether")}</span>
          </h2>

          <p>{t("aboutDescriptionFirst")}</p>
          <p>{t("aboutDescriptionSecond")}</p>

          <div className="about-points">
            <div><span>✓</span>{t("studentProfiles")}</div>
            <div><span>✓</span>{t("companyJobPosting")}</div>
            <div><span>✓</span>{t("applicationManagement")}</div>
            <div><span>✓</span>{t("adminDashboard")}</div>
          </div>

          <button
            type="button"
            className="about-button"
            onClick={() => navigate("/register")}
          >
            {t("getStarted")}
            <span aria-hidden="true">→</span>
          </button>
        </div>

        <div className="about-visual">
          <div className="about-dashboard">
            <div className="dashboard-topbar">
              <div className="dashboard-brand">
                <span className="dashboard-brand-icon">J</span>
                <span>JobPortal</span>
              </div>

              <span className="dashboard-menu">•••</span>
            </div>

            <div className="dashboard-welcome">
              <span>{t("careerWorkspace")}</span>
              <h3>{t("moveForward")}</h3>
            </div>

            <div className="dashboard-metrics">
              <div>
                <span className="metric-icon metric-purple">▤</span>
                <span>{t("exploreJobs")}</span>
                <strong>{t("discover")}</strong>
              </div>

              <div>
                <span className="metric-icon metric-blue">♙</span>
                <span>{t("yourProfile")}</span>
                <strong>{t("showcase")}</strong>
              </div>
            </div>

            <div className="dashboard-progress">
              <div className="progress-copy">
                <strong>{t("yourNextStep")}</strong>
                <span>{t("searchSuitableRole")}</span>
              </div>

              <span className="progress-arrow">↗</span>
            </div>
          </div>

          <div className="about-decoration about-decoration-one" />
          <div className="about-decoration about-decoration-two" />
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="home-cta">
        <div className="cta-decoration" />

        <div className="cta-content">
          <span className="cta-eyebrow">
            {t("nextStepStartsHere")}
          </span>

          <h2>{t("readyToExplore")}</h2>

          <p>{t("createAccountDescription")}</p>
        </div>

        <button
          type="button"
          className="cta-button"
          onClick={() => navigate("/register")}
        >
          {t("createAccount")}
          <span aria-hidden="true">→</span>
        </button>
      </section>
    </main>
  );
};

export default Landing;