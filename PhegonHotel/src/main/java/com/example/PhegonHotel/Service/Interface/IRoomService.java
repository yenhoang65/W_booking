package com.example.PhegonHotel.Service.Interface;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Dto.RoomDTO;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

public interface IRoomService {

    ResponseDTO addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice, String description, String status,Long hotelId, List<String> amenities);

    List<String> getAllRoomTypes();

    ResponseDTO getAllRooms();

    ResponseDTO getAllRoomsUser();

    ResponseDTO deleteRoom(Long roomId);

    ResponseDTO updateRoom(Long roomId, String description, String roomType, BigDecimal roomPrice, MultipartFile photo,String status,Long hotelId,List<String> amenities);

    ResponseDTO getRoomById(Long roomId);

    ResponseDTO getAvailableRoomsByDataAndType(LocalDate checkInDate, LocalDate checkOutDate, String roomType);

    ResponseDTO getAllAvailableRooms();


}
