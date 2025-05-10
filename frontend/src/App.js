import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollForm from "./components/EnrollForm";
import EnrollmentList from "./components/EnrollmentList";

import HomePage from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CourseView from "./components/CourseView";
import UpdateCourse from "./components/UpdateCourse";
import CreateCOurse from "./components/createcourse";
import View from "./components/view";
import InstructorLogin from "./pages/instructorLogin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/courses" element={<CourseView />} />
        <Route path="/course/create" element={<CreateCOurse />} />
        <Route path="/instructor/login" element={<InstructorLogin />} />
        <Route path="/course/view/:id" element={<View />} />
        <Route path="/course/update/:id" element={<UpdateCourse />} />
        <Route path="/enroll" element={<EnrollForm />} />
        <Route path="/enroll/list" element={<EnrollmentList />} />
      </Routes>
    </Router>
  );
}

export default App;
