package com.pafproject.backend.service;

import com.pafproject.backend.models.Post;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface PostService {
    Post createPost(
        String type,
        String title,
        String description,
        String tags,
        MultipartFile file
    ) throws IOException;

    List<Post> getAllPosts();
}
