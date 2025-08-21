import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import LoginImage from "../assets/images/login-image.png"; // ✅ Correct path

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        alert("Please verify your email before logging in.");
        return;
      }

      alert("Login successful!");
      navigate("/");
    } catch (error) {
      alert("Login failed: " + error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "40px 0",
        marginTop: "80px",
      }}
    >
      <div
        className="d-flex flex-column flex-md-row shadow rounded overflow-hidden"
        style={{
          backgroundColor: "#fff",
          maxWidth: "1100px",
          width: "100%",
          minHeight: "500px",
        }}
      >
        {/* Left Side Image */}
        <div className="d-none d-md-block" style={{ flex: "1" }}>
          <img
            src={LoginImage}
            alt="Login"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Side Login Form */}
        <form
          onSubmit={handleLogin}
          className="p-4 d-flex flex-column justify-content-center"
          style={{ flex: "1" }}
        >
          <h3 className="text-center mb-4" style={{ color: "#0a0f2c" }}>
            𝕷𝖔𝖌𝖎𝖓
          </h3>

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-1"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-end mb-3">
            <Link
              to="/forgot-password"
              className="text-decoration-none"
              style={{ fontSize: "14px", color: "blue" }}
            >
              Forgot Password?
            </Link>
          </div>

          <button type="submit" className="btn btn-primary w-100 mb-3">
            𝕷𝖔𝖌𝖎𝖓
          </button>

          <div className="text-center">
            <span>Don’t have an account? </span>
            <Link to="/signup" className="text-decoration-none">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
