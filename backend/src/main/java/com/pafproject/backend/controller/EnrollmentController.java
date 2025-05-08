package com.pafproject.backend.controller;

import com.pafproject.backend.models.Enrollment;
import com.pafproject.backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    // Enroll a student in a course
    @PostMapping("/enroll")
    public Enrollment enroll(@RequestParam Long courseId, @RequestBody Enrollment enrollment) {
        return enrollmentService.enrollStudent(courseId, enrollment);
    }

    // Get all enrollments for a course
    @GetMapping("/by-course")
    public List<Enrollment> getEnrollmentsByCourse(@RequestParam Long courseId) {
        return enrollmentService.getEnrollmentsByCourse(courseId);
    }
}
