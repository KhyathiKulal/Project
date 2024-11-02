import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Boarding.module.css";
import joinIcon from "../../assets/images/join.jpg"; //you have an icon for joining
import createIcon from "../../assets/images/create.jpeg"; // Ensure you have an icon for creating

function Boarding() {
  const navigate = useNavigate();

  const handleJoin = () => {
    navigate("/join"); // Navigate to the registration page
  };

  const handleCreate = () => {
    navigate("/canvas"); // Navigate to the create account page (you might need to create this route)
  };

  return (
    <div className={styles.boardingContainer}>
      <h1>Welcome</h1>
      <p>Want to join or create something new?</p>
      <div className={styles.options}>
        <div className={styles.option} onClick={handleJoin}>
          <img src={joinIcon} alt="Join Icon" className={styles.icon} />
          <span>Join</span>
        </div>
        <div className={styles.option} onClick={handleCreate}>
          <img src={createIcon} alt="Create Icon" className={styles.icon} />
          <span>Create</span>
        </div>
      </div>
    </div>
  );
}

export default Boarding;
