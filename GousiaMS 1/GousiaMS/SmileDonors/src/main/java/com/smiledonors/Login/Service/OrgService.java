package com.smiledonors.Login.Service;

import com.smiledonors.Login.Model.Organization;
import com.smiledonors.Login.Repository.OrganizationRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrgService {

    @Autowired
    private OrganizationRepo repo;

    public String createOrganizationService(Organization organization){

        repo.save(organization);
        return "success";
    }
}
