package com.pafproject.backend.config;




import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) // Important for Postman & frontend dev
            .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .requestMatchers("/api/courses/**").permitAll() // 👈 temporarily open this
            .requestMatchers("/api/items/**").permitAll()
            .requestMatchers("/api/posts/**").permitAll() 
            .requestMatchers("/api/certifications/**").permitAll()
            .requestMatchers("/api/enrollments/**").permitAll()
            .requestMatchers("/api/communities/**").permitAll() // 👈 temporarily open this
            .anyRequest().authenticated()
        )
            .cors(cors -> {}); // Enable CORS if you're using frontend like React

        return http.build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}


