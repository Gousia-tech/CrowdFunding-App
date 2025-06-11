package com.smiledonors.Login.Repository;

import java.util.Optional;

import com.smiledonors.Login.Model.Donor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonorRepo extends JpaRepository<Donor, String> {

    Optional<Donor> findByEmail(String email);
}
