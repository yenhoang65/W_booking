package com.example.PhegonHotel.Controller.UserController;

import com.example.PhegonHotel.Dto.ResponseDTO;
import com.example.PhegonHotel.Service.Interface.IBookingService;
import com.example.PhegonHotel.Service.Interface.IRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/users/rooms")
public class UserRoomController {
    @Autowired
    private IRoomService roomService;

    @Autowired
    private IBookingService iBookingService;

    @GetMapping("/all")
    public ResponseEntity<ResponseDTO> getAllRoomsUser() {
        ResponseDTO responseDTO = roomService.getAllRoomsUser();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/types")
    public List<String> getRoomTypes() {
        return roomService.getAllRoomTypes();
    }

    @GetMapping("/room-by-id/{roomId}")
    public ResponseEntity<ResponseDTO> getRoomById(@PathVariable Long roomId) {
        ResponseDTO responseDTO = roomService.getRoomById(roomId);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/all-available-rooms")
    public ResponseEntity<ResponseDTO> getAvailableRooms() {
        ResponseDTO responseDTO = roomService.getAllAvailableRooms();
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

    @GetMapping("/available-rooms-by-date-and-type")
    public ResponseEntity<ResponseDTO> getAvailableRoomsByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String roomType
    ) {
        if (checkInDate == null || roomType == null || roomType.isBlank() || checkOutDate == null) {
            ResponseDTO responseDTO = new ResponseDTO();
            responseDTO.setStatusCode(400);
            responseDTO.setMessage("Vui lòng cung cấp giá trị cho tất cả các trường (checkInDate, roomType,checkOutDate)");
            return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
        }
        ResponseDTO responseDTO = roomService.getAvailableRoomsByDataAndType(checkInDate, checkOutDate, roomType);
        return ResponseEntity.status(responseDTO.getStatusCode()).body(responseDTO);
    }

}
