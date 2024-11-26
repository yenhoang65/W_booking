package com.example.PhegonHotel.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ResponseDTO {
//    private T data; // Dữ liệu trả về có thể là bất kỳ kiểu nào


    private int statusCode;
    private String message;

    private String token;
    private String expirationTime;
    private String bookingConfirmationCode;
    private AmenitiesDTO amenities;
    private String role;
//    private RoleDTO role; // Đổi thành RoleDTO để phù hợp với kiểu dữ liệu
    private UserDTO user;
    private RoomDTO room;
    private HotelDTO hotel;
    private BookingDTO booking;
    private List<UserDTO> userList;
    private List<RoomDTO> roomList;
    private List<AmenitiesDTO> amenitiesList;
    private List<HotelDTO> hotelList;
    private List<String> roles; // Danh sách tên vai trò
    private List<BookingDTO> bookingList;

//    public ResponseDTO(String loginSuccessfulWithGoogle, int i) {
//    }
//    private List<RoleDTO> roleList; // Thêm thuộc tính này

}
