package com.pafproject.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "items") // optional but recommended
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false) // optional
    private String name;

    // Constructors
    public Item() {
    }

    public Item(String name) {
        this.name = name;
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
}
