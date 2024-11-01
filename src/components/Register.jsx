import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import boyAvatar from "../../assets/images/Boy.jpeg"; // Importing the image
import girlAvatar from "../../assets/images/girl.jpeg"; // Import another image if needed
import man from "../../assets/images/man.jpeg";
import woman from "../../assets/images/woman.jpeg";

function Register() {
  const navigate = useNavigate();
  const [profilePic, setProfilePic] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setProfilePic(previewUrl);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleAvatarSelect = (avatarUrl) => {
    setProfilePic(avatarUrl); // Set the profile picture to the selected avatar
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword ||
      !profilePic
    ) {
      setErrors("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setErrors("Passwords do not match.");
      return;
    }

    setErrors("");

    console.log("Registration Data:", {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      profilePic,
    });

    navigate("/");
  };

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formSection}>
          <div className={styles.formLeft}>
            <div className={styles.inputGroup}>
              <label>Full Name</label>
              <input
                type="text"
                name="fullName"
                placeholder="John Smith"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="username@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRight}>
            <div className={styles.profileSection}>
              <label className={styles.profileLabel}>Profile Picture</label>
              <div className={styles.profilePicContainer}>
                <div className={styles.profilePic}>
                  {profilePic ? (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className={styles.profilePreview}
                    />
                  ) : (
                    <div className={styles.placeholder}></div>
                  )}
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="file-input"
                  style={{ display: "none" }}
                />
                <label htmlFor="file-input" className={styles.uploadBtn}>
                  Upload Image
                </label>
              </div>
              <p className={styles.orText}>or</p>
              <label className={styles.avatarLabel}>Select Avatar</label>
              <div className={styles.avatarOptions}>
                <img
                  src={boyAvatar}
                  alt="Avatar 1"
                  className={styles.avatar}
                  onClick={() => handleAvatarSelect(boyAvatar)} // Set profile picture to boy avatar on click
                />
                <img
                  src={girlAvatar}
                  alt="Avatar 2"
                  className={styles.avatar}
                  onClick={() => handleAvatarSelect(girlAvatar)} // Set profile picture to girl avatar on click
                />
                <img
                  src={man}
                  alt="Avatar 3"
                  className={styles.avatar}
                  onClick={() => handleAvatarSelect(man)} // Set profile picture to man avatar on click
                />
                <img
                  src={woman}
                  alt="Avatar 4"
                  className={styles.avatar}
                  onClick={() => handleAvatarSelect(woman)} // Set profile picture to woman avatar on click
                />
              </div>
            </div>
          </div>
        </div>

        {errors && <div className={styles.errorMessage}>{errors}</div>}

        <button type="submit" className={styles.registerBtn}>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
