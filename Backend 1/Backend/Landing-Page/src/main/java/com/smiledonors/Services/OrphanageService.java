package com.smiledonors.Services;

import com.smiledonors.DTO.OrphanageDTO;

import java.util.List;
import java.util.Optional;

public interface OrphanageService {

    OrphanageDTO createOrphanage(OrphanageDTO dto);

    Optional<OrphanageDTO> getOrphanageByEmailId(String emailId);

    List<OrphanageDTO> getAllOrphanages();

    OrphanageDTO updateOrphanageByEmailId(String emailId, OrphanageDTO dto);

    void deleteOrphanageByEmailId(String emailId);

    Optional<OrphanageDTO> updateDonationReceived(String email, long donationReceived);
}
