import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("login/", {
        username,
        password,
      });

      localStorage.setItem(
        "access",
        response.data.access
      );

      localStorage.setItem(
        "refresh",
        response.data.refresh
      );

      let role = "";

      if (username === "TechCorp") {
        role = "company";
      } else if (username === "Admin") {
        role = "admin";
      } else {
        role = "student";
      }

      localStorage.setItem("role", role);

      alert("Login Successful");

      if (role === "company") {
        navigate("/company-dashboard");
      } else if (role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/student-dashboard");
      }

    } catch (error) {
      console.log(
        "Login Error:",
        error.response?.data
      );

      alert("Invalid Credentials");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">
          <h1>Welcome Back</h1>

          <p>
            Login to your JobPortal account
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="auth-form"
        >

          <label>Username</label>

          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Don't have an account?
          </p>

          <button
            type="button"
            className="register-link"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  );
};

export default Login;