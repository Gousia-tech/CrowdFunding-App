package com.smiledonors.service;

import com.smiledonors.dto.DonationDto;

import java.util.List;


public interface DonationService {

    DonationDto saveDonation(DonationDto donation);

    List<DonationDto> findByDonorEmail(String donorEmail) ;

    List<DonationDto> findByOrganisationEmail(String organisationEmail)  ;

    public void sendEmailDonor(String donorEmail, String subject,String  message);

    public void sendEmailOrg(String orgEmail,String sub,String mess);

    public double donationsReceived(String orgEmail);
}
