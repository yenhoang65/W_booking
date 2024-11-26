package com.example.PhegonHotel.Service.Impl;

import com.example.PhegonHotel.Dto.AmenitiesDTO;
import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Entity.Amenities;
import com.example.PhegonHotel.Exception.OurException;
import com.example.PhegonHotel.Repository.AmenitiesRepo;
import com.example.PhegonHotel.Service.Interface.IAmenitiesService;
import com.example.PhegonHotel.Utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AmenitiesService implements IAmenitiesService {
    @Autowired
    private AmenitiesRepo amenitiesRepo;

    @Override
    public ResponseDTO addNewAmenities(Long amenitiesId, String nameAmenities) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Optional<Amenities> existingAmenities = amenitiesRepo.findById(amenitiesId);
            if (existingAmenities.isPresent()) {
                throw new OurException("Amenities already exists with ID: " + amenitiesId);
            }

            Amenities newAmenities = new Amenities();
            newAmenities.setId(amenitiesId);
            newAmenities.setNameAmenities(nameAmenities);

            amenitiesRepo.save(newAmenities);

            AmenitiesDTO amenitiesDTO = Utils.mapAmenitiesEntityToAmenitiesDTO(newAmenities);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("New amenities added successfully");
            responseDTO.setAmenities(amenitiesDTO);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error adding amenities: " + e.getMessage());
        }

        return responseDTO;
    }

    @Override
    public ResponseDTO getAllAmenities() {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            List<Amenities> amenitiesList = amenitiesRepo.findAll();

            List<AmenitiesDTO> amenitiesDTOList = amenitiesList.stream()
                    .map(Utils::mapAmenitiesEntityToAmenitiesDTO)
                    .collect(Collectors.toList());

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Fetched all amenities successfully");
            responseDTO.setAmenitiesList(amenitiesDTOList);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error fetching amenities: " + e.getMessage());
        }

        return responseDTO;
    }


    @Override
    public ResponseDTO getAmenitiesById(Long amenitiesId) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Amenities amenities = amenitiesRepo.findById(amenitiesId)
                    .orElseThrow(() -> new OurException("Amenities not found with ID: " + amenitiesId));

            AmenitiesDTO amenitiesDTO = Utils.mapAmenitiesEntityToAmenitiesDTO(amenities);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Fetched amenities successfully");
            responseDTO.setAmenities(amenitiesDTO);

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error fetching amenities: " + e.getMessage());
        }

        return responseDTO;
    }


    @Override
    public ResponseDTO updateAmenities(Long amenitiesId, String nameAmenities) {
        ResponseDTO responseDTO = new ResponseDTO();

        try {
            Amenities existingAmenities = amenitiesRepo.findById(amenitiesId)
                    .orElseThrow(() -> new OurException("Amenities not found with ID: " + amenitiesId));

            if (nameAmenities != null) {
                existingAmenities.setNameAmenities(nameAmenities);
            }

            amenitiesRepo.save(existingAmenities);

            AmenitiesDTO amenitiesDTO = Utils.mapAmenitiesEntityToAmenitiesDTO(existingAmenities);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Amenities updated successfully");
            responseDTO.setAmenities(amenitiesDTO);

        } catch (OurException e) {
            responseDTO.setStatusCode(404); // Not Found
            responseDTO.setMessage(e.getMessage());
        } catch (Exception e) {
            responseDTO.setStatusCode(500); // Internal Server Error
            responseDTO.setMessage("Error updating amenities: " + e.getMessage());
        }

        return responseDTO;
    }


    @Override
    public ResponseDTO deleteAmenities(Long amenitiesId) {
        ResponseDTO responseDTO = new ResponseDTO();
        try {
            Amenities existingAmenities = amenitiesRepo.findById(amenitiesId)
                    .orElseThrow(() -> new OurException("Amenities not found with ID: " + amenitiesId));

            amenitiesRepo.delete(existingAmenities);

            responseDTO.setStatusCode(200);
            responseDTO.setMessage("Amenities deleted successfully");

        } catch (Exception e) {
            responseDTO.setStatusCode(500);
            responseDTO.setMessage("Error deleting amenities: " + e.getMessage());
        }

        return responseDTO;
    }



}
