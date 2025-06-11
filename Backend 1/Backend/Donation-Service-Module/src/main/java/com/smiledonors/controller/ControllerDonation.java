package com.smiledonors.controller;

import com.smiledonors.dto.DonationDto;
import com.smiledonors.service.DonationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("donation") // Specify the mapping root
@CrossOrigin("http://localhost:3000")
public class ControllerDonation {

    @Autowired
    private DonationService donationService;
    @PostMapping("/add")
    public ResponseEntity<DonationDto> saveDonations(@RequestBody @Valid DonationDto donation) {
        DonationDto savedDonation = donationService.saveDonation(donation);

        long id = savedDonation.getId(); // Assuming id is a Long
        String donorEmail = savedDonation.getDonorEmail();
        String donorName = savedDonation.getDonorName();
        String organisationName = savedDonation.getOrganisationName();
        double amount = savedDonation.getAmount();

        String subject = "Donation Confirmation";
        String message = "Dear  " + donorName + ",\n\n" +
                "Thank you for your generous donation of ₹" + amount + ".\n" +
                "Donation ID: " + id + "\n\n" +
                "Your support means the world to us and makes a difference.\n\n" +
                "Best regards,\nYour "+ organisationName;

        donationService.sendEmailDonor(donorEmail,subject, message);

        String orgEmail= savedDonation.getOrganisationEmail();
        String sub= "Donation Received ";
        String mess= "Dear   "+organisationName+",\n\n"+"You have received donation of ₹"+amount+".\n"+
                      "Donation ID: " + id + "\n\n" +"\n\n"+
                       "From "+donorName+"    "+donorEmail;
        donationService.sendEmailOrg(orgEmail,sub,mess);

        return ResponseEntity.ok(savedDonation);

    }

    @GetMapping("/get-org/{orgEmail}")
    public ResponseEntity<List<DonationDto>> getOrganisationDonation(@PathVariable String orgEmail){
        List<DonationDto> getOrgDonation = donationService.findByOrganisationEmail(orgEmail);
        return ResponseEntity.ok(getOrgDonation);
    }


    @GetMapping("/get-donor/{donorEmail}")
    public ResponseEntity<List<DonationDto>> getDonorDonation(@PathVariable String donorEmail){
        List<DonationDto> getDonorDonation =donationService.findByDonorEmail(donorEmail);
        return ResponseEntity.ok(getDonorDonation);
    }

    @GetMapping("/total-amount/{orgEmail}")
    public ResponseEntity<Double> getDonationsReceived(@PathVariable String orgEmail){
        double  totalAmount= donationService.donationsReceived(orgEmail);
        return  ResponseEntity.ok(totalAmount);
    }

}

