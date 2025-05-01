package com.pafproject.backend.repository;

import com.pafproject.backend.models.Certification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {
    // Search by title or description
    @Query("SELECT c FROM Certification c WHERE LOWER(c.title) LIKE LOWER(CONCAT('%', ?1, '%')) OR LOWER(c.description) LIKE LOWER(CONCAT('%', ?1, '%'))")
    List<Certification> search(String keyword);

    // Filter by level
    List<Certification> findByLevelIgnoreCase(String level);
    
    // Find by estimated hours less than or equal to
    List<Certification> findByEstimatedHoursLessThanEqual(Integer hours);
}