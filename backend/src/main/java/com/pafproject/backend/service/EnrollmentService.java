package com.pafproject.backend.service;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.models.Enrollment;
import com.pafproject.backend.models.Student;
import com.pafproject.backend.repository.CourseRepository;
import com.pafproject.backend.repository.EnrollmentRepository;
import com.pafproject.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepo;

    @Autowired
    private StudentRepository studentRepo;

    @Autowired
    private CourseRepository courseRepo;

    public Enrollment enrollStudentToCourse(Long courseId, Student studentData) {
        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + courseId));

        Student student = studentRepo.save(studentData);

        Enrollment enrollment = new Enrollment();
        enrollment.setCourse(course);
        enrollment.setStudent(student);

        return enrollmentRepo.save(enrollment);
    }

    public List<Map<String, String>> getAllEnrollments() {
        List<Enrollment> enrollments = enrollmentRepo.findAll();
        List<Map<String, String>> results = new ArrayList<>();

        for (Enrollment e : enrollments) {
            Map<String, String> map = new HashMap<>();
            map.put("course", e.getCourse().getTitle());
            map.put("student", e.getStudent().getName());
            results.add(map);
        }

        return results;
    }
}
