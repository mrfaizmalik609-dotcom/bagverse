import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../Firebase";
import { useNavigate, Link } from "react-router-dom";
import signupImage from "../assets/images/signup-image.png"; // ✅ Make sure this path is correct

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);

      alert("Signup successful! Verification email sent. Please check your inbox.");
      navigate("/login");
    } catch (error) {
      alert("Signup failed: " + error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        padding: "40px 0",
        marginTop: "80px", // Space below fixed header
      }}
    >
      <div
        className="d-flex flex-column flex-md-row shadow rounded overflow-hidden"
        style={{
          backgroundColor: "#fff",
          maxWidth: "1100px", // Wider box
          width: "100%",
          minHeight: "500px",
        }}
      >
        {/* Left Side Image */}
        <div className="d-none d-md-block" style={{ flex: "1" }}>
          <img
            src={signupImage}
            alt="Signup"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Right Side Signup Form */}
        <form
          onSubmit={handleSignup}
          className="p-4 d-flex flex-column justify-content-center"
          style={{
            flex: "1",
          }}
        >
          <h3 className="text-center mb-4" style={{ color: "#0a0f2c" }}>
            𝕾𝖎𝖌𝖓 𝖚𝖕
          </h3>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Confirm Password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <button type="submit" className="btn btn-primary w-100 mb-3">
            𝕾𝖎𝖌𝖓 𝖚𝖕
          </button>

          <div className="text-center">
            Already have an account?{" "}
            <Link to="/login" className="text-decoration-none">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
