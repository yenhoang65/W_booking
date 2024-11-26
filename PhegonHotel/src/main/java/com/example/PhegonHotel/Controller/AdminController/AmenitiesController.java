package com.example.PhegonHotel.Controller.AdminController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IAmenitiesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/amenities")
public class AmenitiesController {

    @Autowired
    private IAmenitiesService amenitiesService;

    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> addNewAmenities(@RequestParam Long amenitiesId, @RequestParam String nameAmenities) {
        ResponseDTO response = amenitiesService.addNewAmenities(amenitiesId, nameAmenities);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> getAllAmenities() {
        ResponseDTO response = amenitiesService.getAllAmenities();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> getAmenitiesById(@PathVariable("id") Long amenitiesId) {
        ResponseDTO response = amenitiesService.getAmenitiesById(amenitiesId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{amenitiesId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> updateAmenities(
            @PathVariable Long amenitiesId,
            @RequestParam(value = "nameAmenities", required = false) String nameAmenities
    ) {
        ResponseDTO response = amenitiesService.updateAmenities(amenitiesId, nameAmenities);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<ResponseDTO> deleteAmenities(@PathVariable("id") Long amenitiesId) {
        ResponseDTO response = amenitiesService.deleteAmenities(amenitiesId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }
}
