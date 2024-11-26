package com.example.PhegonHotel.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserDTO {

    private Long id;
    private String email;
    private String photo;
    private String name;
    private String phoneNumber;
    private String username;
    private String status;
    private String nameShop;
    private String role;
//    private List<String> roles;
    private List<BookingDTO> bookings = new ArrayList<>();

    private List<HotelDTO> hotels = new ArrayList<>();

}
