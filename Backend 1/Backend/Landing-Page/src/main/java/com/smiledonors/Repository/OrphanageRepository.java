package com.smiledonors.Repository;

import com.smiledonors.Model.OrphanageModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OrphanageRepository extends JpaRepository<OrphanageModel,Integer> {

    Optional<OrphanageModel>findByRegistrationId(String registrationId);
    Optional<OrphanageModel> findByEmailId(String emailId);

}
