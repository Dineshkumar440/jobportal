
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";
import { useLanguage } from "../context/LanguageContext";

const Register = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const password = formData.password;

  // Strong password requirements
  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  const isStrongPassword = Object.values(passwordRules).every(Boolean);

  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (
      !formData.username.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !confirmPassword
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (!isStrongPassword) {
      setErrorMessage(
        "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("accounts/register/", {
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: formData.role,
      });

      setSuccessMessage(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.error(
        "Registration Error:",
        error.response?.data || error
      );

      const data = error.response?.data;

      const message =
        data?.username?.[0] ||
        data?.email?.[0] ||
        data?.password?.[0] ||
        data?.role?.[0] ||
        data?.detail ||
        data?.message ||
        (error.response
          ? "Registration failed. Please check your details."
          : "Unable to connect to the server. Please try again.");

      setErrorMessage(
        typeof message === "string"
          ? message
          : "Registration failed. Please check your details."
      );
    } finally {
      setLoading(false);
    }
  };

  const passwordToggleIcon = (visible) =>
    visible ? (
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 3l18 18" />
        <path d="M10.6 10.6a2 2 0 0 0 2.8 2.8" />
        <path d="M9.9 5.2A11.5 11.5 0 0 1 12 5c5 0 8.5 4.5 9.5 7a12 12 0 0 1-3 4.2" />
        <path d="M6.2 6.2A13 13 0 0 0 2.5 12c1 2.5 4.5 7 9.5 7 1.2 0 2.3-.3 3.3-.7" />
      </svg>
    ) : (
      <svg
        viewBox="0 0 24 24"
        width="21"
        height="21"
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
    );

  const renderPasswordRule = (passed, text) => (
    <li
      key={text}
      className={`password-rule ${passed ? "passed" : "pending"}`}
    >
      <span aria-hidden="true">{passed ? "✓" : "○"}</span>
      {text}
    </li>
  );

  return (
    <main className="register-page">
      <div className="register-layout">

        {/* Left Side - Branding */}
        <section className="register-welcome">
          <Link to="/" className="register-brand">
            <span className="register-brand-icon">J</span>
            <span>JobPortal</span>
          </Link>

          <div className="register-welcome-content">
            <span className="register-eyebrow">
              {t("careerStartsHere")}
            </span>

            <h1>
              {t("registerWelcomeTitle")}
              <span>{t("registerWelcomeHighlight")}</span>
            </h1>

            <p className="register-welcome-description">
              {t("registerWelcomeDescription")}
            </p>

            <div className="register-benefits">
              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>

                <div>
                  <h3>{t("registerBenefitOneTitle")}</h3>
                  <p>{t("registerBenefitOneDescription")}</p>
                </div>
              </div>

              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>

                <div>
                  <h3>{t("registerBenefitTwoTitle")}</h3>
                  <p>{t("registerBenefitTwoDescription")}</p>
                </div>
              </div>

              <div className="register-benefit">
                <span className="register-benefit-icon">
                  <svg
                    viewBox="0 0 24 24"
                    width="17"
                    height="17"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m5 12 4 4L19 6" />
                  </svg>
                </span>

                <div>
                  <h3>{t("registerBenefitThreeTitle")}</h3>
                  <p>{t("registerBenefitThreeDescription")}</p>
                </div>
              </div>
            </div>
          </div>

          <p className="register-welcome-footer">
            © {new Date().getFullYear()} {t("registerFooter")}
          </p>

          <div className="register-decoration register-decoration-one" />
          <div className="register-decoration register-decoration-two" />
        </section>

        {/* Right Side - Registration Form */}
        <section className="register-form-side">
          <div className="register-card">

            <div className="register-mobile-brand">
              <span className="register-brand-icon">J</span>
              <span>JobPortal</span>
            </div>

            <header className="register-header">
              <span className="register-form-eyebrow">
                {t("registerFormEyebrow")}
              </span>

              <h2>{t("welcomeBack")}</h2>

              <p>{t("registerSubtitle")}</p>
            </header>

            {errorMessage && (
              <div
                className="register-feedback error"
                role="alert"
              >
                <span className="register-feedback-icon">!</span>
                <p>{errorMessage}</p>
              </div>
            )}

            {successMessage && (
              <div
                className="register-feedback success"
                role="status"
                aria-live="polite"
              >
                <span className="register-feedback-icon">✓</span>
                <p>{successMessage}</p>
              </div>
            )}

            <form
              onSubmit={handleRegister}
              className="register-form"
            >
              {/* Username */}
              <div className="register-field">
                <label htmlFor="register-username">
                  {t("username")}
                </label>

                <input
                  id="register-username"
                  type="text"
                  name="username"
                  placeholder={t("chooseUsername")}
                  value={formData.username}
                  onChange={handleChange}
                  autoComplete="username"
                  maxLength={150}
                  required
                  disabled={loading}
                />
              </div>

              {/* Email */}
              <div className="register-field">
                <label htmlFor="register-email">
                  {t("emailAddress")}
                </label>

                <input
                  id="register-email"
                  type="email"
                  name="email"
                  placeholder={t("enterEmail")}
                  value={formData.email}
                  onChange={handleChange}
                  autoComplete="email"
                  required
                  disabled={loading}
                />
              </div>

              {/* Password */}
              <div className="register-field">
                <label htmlFor="register-password">
                  {t("password")}
                </label>

                <div className="register-password-wrapper">
                  <input
                    id="register-password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder={t("createStrongPassword")}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    aria-describedby="password-requirements"
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    aria-pressed={showPassword}
                    disabled={loading}
                  >
                    {passwordToggleIcon(showPassword)}
                  </button>
                </div>

                <p className="register-field-hint">
                  Use a strong password that meets all the requirements.
                </p>

                <ul
                  id="password-requirements"
                  className="password-rules"
                  aria-live="polite"
                >
                  {renderPasswordRule(
                    passwordRules.minLength,
                    "At least 8 characters"
                  )}
                  {renderPasswordRule(
                    passwordRules.uppercase,
                    "At least one capital letter (A–Z)"
                  )}
                  {renderPasswordRule(
                    passwordRules.lowercase,
                    "At least one lowercase letter (a–z)"
                  )}
                  {renderPasswordRule(
                    passwordRules.number,
                    "At least one number (0–9)"
                  )}
                  {renderPasswordRule(
                    passwordRules.special,
                    "At least one special character (@, #, !, etc.)"
                  )}
                </ul>
              </div>

              {/* Confirm Password */}
              <div className="register-field">
                <label htmlFor="register-confirm-password">
                  Confirm Password
                </label>

                <div className="register-password-wrapper">
                  <input
                    id="register-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Re-enter your password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    autoComplete="new-password"
                    required
                    disabled={loading}
                    aria-invalid={
                      confirmPassword.length > 0 &&
                      password !== confirmPassword
                    }
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword((previous) => !previous)
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    disabled={loading}
                  >
                    {passwordToggleIcon(showConfirmPassword)}
                  </button>
                </div>

                {confirmPassword.length > 0 && (
                  <p
                    className={`register-field-hint ${
                      passwordsMatch
                        ? "password-match"
                        : "password-mismatch"
                    }`}
                    role="status"
                  >
                    {passwordsMatch
                      ? "✓ Passwords match."
                      : "Passwords do not match."}
                  </p>
                )}
              </div>

              {/* Account Type */}
              <div className="register-field">
                <label htmlFor="register-role">
                  {t("accountType")}
                </label>

                <div className="register-select-wrapper">
                  <select
                    id="register-role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="student">
                      {t("studentJobSeeker")}
                    </option>

                    <option value="company">
                      {t("companyEmployer")}
                    </option>
                  </select>

                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="register-submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="register-spinner" />
                    {t("creatingAccount")}
                  </>
                ) : (
                  <>
                    {t("createAccount")}
                    <span aria-hidden="true">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="register-divider">
              {t("alreadyMember")}
            </div>

            <div className="register-footer">
              {t("alreadyHaveAccount")}

              <Link
                to="/login"
                className="register-login-link"
              >
                {t("signIn")} <span aria-hidden="true">→</span>
              </Link>
            </div>

            <p className="register-security-note">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="4" y="10" width="16" height="11" rx="2" />
                <path d="M8 10V7a4 4 0 0 1 8 0v3" />
              </svg>

              {t("registerSecurityNote")}
            </p>

          </div>
        </section>
      </div>
    </main>
  );
};

export default Register;
