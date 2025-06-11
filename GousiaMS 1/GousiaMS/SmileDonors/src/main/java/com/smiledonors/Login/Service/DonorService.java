package com.smiledonors.Login.Service;

import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Repository.DonorRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DonorService {

    @Autowired
    private DonorRepo donorRepo;

    public String createDonorService(Donor donor){
        donorRepo.save(donor);
        return "Success donation";
    }
}
