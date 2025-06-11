package com.smiledonors.Login.Controller;

import com.smiledonors.Login.Exception.UserAlreadyExistsException;
import com.smiledonors.Login.Exception.UserNotFoundException;
import com.smiledonors.Login.Model.Donor;
import com.smiledonors.Login.Model.Organization;
import com.smiledonors.Login.Service.AuthService;
import com.smiledonors.Login.Service.OrgService;
import com.smiledonors.Login.Util.JWTUtil;
import com.smiledonors.Login.dto.Donordto;
import com.smiledonors.Login.dto.OrgLoginDTO;
import com.smiledonors.Login.dto.Organizationdto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/org")
@CrossOrigin("http://localhost:3000")
public class OrgController {

    @Autowired
    private OrgService service;
    @Autowired
    private AuthService authService;

    @PostMapping("/auth/register")
    public ResponseEntity<?> registerOrganization(@RequestBody @Valid Organizationdto dto) throws UserAlreadyExistsException {
        authService.registerOrganization(dto);
//        dto.setPassword(null);
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> loginOrganization(@RequestBody @Valid OrgLoginDTO dto) throws UserNotFoundException {
        Organization org = authService.loginOrganization(dto);
        String token = JWTUtil.generateToken(org.getEmail());
        Map<String, String> response = new HashMap<>();
        response.put("token", token);
        response.put("email", org.getEmail());
        return ResponseEntity.ok(response);
    }



    @GetMapping("/get/{email}")
    public ResponseEntity<?> getOrganization(@PathVariable String email) throws UserNotFoundException {
        Organization org = authService.getOrganizationByEmail(email);
        return new ResponseEntity<>(org, HttpStatus.OK);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateOrganization(@RequestBody Organizationdto organizationDTO, @PathVariable String email) throws UserNotFoundException {
        Organization updatedOrganization = authService.updateOrganization(organizationDTO, email);
        return new ResponseEntity<>(updatedOrganization, HttpStatus.OK);
    }

    @PutMapping("/update/password/{email}/{password}")
    public ResponseEntity<?> updatePassword(@PathVariable String email, @PathVariable String password) throws UserNotFoundException {
        Organization updatedOrganization = authService.updateOrganizationPassword(email, password);
        return new ResponseEntity<>(updatedOrganization, HttpStatus.OK);
    }

}
