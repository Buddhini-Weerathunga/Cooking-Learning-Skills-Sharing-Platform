import React from "react";
function StudentDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <h1>Welcome, {user?.username}</h1>
      <p>Role: {user?.role}</p>
      {/* More user-specific content here */}
    </div>
  );
}
export default StudentDashboard;
