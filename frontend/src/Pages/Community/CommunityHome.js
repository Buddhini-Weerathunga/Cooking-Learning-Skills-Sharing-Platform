import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CommunityHome = () => {
  const [groups, setGroups] = useState([]);
  const [showEditSuccess, setShowEditSuccess] = useState(false);

  const fetchGroups = () => {
    axios.get("http://localhost:8080/api/groups").then((res) => setGroups(res.data));
  };

  useEffect(() => {
    fetchGroups();
    // Listen for the custom event to refresh groups after edit
    const handler = () => fetchGroups();
    window.addEventListener('groupsUpdated', handler);
    // Show success alert if redirected from edit
    if (localStorage.getItem('groupEditSuccess')) {
      setShowEditSuccess(true);
      localStorage.removeItem('groupEditSuccess');
      setTimeout(() => setShowEditSuccess(false), 3000);
    }
    return () => window.removeEventListener('groupsUpdated', handler);
  }, []);

  const handleDelete = async (groupId) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      await axios.delete(`http://localhost:8080/api/groups/${groupId}`);
      setGroups((prev) => prev.filter((g) => g.id !== groupId));
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #fff7e6 0%, #ffe0b2 100%)", paddingTop: "90px" }}>
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="display-4 fw-bold" style={{ color: "#ff9800", letterSpacing: 1 }}>
            <span role="img" aria-label="chef hat" style={{ fontSize: 40, verticalAlign: "middle" }}>
              🍳
            </span>{" "}
            Easy Chef Community Groups
          </h1>
          <p className="lead" style={{ color: "#795548" }}>
            Discover, join, and create groups to share your cooking passion!
          </p>
        </div>
        {showEditSuccess && (
          <div className="alert alert-success text-center fw-bold">Group updated successfully!</div>
        )}
        <div className="d-flex justify-content-end align-items-center mb-4">
          <Link to="/community/groups/create">
            <button className="btn btn-lg btn-warning shadow-sm fw-bold">
              + Create New Group
            </button>
          </Link>
        </div>
        {groups.length === 0 ? (
          <div className="alert alert-info text-center">No groups found. Be the first to create one!</div>
        ) : (
          <div className="row g-4">
            {groups.map((g) => (
              <div className="col-md-6 col-lg-4" key={g.id}>
                <div className="card h-100 shadow group-card" style={{ border: "none", borderRadius: 24, minHeight: 320, transition: "transform 0.2s, box-shadow 0.2s" }}>
                  <div className="card-body d-flex flex-column p-4 group-card-bg">
                    <h5 className="card-title fw-bold" style={{ color: "#ff9800", fontSize: 28 }}>{g.name}</h5>
                    <p className="card-text text-truncate" style={{ color: "#6d4c41", fontSize: 18 }}>{g.description}</p>
                    <span className="badge bg-secondary mb-2 category-badge" style={{ background: "#ffe0b2", color: "#ff9800" }}>{g.category || "No Category"}</span>
                    <div className="mt-auto d-flex flex-column gap-2 align-items-center">
                      <Link to={`/community/groups/${g.id}`} className="btn view-btn mb-1 fw-bold" style={{ fontSize: 16, maxWidth: 220 }}>
                        View Details
                      </Link>
                      <div className="d-flex gap-2 justify-content-center">
                        <Link to={`/community/groups/${g.id}/edit`} className="btn edit-btn fw-bold" style={{ fontSize: 13, padding: "4px 18px", minWidth: 80 }}>
                          Edit
                        </Link>
                        <button className="btn delete-btn fw-bold" style={{ fontSize: 13, padding: "4px 18px", minWidth: 80 }} onClick={() => handleDelete(g.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <style>{`
        .group-card {
          /* ...existing styles... */
        }
        .group-card-bg {
          background: #ffe0b2 !important;
          border-radius: 18px !important;
          border: 1.5px solid #ffb74d !important;
        }
        .group-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 8px 32px 0 rgba(255, 152, 0, 0.15);
        }
        .category-badge {
          font-size: 18px !important;
          padding: 10px 26px !important;
          border-radius: 14px !important;
          font-weight: 600 !important;
        }
        .view-btn {
          background: #ff9800 !important;
          color: #fff !important;
          border: none !important;
        }
        .view-btn:hover {
          background: #f57c00 !important;
          color: #fff !important;
        }
        .edit-btn {
          background: #0288d1 !important;
          color: #fff !important;
          border: none !important;
        }
        .edit-btn:hover {
          background: #01579b !important;
          color: #fff !important;
        }
        .delete-btn {
          background: #d32f2f !important;
          color: #fff !important;
          border: none !important;
        }
        .delete-btn:hover {
          background: #b71c1c !important;
          color: #fff !important;
        }
      `}</style>
    </div>
  );
};

export default CommunityHome;
