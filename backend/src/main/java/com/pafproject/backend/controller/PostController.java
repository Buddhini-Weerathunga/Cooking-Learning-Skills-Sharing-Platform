package com.pafproject.backend.controller;

import com.pafproject.backend.models.Post;
import com.pafproject.backend.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/posts")
public class PostController {

    @Autowired
    private PostRepository postRepository;

    @GetMapping
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @PostMapping
    public Post createPost(
        @RequestParam("postName") String postName,
        @RequestParam("postTitle") String postTitle,
        @RequestParam("postContent") String postContent,
        @RequestParam("author") String author,
        @RequestParam(value = "image", required = false) MultipartFile image,
        @RequestParam(value = "category", required = false) String category,
        @RequestParam(value = "tags", required = false) String tags
    ) {
        String imagePath = null;
        if (image != null && !image.isEmpty()) {
            imagePath = image.getOriginalFilename(); // Replace with your storage logic
        }
        Post post = new Post();
        post.setPostName(postName);
        post.setPostTitle(postTitle);
        post.setPostContent(postContent);
        post.setAuthor(author);
        post.setImagePath(imagePath);
        post.setCategory(category);
        post.setTags(tags);
        return postRepository.save(post);
    }

    @GetMapping("/{id}")
    public Post getPostById(@PathVariable Long id) {
        return postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));
    }

    @PutMapping("/{id}")
    public Post updatePost(@PathVariable Long id, @RequestBody Post postDetails) {
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + id));

        post.setPostName(postDetails.getPostName());
        post.setPostTitle(postDetails.getPostTitle());
        post.setPostContent(postDetails.getPostContent());
        post.setAuthor(postDetails.getAuthor());

        return postRepository.save(post);
    }

    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        if (!postRepository.existsById(id)) {
            throw new RuntimeException("Post not found with id: " + id);
        }
        postRepository.deleteById(id);
    }
}
