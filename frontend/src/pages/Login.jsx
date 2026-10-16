import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Login.css";

const Login = () => {
const navigate = useNavigate();
const { t } = useLanguage();

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);
const [loading, setLoading] = useState(false);

const handleLogin = async (e) => {
e.preventDefault();

if (!username.trim() || !password) {
  alert(t("enterLoginCredentials"));
  return;
}

try {
  setLoading(true);

  const response = await api.post("login/", {
    username: username.trim(),
    password,
  });

  localStorage.setItem("access", response.data.access);
  localStorage.setItem("refresh", response.data.refresh);

  const role = response.data.role;
  localStorage.setItem("role", role);

  alert(t("loginSuccessful"));

  if (role === "company") {
    navigate("/company-dashboard");
  } else if (role === "admin") {
    navigate("/admin-dashboard");
  } else {
    navigate("/student-dashboard");
  }
} catch (error) {
  console.error("Login Error:", error.response?.data);
  alert(t("invalidCredentials"));
} finally {
  setLoading(false);
}


};

return ( <main className="auth-page login-page"> <div className="auth-layout">


    {/* Left Side - Branding */}
    <section className="auth-welcome">
      <Link to="/" className="auth-brand">
        <span className="auth-brand-icon">J</span>
        <span>JobPortal</span>
      </Link>

      <div className="auth-welcome-content">
        <span className="auth-eyebrow">
          {t("careerStartsHere")}
        </span>

        <h1>
          {t("loginWelcomeTitle")}
          <span>{t("loginWelcomeHighlight")}</span>
        </h1>

        <p className="auth-welcome-description">
          {t("loginWelcomeDescription")}
        </p>

        <div className="auth-benefits">
          <div className="auth-benefit">
            <span className="auth-benefit-icon">✓</span>
            <div>
              <h3>{t("loginBenefitOneTitle")}</h3>
              <p>{t("loginBenefitOneDescription")}</p>
            </div>
          </div>

          <div className="auth-benefit">
            <span className="auth-benefit-icon">✓</span>
            <div>
              <h3>{t("loginBenefitTwoTitle")}</h3>
              <p>{t("loginBenefitTwoDescription")}</p>
            </div>
          </div>

          <div className="auth-benefit">
            <span className="auth-benefit-icon">✓</span>
            <div>
              <h3>{t("loginBenefitThreeTitle")}</h3>
              <p>{t("loginBenefitThreeDescription")}</p>
            </div>
          </div>
        </div>
      </div>

      <p className="auth-welcome-footer">
        {t("loginWelcomeFooter")}
      </p>

      <div className="auth-decoration auth-decoration-one" />
      <div className="auth-decoration auth-decoration-two" />
    </section>

    {/* Right Side - Login Form */}
    <section className="auth-form-side">
      <div className="auth-card">

        <div className="auth-mobile-brand">
          <span className="auth-brand-icon">J</span>
          <span>JobPortal</span>
        </div>

        <div className="auth-header">
          <span className="auth-form-eyebrow">
            {t("loginFormEyebrow")}
          </span>

          <h2>{t("welcomeBack")}</h2>

          <p>{t("loginSubtitle")}</p>
        </div>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="auth-field">
            <label htmlFor="login-username">
              {t("username")}
            </label>

            <input
              id="login-username"
              type="text"
              placeholder={t("enterUsername")}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </div>

          
          
<div className="auth-field">
  <label htmlFor="login-password">{t("password")}</label>

  <div className="password-input-wrapper">
    <input
      id="login-password"
      type={showPassword ? "text" : "password"}
      placeholder={t("enterPassword")}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      autoComplete="current-password"
      required
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() => setShowPassword((prev) => !prev)}
      aria-label={showPassword ? "Hide password" : "Show password"}
      title={showPassword ? "Hide password" : "Show password"}
    >
      {showPassword ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M3 3l18 18" />
          <path d="M10.6 10.6a2 2 0 002.8 2.8" />
          <path d="M9.9 5.2A11.5 11.5 0 0112 5c5 0 8.5 4.5 9.5 7a12 12 0 01-3 4.2" />
          <path d="M6.2 6.2A13 13 0 002.5 12c1 2.5 4.5 7 9.5 7 1.2 0 2.3-.3 3.3-.7" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="21"
          height="21"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      )}
    </button>
  </div>

  <Link to="/forgot-password" className="forgot-password-link">
    Forgot Password?
  </Link>
</div>

          <button
            type="submit"
            className="auth-submit"
            disabled={loading}
          >
            {loading ? t("loggingIn") : t("login")}
            {!loading && <span aria-hidden="true">→</span>}
          </button>
        </form>

        <div className="auth-divider">
          <span>{t("or")}</span>
        </div>

        <div className="auth-footer">
          <p>{t("dontHaveAccount")}</p>

          <Link to="/register" className="register-link">
            {t("createAccount")}
            <span aria-hidden="true"> →</span>
          </Link>
        </div>

        <p className="auth-security-note">
          <span aria-hidden="true">🔒</span>
          {t("loginSecurityNote")}
        </p>

      </div>
    </section>

  </div>
</main>

);
}

export default Login;
