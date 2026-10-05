import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import "./Settings.css";

const Settings = () => {
  const navigate = useNavigate();

  const [showDelete, setShowDelete] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("role");

    navigate("/login");
  };

  const handleDeleteAccount = async () => {
    if (!password) {
      alert("Please enter your password");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to permanently delete your account?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      setLoading(true);

      await api.delete(
        "accounts/delete-account/",
        {
          data: {
            password: password,
          },
        }
      );

      alert(
        "Your account has been deleted successfully."
      );

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("role");

      navigate("/login");

    } catch (error) {
      console.log(
        "Delete Account Error:",
        error.response?.data
      );

      alert(
        error.response?.data?.error ||
        "Unable to delete account"
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="settings-page">

      <div className="settings-container">

        <div className="settings-header">
          <h1>Settings</h1>

          <p>
            Manage your JobPortal account
          </p>
        </div>

        <div className="settings-card">

          {/* Account Section */}

          <div className="settings-section">

            <h2>Account</h2>

            <div className="settings-item">

              <div>
                <h3>Profile</h3>

                <p>
                  View and update your profile
                  information.
                </p>
              </div>

              <button
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>

            </div>

          </div>


          {/* Session Section */}

          <div className="settings-section">

            <h2>Session</h2>

            <div className="settings-item">

              <div>
                <h3>Logout</h3>

                <p>
                  Logout from your JobPortal account.
                </p>
              </div>

              <button
                className="logout-button"
                onClick={handleLogout}
              >
                Logout
              </button>

            </div>

          </div>


          {/* Danger Zone */}

          <div className="settings-section danger-section">

            <h2>Danger Zone</h2>

            <div className="settings-item">

              <div>
                <h3>Delete Account</h3>

                <p>
                  Permanently delete your JobPortal
                  account. This action cannot be undone.
                </p>
              </div>

              <button
                className="delete-button"
                onClick={() => {
                  setShowDelete(true);
                  setPassword("");
                }}
              >
                Delete Account
              </button>

            </div>

          </div>

        </div>


        {/* Delete Account Modal */}

        {showDelete && (

          <div className="delete-overlay">

            <div className="delete-modal">

              <h2>
                Delete Account
              </h2>

              <p>
                This action cannot be undone.
                Enter your password to permanently
                delete your account.
              </p>

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
              />

              <div className="modal-actions">

                <button
                  className="cancel-button"
                  onClick={() => {
                    setShowDelete(false);
                    setPassword("");
                  }}
                  disabled={loading}
                >
                  Cancel
                </button>

                <button
                  className="confirm-delete-button"
                  onClick={handleDeleteAccount}
                  disabled={loading}
                >
                  {loading
                    ? "Deleting..."
                    : "Yes, Delete Account"}
                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
};

export default Settings;

