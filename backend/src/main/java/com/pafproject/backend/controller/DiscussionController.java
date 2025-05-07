package com.pafproject.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;
import org.springframework.beans.factory.annotation.Autowired;
import com.pafproject.backend.models.Discussion;
import com.pafproject.backend.repository.DiscussionRepository;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    // Image upload endpoint
    @PostMapping("/upload")
    public Map<String, String> uploadAvatar(@RequestParam("file") MultipartFile file) throws IOException {
        // Use an absolute path for the upload directory
        String uploadDir = System.getProperty("user.dir") + File.separator + "uploads" + File.separator + "avatars" + File.separator;
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        File dest = new File(uploadDir + fileName);
        dest.getParentFile().mkdirs(); // Ensure the directory exists
        file.transferTo(dest);
        String url = "/uploads/avatars/" + fileName; // This is what you store in the DB
        return Collections.singletonMap("url", url);
    }

    // Create a new discussion
    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Discussion discussion) {
        Discussion saved = discussionRepository.save(discussion);
        return ResponseEntity.ok(saved);
    }

    // Get all discussions
    @GetMapping
    public List<Discussion> getAllDiscussions() {
        return discussionRepository.findAll();
    }

    // Get a discussion by ID
    @GetMapping("/{id}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable Long id) {
        Optional<Discussion> discussion = discussionRepository.findById(id);
        return discussion.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update a discussion
    @PutMapping("/{id}")
    public ResponseEntity<Discussion> updateDiscussion(@PathVariable Long id, @RequestBody Discussion updatedDiscussion) {
        return discussionRepository.findById(id)
                .map(discussion -> {
                    discussion.setTitle(updatedDiscussion.getTitle());
                    discussion.setContent(updatedDiscussion.getContent());
                    discussion.setCategory(updatedDiscussion.getCategory());
                    discussion.setTags(updatedDiscussion.getTags());
                    discussion.setAuthor(updatedDiscussion.getAuthor());
                    discussion.setAvatar(updatedDiscussion.getAvatar());
                    discussion.setDate(updatedDiscussion.getDate());
                    Discussion saved = discussionRepository.save(discussion);
                    return ResponseEntity.ok(saved);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete a discussion
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDiscussion(@PathVariable Long id) {
        if (!discussionRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        discussionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // TODO: Add other discussion CRUD endpoints here
} 