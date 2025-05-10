package com.pafproject.backend.service;

import com.pafproject.backend.models.Student;
import com.pafproject.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepo;

    public Student createStudent(Student student) {
        return studentRepo.save(student);
    }

    public Student getStudentById(Long id) {
        return studentRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found with id: " + id));
    }
}
