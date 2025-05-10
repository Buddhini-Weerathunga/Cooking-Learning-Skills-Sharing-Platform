package com.pafproject.backend.controller;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.models.Enrollment;
import com.pafproject.backend.models.Student;
import com.pafproject.backend.repository.CourseRepository;
import com.pafproject.backend.repository.EnrollmentRepository;
import com.pafproject.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/enrollments")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @PostMapping("/{courseId}")
    public Enrollment enrollStudent(@PathVariable Long courseId, @RequestBody Student studentData) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        // Check if student already exists by email or NIC
        Optional<Student> existingStudent = studentRepo.findByEmail(studentData.getEmail());
        Student student = existingStudent.orElseGet(() -> studentRepo.save(studentData));

        Enrollment enrollment = new Enrollment(student, course);
        return enrollmentRepo.save(enrollment);
    }

    @GetMapping
    public List<Map<String, String>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentRepo.findAll();
        List<Map<String, String>> response = new ArrayList<>();

        for (Enrollment e : enrollments) {
            Map<String, String> map = new HashMap<>();
            map.put("course", e.getCourse().getTitle());
            map.put("student", e.getStudent().getName());
            response.add(map);
        }
        return response;
    }

    @GetMapping("/courses")
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }
}
