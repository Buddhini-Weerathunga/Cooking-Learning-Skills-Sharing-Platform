import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBell } from "react-icons/fa";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  return (
    <nav
      className="navbar navbar-expand-lg navbar  sticky-top shadow-sm"
      style={{
        padding: "10px 20px",
        height: "80px", // ✅ Fixed height
        overflow: "hidden",
        background: "linear-gradient(to right, #ffedd5, #fff0e6)",
      }}
    >
      <div className="container-fluid d-flex justify-content-between align-items-center h-100">
        {/* Logo on the left */}
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{
            height: "90px", // ✅ Smaller size
            width: "90px",
            objectFit: "contain",
          }}
        />

        {/* Greeting in the center */}
        <span
          className="navbar-text  fs-5 mx-auto text-center"
          style={{
            fontFamily: "'Madimi One', sans-serif",
            color: "black",
            fontWeight: "300",
            wordSpacing: "5px", // Increase space between words
            letterSpacing: "1px",
          }}
        >
          Hello <span style={{ color: "#ff6804" }}>{user.username}</span> ,
          Welcome to your dashboard.
        </span>

        {/* Icons on the right */}
        <div className="d-flex align-items-center">
          {/* Notification Button */}
          <button
            className="btn btn-dark me-3 position-relative"
            title="Notifications"
          >
            <FaBell size={20} color="white" />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "10px" }}
            >
              3
            </span>
          </button>

          {/* Profile Image (Circular) */}
          <img
            src="/images/admin.jpg"
            alt="Profile"
            className="rounded-circle"
            style={{
              width: "40px",
              height: "40px",
              objectFit: "cover",
              border: "2px solid #00000020",
            }}
            title="Profile"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
