package com.smiledonors.Services;



import com.smiledonors.DTO.OrphanageDTO;
import com.smiledonors.Model.OrphanageModel;
import com.smiledonors.Repository.OrphanageRepository;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrphanageImpl implements OrphanageService {

    private final OrphanageRepository orphanageRepository;
    private final ModelMapper modelMapper;

    @Autowired
    public OrphanageImpl(OrphanageRepository orphanageRepository, ModelMapper modelMapper) {
        this.orphanageRepository = orphanageRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public OrphanageDTO createOrphanage(OrphanageDTO dto) {
        if (dto.getEmailId() == null || dto.getEmailId().isEmpty()) {
            throw new IllegalArgumentException("EmailId is required");
        }
        // Map DTO to entity
        OrphanageModel model = modelMapper.map(dto, OrphanageModel.class);
        // Save entity
        OrphanageModel saved = orphanageRepository.save(model);
        // Map back to DTO
        return modelMapper.map(saved, OrphanageDTO.class);
    }

    @Override
    public Optional<OrphanageDTO> getOrphanageByEmailId(String emailId) {
        return orphanageRepository.findByEmailId(emailId)
                .map(orphanage -> modelMapper.map(orphanage, OrphanageDTO.class));
    }

    @Override
    public List<OrphanageDTO> getAllOrphanages() {
        return orphanageRepository.findAll().stream()
                .map(orphanage -> modelMapper.map(orphanage, OrphanageDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public OrphanageDTO updateOrphanageByEmailId(String emailId, OrphanageDTO dto) {
        OrphanageModel updated = orphanageRepository.findByEmailId(emailId)
                .map(existing -> {
                    // Update basic details
                    existing.setOrphans(dto.getOrphans());
                    existing.setGoal(dto.getGoal());
                    existing.setDonationReceived(dto.getDonationReceived());
                    existing.setAddress(dto.getAddress());
                    existing.setOrphanageName(dto.getOrphanageName());
                    existing.setRegistrationId(dto.getRegistrationId());

                    // ✅ Update main image only if not null and not blank
                    if (dto.getMainImage() != null && !dto.getMainImage().isBlank()) {
                        existing.setMainImage(dto.getMainImage());
                    }



                    return orphanageRepository.save(existing);
                })
                .orElseThrow(() -> new RuntimeException("Orphanage not found with emailId: " + emailId));

        return modelMapper.map(updated, OrphanageDTO.class);
    };



    @Override
    public void deleteOrphanageByEmailId(String emailId) {
        orphanageRepository.findByEmailId(emailId)
                .ifPresentOrElse(
                        orphanageRepository::delete,
                        () -> { throw new RuntimeException("Orphanage not found with emailId: " + emailId); });
    }

    public Optional<OrphanageDTO> updateDonationReceived(String email, long donationReceived) {
        Optional<OrphanageModel> orphanageOptional = orphanageRepository.findByEmailId(email);

        if (orphanageOptional.isPresent()) {
            OrphanageModel orphanage = orphanageOptional.get();
            orphanage.setDonationReceived(donationReceived);
            OrphanageModel updated = orphanageRepository.save(orphanage);

            OrphanageDTO dto = modelMapper.map(updated, OrphanageDTO.class);
            return Optional.of(dto);
        } else {
            throw new NoSuchElementException("Orphanage not found with email: " + email);
        }
    }
}
