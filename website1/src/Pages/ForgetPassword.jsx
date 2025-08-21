import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../Firebase";
import { Link } from "react-router-dom";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(`🔒 A password reset link has been sent to: ${email}`);
    } catch (error) {
      setMessage("❌ Error: " + error.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        paddingTop: "80px",
        paddingBottom: "80px",
        backgroundColor: "#f4f4f4",
      }}
    >
      <form
        onSubmit={handleReset}
        className="p-4 rounded shadow"
        style={{
          width: "100%",
          maxWidth: "600px",  // ✅ Only one maxWidth
          backgroundColor: "#fff",
          height: "300px",
        }}
      >
        <h3 className="text-center mb-4" style={{ color: "#0a0f2c" }}>
          Reset Password
        </h3>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-warning w-100 mb-3">
          Send Reset Email
        </button>

        {message && (
          <div
            className="alert alert-info text-center"
            style={{ fontSize: "14px" }}
          >
            {message}
          </div>
        )}

        <div className="text-center mt-3">
          <span>Don’t have an account? </span>
          <Link to="/signup" className="text-decoration-none">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}

export default ForgetPassword;
