package com.smiledonors.Login.Repository;
import java.util.Optional;
import com.smiledonors.Login.Model.Organization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganizationRepo extends JpaRepository<Organization, String> {

    Optional<Organization> findByEmail(String email);
}
