package com.smiledonors.dto;


import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@NoArgsConstructor
@AllArgsConstructor
public class DonationDto {

    private long  id;

    @NotBlank
    @Email
    private String donorEmail;

    @NotNull
    @Size(min = 2, max = 100)
    private String donorName;

    @NotNull
    @Pattern(regexp = "\\d{10}")
    private String donorContact;

    @NotBlank
    @Email
    private String organisationEmail;

    @NotNull
    @Size(min = 2, max = 100)
    private String organisationName;

    @Min(value = 1)
    private double amount;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDonorEmail() {
        return donorEmail;
    }

    public void setDonorEmail(String donorEmail) {
        this.donorEmail = donorEmail;
    }

    public String getDonorName() {
        return donorName;
    }

    public void setDonorName(String donorName) {
        this.donorName = donorName;
    }

    public String getDonorContact() {
        return donorContact;
    }

    public void setDonorContact(String donorContact) {
        this.donorContact = donorContact;
    }

    public String getOrganisationEmail() {
        return organisationEmail;
    }

    public void setOrganisationEmail(String organisationEmail) {
        this.organisationEmail = organisationEmail;
    }

    public String getOrganisationName() {
        return organisationName;
    }

    public void setOrganisationName(String organisationName) {
        this.organisationName = organisationName;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}

