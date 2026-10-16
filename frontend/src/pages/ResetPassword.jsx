
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import api from "../services/api";
import "./Login.css";

const ResetPassword = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const { t } = useLanguage();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError(t("resetPasswordMismatch"));
      return;
    }

    if (!password.trim()) {
      setError(t("resetPasswordRequired"));
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(
        "accounts/password-reset-confirm/",
        {
          uid,
          token,
          password,
        }
      );

      setMessage(
        response.data?.detail || t("resetPasswordSuccess")
      );

      setPassword("");
      setConfirmPassword("");

      setTimeout(() => {
        navigate("/login");
      }, 1800);
    } catch (err) {
      console.error(
        "Password reset error:",
        err.response?.data
      );

      const data = err.response?.data;
      const passwordErrors = data?.password;

      if (Array.isArray(passwordErrors)) {
        setError(passwordErrors.join(" "));
      } else if (typeof passwordErrors === "string") {
        setError(passwordErrors);
      } else {
        setError(
          data?.detail || t("resetPasswordError")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page login-page">
      <section className="auth-form-side">
        <div className="auth-card">
          <div className="auth-header">
            <h2>{t("resetPasswordTitle")}</h2>
            <p>{t("resetPasswordDescription")}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="auth-form"
          >
            <div className="auth-field">
              <label htmlFor="new-password">
                {t("resetPasswordNewLabel")}
              </label>

              <input
                id="new-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                  setMessage("");
                }}
                placeholder={t("resetPasswordNewPlaceholder")}
                autoComplete="new-password"
                required
                disabled={loading}
              />
            </div>

            <div className="auth-field">
              <label htmlFor="confirm-password">
                {t("resetPasswordConfirmLabel")}
              </label>

              <input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                  setMessage("");
                }}
                placeholder={t("resetPasswordConfirmPlaceholder")}
                autoComplete="new-password"
                required
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="auth-submit"
              disabled={loading || !password || !confirmPassword}
            >
              {loading
                ? t("resetPasswordUpdating")
                : t("resetPasswordSubmit")}
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
              {t("resetPasswordBackToLogin")}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ResetPassword;
