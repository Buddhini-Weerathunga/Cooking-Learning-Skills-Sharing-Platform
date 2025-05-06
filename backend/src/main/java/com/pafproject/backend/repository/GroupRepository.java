package com.pafproject.backend.repository;

import com.pafproject.backend.models.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GroupRepository extends JpaRepository<Group, Long> {
    List<Group> findByCreator_Username(String username); // Get groups by creator username
}

