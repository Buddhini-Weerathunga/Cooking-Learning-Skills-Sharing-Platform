// src/Components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main style={{ minHeight: "80vh", paddingTop: "130px" }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
