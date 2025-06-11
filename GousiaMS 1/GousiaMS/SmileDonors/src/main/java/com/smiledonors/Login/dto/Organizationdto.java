package com.smiledonors.Login.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class Organizationdto {

    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Orphanage name is required")
    private String orphanageName;

    @NotBlank(message = "Organiser name is required")
    private String organiserFirstName;

    @NotBlank(message = "Organiser name is required")
    private String organiserLastName;

    @NotBlank(message = "Registration number is required")
    private String regNo;

    @NotBlank(message = "Registration number is required")
    private String orphanagePhoneNumber;


    @NotBlank(message = "Password is required")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getOrphanageName() {
        return orphanageName;
    }

    public void setOrphanageName(String orphanageName) {
        this.orphanageName = orphanageName;
    }

    public String getOrganiserFirstName() {
        return organiserFirstName;
    }

    public void setOrganiserFirstName(String organiserFirstName) {
        this.organiserFirstName = organiserFirstName;
    }

    public String getOrganiserLastName() {
        return organiserLastName;
    }

    public void setOrganiserLastName(String organiserLastName) {
        this.organiserLastName = organiserLastName;
    }

    public String getRegNo() {
        return regNo;
    }

    public void setRegNo(String regNo) {
        this.regNo = regNo;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getOrphanagePhoneNumber() {
        return orphanagePhoneNumber;
    }

    public void setOrphanagePhoneNumber(String orphanagePhoneNumber) {
        this.orphanagePhoneNumber = orphanagePhoneNumber;
    }
}

