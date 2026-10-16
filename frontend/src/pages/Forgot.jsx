import { useState } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Login.css";

const ForgotPassword = () => {
  const { t } = useLanguage();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await api.post(
        "accounts/password-reset/",
        { email: email.trim() }
      );

      setMessage(
        response.data?.detail || t("forgotPasswordSuccess")
      );
    } catch (err) {
      console.error(
        "Password reset error:",
        err.response?.data
      );

      setError(t("forgotPasswordError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page login-page">
      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{t("forgotPasswordTitle")}</h2>
            <p>{t("forgotPasswordDescription")}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            <div className="auth-field">
              <label htmlFor="reset-email">
                {t("forgotPasswordEmailLabel")}
              </label>

              <input
                id="reset-email"
                type="email"
                placeholder={t("forgotPasswordEmailPlaceholder")}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setMessage("");
                }}
                autoComplete="email"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading || !email.trim()}
            >
              {loading
                ? t("forgotPasswordSending")
                : t("forgotPasswordSubmit")}
            </button>
          </form>

          {message && (
            <p
              className="auth-feedback success"
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          )}

          {error && (
            <p
              className="auth-feedback error"
              role="alert"
              aria-live="assertive"
            >
              {error}
            </p>
          )}

          <div className="auth-footer">
            <Link
              to="/login"
              className="register-link"
            >
              {t("forgotPasswordBackToLogin")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ForgotPassword;
