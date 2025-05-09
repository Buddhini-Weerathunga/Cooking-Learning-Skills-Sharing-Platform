import React, { useEffect } from "react";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaHandsHelping } from "react-icons/fa";
import { FaBookOpen } from "react-icons/fa";

import { FaVideo } from "react-icons/fa";
import Carousel from "bootstrap/js/dist/carousel";
import "../App.css"; // If you have your styles in App.css

const HomePage = () => {
  useEffect(() => {
    const carouselElement = document.querySelector("#carouselExampleFade");
    if (carouselElement) {
      new Carousel(carouselElement, {
        interval: 5000,
        ride: "carousel",
        pause: true,
        wrap: true,
      });
    }
  }, []);

  return (
    <div>
      <Navbar />

      <section
        style={{
          height: "100vh",
          backgroundColor: "#fef6f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 5%",
          flexWrap: "wrap",
        }}
      >
        <div style={{ flex: "1 1 50%", textAlign: "left", marginTop: "5px" }}>
          <h1 style={{ fontFamily: "'Madimi One'", fontSize: "110px" }}>
            Welcome to <span style={{ color: "#ff6804" }}>EasyChef...</span>
          </h1>

          <h1
            style={{
              fontFamily: "'Madimi One'",
              fontSize: "27px",
              color: "rgb(245, 144, 77)",
            }}
          >
            " Unlock step-by-step tutorials, delicious recipes, and expert tips
            to become a confident cook—whether you're a beginner or a kitchen
            pro! "
          </h1>
          <br />
          <div style={{ display: "flex", gap: "20px" }}>
            <button
              type="button"
              className="btn bg-lg"
              style={{
                height: "50px",
                width: "150px",
                borderColor: "#ff6804",
                fontSize: "20px",
                color: "#ff6804",
              }}
            >
              Get Started
            </button>
            <Link to="/certifications">
              <button
                type="button"
                className="btn bg-lg"
                style={{
                  height: "50px",
                  width: "150px",
                  borderColor: "#ff6804",
                  fontSize: "20px",
                  color: "#ff6804",
                }}
              >
                Certificates
              </button>
            </Link>
          </div>
        </div>

        <div style={{ flex: "1 1 50%" }}>
          <div
            id="carouselExampleFade"
            className="carousel slide carousel-fade"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="/images/1.png"
                  className="d-block w-100"
                  alt="Slide 1"
                  style={{
                    marginTop: "30px",
                    height: "500px",
                    width: "500px",

                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/2.png"
                  className="d-block w-100"
                  alt="Slide 2"
                  style={{
                    marginTop: "30px",
                    height: "650px",
                    width: "650px",
                    borderRadius: "10px",
                  }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src="/images/3.png"
                  className="d-block w-100"
                  alt="Slide 3"
                  style={{
                    marginTop: "30px",
                    height: "650px",
                    width: "650px",
                    borderRadius: "10px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <hr
        style={{
          border: "none",
          borderTop: "6px dotted #ff6804",
          width: "100%",
          margin: "0 auto",
        }}
      />
      <section
        style={{
          height: "auto",
          padding: "80px 5%",
          backgroundColor: "#ffedd5",
        }}
      >
        <h2
          style={{
            fontFamily: "'Madimi One'",
            fontSize: "50px",
            color: "rgb(245, 144, 77)",
            textAlign: "center",
            marginBottom: "50px",
          }}
        >
          Our Services
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Left Column - Video */}
          <div
            style={{
              flex: "1 1 45%",
              textAlign: "center",
              padding: "20px",
              backgroundColor: "#ffedd5",
            }}
          >
            <video
              width="100%"
              height="350"
              controls
              style={{
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <source src="/videos/home.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          {/* Right Column - Cards */}
          <div
            style={{
              flex: "1 1 45%",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            {/* Card 1 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h4
                style={{
                  color: "#ff6804",
                  fontFamily: "'Madimi One', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaVideo style={{ color: "#ff6804" }} />
                Live Cooking Classes
              </h4>

              <p
                style={{
                  fontFamily: "'Madimi One', sans-serif",
                  fontSize: "16px",
                  color: "rgb(132, 120, 112)",
                }}
              >
                Join live sessions with expert chefs and improve your skills in
                real-time.
              </p>
            </div>

            {/* Card 2 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h4
                style={{
                  color: "#ff6804",
                  fontFamily: "'Madimi One', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaHandsHelping style={{ color: "#ff6804" }} />
                Skill Sharing
              </h4>

              <p
                style={{
                  fontFamily: "'Madimi One', sans-serif",
                  fontSize: "16px",
                  color: "rgb(132, 120, 112)",
                }}
              >
                Learn from the community and share your unique cooking tips and
                recipes.
              </p>
            </div>

            {/* Card 3 */}
            <div
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <h4
                style={{
                  color: "#ff6804",
                  fontFamily: "'Madimi One', sans-serif",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <FaBookOpen style={{ color: "#ff6804" }} />
                Recipe Library
              </h4>

              <p
                style={{
                  fontFamily: "'Madimi One', sans-serif",
                  fontSize: "16px",
                  color: "rgb(132, 120, 112)",
                }}
              >
                Access a rich library of recipes sorted by cuisine, ingredients,
                and more.
              </p>
            </div>
          </div>
        </div>
      </section>
      <hr
        style={{
          border: "none",
          borderTop: "6px dotted #ff6804",
          width: "100%",
          margin: "0 auto",
        }}
      />
      <section
        style={{
          height: "100vh",
          padding: "80px 20px",
          backgroundColor: "#fef6f0",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: "'Madimi One'",
            fontSize: "50px",
            color: "rgb(245, 144, 77)",
            marginTop: "-20px",
          }}
        >
          Popular Courses
        </h2>
      </section>
      <hr
        style={{
          border: "none",
          borderTop: "6px dotted #ff6804",
          width: "100%",
          margin: "0 auto",
        }}
      />
    </div>
  );
};

export default HomePage;
