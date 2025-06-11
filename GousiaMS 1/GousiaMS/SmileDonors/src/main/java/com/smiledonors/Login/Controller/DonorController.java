package com.smiledonors.Login.Controller;

import com.smiledonors.Login.Exception.UserAlreadyExistsException;
import com.smiledonors.Login.Exception.UserNotFoundException;
import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Service.AuthService;
import com.smiledonors.Login.Service.DonorService;
import com.smiledonors.Login.Util.JWTUtil;
import com.smiledonors.Login.dto.DonorLoginDTO;
import com.smiledonors.Login.dto.Donordto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

//Authentication
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/donor")
@CrossOrigin("http://localhost:3000")
public class DonorController {

    @Autowired
    private DonorService donorService;


    @Autowired
    private AuthService authService;


    @PostMapping("/auth/register")
    public ResponseEntity<?> registerDonor(@RequestBody @Valid Donordto donorDTO) throws UserAlreadyExistsException {
        Donor registered = authService.registerDonor(donorDTO);
//        donorDTO.setPassword(null); // hide password
        return ResponseEntity.ok(donorDTO);
    }


    @PostMapping("/auth/login")
    public ResponseEntity<Map<String, String>> loginDonor(@RequestBody @Valid DonorLoginDTO donorLoginDTO) throws UserNotFoundException {
        Donor donor = authService.loginDonor(donorLoginDTO);
        String token = JWTUtil.generateToken(donor.getEmail());

        // Create response object
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", donor.getEmail());

        return ResponseEntity.ok(response);
    }



    @GetMapping("/get/{email}")
    public ResponseEntity<?> getDonor(@PathVariable String email) throws UserNotFoundException {
        Donor donor = authService.getDonorByEmail(email);
        return new ResponseEntity<>(donor, HttpStatus.OK);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateDonor(@RequestBody Donordto donorDTO, @PathVariable String email) throws UserNotFoundException {
        Donor updatedDonor = authService.updateDonor(donorDTO, email);
        return new ResponseEntity<>(updatedDonor, HttpStatus.OK);
    }

    @PutMapping("/update/password/{email}/{password}")
    public ResponseEntity<?> updatePassword(@PathVariable String email, @PathVariable String password) throws UserNotFoundException {
        Donor updatedDonor = authService.updateDonorPassword(email, password);
        return new ResponseEntity<>(updatedDonor, HttpStatus.OK);
    }

}






