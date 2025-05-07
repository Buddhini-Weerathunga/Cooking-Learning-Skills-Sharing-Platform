// src/Components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => (
  <div>
    <Navbar />
    <main style={{ minHeight: 0, paddingTop: "70px", paddingBottom: 0 }}>{children}</main>
    <Footer />
  </div>
);

export default Layout;
