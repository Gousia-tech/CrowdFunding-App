package com.smiledonors.Login.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Organization {

    @Id

    private String email;
    private String orphanageName;
    private String organiserFirstName;
    private String organiserLastName;
    private String orphanagePhoneNumber;
    private String regNo;
    private  String password;

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

    public void setOrganiserLastName(String organiserLasttName) {
        this.organiserLastName = organiserLasttName;
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
