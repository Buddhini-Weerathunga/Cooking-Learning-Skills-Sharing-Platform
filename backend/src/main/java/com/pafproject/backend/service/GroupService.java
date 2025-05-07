package com.pafproject.backend.service;

import com.pafproject.backend.models.Group;
import com.pafproject.backend.repository.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

import java.util.List;

@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    public Group getGroupById(Long id) {
        return groupRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Group not found with id: " + id));
    }

    public Group updateGroup(Long id, Group groupDetails) {
        Group group = getGroupById(id);
        group.setName(groupDetails.getName());
        group.setDescription(groupDetails.getDescription());
        group.setCategory(groupDetails.getCategory());
        group.setGroupRules(groupDetails.getGroupRules());
        group.setPrivateGroup(groupDetails.getPrivateGroup());
        group.setMemberCount(groupDetails.getMemberCount());
        return groupRepository.save(group);
    }

    public void deleteGroup(Long id) {
        groupRepository.deleteById(id);
    }
} 