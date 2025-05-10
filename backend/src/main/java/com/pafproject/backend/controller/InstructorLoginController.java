package com.pafproject.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/login")
@CrossOrigin(origins = "http://localhost:3000")
public class InstructorLoginController {

    private final String instructorUsername = "admin";
    private final String instructorPassword = "admin123";

    @PostMapping
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        if (instructorUsername.equals(loginRequest.getUsername()) &&
            instructorPassword.equals(loginRequest.getPassword())) {
            return ResponseEntity.ok("Login successful");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
    }

    public static class LoginRequest {
        private String username;
        private String password;

        // Getters and Setters
        public String getUsername() {
            return username;
        }
        public void setUsername(String username) {
            this.username = username;
        }
        public String getPassword() {
            return password;
        }
        public void setPassword(String password) {
            this.password = password;
        }
    }
}
