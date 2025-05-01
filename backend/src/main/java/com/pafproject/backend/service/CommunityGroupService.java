package com.pafproject.backend.service;

import com.pafproject.backend.models.CommunityGroup;
import com.pafproject.backend.repository.CommunityGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommunityGroupService {

    @Autowired
    private CommunityGroupRepository communityGroupRepository;

    // Get all groups
    public List<CommunityGroup> getAllGroups() {
        return communityGroupRepository.findAll();
    }

    // Create a new group
    public CommunityGroup createGroup(CommunityGroup communityGroup) {
        return communityGroupRepository.save(communityGroup);
    }

    // Get a group by ID
    public CommunityGroup getGroupById(Long id) {
        return communityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community Group not found with id: " + id));
    }

    // Update a group
    public CommunityGroup updateGroup(Long id, CommunityGroup groupDetails) {
        CommunityGroup group = communityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community Group not found with id: " + id));
        group.setName(groupDetails.getName());
        group.setDescription(groupDetails.getDescription());
        return communityGroupRepository.save(group);
    }

    // Delete a group
    public void deleteGroup(Long id) {
        if (!communityGroupRepository.existsById(id)) {
            throw new RuntimeException("Community Group not found with id: " + id);
        }
        communityGroupRepository.deleteById(id);
    }
}

