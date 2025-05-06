package com.pafproject.backend.service;

import com.pafproject.backend.models.Group;
import com.pafproject.backend.models.User;
import com.pafproject.backend.repository.GroupRepository;
import com.pafproject.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupService {

    @Autowired
    private GroupRepository groupRepo;

    @Autowired
    private UserRepository userRepo;

    // Method to create a group
    public Group createGroup(String username, Group group) {
        User creator = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        group.setCreator(creator); // Set the creator of the group
        return groupRepo.save(group); // Save the group to the database
    }

    // Method to get all groups created by a specific user
    public List<Group> getGroupsByCreator(String username) {
        return groupRepo.findByCreator_Username(username);
    }

    // Method to get all groups (public)
    public List<Group> getAllGroups() {
        return groupRepo.findAll();
    }

    // Method to delete a group
    public void deleteGroup(Long id) {
        Group group = groupRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + id));
        groupRepo.delete(group);
    }

    // Method to update an existing group
    public Group updateGroup(Long id, Group updatedGroup) {
        Group existingGroup = groupRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Group not found with ID: " + id));

        // Update fields with the new data from updatedGroup
        existingGroup.setName(updatedGroup.getName());
        existingGroup.setDescription(updatedGroup.getDescription());
        existingGroup.setCategory(updatedGroup.getCategory());
        existingGroup.setGroupRules(updatedGroup.getGroupRules());
        existingGroup.setPrivateGroup(updatedGroup.getPrivateGroup());

        // Save the updated group to the database
        return groupRepo.save(existingGroup);
    }
}
