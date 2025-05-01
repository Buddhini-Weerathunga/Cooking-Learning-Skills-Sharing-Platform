import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        background: "linear-gradient(to right, #ffedd5, #fff0e6)",
        padding: "20px 0",
        textAlign: "center",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <FaFacebook style={iconStyle} />
        <FaTwitter style={iconStyle} />
        <FaInstagram style={iconStyle} />
        <FaLinkedin style={iconStyle} />
        <FaYoutube style={iconStyle} />
      </div>
      <p style={{ color: "#555", margin: "0", fontSize: "14px" }}>
        © {new Date().getFullYear()} EasyChef. All rights reserved.
      </p>
    </footer>
  );
};

const iconStyle = {
  fontSize: "24px",
  margin: "0 10px",
  color: "#ff6804",
  cursor: "pointer",
};

export default Footer;
