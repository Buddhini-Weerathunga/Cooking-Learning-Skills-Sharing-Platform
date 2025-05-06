package com.pafproject.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "community_groups")
public class CommunityGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    private String category;

    @Column(length = 1000)
    private String groupRules;

    private Boolean privateGroup;

    // Constructors
    public CommunityGroup() {
    }

    public CommunityGroup(String name, String description) {
        this.name = name;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getGroupRules() {
        return groupRules;
    }

    public void setGroupRules(String groupRules) {
        this.groupRules = groupRules;
    }

    public Boolean getPrivateGroup() {
        return privateGroup;
    }

    public void setPrivateGroup(Boolean privateGroup) {
        this.privateGroup = privateGroup;
    }
} // ✅ Close the class properly here!
