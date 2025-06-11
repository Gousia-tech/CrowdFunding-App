package com.smiledonors.service;

import com.smiledonors.dto.DonationDto;


import com.smiledonors.exception.DonationsEmpty;

import com.smiledonors.model.Donation;
import com.smiledonors.repository.DonationRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class DonationServiceImpl  implements DonationService{


    @Autowired
    private  DonationRepository donationRepository;

    @Autowired
    private JavaMailSender mailSender;


    private final RestTemplate restTemplate;

    @Autowired
    public DonationServiceImpl(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }



    @Override
    public  DonationDto saveDonation(DonationDto donation) {
        ModelMapper modelMapper = new ModelMapper();
        Donation donations = modelMapper.map(donation, Donation.class);

        Donation savedDonation = donationRepository.save(donations);

        double totalAmount = donationRepository
                .findByOrganisationEmail(donation.getOrganisationEmail())
                .stream()
                .mapToDouble(Donation::getAmount)
                .sum();

        // REST call to Orphanage microservice to update the field
        String orphanageServiceUrl = "http://localhost:9091/orphanages/update-donation-received/"
                + donation.getOrganisationEmail() + "?donationReceived=" + (long) totalAmount;

        try {
            restTemplate.put(orphanageServiceUrl, null);
        } catch (Exception e) {
            System.err.println("Failed to update orphanage donation amount: " + e.getMessage());
        }
        return modelMapper.map(savedDonation, DonationDto.class);
    }

    @Override
    public List<DonationDto> findByDonorEmail(String donorEmail)  {
        ModelMapper modelMapper = new ModelMapper();

        // Fetch the donations by donor email
        List<Donation> donorDonations = donationRepository.findByDonorEmail(donorEmail);

        // Check if the result is empty and throw an exception directly
        if (donorDonations.isEmpty()) {
            throw new DonationsEmpty("Did not make any Donations yet");
        }

        // Map the result to DTOs
        return donorDonations.stream()
                .map(donation -> modelMapper.map(donation, DonationDto.class))
                .toList();
    }




    @Override
    public List<DonationDto> findByOrganisationEmail(String organisationEmail) {
        ModelMapper modelMapper = new ModelMapper();

        // Fetch the donations by organization email
        List<Donation> organisationDonations = donationRepository.findByOrganisationEmail(organisationEmail);

        // Check if the result is empty and throw an exception directly
        if (organisationDonations.isEmpty()) {
            throw new DonationsEmpty("Did not receive any Donations yet");
        }

        // Map the result to DTOs
        return organisationDonations.stream()
                .map(donation -> modelMapper.map(donation, DonationDto.class))
                .toList();
    }

    @Override
    public void sendEmailDonor(String donorEmail, String subject,String  message){

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(donorEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("smiledonor123@gmail.com");

            mailSender.send(email);

    }

    @Override
    public void sendEmailOrg(String orgEmail, String sub, String mess) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(orgEmail);
        email.setSubject(sub);
        email.setText(mess);
        email.setFrom("smiledonor123@gmail.com");

        mailSender.send(email);


    }

    @Override
    public double donationsReceived(String organisationEmail) {
        List<Donation> organisationDonations = donationRepository.findByOrganisationEmail(organisationEmail);

        return organisationDonations.stream()
                .mapToDouble(Donation::getAmount)
                .sum();
    }




}
