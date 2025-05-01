package com.pafproject.backend.repository;

import com.pafproject.backend.models.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByInstructor_Username(String username); // Correct method to fetch courses by instructor's username
}
