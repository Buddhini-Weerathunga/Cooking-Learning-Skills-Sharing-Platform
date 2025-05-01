package com.pafproject.backend.controller;

import com.pafproject.backend.models.Certification;
import com.pafproject.backend.service.CertificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/certifications")
@CrossOrigin(origins = "http://localhost:3000")
public class CertificationController {

    @Autowired
    private CertificationService certificationService;

    @PostMapping
    public ResponseEntity<Certification> createCertification(@Valid @RequestBody Certification certification) {
        Certification created = certificationService.createCertification(certification);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Certification>> getCertifications(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String level,
            @RequestParam(required = false) Integer maxHours) {
        
        if (search != null && !search.isEmpty()) {
            return ResponseEntity.ok(certificationService.searchCertifications(search));
        }
        
        if (level != null && !level.isEmpty()) {
            return ResponseEntity.ok(certificationService.filterByLevel(level));
        }
        
        if (maxHours != null) {
            return ResponseEntity.ok(certificationService.filterByMaxHours(maxHours));
        }
        
        return ResponseEntity.ok(certificationService.getAllCertifications());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Certification> getCertificationById(@PathVariable Long id) {
        return certificationService.getCertificationById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Certification> updateCertification(
            @PathVariable Long id, 
            @Valid @RequestBody Certification certification) {
        try {
            Certification updated = certificationService.updateCertification(id, certification);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteCertification(@PathVariable Long id) {
        try {
            certificationService.deleteCertification(id);
            return ResponseEntity.ok(Map.of("message", "Certification deleted successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(Map.of("message", e.getMessage()));
        }
    }
    
    // Additional endpoint to handle adding a requirement to a certification
    @PostMapping("/{id}/requirements")
    public ResponseEntity<Certification> addRequirement(
            @PathVariable Long id, 
            @RequestBody Map<String, String> requirement) {
        
        Certification certification = certificationService.getCertificationById(id)
                .orElseThrow(() -> new RuntimeException("Certification not found with id: " + id));
        
        certification.getRequirements().add(requirement.get("requirement"));
        return ResponseEntity.ok(certificationService.updateCertification(id, certification));
    }
}