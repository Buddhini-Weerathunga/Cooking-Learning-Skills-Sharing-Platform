package com.pafproject.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "post_name", nullable = false)
    private String postName;

    @Column(name = "post_title", nullable = false)
    private String postTitle;

    @Column(name = "post_content", columnDefinition = "TEXT")
    private String postContent;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "image_path")
    private String imagePath;

    @Column(name = "category")
    private String category;

    @Column(name = "tags")
    private String tags;

    // Constructors
    public Post() {
    }

    public Post(String postName, String postTitle, String postContent, String author) {
        this.postName = postName;
        this.postTitle = postTitle;
        this.postContent = postContent;
        this.author = author;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public String getPostName() {
        return postName;
    }

    public void setPostName(String postName) {
        this.postName = postName;
    }

    public String getPostTitle() {
        return postTitle;
    }

    public void setPostTitle(String postTitle) {
        this.postTitle = postTitle;
    }

    public String getPostContent() {
        return postContent;
    }

    public void setPostContent(String postContent) {
        this.postContent = postContent;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }
}

