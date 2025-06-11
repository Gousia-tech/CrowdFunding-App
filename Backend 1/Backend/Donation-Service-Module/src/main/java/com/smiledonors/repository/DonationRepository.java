package com.smiledonors.repository;

import com.smiledonors.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, Long> {

    List<Donation> findByDonorEmail(String donorEmail);
    List<Donation> findByOrganisationEmail(String organisationEmail);
}
