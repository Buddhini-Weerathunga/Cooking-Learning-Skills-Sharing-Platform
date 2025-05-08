package com.pafproject.backend.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    private static final Logger logger = LoggerFactory.getLogger(WebConfig.class);
    
    @Value("${file.upload-dir}")
    private String uploadDir;

    public WebConfig() {
        System.out.println("[WebConfig] Constructor called");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        String uploadAbsolutePath = "file:" + uploadPath + "/";
        
        logger.info("[WebConfig] addResourceHandlers called");
        logger.info("[WebConfig] Upload directory path: {}", uploadPath);
        logger.info("[WebConfig] Upload absolute path: {}", uploadAbsolutePath);
        
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations(uploadAbsolutePath)
                .setCachePeriod(3600);
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
} 