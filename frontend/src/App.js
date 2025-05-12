import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EnrollForm from "./Components/EnrollForm";
import EnrollmentList from "./Components/EnrollmentList";

import HomePage from "./Pages/Home";
import Dashboard from "./Pages/Dashboard";
import CourseView from "./Components/CourseView";
import UpdateCourse from "./Components/UpdateCourse";
import CreateCOurse from "./Components/createcourse";
import View from "./Components/view";
import InstructorLogin from "./Pages/instructorLogin";

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
