package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.ResponseDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface IHotelService {

//    ResponseDTO addNewHotel(MultipartFile hotelPhoto, String name, String address, String description);
    ResponseDTO addNewHotel(MultipartFile photo,String nation, String city, String name, String address, String description);

    ResponseDTO getAllHotels();

    ResponseDTO getAllHotelUser();

    ResponseDTO deleteHotel(Long hotelId);

    ResponseDTO updateHotel(Long hotelId, MultipartFile photo,String nation, String city, String name, String address, String description);

    ResponseDTO getHotelById(Long hotelId);

    List<String> getAllHotelNames();
}
