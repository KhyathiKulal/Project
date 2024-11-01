import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    const loginData = {
      email,
      password,
    };

    console.log("Login Data:", loginData);

    navigate("/boarding");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginLeft}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email</label>
            <input
              type="email"
              placeholder="username@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.forgotPassword}>
            <a href="#">Forgot Password?</a>
          </div>
          {error && <div className={styles.errorMessage}>{error}</div>}
          <button type="submit" className={styles.loginBtn}>
            Sign in
          </button>
        </form>
        <p className={styles.registerLink}>
          Don’t have an account yet?{" "}
          <Link to="/register" className={styles.registerLinkText}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
