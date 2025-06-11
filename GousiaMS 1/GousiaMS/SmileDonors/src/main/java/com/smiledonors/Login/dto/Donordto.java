package com.smiledonors.Login.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Data;

@Data
public class Donordto{

    @Email(message = "Email should be valid")
    private String email;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "\\d{10}", message = "Phone number must be 10 digits")
    private String phoneNo;

    @NotBlank(message = "Name is required")
    private String donorFirstName;

    @NotBlank(message = "Name is required")
    private String donorLastName;


    @NotBlank(message = "Password is required")
    private String password;

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }


    public String getDonorFirstName() {
        return donorFirstName;
    }

    public void setDonorFirstName(String donorFirstName) {
        this.donorFirstName = donorFirstName;
    }

    public String getDonorLastName() {
        return donorLastName;
    }

    public void setDonorLastName(String donorLastName) {
        this.donorLastName = donorLastName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
