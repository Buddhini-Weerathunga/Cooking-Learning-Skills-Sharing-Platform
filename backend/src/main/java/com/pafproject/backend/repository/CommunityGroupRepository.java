package com.pafproject.backend.repository;

import com.pafproject.backend.models.CommunityGroup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityGroupRepository extends JpaRepository<CommunityGroup, Long> {
}

