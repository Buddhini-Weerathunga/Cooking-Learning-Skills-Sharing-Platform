package com.pafproject.backend.controller;

import com.pafproject.backend.models.Group;
import com.pafproject.backend.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin(origins = "*")
public class GroupController {

    @Autowired
    private GroupService groupService;

    // Endpoint to create a new group
    @PostMapping("/create")
    public Group createGroup(@RequestBody Group group, @RequestParam String username) {
        return groupService.createGroup(username, group);
    }

    // Endpoint to get all groups created by a specific user (username)
    @GetMapping("/user")
    public List<Group> getGroupsByUser(@RequestParam String username) {
        return groupService.getGroupsByCreator(username);
    }

    // Endpoint to get all groups (public)
    @GetMapping("/all")
    public List<Group> getAllGroups() {
        return groupService.getAllGroups();
    }

    // Endpoint to delete a group by its ID
    @DeleteMapping("/delete")
    public void deleteGroup(@RequestParam Long id) {
        groupService.deleteGroup(id);
    }

    // Endpoint to update an existing group by its ID
    @PutMapping("/update/{id}")
    public Group updateGroup(@PathVariable Long id, @RequestBody Group updatedGroup) {
        return groupService.updateGroup(id, updatedGroup);
    }
}

