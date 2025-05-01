package com.pafproject.backend.controller;

import com.pafproject.backend.models.User;
import com.pafproject.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Make sure frontend port matches
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.register(user);
    }

    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user) {
        Map<String, Object> response = new HashMap<>();

        if (user.getUsername() == null || user.getPassword() == null) {
            response.put("success", false);
            response.put("message", "Username or password is missing");
            return response;
        }

        userService.login(user.getUsername(), user.getPassword()).ifPresentOrElse(
                u -> {
                    response.put("success", true);
                    response.put("role", u.getRole());
                    response.put("message", "Login successful");
                },
                () -> {
                    response.put("success", false);
                    response.put("message", "Invalid credentials");
                }
        );
        return response;
    }
}
