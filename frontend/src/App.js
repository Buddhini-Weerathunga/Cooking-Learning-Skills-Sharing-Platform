import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InstructorDashboard from "./Pages/Instructor";
import CourseForm from "./Pages/CourseForm";
import CourseList from "./Pages/CourseList";
import CourseDetail from "./Pages/CourseDetail";
import EnrollForm from "./Pages/EnrollForm";
import Course from "./Pages/course";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InstructorDashboard />} />
        <Route path="/create" element={<CourseForm />} />
        <Route path="/edit/:id" element={<CourseForm />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<CourseDetail />} />
        <Route path="/enroll/:id" element={<EnrollForm />} />
        <Route path="/co" element={<Course />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
