package com.pafproject.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;
import java.util.Arrays;
import java.util.List;

@Service
public class FileStorageService {
    private static final Logger logger = LoggerFactory.getLogger(FileStorageService.class);
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList(".jpg", ".jpeg", ".png", ".gif");

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String storeFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IOException("Failed to store empty file");
        }

        // Create upload directory if it doesn't exist
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        logger.info("Upload directory path: {}", uploadPath);
        
        try {
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
                logger.info("Created upload directory: {}", uploadPath);
            }
            
            if (!Files.isWritable(uploadPath)) {
                throw new IOException("Upload directory is not writable: " + uploadPath);
            }
            
            logger.info("Upload directory exists: {}", Files.exists(uploadPath));
            logger.info("Upload directory is writable: {}", Files.isWritable(uploadPath));
        } catch (IOException e) {
            logger.error("Failed to create/access upload directory: ", e);
            throw new IOException("Could not create/access upload directory: " + e.getMessage(), e);
        }

        // Generate unique filename
        String originalFilename = StringUtils.cleanPath(file.getOriginalFilename());
        if (originalFilename.contains("..")) {
            throw new IOException("Invalid file path sequence " + originalFilename);
        }

        // Get file extension and validate
        String fileExtension = originalFilename.substring(originalFilename.lastIndexOf(".")).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(fileExtension)) {
            throw new IOException("File type not allowed. Allowed types: " + String.join(", ", ALLOWED_EXTENSIONS));
        }

        String newFilename = UUID.randomUUID().toString() + fileExtension;

        // Copy file to the target location
        Path targetLocation = uploadPath.resolve(newFilename);
        logger.info("Target file path: {}", targetLocation);
        
        try {
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully at: {}", targetLocation);
        } catch (IOException e) {
            logger.error("Failed to store file: ", e);
            throw new IOException("Could not store file " + originalFilename + ": " + e.getMessage(), e);
        }

        // Return the URL path
        return "/uploads/" + newFilename;
    }
} 