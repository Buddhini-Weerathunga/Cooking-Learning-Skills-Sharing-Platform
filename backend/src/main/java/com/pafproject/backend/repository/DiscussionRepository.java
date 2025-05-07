package com.pafproject.backend.repository;

import com.pafproject.backend.models.Discussion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscussionRepository extends JpaRepository<Discussion, Long> {
} 