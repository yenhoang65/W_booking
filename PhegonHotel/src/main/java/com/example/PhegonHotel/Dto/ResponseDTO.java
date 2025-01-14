package com.example.PhegonHotel.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {

    private int statusCode;
    private String message;

    // Thêm thuộc tính 'data' kiểu Object
    private Object data;

    private String token;
    private String expirationTime;
    private String bookingConfirmationCode;
    private AmenitiesDTO amenities;
    private String role;
    private UserDTO user;
    private RoomDTO room;
    private HotelDTO hotel;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<AmenitiesDTO> amenitiesList;
    private List<HotelDTO> hotelList;
    private List<String> roles;
    private List<BookingDTO> bookingList;

    // Thêm phương thức setData
    public void setData(Object data) {
        this.data = data;
    }
}
