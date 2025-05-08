package com.pafproject.backend.service;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.models.User;
import com.pafproject.backend.repository.CourseRepository;
import com.pafproject.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepo;

    @Autowired
    private UserRepository userRepo;

    // Method to create a course
    public Course createCourse(String username, Course course) {
        User instructor = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        course.setInstructor(instructor);
        return courseRepo.save(course);
    }

    // Method to get courses by instructor username
    public List<Course> getCoursesByInstructor(String username) {
        return courseRepo.findByInstructor_Username(username);
    }
    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }
    

    // Method to delete a course by its ID
    public void deleteCourse(Long id) {
        // Check if the course exists
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with ID: " + id));

        // Delete the course
        courseRepo.delete(course);
    }
}
