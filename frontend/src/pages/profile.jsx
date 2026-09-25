import { useEffect, useState } from "react";
import api from "../services/api";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState({
    phone: "",
    education: "",
    skills: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.get(
        "accounts/profile/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(response.data);
    } catch (error) {
      console.log("GET ERROR:", error.response?.data);
      console.log("STATUS:", error.response?.status);
    }
  };

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const updateProfile = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await api.put(
        "accounts/profile/",
        {
          phone: profile.phone,
          education: profile.education,
          skills: profile.skills,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("UPDATED:", response.data);
      alert("Profile Updated Successfully");

      fetchProfile();
    } catch (error) {
      console.log("ERROR DATA:", error.response?.data);
      console.log("STATUS:", error.response?.status);
    }
  };

  return (
  <div className="profile-page">

    <div className="profile-card">

      <div className="profile-header">
        <div className="profile-avatar">
          👤
        </div>

        <div>
          <h1>Edit Profile</h1>
          <p>
            Keep your profile information up to date.
          </p>
        </div>
      </div>

      <div className="profile-form">

        <label>Phone Number</label>

        <input
          type="text"
          name="phone"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        <label>Education</label>

        <input
          type="text"
          name="education"
          value={profile.education}
          onChange={handleChange}
          placeholder="e.g. MCA"
        />

        <label>Skills</label>

        <textarea
          name="skills"
          value={profile.skills}
          onChange={handleChange}
          placeholder="e.g. Python, Django, React, PostgreSQL"
          rows="5"
        />

        <button onClick={updateProfile}>
          Update Profile
        </button>

      </div>

    </div>

  </div>
);
}

export default Profile;