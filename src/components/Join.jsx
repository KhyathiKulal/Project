import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Join.module.css";

function Join() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    joinCode: "",
  });
  const [errors, setErrors] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.name || !formData.joinCode) {
      setErrors("Both fields are required.");
      return;
    }

    // Proceed with form submission logic or navigate somewhere else
    console.log("Join Form Data:", formData);
    navigate("/welcome"); // Adjust this path as needed
  };

  return (
    <div className={styles.joinContainer}>
      {/* Error message positioned at the top, centered */}
      {errors && <div className={styles.errorMessage}>{errors}</div>}

      <h1>Join</h1>
      <p>Please enter your name and join code to proceed.</p>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.inputGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Join Code</label>
          <input
            type="text"
            name="joinCode"
            placeholder="Enter Join Code"
            value={formData.joinCode}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className={styles.joinBtn}>
          Join
        </button>
      </form>
    </div>
  );
}

export default Join;
