package com.pafproject.backend.repository;

import com.pafproject.backend.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GroupRepository extends JpaRepository<Group, Long> {
} 