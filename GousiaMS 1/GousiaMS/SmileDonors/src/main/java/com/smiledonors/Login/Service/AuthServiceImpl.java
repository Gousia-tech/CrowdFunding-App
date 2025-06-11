package com.smiledonors.Login.Service;


import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Model.Organization;
import com.smiledonors.Login.Exception.UserAlreadyExistsException;
import com.smiledonors.Login.Exception.UserNotFoundException;
import com.smiledonors.Login.Repository.DonorRepo;
import com.smiledonors.Login.Repository.OrganizationRepo;
import com.smiledonors.Login.Security.CustomUserDetails;
import com.smiledonors.Login.dto.DonorLoginDTO;
import com.smiledonors.Login.dto.Donordto;
import com.smiledonors.Login.dto.OrgLoginDTO;
import com.smiledonors.Login.dto.Organizationdto;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService{

    @Autowired
    private DonorRepo donorRepo;
    @Autowired
    private OrganizationRepo organizationRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public Donor registerDonor(Donordto donorDTO) throws UserAlreadyExistsException {
        System.out.println("HEllo");
        Optional<Donor> isUserExists = donorRepo.findByEmail(donorDTO.getEmail());
        if (isUserExists.isPresent()) {
            throw new UserAlreadyExistsException("User Already Exists");
        }

        Donor donor = modelMapper.map(donorDTO, Donor.class);
        donor.setPassword(BCrypt.hashpw(donorDTO.getPassword(), BCrypt.gensalt()));
        return donorRepo.save(donor);
    }

    @Override
    public Donor loginDonor(DonorLoginDTO donorLoginDTO) throws UserNotFoundException {
        Optional<Donor> isUserExists = donorRepo.findByEmail(donorLoginDTO.getEmail());

        if (isUserExists.isPresent()) {
            Donor foundDonor = isUserExists.get();
            if (BCrypt.checkpw(donorLoginDTO.getPassword(), foundDonor.getPassword())) {
                return foundDonor;
            }
        }

        throw new UserNotFoundException("Invalid Email or Password");
    }

    @Override
    public Organization registerOrganization(Organizationdto dto) throws UserAlreadyExistsException {
        if (organizationRepo.findByEmail(dto.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("Organization already exists");
        }

        Organization organization = modelMapper.map(dto, Organization.class);
        organization.setPassword(BCrypt.hashpw(dto.getPassword(), BCrypt.gensalt()));

        return organizationRepo.save(organization);
    }

    @Override
    public Organization loginOrganization(OrgLoginDTO dto) throws UserNotFoundException {
        Organization org = organizationRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new UserNotFoundException("Organization not found"));

        if (!BCrypt.checkpw(dto.getPassword(), org.getPassword())) {
            throw new UserNotFoundException("Invalid credentials");
        }

        return org;
    }




    // Get Donor by email
    @Override
    public Donor getDonorByEmail(String email) throws UserNotFoundException {
        Optional<Donor> donorOpt = donorRepo.findByEmail(email);

        if (donorOpt.isPresent()) {
            return donorOpt.get();  // Return Donor if found
        } else {
            throw new UserNotFoundException("Donor not found with email: " + email);
        }
    }

    // Update Donor details
    @Override
    public Donor updateDonor(Donordto donorDTO, String email) throws UserNotFoundException {
        Optional<Donor> donorOpt = donorRepo.findByEmail(email);
        if (donorOpt.isPresent()) {
            Donor donor = donorOpt.get();
            donor.setDonorFirstName(donorDTO.getDonorFirstName());// Update fields using DTO
            donor.setDonorLastName(donorDTO.getDonorLastName());
            donor.setPhoneNo(donorDTO.getPhoneNo());  // Update fields using DTO
            donorRepo.save(donor);  // Save updated donor to database
            return donor;
        } else {
            throw new UserNotFoundException("Donor not found with email: " + email);
        }
    }



    @Override
    public Donor updateDonorPassword(String email, String password) throws UserNotFoundException {
        Optional<Donor> donorOpt = donorRepo.findByEmail(email);

        if (donorOpt.isPresent()) {
            Donor donor = donorOpt.get();
            String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            donor.setPassword(encryptedPassword);  // Update the password with encrypted one
            donorRepo.save(donor);  // Save updated donor
            return donor;
        } else {
            throw new UserNotFoundException("Donor not found with email: " + email);
        }
    }

    // Get Organization by email
    @Override
    public Organization getOrganizationByEmail(String email) throws UserNotFoundException {
        Optional<Organization> organizationOpt = organizationRepo.findByEmail(email);

        if (organizationOpt.isPresent()) {
            return organizationOpt.get();  // Return Organization if found
        } else {
            throw new UserNotFoundException("Organization not found with email: " + email);
        }
    }


    @Override
    public Organization updateOrganization(Organizationdto organizationDTO, String email) throws UserNotFoundException {
        Optional<Organization> organizationOpt = organizationRepo.findByEmail(email);

        if (organizationOpt.isPresent()) {
            Organization organization = organizationOpt.get();
            organization.setOrphanageName(organizationDTO.getOrphanageName());  // Update orphanage name
            organization.setOrganiserFirstName(organizationDTO.getOrganiserFirstName());// Update organiser name
            organization.setOrganiserLastName(organizationDTO.getOrganiserLastName());
            organization.setOrphanagePhoneNumber(organizationDTO.getOrphanagePhoneNumber());
            organization.setRegNo(organizationDTO.getRegNo());                  // Update registration number// Update email
            organizationRepo.save(organization);  // Save updated organization
            return organization;
        } else {
            throw new UserNotFoundException("Organization not found with email: " + email);
        }
    }

    // Update Organization password
    @Override
    public Organization updateOrganizationPassword(String email, String password) throws UserNotFoundException {
        Optional<Organization> organizationOpt = organizationRepo.findByEmail(email);

        if (organizationOpt.isPresent()) {
            Organization organization = organizationOpt.get();
            String encryptedPassword = BCrypt.hashpw(password, BCrypt.gensalt());
            organization.setPassword(encryptedPassword);  // Update the password with encrypted one
            organizationRepo.save(organization);          // Save updated organization
            return organization;
        } else {
            throw new UserNotFoundException("Organization not found with email: " + email);
        }
    }

//    @Override
//    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
//        Optional<Donor> donorOpt = donorRepo.findByEmail(email);
//        if (donorOpt.isPresent()) {
//            return new CustomUserDetails(donorOpt.get());
//        }
//
//        Optional<Organization> orgOpt = organizationRepo.findByEmail(email);
//        if (orgOpt.isPresent()) {
//            return new CustomUserDetails(orgOpt.get());
//        }
//
//        throw new UsernameNotFoundException("User not found with email: " + email);
//    }
//
//    @Override
//    public Donor updateDonorInfo(Donordto donorDTO, String email) throws UserNotFoundException {
//        return null;
//    }
//
//    @Override
//    public Organization updateOrganizationInfo(Organizationdto organizationDTO, String email) throws UserNotFoundException {
//        return null;
//    }

}



































