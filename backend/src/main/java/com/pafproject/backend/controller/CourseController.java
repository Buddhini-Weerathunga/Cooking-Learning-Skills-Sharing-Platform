package com.pafproject.backend.controller;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/courses")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    @Autowired
    private CourseRepository courseRepo;

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Course course) {
        if (course.getStartDate() == null || course.getEndDate() == null) {
            return ResponseEntity.badRequest().body("Start date and end date are required.");
        }
        try {
            Course savedCourse = courseRepo.save(course);
            return ResponseEntity.status(201).body(savedCourse);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating course: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAll() {
        try {
            List<Map<String, Object>> courses = courseRepo.findAll().stream().map(course -> {
                Map<String, Object> map = new HashMap<>();
                map.put("id", course.getId());
                map.put("title", course.getTitle());
                map.put("description", course.getDescription());
                map.put("content", course.getContent());
                map.put("price", course.getPrice());
                map.put("startDate", course.getStartDate());
                map.put("endDate", course.getEndDate());
                return map;
            }).collect(Collectors.toList());
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}")
public ResponseEntity<?> getCourseById(@PathVariable Long id) {
    Optional<Course> courseOpt = courseRepo.findById(id);
    if (courseOpt.isPresent()) {
        Course course = courseOpt.get();
        Map<String, Object> courseData = new HashMap<>();
        courseData.put("id", course.getId());
        courseData.put("title", course.getTitle());
        courseData.put("description", course.getDescription());
        courseData.put("content", course.getContent());
        courseData.put("price", course.getPrice());
        courseData.put("startDate", course.getStartDate());
        courseData.put("endDate", course.getEndDate());
        return ResponseEntity.ok(courseData);
    } else {
        return ResponseEntity.status(404).body("Course not found with id: " + id);
    }
}

    

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Course updatedCourse) {
        return courseRepo.findById(id).map(course -> {
            course.setTitle(updatedCourse.getTitle());
            course.setDescription(updatedCourse.getDescription());
            course.setContent(updatedCourse.getContent());
            course.setPrice(updatedCourse.getPrice());
            course.setStartDate(updatedCourse.getStartDate());
            course.setEndDate(updatedCourse.getEndDate());
            try {
                return ResponseEntity.ok(courseRepo.save(course));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Error updating course: " + e.getMessage());
            }
        }).orElse(ResponseEntity.status(404).body("Course not found with id: " + id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!courseRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Course not found with id: " + id);
        }
        try {
            courseRepo.deleteById(id);
            return ResponseEntity.ok("Course deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting course: " + e.getMessage());
        }
    }
}
