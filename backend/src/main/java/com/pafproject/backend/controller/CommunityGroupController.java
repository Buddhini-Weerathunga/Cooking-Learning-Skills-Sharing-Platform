package com.pafproject.backend.controller;

import com.pafproject.backend.models.CommunityGroup;
import com.pafproject.backend.repository.CommunityGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/community-groups")
public class CommunityGroupController {

    @Autowired
    private CommunityGroupRepository communityGroupRepository;

    @GetMapping
    public List<CommunityGroup> getAllGroups() {
        return communityGroupRepository.findAll();
    }

    @PostMapping
    public CommunityGroup createGroup(@RequestBody CommunityGroup communityGroup) {
        return communityGroupRepository.save(communityGroup);
    }

    @GetMapping("/{id}")
    public CommunityGroup getGroupById(@PathVariable Long id) {
        return communityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community Group not found with id: " + id));
    }

    @PutMapping("/{id}")
    public CommunityGroup updateGroup(@PathVariable Long id, @RequestBody CommunityGroup groupDetails) {
        CommunityGroup group = communityGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Community Group not found with id: " + id));
        group.setName(groupDetails.getName());
        group.setDescription(groupDetails.getDescription());
        return communityGroupRepository.save(group);
    }

    @DeleteMapping("/{id}")
    public void deleteGroup(@PathVariable Long id) {
        if (!communityGroupRepository.existsById(id)) {
            throw new RuntimeException("Community Group not found with id: " + id);
        }
        communityGroupRepository.deleteById(id);
    }
}
