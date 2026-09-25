import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      await api.post(
        "accounts/register/",
        formData
      );

      alert("Registration Successful");

      navigate("/login");

    } catch (error) {
      console.log(
        "Registration Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.username?.[0] ||
        error.response?.data?.email?.[0] ||
        "Registration Failed"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-header">

          <h1>Create Account</h1>

          <p>
            Join JobPortal and find your next opportunity
          </p>

        </div>

        <form
          onSubmit={handleRegister}
          className="auth-form"
        >

          <label>Username</label>

          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={formData.username}
            onChange={handleChange}
          />

          <label>Email</label>

          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
          />

          <label>Password</label>

          <input
            type="password"
            name="password"
            placeholder="Create password"
            value={formData.password}
            onChange={handleChange}
          />

          <label>Account Type</label>

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="student">
              Student
            </option>

            <option value="company">
              Company
            </option>
          </select>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Create Account"}
          </button>

        </form>

        <div className="auth-footer">

          <p>
            Already have an account?
          </p>

          <button
            type="button"
            className="register-link"
            onClick={() => navigate("/login")}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  );
};

export default Register;