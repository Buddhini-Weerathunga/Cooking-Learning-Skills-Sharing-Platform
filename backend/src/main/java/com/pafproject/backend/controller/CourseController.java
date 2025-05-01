package com.pafproject.backend.controller;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseService courseService;

    // Endpoint for instructor to create a course
    @PostMapping("/create")
    public Course createCourse(@RequestBody Course course, @RequestParam String username) {
        return courseService.createCourse(username, course);
    }

    // Endpoint to get all courses created by a specific instructor
    @GetMapping("/instructor")
    public List<Course> getCoursesByInstructor(@RequestParam String username) {
        return courseService.getCoursesByInstructor(username);
    }

    // Endpoint to delete a course by its ID
    @DeleteMapping("/delete")
    public void deleteCourse(@RequestParam Long id) {
        courseService.deleteCourse(id);
    }
}
