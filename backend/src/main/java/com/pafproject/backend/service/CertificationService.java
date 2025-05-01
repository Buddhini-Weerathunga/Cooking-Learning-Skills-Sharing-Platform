package com.pafproject.backend.service;

import com.pafproject.backend.models.Certification;
import java.util.List;
import java.util.Optional;

public interface CertificationService {
    Certification createCertification(Certification certification);
    List<Certification> getAllCertifications();
    Optional<Certification> getCertificationById(Long id);
    Certification updateCertification(Long id, Certification certification);
    void deleteCertification(Long id);
    List<Certification> searchCertifications(String keyword);
    List<Certification> filterByLevel(String level);
    List<Certification> filterByMaxHours(Integer maxHours);
}