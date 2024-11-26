package com.example.PhegonHotel.Dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class HotelDTO {
    private Long id;
    private String photo;
    private String name;

    private String address;
    private String city;
    private String nation;
    private String description;
    private UserDTO creator;  // DTO của User, có thể chứa thông tin người tạo
    private List<RoomDTO> rooms = new ArrayList<>();  // Danh sách các phòng thuộc khách sạn
}
