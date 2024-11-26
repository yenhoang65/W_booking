package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.ResponseDTO;

public interface IAmenitiesService {

    ResponseDTO addNewAmenities(Long amenitiesId, String nameAmenities);

    ResponseDTO getAllAmenities();

    ResponseDTO getAmenitiesById(Long amenitiesId);

    ResponseDTO deleteAmenities(Long amenitiesId);

    ResponseDTO updateAmenities(Long amenitiesId, String nameAmenities);
}
