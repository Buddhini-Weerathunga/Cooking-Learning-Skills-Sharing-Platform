package com.pafproject.backend.service;

import com.pafproject.backend.models.Course;
import com.pafproject.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepo;

    public Course createCourse(Course course) {
        return courseRepo.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepo.findAll();
    }

    public Course updateCourse(Long id, Course updated) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found with id: " + id));

        course.setTitle(updated.getTitle());
        course.setDescription(updated.getDescription());
        course.setContent(updated.getContent());
        course.setPrice(updated.getPrice());
        course.setStartDate(updated.getStartDate());
        course.setEndDate(updated.getEndDate());

        return courseRepo.save(course);
    }

    public void deleteCourse(Long id) {
        if (!courseRepo.existsById(id)) {
            throw new RuntimeException("Course not found with id: " + id);
        }
        courseRepo.deleteById(id);
    }
}

