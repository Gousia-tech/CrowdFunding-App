package com.smiledonors.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;




@Entity
@Table(name="donations")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Donation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long  id;

    @NotBlank
    @Column(nullable = false)
    @Email
    private String donorEmail;

    @NotNull
    @Column(nullable = false)
    @Size(min = 2, max = 100)
    private String donorName;

    @NotNull
    @Column(nullable = false)
    @Pattern(regexp = "\\d{10}")
    private String donorContact;

    @NotBlank
    @Column(nullable = false)
    @Email
    private String organisationEmail;

    @NotNull
    @Column(nullable = false)
    @Size(min = 2, max = 100)
    private String organisationName;

    @Min(value = 1)
    @Column(nullable = false)
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
