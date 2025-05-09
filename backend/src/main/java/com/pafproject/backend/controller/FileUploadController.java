package com.pafproject.backend.controller;

import com.pafproject.backend.service.FileStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.multipart.MaxUploadSizeExceededException;
import org.springframework.web.multipart.MultipartException;
import java.io.IOException;

@RestController
@RequestMapping("/api")
public class FileUploadController {
    private static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

    @Autowired
    private FileStorageService fileStorageService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadFile(@RequestParam("image") MultipartFile file) {
        try {
            logger.info("Received file upload request");
            logger.info("File name: {}", file.getOriginalFilename());
            logger.info("File size: {} bytes", file.getSize());
            logger.info("Content type: {}", file.getContentType());

            if (file == null || file.isEmpty()) {
                logger.error("Received empty file");
                return ResponseEntity.badRequest().body("Please select a file to upload");
            }

            if (!file.getContentType().startsWith("image/")) {
                logger.error("Invalid file type: {}", file.getContentType());
                return ResponseEntity.badRequest().body("Only image files are allowed");
            }

            try {
                String fileUrl = fileStorageService.storeFile(file);
                logger.info("File uploaded successfully: {}", fileUrl);
                return ResponseEntity.ok(new FileUploadResponse(fileUrl));
            } catch (IOException e) {
                logger.error("Failed to store file: ", e);
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to store file: " + e.getMessage());
            }
        } catch (MaxUploadSizeExceededException e) {
            logger.error("File size exceeds maximum limit: ", e);
            return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
                .body("File size exceeds maximum limit of 500MB");
        } catch (MultipartException e) {
            logger.error("Multipart file error: ", e);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body("Invalid file upload: " + e.getMessage());
        } catch (Exception e) {
            logger.error("Unexpected error during file upload: ", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("An unexpected error occurred: " + e.getMessage());
        }
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<?> handleMaxSizeException(MaxUploadSizeExceededException exc) {
        logger.error("File size exceeds maximum limit: ", exc);
        return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE)
            .body("File size exceeds maximum limit of 500MB");
    }
}

class FileUploadResponse {
    private String url;

    public FileUploadResponse(String url) {
        this.url = url;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
} 