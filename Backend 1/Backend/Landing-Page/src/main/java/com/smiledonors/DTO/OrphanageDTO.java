package com.smiledonors.DTO;

import lombok.Data;

import java.util.List;

@Data
public class OrphanageDTO {

    private Integer id;
    private String emailId;
    private int orphans;
    private long goal;
    private long donationReceived;

    // ✅ Base64 string for images



    private String address;
    private String orphanageName;
    private String registrationId;

    private String mainImage;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmailId() {
        return emailId;
    }

    public void setEmailId(String emailId) {
        this.emailId = emailId;
    }

    public int getOrphans() {
        return orphans;
    }

    public void setOrphans(int orphans) {
        this.orphans = orphans;
    }

    public long getGoal() {
        return goal;
    }

    public void setGoal(long goal) {
        this.goal = goal;
    }

    public long getDonationReceived() {
        return donationReceived;
    }

    public void setDonationReceived(long donationReceived) {
        this.donationReceived = donationReceived;
    }

    public String getMainImage() {
        return mainImage;
    }

    public void setMainImage(String mainImage) {
        this.mainImage = mainImage;
    }



    public String getRegistrationId() {
        return registrationId;
    }

    public void setRegistrationId(String registrationId) {
        this.registrationId = registrationId;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getOrphanageName() {
        return orphanageName;
    }

    public void setOrphanageName(String orphanageName) {
        this.orphanageName = orphanageName;
    }
}
