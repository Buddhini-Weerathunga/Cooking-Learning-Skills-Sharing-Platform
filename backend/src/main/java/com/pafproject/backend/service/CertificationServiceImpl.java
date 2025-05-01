package com.pafproject.backend.service;

import com.pafproject.backend.models.Certification;
import com.pafproject.backend.repository.CertificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CertificationServiceImpl implements CertificationService {

    @Autowired
    private CertificationRepository certificationRepository;

    @Override
    public Certification createCertification(Certification certification) {
        return certificationRepository.save(certification);
    }

    @Override
    public List<Certification> getAllCertifications() {
        return certificationRepository.findAll();
    }

    @Override
    public Optional<Certification> getCertificationById(Long id) {
        return certificationRepository.findById(id);
    }

    @Override
    public Certification updateCertification(Long id, Certification certification) {
        Certification existing = certificationRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Certification not found with id: " + id));
        
        existing.setTitle(certification.getTitle());
        existing.setDescription(certification.getDescription());
        existing.setLevel(certification.getLevel());
        existing.setImageUrl(certification.getImageUrl());
        existing.setEstimatedHours(certification.getEstimatedHours());
        existing.setRequirements(certification.getRequirements());
        
        return certificationRepository.save(existing);
    }

    @Override
    public void deleteCertification(Long id) {
        if (!certificationRepository.existsById(id)) {
            throw new RuntimeException("Certification not found with id: " + id);
        }
        certificationRepository.deleteById(id);
    }

    @Override
    public List<Certification> searchCertifications(String keyword) {
        return certificationRepository.search(keyword);
    }

    @Override
    public List<Certification> filterByLevel(String level) {
        return certificationRepository.findByLevelIgnoreCase(level);
    }
    
    @Override
    public List<Certification> filterByMaxHours(Integer maxHours) {
        return certificationRepository.findByEstimatedHoursLessThanEqual(maxHours);
    }
}