//    @Override
//    public Donor registerDonor(Donor donor) throws UserAlreadyExistsException {
//
//        Optional<Donor> isUserExists = donorRepo.findByEmail(donor.getEmail());
//
//        if (isUserExists.isPresent())
//            throw new UserAlreadyExistsException("User Already Exists.....");
//        else {
//            String encryptedPassword = BCrypt.hashpw(donor.getPassword(), BCrypt.gensalt());
//
//            donor.setPassword(encryptedPassword);
//
//            Donor newDonor = donorRepo.save(donor);
//            return newDonor;
//        }
//
//    }
//
//    @Override
//    public Donordto loginDonor(Donordto donorDto) throws UserNotFoundException {
//        ModelMapper modelMapper = new ModelMapper();
//        Donor donations = modelMapper.map(donorDto, Donor.class);
//
//        Donor userFound = null;
//        Optional<Donor> isUserExists = donorRepo.findByEmail(donorDto.getEmail());
//
//        if (isUserExists.isPresent()) {
//            userFound = isUserExists.get();
//
//            boolean isValid = BCrypt.checkpw(donorDto.getPassword(), userFound.getPassword());
//
//            if (isValid){
//                donorDto.setDonorName(userFound.getDonorName());
//                donorDto.setEmail(userFound.getEmail());
//                donorDto.setPhoneNo(userFound.getPhoneNo());
//                donorDto.setPassword(null); // Hide password
//                return donorDto;
//            }
//
//            else
//                throw new UserNotFoundException("User Not Found...");
//        } else
//            throw new UserNotFoundException("User Not Found...");
//    }

























