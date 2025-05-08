package com.pafproject.backend.service;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.models.Enrollment;
import com.pafproject.backend.repository.CourseRepository;
import com.pafproject.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private CourseRepository courseRepository;

    public Enrollment enrollStudent(Long courseId, Enrollment enrollment) {
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));
        enrollment.setCourse(course);
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getEnrollmentsByCourse(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }
}
