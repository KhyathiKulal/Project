import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
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
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formRight}>
            <div className={styles.profileSection}>
              <label>Profile Picture</label>
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
