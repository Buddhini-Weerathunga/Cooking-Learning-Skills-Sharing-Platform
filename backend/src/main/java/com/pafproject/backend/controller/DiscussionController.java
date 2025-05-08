package com.pafproject.backend.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Collections;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import com.pafproject.backend.models.Discussion;
import com.pafproject.backend.repository.DiscussionRepository;
import com.pafproject.backend.service.FileStorageService;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.transaction.annotation.Transactional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@RestController
@RequestMapping("/api/discussions")
@CrossOrigin(origins = "http://localhost:3000")
public class DiscussionController {

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private FileStorageService fileStorageService;

    @PersistenceContext
    private EntityManager entityManager;

    // Image upload endpoint
    @PostMapping("/upload")
    public Map<String, String> uploadAvatar(@RequestParam("file") MultipartFile file) throws Exception {
        String fileUrl = fileStorageService.storeFile(file);
        return Collections.singletonMap("url", fileUrl);
    }

    // Create a new discussion
    @PostMapping
    public ResponseEntity<Discussion> createDiscussion(@RequestBody Discussion discussion) {
        System.out.println("Received discussion: " + discussion);
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
    @Transactional
    public ResponseEntity<Map<String, String>> deleteDiscussion(@PathVariable Long id) {
        System.out.println("Delete request received for discussion ID: " + id);
        
        try {
            // First try to find the discussion
            Optional<Discussion> discussionOpt = discussionRepository.findById(id);
            
            if (!discussionOpt.isPresent()) {
                System.out.println("Discussion not found with ID: " + id);
                return ResponseEntity.status(404)
                    .body(Collections.singletonMap("message", "Discussion not found with ID: " + id));
            }
            
            Discussion discussion = discussionOpt.get();
            System.out.println("Found discussion: " + discussion);
            
            // Delete using repository
            discussionRepository.delete(discussion);
            System.out.println("Discussion deleted successfully");
            
            return ResponseEntity.ok()
                .body(Collections.singletonMap("message", "Discussion successfully deleted"));
                
        } catch (Exception e) {
            System.out.println("Error during deletion: " + e.getClass().getName());
            System.out.println("Error message: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(500)
                .body(Collections.singletonMap("message", "Error deleting discussion: " + e.getMessage()));
        }
    }

    // TODO: Add other discussion CRUD endpoints here
} 