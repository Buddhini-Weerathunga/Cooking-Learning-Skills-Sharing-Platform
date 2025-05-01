import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import View from "./Pages/Items/view";
import Create from "./Pages/Items/create";
import Edit from "./Pages/Items/edit";
import HomePage from "./Pages/Home";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import StudentDashboard from "./Pages/StudentDashboard";
import ListPost from "./Pages/Posts/ListPost";
import Dashboard from "./Pages/Dashboard";
import CreatePost from "./Pages/Posts/CreatePost";
import UpdatePost from "./Pages/Posts/UpdatePost";
import CreateCommunityGroup from "./Pages/Admin/CommunityGroup/Create";
import InstructorDashboard from "./Pages/InstructorDashboard";
import CertificationList from "./Pages/Certifications/list";
import CertificationCreate from "./Pages/Certifications/create";
import CertificationEdit from "./Pages/Certifications/edit";
import CertificationDetail from "./Pages/Certifications/detail";
import Navbar from './Components/Navbar';
import CommunityRoutes from './routes/CommunityRoutes';
import ErrorBoundary from './Components/ErrorBoundary';

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/view" element={<View />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<StudentDashboard />} />

          <Route path="/instructor" element={<Dashboard />} />

          <Route path="/post/list" element={<ListPost />} />
          <Route path="/post/create" element={<CreatePost />} />
          <Route path="/post/update/:id" element={<UpdatePost />} />
          <Route
            path="/community-group/create"
            element={<CreateCommunityGroup />}
          />

          <Route path="/certifications" element={<CertificationList />} />
          <Route
            path="/certifications/create"
            element={<CertificationCreate />}
          />
          <Route
            path="/certifications/edit/:id"
            element={<CertificationEdit />}
          />
          <Route path="/certifications/:id" element={<CertificationDetail />} />
          <Route path="/certifications" element={<CertificationList />} />
          <Route path="/community/*" element={<CommunityRoutes />} />
        </Routes>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
