package com.smiledonors.Login.Service;

import com.smiledonors.Login.Exception.UserAlreadyExistsException;
import com.smiledonors.Login.Exception.UserNotFoundException;
import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Model.Organization;
import com.smiledonors.Login.dto.DonorLoginDTO;
import com.smiledonors.Login.dto.Donordto;
import com.smiledonors.Login.dto.OrgLoginDTO;
import com.smiledonors.Login.dto.Organizationdto;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Optional;

public interface AuthService {

    Donor registerDonor(Donordto donorDTO) throws UserAlreadyExistsException;

    Donor loginDonor(DonorLoginDTO donorLoginDTO) throws UserNotFoundException;

    Organization registerOrganization(Organizationdto organizationDTO) throws UserAlreadyExistsException;

    Organization loginOrganization(OrgLoginDTO orgDTO) throws UserNotFoundException;

    Donor getDonorByEmail(String email) throws UserNotFoundException;


    Donor updateDonor(Donordto donorDTO, String email) throws UserNotFoundException;

    Donor updateDonorPassword(String email, String password) throws UserNotFoundException;


    Organization getOrganizationByEmail(String email) throws UserNotFoundException;


    Organization updateOrganization(Organizationdto organizationDTO, String email) throws UserNotFoundException;

    Organization updateOrganizationPassword(String email, String password) throws UserNotFoundException;

//    UserDetails loadUserByEmail(String email) throws UsernameNotFoundException;
//
//    Donor updateDonorInfo(Donordto donorDTO, String email) throws UserNotFoundException;
//
//    Organization updateOrganizationInfo(Organizationdto organizationDTO, String email) throws UserNotFoundException;

}
