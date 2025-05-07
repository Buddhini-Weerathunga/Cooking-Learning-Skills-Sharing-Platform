package com.pafproject.backend.controller;

import com.pafproject.backend.models.Post;
import com.pafproject.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:3000")
public class PostController {

    @Autowired
    private PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Post> createPost(
        @RequestParam("type") String type,
        @RequestParam("title") String title,
        @RequestParam("description") String description,
        @RequestParam("tags") String tags,
        @RequestParam("image") MultipartFile image
    ) {
        try {
            Post saved = postService.createPost(type, title, description, tags, image);
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Post>> getAllPosts() {
        return ResponseEntity.ok(postService.getAllPosts());
    }
}
