package com.smiledonors.Controller;

import com.smiledonors.DTO.OrphanageDTO;
import com.smiledonors.Repository.OrphanageRepository;
import com.smiledonors.Services.OrphanageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE})
@RequestMapping("/orphanages")
public class OrphanageController {

    @Autowired
    private OrphanageService orphanageService;

    // ✅ Create new orphanage
    @PostMapping("/add")
    public ResponseEntity<OrphanageDTO> createOrphanage(@RequestBody OrphanageDTO dto) {
        OrphanageDTO created = orphanageService.createOrphanage(dto);
        return ResponseEntity.ok(created);
    }

    // ✅ Get orphanage by emailId
    @GetMapping("/get/{emailId}")
    public ResponseEntity<OrphanageDTO> getByEmail(@PathVariable String emailId) {
        return orphanageService.getOrphanageByEmailId(emailId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // ✅ Get all orphanages
    @GetMapping("/get/all")
    public ResponseEntity<List<OrphanageDTO>> getAll() {
        return ResponseEntity.ok(orphanageService.getAllOrphanages());
    }

    // ✅ Update orphanage by emailId
    @PutMapping("/update/{emailId}")
    public ResponseEntity<OrphanageDTO> updateByEmail(@PathVariable String emailId, @RequestBody OrphanageDTO dto) {
        try {
            OrphanageDTO updated = orphanageService.updateOrphanageByEmailId(emailId, dto);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    // ✅ Delete orphanage by emailId
    @DeleteMapping("/delete/{emailId}")
    public ResponseEntity<Void> deleteByEmail(@PathVariable String emailId) {
        try {
            orphanageService.deleteOrphanageByEmailId(emailId);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/update-donation-received/{email}")
    public ResponseEntity<?> updateDonationReceived(
            @PathVariable String email,
            @RequestParam long donationReceived) {
        try {
            Optional<OrphanageDTO> updatedOrphanage = orphanageService.updateDonationReceived(email, donationReceived);
            return ResponseEntity.ok(updatedOrphanage);
        } catch (NoSuchElementException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Orphanage not found");
        }
    }

}
